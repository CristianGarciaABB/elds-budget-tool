import React from 'react';
import {
  getSmoothStepPath,
  EdgeLabelRenderer,
  type EdgeProps,
} from '@xyflow/react';
import { getCableTypeDef } from '../constants/cableTypes';

export interface CableEdgeData {
  cableType?: string;
  showLabel?: boolean;
  [key: string]: unknown;
}

const CableEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}) => {
  const edgeData = data as CableEdgeData;
  const cableType = edgeData?.cableType || 'cat6';
  const showLabel = edgeData?.showLabel !== false; // default true
  const def = getCableTypeDef(cableType);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 16,
  });

  return (
    <>
      {/* Invisible wider path for easier selection */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={12}
        className="react-flow__edge-interaction"
      />
      {/* Visible edge */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke={selected ? '#1a73e8' : def.color}
        strokeWidth={def.strokeWidth}
        strokeDasharray={def.dashArray || 'none'}
        style={{
          filter: selected ? 'drop-shadow(0 0 3px rgba(26,115,232,0.5))' : 'none',
          transition: 'stroke 0.15s',
        }}
      />
      {/* Label — only shown when enabled */}
      {showLabel && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              fontSize: 9,
              fontFamily: 'system-ui, sans-serif',
              background: 'rgba(255,255,255,0.85)',
              padding: '1px 5px',
              borderRadius: 3,
              color: def.color,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              border: selected ? '1px solid #1a73e8' : '1px solid transparent',
            }}
            className="nodrag nopan"
          >
            {def.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default React.memo(CableEdge);
