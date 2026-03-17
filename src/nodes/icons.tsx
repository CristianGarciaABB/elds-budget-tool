import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
}

export const PlcIcon: React.FC<IconProps> = ({ size = 48, color = '#2196F3' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="8" y="6" width="32" height="36" rx="3" fill={color} opacity={0.15} stroke={color} strokeWidth="2" />
    <text x="24" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill={color}>PLC</text>
    {/* I/O terminals */}
    <rect x="12" y="6" width="4" height="3" fill={color} />
    <rect x="20" y="6" width="4" height="3" fill={color} />
    <rect x="28" y="6" width="4" height="3" fill={color} />
    <rect x="12" y="39" width="4" height="3" fill={color} />
    <rect x="20" y="39" width="4" height="3" fill={color} />
    <rect x="28" y="39" width="4" height="3" fill={color} />
    {/* Status LEDs */}
    <circle cx="14" cy="16" r="2" fill="#4CAF50" />
    <circle cx="20" cy="16" r="2" fill="#FFC107" />
  </svg>
);

export const HmiIcon: React.FC<IconProps> = ({ size = 48, color = '#4CAF50' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Monitor */}
    <rect x="6" y="6" width="36" height="26" rx="2" fill={color} opacity={0.15} stroke={color} strokeWidth="2" />
    {/* Screen */}
    <rect x="10" y="10" width="28" height="18" rx="1" fill={color} opacity={0.25} />
    {/* Stand */}
    <rect x="20" y="32" width="8" height="6" fill={color} opacity={0.4} />
    <rect x="16" y="38" width="16" height="3" rx="1" fill={color} opacity={0.4} />
    {/* Screen content */}
    <line x1="14" y1="16" x2="22" y2="16" stroke={color} strokeWidth="1.5" />
    <line x1="14" y1="20" x2="26" y2="20" stroke={color} strokeWidth="1.5" />
    <line x1="14" y1="24" x2="20" y2="24" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const ScadaIcon: React.FC<IconProps> = ({ size = 48, color = '#9C27B0' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Server rack */}
    <rect x="10" y="4" width="28" height="40" rx="3" fill={color} opacity={0.15} stroke={color} strokeWidth="2" />
    {/* Server units */}
    <rect x="14" y="8" width="20" height="8" rx="1" fill={color} opacity={0.2} stroke={color} strokeWidth="1" />
    <rect x="14" y="19" width="20" height="8" rx="1" fill={color} opacity={0.2} stroke={color} strokeWidth="1" />
    <rect x="14" y="30" width="20" height="8" rx="1" fill={color} opacity={0.2} stroke={color} strokeWidth="1" />
    {/* Drive indicators */}
    <circle cx="18" cy="12" r="1.5" fill="#4CAF50" />
    <circle cx="18" cy="23" r="1.5" fill="#4CAF50" />
    <circle cx="18" cy="34" r="1.5" fill="#FFC107" />
  </svg>
);

export const SwitchIcon: React.FC<IconProps> = ({ size = 48, color = '#FF9800' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="4" y="14" width="40" height="20" rx="3" fill={color} opacity={0.15} stroke={color} strokeWidth="2" />
    {/* Ports */}
    {[10, 16, 22, 28, 34].map((x) => (
      <React.Fragment key={x}>
        <rect x={x} y="20" width="4" height="6" rx="0.5" fill={color} opacity={0.4} stroke={color} strokeWidth="0.5" />
        <circle cx={x + 2} cy="29" r="1" fill="#4CAF50" />
      </React.Fragment>
    ))}
    {/* Label */}
    <text x="24" y="19" textAnchor="middle" fontSize="6" fontWeight="bold" fill={color}>SW</text>
  </svg>
);

export const RouterIcon: React.FC<IconProps> = ({ size = 48, color = '#F44336' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="6" y="16" width="36" height="20" rx="3" fill={color} opacity={0.15} stroke={color} strokeWidth="2" />
    {/* Antenna */}
    <line x1="16" y1="16" x2="12" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="16" x2="36" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="5" r="2" fill={color} />
    <circle cx="36" cy="5" r="2" fill={color} />
    {/* Arrows */}
    <path d="M16 26 L22 22 L22 24 L32 24 L32 28 L22 28 L22 30 Z" fill={color} opacity={0.4} />
  </svg>
);

export const FirewallIcon: React.FC<IconProps> = ({ size = 48, color = '#E91E63' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Shield */}
    <path d="M24 4 L40 12 L40 24 C40 34 32 42 24 44 C16 42 8 34 8 24 L8 12 Z"
      fill={color} opacity={0.15} stroke={color} strokeWidth="2" />
    {/* Brick pattern */}
    <line x1="12" y1="18" x2="36" y2="18" stroke={color} strokeWidth="1" opacity={0.4} />
    <line x1="12" y1="24" x2="36" y2="24" stroke={color} strokeWidth="1" opacity={0.4} />
    <line x1="12" y1="30" x2="36" y2="30" stroke={color} strokeWidth="1" opacity={0.4} />
    <line x1="24" y1="12" x2="24" y2="18" stroke={color} strokeWidth="1" opacity={0.4} />
    <line x1="18" y1="18" x2="18" y2="24" stroke={color} strokeWidth="1" opacity={0.4} />
    <line x1="30" y1="18" x2="30" y2="24" stroke={color} strokeWidth="1" opacity={0.4} />
    <line x1="24" y1="24" x2="24" y2="30" stroke={color} strokeWidth="1" opacity={0.4} />
  </svg>
);

export const FieldDeviceIcon: React.FC<IconProps> = ({ size = 48, color = '#795548' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Sensor body */}
    <circle cx="24" cy="20" r="14" fill={color} opacity={0.15} stroke={color} strokeWidth="2" />
    <circle cx="24" cy="20" r="8" fill={color} opacity={0.1} stroke={color} strokeWidth="1" />
    {/* Connector pipe */}
    <rect x="21" y="34" width="6" height="10" fill={color} opacity={0.3} stroke={color} strokeWidth="1" />
    {/* Signal */}
    <path d="M20 16 L24 12 L28 16" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M18 20 L24 14 L30 20" stroke={color} strokeWidth="1" fill="none" opacity={0.5} strokeLinecap="round" />
  </svg>
);

export const WorkstationIcon: React.FC<IconProps> = ({ size = 48, color = '#607D8B' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Monitor */}
    <rect x="8" y="4" width="32" height="22" rx="2" fill={color} opacity={0.15} stroke={color} strokeWidth="2" />
    <rect x="12" y="8" width="24" height="14" rx="1" fill={color} opacity={0.2} />
    {/* Stand */}
    <rect x="21" y="26" width="6" height="4" fill={color} opacity={0.3} />
    <rect x="16" y="30" width="16" height="2" rx="1" fill={color} opacity={0.3} />
    {/* Keyboard */}
    <rect x="10" y="35" width="28" height="8" rx="2" fill={color} opacity={0.15} stroke={color} strokeWidth="1.5" />
    <line x1="14" y1="38" x2="34" y2="38" stroke={color} strokeWidth="1" opacity={0.3} />
    <line x1="14" y1="40" x2="34" y2="40" stroke={color} strokeWidth="1" opacity={0.3} />
  </svg>
);

export const iconMap: Record<string, React.FC<IconProps>> = {
  'plc': PlcIcon,
  'hmi': HmiIcon,
  'scada-server': ScadaIcon,
  'switch': SwitchIcon,
  'router': RouterIcon,
  'firewall': FirewallIcon,
  'field-device': FieldDeviceIcon,
  'workstation': WorkstationIcon,
};
