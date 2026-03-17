import React from 'react';
import { useMsal } from '@azure/msal-react';
import { headerStyle, ABB_RED, primaryButton, secondaryButton } from '../constants/styles';

interface HeaderProps {
  projectName: string;
  purdueZonesVisible: boolean;
  showCableLabels: boolean;
  onTogglePurdue: () => void;
  onToggleCableLabels: () => void;
  onSave: () => void;
  onLoad: () => void;
  onExportPdf: () => void;
}

const Header: React.FC<HeaderProps> = ({
  projectName,
  purdueZonesVisible,
  showCableLabels,
  onTogglePurdue,
  onToggleCableLabels,
  onSave,
  onLoad,
  onExportPdf,
}) => {
  const { instance, accounts } = useMsal();
  const userName = accounts[0]?.name || 'User';

  const toggleBtn = (active: boolean) => ({
    ...secondaryButton,
    fontSize: 12,
    background: active ? '#e3f2fd' : '#e0e0e0',
    border: active ? '1px solid #90caf9' : '1px solid transparent',
  });

  return (
    <header style={headerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ color: ABB_RED, fontWeight: 800, fontSize: 16, letterSpacing: 1 }}>ABB</span>
        <span style={{ fontSize: 15, fontWeight: 600 }}>{projectName}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={onSave} style={{ ...secondaryButton, fontSize: 12 }}>
          💾 Save
        </button>
        <button onClick={onLoad} style={{ ...secondaryButton, fontSize: 12 }}>
          📂 Load
        </button>
        <button onClick={onTogglePurdue} style={toggleBtn(purdueZonesVisible)}>
          {purdueZonesVisible ? '🏗️ Purdue ON' : '🏗️ Purdue OFF'}
        </button>
        <button onClick={onToggleCableLabels} style={toggleBtn(showCableLabels)}>
          {showCableLabels ? '🏷️ Labels ON' : '🏷️ Labels OFF'}
        </button>
        <button onClick={onExportPdf} style={{ ...primaryButton, fontSize: 12 }}>
          📄 Export PDF
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 13 }}>{userName}</span>
        <button
          onClick={() => instance.logoutPopup()}
          style={{
            ...secondaryButton,
            fontSize: 12,
            background: 'transparent',
            color: '#ccc',
            border: '1px solid #555',
          }}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
