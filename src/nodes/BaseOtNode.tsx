import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { OtNodeData } from '../types/diagram';
import { getComponentDef } from '../constants/otComponents';
import { iconMap } from './icons';

const BaseOtNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as OtNodeData;
  const def = getComponentDef(nodeData.componentType);
  const IconComponent = iconMap[nodeData.componentType];

  return (
    <div
      style={{
        background: '#ffffff',
        border: `2px solid ${selected ? def.color : '#ccc'}`,
        borderRadius: 8,
        padding: '8px 12px',
        minWidth: 100,
        textAlign: 'center',
        boxShadow: selected
          ? `0 0 0 2px ${def.color}40`
          : '0 1px 4px rgba(0,0,0,0.1)',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        fontFamily: 'system-ui, sans-serif',
        cursor: 'grab',
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: def.color, width: 8, height: 8, border: '2px solid #fff' }}
      />
      {IconComponent && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
          <IconComponent size={40} color={def.color} />
        </div>
      )}
      <div style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>
        {nodeData.label}
      </div>
      {nodeData.ipAddress && (
        <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>
          {nodeData.ipAddress}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: def.color, width: 8, height: 8, border: '2px solid #fff' }}
      />
    </div>
  );
};

export default React.memo(BaseOtNode);
