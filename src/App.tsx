import {
  useIsAuthenticated,
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useState, useEffect, useCallback } from "react";
import { graphScopes } from "./authConfig";

const ABB_RED = "#FF000F";

const SHAREPOINT_SITE_URL = import.meta.env.VITE_SHAREPOINT_SITE_URL as string;

// ─── Graph helpers ────────────────────────────────────────────

async function getAccessToken(
  instance: ReturnType<typeof useMsal>["instance"],
  account: ReturnType<typeof useMsal>["accounts"][0]
) {
  const resp = await instance.acquireTokenSilent({
    scopes: graphScopes.sharepoint,
    account,
  });
  return resp.accessToken;
}

async function graphGet(token: string, url: string) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Graph ${res.status}: ${body}`);
  }
  return res.json();
}

// ─── Login screen ─────────────────────────────────────────────

function LoginScreen() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup({ scopes: graphScopes.login }).catch(console.error);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, sans-serif",
        background: "#f5f5f5",
      }}
    >
      <h1 style={{ marginBottom: 8, fontSize: 28, color: "#222" }}>
        ABB ELDS Solutions
      </h1>
      <h2 style={{ marginBottom: 32, fontWeight: 400, color: "#555" }}>
        Budget Tool
      </h2>
      <button
        onClick={handleLogin}
        style={{
          background: ABB_RED,
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "14px 40px",
          fontSize: 16,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Sign In
      </button>
    </div>
  );
}

// ─── SharePoint value card ────────────────────────────────────

function SharePointValue() {
  const { instance, accounts } = useMsal();
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchValue = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await getAccessToken(instance, accounts[0]);

      // 1. Resolve site ID from the SharePoint site URL
      //    VITE_SHAREPOINT_SITE_URL example:
      //    https://contoso.sharepoint.com/sites/MySite
      const url = new URL(SHAREPOINT_SITE_URL);
      const hostname = url.hostname; // e.g. contoso.sharepoint.com
      const sitePath = url.pathname; // e.g. /sites/MySite
      const siteRes = await graphGet(
        token,
        `https://graph.microsoft.com/v1.0/sites/${hostname}:${sitePath}`
      );
      const siteId = siteRes.id;

      // 2. Get list "BudgetTool_Config"
      const listRes = await graphGet(
        token,
        `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/BudgetTool_Config/items?$expand=fields&$filter=fields/Title eq 'HELLO_WORLD'`
      );

      const items = listRes.value;
      if (!items || items.length === 0) {
        throw new Error(
          'No item found with Title = "HELLO_WORLD" in BudgetTool_Config list.'
        );
      }

      const fieldValue = items[0].fields.Value;
      if (fieldValue === undefined) {
        throw new Error(
          'Item found but "Value" field is missing or empty.'
        );
      }

      setValue(fieldValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [instance, accounts]);

  useEffect(() => {
    fetchValue();
  }, [fetchValue]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
        Loading SharePoint data...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          maxWidth: 600,
          margin: "40px auto",
          padding: 24,
          background: "#fff0f0",
          border: "1px solid #ffcccc",
          borderRadius: 8,
          color: "#c00",
          fontFamily: "monospace",
          fontSize: 14,
          wordBreak: "break-word",
        }}
      >
        <strong>SharePoint Error</strong>
        <br />
        <br />
        {error}
        <br />
        <br />
        <button
          onClick={fetchValue}
          style={{
            background: ABB_RED,
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "8px 20px",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 32,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 14, color: "#888", marginBottom: 8 }}>
        BudgetTool_Config &rarr; HELLO_WORLD
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#222" }}>
        {value}
      </div>
    </div>
  );
}

// ─── Authenticated layout ─────────────────────────────────────

function Dashboard() {
  const { instance, accounts } = useMsal();
  const name = accounts[0]?.name ?? "User";

  const handleLogout = () => {
    instance.logoutPopup().catch(console.error);
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          background: ABB_RED,
          color: "#fff",
        }}
      >
        <strong>ABB ELDS Solutions Budget Tool</strong>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span>{name}</span>
          <button
            onClick={handleLogout}
            style={{
              background: "#fff",
              color: ABB_RED,
              border: "none",
              borderRadius: 4,
              padding: "6px 16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <SharePointValue />
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────

export default function App() {
  useIsAuthenticated(); // trigger re-render on auth change

  return (
    <>
      <UnauthenticatedTemplate>
        <LoginScreen />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <Dashboard />
      </AuthenticatedTemplate>
    </>
  );
}
