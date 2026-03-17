import React from 'react';
import { sidebarStyle, GRAY_BORDER } from '../constants/styles';
import { OT_COMPONENTS } from '../constants/otComponents';
import { iconMap } from '../nodes/icons';
import CableTypeSelector from './CableTypeSelector';

interface ComponentPaletteProps {
  selectedCableType: string;
  onCableTypeChange: (type: string) => void;
}

const ComponentPalette: React.FC<ComponentPaletteProps> = ({
  selectedCableType,
  onCableTypeChange,
}) => {
  const onDragStart = (event: React.DragEvent, componentType: string) => {
    event.dataTransfer.setData('application/ot-component', componentType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={sidebarStyle}>
      <div
        style={{
          padding: '0 16px 12px',
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#888',
        }}
      >
        Components
      </div>
      {OT_COMPONENTS.map((comp) => {
        const Icon = iconMap[comp.type];
        return (
          <div
            key={comp.type}
            draggable
            onDragStart={(e) => onDragStart(e, comp.type)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 16px',
              cursor: 'grab',
              borderBottom: '1px solid ' + GRAY_BORDER,
              transition: 'background 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f0f0')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {Icon && <Icon size={32} color={comp.color} />}
            <span style={{ fontSize: 13, fontWeight: 500, color: '#333' }}>{comp.label}</span>
          </div>
        );
      })}

      <div style={{ borderTop: '2px solid ' + GRAY_BORDER, marginTop: 8 }}>
        <CableTypeSelector selectedType={selectedCableType} onSelect={onCableTypeChange} />
      </div>

      <div
        style={{
          padding: '12px 16px',
          fontSize: 11,
          color: '#aaa',
          textAlign: 'center',
        }}
      >
        Drag components onto canvas.
        <br />
        Select cable type before connecting.
      </div>
    </div>
  );
};

export default ComponentPalette;
