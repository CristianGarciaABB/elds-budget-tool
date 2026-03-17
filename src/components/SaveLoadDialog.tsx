import React, { useState } from 'react';
import { modalOverlay, modalContent, inputStyle, primaryButton, secondaryButton, GRAY_BORDER } from '../constants/styles';
import type { SavedDiagram } from '../types/diagram';

interface SaveLoadDialogProps {
  mode: 'save' | 'load';
  currentName: string;
  diagrams: SavedDiagram[];
  onSave: (name: string) => void;
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onImport: () => void;
  onExport: () => void;
  onClose: () => void;
}

const SaveLoadDialog: React.FC<SaveLoadDialogProps> = ({
  mode,
  currentName,
  diagrams,
  onSave,
  onLoad,
  onDelete,
  onImport,
  onExport,
  onClose,
}) => {
  const [name, setName] = useState(currentName);

  return (
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ margin: '0 0 20px', fontSize: 18, color: '#222' }}>
          {mode === 'save' ? 'Save Diagram' : 'Load Diagram'}
        </h2>

        {mode === 'save' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>
              Diagram Name
            </label>
            <input
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Network Diagram"
              autoFocus
            />
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button onClick={() => onSave(name)} style={primaryButton} disabled={!name.trim()}>
                Save
              </button>
              <button onClick={onClose} style={secondaryButton}>Cancel</button>
            </div>
          </div>
        )}

        {mode === 'load' && (
          <>
            <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
              <button onClick={onImport} style={secondaryButton}>📁 Import JSON</button>
              <button onClick={onExport} style={secondaryButton}>💾 Export JSON</button>
            </div>

            {diagrams.length === 0 ? (
              <div style={{ padding: 24, textAlign: 'center', color: '#aaa', fontSize: 13 }}>
                No saved diagrams yet
              </div>
            ) : (
              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {diagrams.map((d) => (
                  <div
                    key={d.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderBottom: '1px solid ' + GRAY_BORDER,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{d.name}</div>
                      <div style={{ fontSize: 11, color: '#888' }}>
                        {new Date(d.savedAt).toLocaleString()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => onLoad(d.id)} style={{ ...primaryButton, padding: '4px 12px', fontSize: 12 }}>
                        Load
                      </button>
                      <button onClick={() => onDelete(d.id)} style={{ ...secondaryButton, padding: '4px 10px', fontSize: 12, color: '#c00' }}>
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: 12 }}>
              <button onClick={onClose} style={secondaryButton}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SaveLoadDialog;
