import React from 'react';
import { rightPanelStyle, inputStyle, GRAY_BORDER } from '../constants/styles';
import type { OtNode, OtNodeData, PurdueLevel } from '../types/diagram';
import { getComponentDef } from '../constants/otComponents';
import { iconMap } from '../nodes/icons';

interface PropertiesPanelProps {
  selectedNode: OtNode | null;
  onUpdateNode: (nodeId: string, data: Partial<OtNodeData>) => void;
}

const PURDUE_OPTIONS: { value: PurdueLevel; label: string }[] = [
  { value: 0, label: 'Level 0 — Physical Process' },
  { value: 1, label: 'Level 1 — Basic Control' },
  { value: 2, label: 'Level 2 — Area Supervisory' },
  { value: 3, label: 'Level 3 — Site Operations' },
  { value: 3.5, label: 'Level 3.5 — DMZ' },
  { value: 4, label: 'Level 4 — Enterprise IT' },
  { value: 5, label: 'Level 5 — Internet/Cloud' },
];

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedNode, onUpdateNode }) => {
  if (!selectedNode) {
    return (
      <div style={{ ...rightPanelStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 13 }}>
        Select a component to edit its properties
      </div>
    );
  }

  const nodeData = selectedNode.data as unknown as OtNodeData;
  const def = getComponentDef(nodeData.componentType);
  const Icon = iconMap[nodeData.componentType];

  const update = (field: string, value: string | number) => {
    onUpdateNode(selectedNode.id, { [field]: value });
  };

  return (
    <div style={rightPanelStyle}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#888',
          marginBottom: 16,
        }}
      >
        Properties
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid ' + GRAY_BORDER }}>
        {Icon && <Icon size={36} color={def.color} />}
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{def.label}</div>
          <div style={{ fontSize: 11, color: '#888' }}>{nodeData.componentType}</div>
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>
          Label
        </label>
        <input
          style={inputStyle}
          value={nodeData.label}
          onChange={(e) => update('label', e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>
          IP Address
        </label>
        <input
          style={inputStyle}
          value={nodeData.ipAddress || ''}
          onChange={(e) => update('ipAddress', e.target.value)}
          placeholder="e.g. 192.168.1.100"
        />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>
          Description
        </label>
        <textarea
          style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }}
          value={nodeData.description || ''}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Notes about this component..."
        />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>
          Purdue Level
        </label>
        <select
          style={inputStyle}
          value={nodeData.purdueLevel ?? ''}
          onChange={(e) => update('purdueLevel', parseFloat(e.target.value))}
        >
          {PURDUE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PropertiesPanel;
