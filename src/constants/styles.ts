import type { CSSProperties } from 'react';

export const ABB_RED = '#FF000F';
export const ABB_DARK = '#1a1a1a';
export const GRAY_BG = '#f5f5f5';
export const GRAY_BORDER = '#ddd';
export const GRAY_TEXT = '#555';
export const WHITE = '#ffffff';

export const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 56,
  padding: '0 16px',
  background: ABB_DARK,
  color: WHITE,
  fontFamily: 'system-ui, sans-serif',
  fontSize: 14,
  borderBottom: '3px solid ' + ABB_RED,
};

export const sidebarStyle: CSSProperties = {
  width: 220,
  background: WHITE,
  borderRight: '1px solid ' + GRAY_BORDER,
  overflowY: 'auto',
  padding: '12px 0',
  fontFamily: 'system-ui, sans-serif',
};

export const rightPanelStyle: CSSProperties = {
  width: 280,
  background: WHITE,
  borderLeft: '1px solid ' + GRAY_BORDER,
  overflowY: 'auto',
  padding: 16,
  fontFamily: 'system-ui, sans-serif',
};

export const buttonStyle: CSSProperties = {
  padding: '6px 14px',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 500,
  fontFamily: 'system-ui, sans-serif',
};

export const primaryButton: CSSProperties = {
  ...buttonStyle,
  background: ABB_RED,
  color: WHITE,
};

export const secondaryButton: CSSProperties = {
  ...buttonStyle,
  background: '#e0e0e0',
  color: '#333',
};

export const inputStyle: CSSProperties = {
  width: '100%',
  padding: '6px 8px',
  border: '1px solid ' + GRAY_BORDER,
  borderRadius: 4,
  fontSize: 13,
  fontFamily: 'system-ui, sans-serif',
  boxSizing: 'border-box',
};

export const modalOverlay: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

export const modalContent: CSSProperties = {
  background: WHITE,
  borderRadius: 8,
  padding: 24,
  minWidth: 400,
  maxWidth: 560,
  maxHeight: '80vh',
  overflowY: 'auto',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  fontFamily: 'system-ui, sans-serif',
};
