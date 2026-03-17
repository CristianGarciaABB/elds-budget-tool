import React from 'react';
import { CABLE_TYPES } from '../constants/cableTypes';

interface CableLegendProps {
  usedCableTypes: string[];
}

const CableLegend: React.FC<CableLegendProps> = ({ usedCableTypes }) => {
  const usedCables = CABLE_TYPES.filter((c) => usedCableTypes.includes(c.type));

  if (usedCables.length === 0) return null;

  return (
    <div
      className="cable-legend"
      style={{
        position: 'absolute',
        bottom: 12,
        right: 12,
        background: 'rgba(255,255,255,0.95)',
        border: '1px solid #ccc',
        borderRadius: 6,
        padding: '10px 14px',
        fontSize: 11,
        fontFamily: 'system-ui, sans-serif',
        zIndex: 5,
        boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
        minWidth: 160,
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#888',
          marginBottom: 6,
          borderBottom: '1px solid #eee',
          paddingBottom: 4,
        }}
      >
        Cable Legend
      </div>
      {usedCables.map((cable) => (
        <div
          key={cable.type}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '3px 0',
          }}
        >
          <svg width="28" height="10" viewBox="0 0 28 10">
            <line
              x1="0"
              y1="5"
              x2="28"
              y2="5"
              stroke={cable.color}
              strokeWidth={Math.min(cable.strokeWidth, 2.5)}
              strokeDasharray={cable.dashArray || 'none'}
            />
          </svg>
          <span style={{ color: '#333' }}>{cable.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CableLegend;
