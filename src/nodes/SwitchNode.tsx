import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { OtNodeData } from '../types/diagram';
import { getComponentDef } from '../constants/otComponents';
import { SwitchIcon } from './icons';

const handleStyle = (color: string) => ({
  background: color,
  width: 7,
  height: 7,
  border: '2px solid #fff',
});

const SwitchNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as OtNodeData;
  const def = getComponentDef(nodeData.componentType);

  return (
    <div
      style={{
        background: '#ffffff',
        border: `2px solid ${selected ? def.color : '#ccc'}`,
        borderRadius: 8,
        padding: '8px 16px',
        minWidth: 140,
        textAlign: 'center',
        boxShadow: selected
          ? `0 0 0 2px ${def.color}40`
          : '0 1px 4px rgba(0,0,0,0.1)',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        fontFamily: 'system-ui, sans-serif',
        cursor: 'grab',
      }}
    >
      {/* Top handles — 4 ports */}
      <Handle type="target" position={Position.Top} id="t1" style={{ ...handleStyle(def.color), left: '15%' }} />
      <Handle type="target" position={Position.Top} id="t2" style={{ ...handleStyle(def.color), left: '38%' }} />
      <Handle type="target" position={Position.Top} id="t3" style={{ ...handleStyle(def.color), left: '62%' }} />
      <Handle type="target" position={Position.Top} id="t4" style={{ ...handleStyle(def.color), left: '85%' }} />

      {/* Left handles — 2 ports */}
      <Handle type="target" position={Position.Left} id="l1" style={{ ...handleStyle(def.color), top: '35%' }} />
      <Handle type="source" position={Position.Left} id="l2" style={{ ...handleStyle(def.color), top: '65%' }} />

      {/* Right handles — 2 ports */}
      <Handle type="source" position={Position.Right} id="r1" style={{ ...handleStyle(def.color), top: '35%' }} />
      <Handle type="target" position={Position.Right} id="r2" style={{ ...handleStyle(def.color), top: '65%' }} />

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <SwitchIcon size={40} color={def.color} />
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>
        {nodeData.label}
      </div>
      {nodeData.ipAddress && (
        <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>
          {nodeData.ipAddress}
        </div>
      )}

      {/* Bottom handles — 4 ports */}
      <Handle type="source" position={Position.Bottom} id="b1" style={{ ...handleStyle(def.color), left: '15%' }} />
      <Handle type="source" position={Position.Bottom} id="b2" style={{ ...handleStyle(def.color), left: '38%' }} />
      <Handle type="source" position={Position.Bottom} id="b3" style={{ ...handleStyle(def.color), left: '62%' }} />
      <Handle type="source" position={Position.Bottom} id="b4" style={{ ...handleStyle(def.color), left: '85%' }} />
    </div>
  );
};

export default React.memo(SwitchNode);
