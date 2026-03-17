import React from 'react';
import { useViewport } from '@xyflow/react';
import { PURDUE_LEVELS, ZONE_WIDTH } from '../constants/purdueModel';

const PurdueZones: React.FC = () => {
  const { x, y, zoom } = useViewport();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {PURDUE_LEVELS.map((level) => {
        const top = level.yStart * zoom + y;
        const height = level.height * zoom;
        const left = -ZONE_WIDTH / 2 * zoom + x;
        const width = ZONE_WIDTH * zoom;

        return (
          <div
            key={level.level}
            style={{
              position: 'absolute',
              top,
              left,
              width,
              height,
              background: level.color,
              borderTop: '1px dashed rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'flex-start',
              paddingTop: 8,
              paddingLeft: 12,
            }}
          >
            <span
              style={{
                fontSize: Math.max(10, 12 * zoom),
                fontWeight: 600,
                color: 'rgba(0,0,0,0.35)',
                fontFamily: 'system-ui, sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              {level.label} — {level.description}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default PurdueZones;
