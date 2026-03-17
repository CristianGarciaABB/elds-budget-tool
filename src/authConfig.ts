import { Configuration, LogLevel } from "@azure/msal-browser";

const clientId = import.meta.env.VITE_AZURE_CLIENT_ID;
const tenantId = import.meta.env.VITE_AZURE_TENANT_ID;

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: window.location.origin + import.meta.env.BASE_URL,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (_level, message, containsPii) => {
        if (!containsPii) console.log(message);
      },
      logLevel: LogLevel.Warning,
    },
  },
};

// Extract SharePoint hostname for token scope
const spUrl = import.meta.env.VITE_SHAREPOINT_SITE_URL || "";
const spOrigin = spUrl ? new URL(spUrl).origin : "";

export const graphScopes = {
  login: ["openid", "profile", "User.Read"],
  sharepoint: [`${spOrigin}/AllSites.Read`],
};
