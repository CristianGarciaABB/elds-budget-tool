import React from 'react';
import { CABLE_TYPES, type CableTypeDef } from '../constants/cableTypes';
import { GRAY_BORDER } from '../constants/styles';

interface CableTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const CableTypeSelector: React.FC<CableTypeSelectorProps> = ({ selectedType, onSelect }) => {
  return (
    <div style={{ padding: '0 0 8px' }}>
      <div
        style={{
          padding: '12px 16px 8px',
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#888',
        }}
      >
        Cable Type
      </div>
      <div style={{ maxHeight: 200, overflowY: 'auto' }}>
        {CABLE_TYPES.map((cable) => (
          <CableTypeItem
            key={cable.type}
            cable={cable}
            isSelected={selectedType === cable.type}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

const CableTypeItem: React.FC<{
  cable: CableTypeDef;
  isSelected: boolean;
  onSelect: (type: string) => void;
}> = ({ cable, isSelected, onSelect }) => (
  <div
    onClick={() => onSelect(cable.type)}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '5px 16px',
      cursor: 'pointer',
      background: isSelected ? '#e8f0fe' : 'transparent',
      borderLeft: isSelected ? '3px solid #1a73e8' : '3px solid transparent',
      borderBottom: '1px solid ' + GRAY_BORDER,
      transition: 'background 0.1s',
    }}
    onMouseEnter={(e) => {
      if (!isSelected) e.currentTarget.style.background = '#f5f5f5';
    }}
    onMouseLeave={(e) => {
      if (!isSelected) e.currentTarget.style.background = 'transparent';
    }}
  >
    <svg width="32" height="12" viewBox="0 0 32 12">
      <line
        x1="0"
        y1="6"
        x2="32"
        y2="6"
        stroke={cable.color}
        strokeWidth={cable.strokeWidth}
        strokeDasharray={cable.dashArray || 'none'}
      />
    </svg>
    <span style={{ fontSize: 11, color: '#333', whiteSpace: 'nowrap' }}>{cable.label}</span>
  </div>
);

export default CableTypeSelector;
