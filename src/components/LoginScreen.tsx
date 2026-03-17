import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginScopes } from '../authConfig';
import { ABB_RED } from '../constants/styles';

const LoginScreen: React.FC = () => {
  const { instance } = useMsal();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null);
      await instance.loginPopup({ scopes: loginScopes });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Login failed';
      if (!msg.includes('user_cancelled')) {
        setError(msg);
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f5f5f5',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '48px 40px',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          textAlign: 'center',
          maxWidth: 420,
        }}
      >
        <div style={{ fontSize: 11, letterSpacing: 2, color: ABB_RED, fontWeight: 700, marginBottom: 8 }}>
          ABB
        </div>
        <h1 style={{ margin: '0 0 8px', fontSize: 22, color: '#222' }}>
          ELDS Solutions
        </h1>
        <h2 style={{ margin: '0 0 32px', fontSize: 16, color: '#555', fontWeight: 400 }}>
          OT Network Diagram Tool
        </h2>
        <button
          onClick={handleLogin}
          style={{
            background: ABB_RED,
            color: '#fff',
            border: 'none',
            padding: '12px 36px',
            borderRadius: 6,
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Sign In with ABB Account
        </button>
        {error && (
          <div style={{ marginTop: 16, color: '#c00', fontSize: 13 }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
