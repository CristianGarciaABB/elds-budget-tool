import React from 'react';
import { rightPanelStyle, inputStyle, GRAY_BORDER } from '../constants/styles';
import type { OtNode, OtNodeData, PurdueLevel } from '../types/diagram';
import { getComponentDef } from '../constants/otComponents';
import { CABLE_TYPES, getCableTypeDef } from '../constants/cableTypes';
import type { CableEdgeData } from '../nodes/CableEdge';
import { iconMap } from '../nodes/icons';
import type { Edge } from '@xyflow/react';

interface PropertiesPanelProps {
  selectedNode: OtNode | null;
  selectedEdge: Edge | null;
  onUpdateNode: (nodeId: string, data: Partial<OtNodeData>) => void;
  onUpdateEdge: (edgeId: string, cableType: string) => void;
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

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedNode,
  selectedEdge,
  onUpdateNode,
  onUpdateEdge,
}) => {
  // Edge properties
  if (selectedEdge) {
    const edgeData = selectedEdge.data as CableEdgeData | undefined;
    const currentType = edgeData?.cableType || 'cat6';
    const def = getCableTypeDef(currentType);

    return (
      <div style={rightPanelStyle}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#888', marginBottom: 16 }}>
          Connection Properties
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid ' + GRAY_BORDER }}>
          <svg width="40" height="16" viewBox="0 0 40 16">
            <line x1="0" y1="8" x2="40" y2="8" stroke={def.color} strokeWidth={def.strokeWidth} strokeDasharray={def.dashArray || 'none'} />
          </svg>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{def.label}</div>
            <div style={{ fontSize: 11, color: '#888' }}>Edge: {selectedEdge.id}</div>
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>
            Cable Type
          </label>
          <select
            style={inputStyle}
            value={currentType}
            onChange={(e) => onUpdateEdge(selectedEdge.id, e.target.value)}
          >
            {CABLE_TYPES.map((c) => (
              <option key={c.type} value={c.type}>{c.label}</option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 16, padding: 12, background: '#f9f9f9', borderRadius: 6, fontSize: 11, color: '#666' }}>
          <div><strong>Color:</strong> {def.color}</div>
          <div><strong>Style:</strong> {def.dashArray ? 'Dashed' : 'Solid'}</div>
          <div><strong>Width:</strong> {def.strokeWidth}px</div>
        </div>
      </div>
    );
  }

  // Node properties
  if (!selectedNode) {
    return (
      <div style={{ ...rightPanelStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 13 }}>
        Select a component or connection to edit its properties
      </div>
    );
  }

  const nodeData = selectedNode.data as unknown as OtNodeData;
  const compDef = getComponentDef(nodeData.componentType);
  const Icon = iconMap[nodeData.componentType];

  const update = (field: string, value: string | number) => {
    onUpdateNode(selectedNode.id, { [field]: value });
  };

  return (
    <div style={rightPanelStyle}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#888', marginBottom: 16 }}>
        Properties
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid ' + GRAY_BORDER }}>
        {Icon && <Icon size={36} color={compDef.color} />}
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{compDef.label}</div>
          <div style={{ fontSize: 11, color: '#888' }}>{nodeData.componentType}</div>
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>Label</label>
        <input style={inputStyle} value={nodeData.label} onChange={(e) => update('label', e.target.value)} />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>IP Address</label>
        <input style={inputStyle} value={nodeData.ipAddress || ''} onChange={(e) => update('ipAddress', e.target.value)} placeholder="e.g. 192.168.1.100" />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>Description</label>
        <textarea style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }} value={nodeData.description || ''} onChange={(e) => update('description', e.target.value)} placeholder="Notes about this component..." />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>Purdue Level</label>
        <select style={inputStyle} value={nodeData.purdueLevel ?? ''} onChange={(e) => update('purdueLevel', parseFloat(e.target.value))}>
          {PURDUE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PropertiesPanel;
