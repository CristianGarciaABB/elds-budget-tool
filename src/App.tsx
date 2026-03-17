import {
  useIsAuthenticated,
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useState, useEffect, useCallback } from "react";
import { loginScopes } from "./authConfig";

const ABB_RED = "#FF000F";

const FLOW_URL = import.meta.env.VITE_FLOW_URL as string;

// ─── Login screen ─────────────────────────────────────────────

function LoginScreen() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup({ scopes: loginScopes }).catch(console.error);
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

// ─── SharePoint value via Power Automate ──────────────────────

function SharePointValue() {
  const { accounts } = useMsal();
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchValue = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(FLOW_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "getConfig",
          key: "HELLO_WORLD",
          userEmail: accounts[0]?.username,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Flow error ${res.status}: ${body}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.value === undefined || data.value === null) {
        throw new Error(
          'No item found with Title = "HELLO_WORLD" in BudgetTool_Config list.'
        );
      }

      setValue(data.value);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [accounts]);

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
