import type { OtComponentType, PurdueLevel } from '../types/diagram';

export interface OtComponentDef {
  type: OtComponentType;
  label: string;
  defaultPurdueLevel: PurdueLevel;
  color: string;
}

export const OT_COMPONENTS: OtComponentDef[] = [
  { type: 'plc',           label: 'PLC',           defaultPurdueLevel: 1,   color: '#2196F3' },
  { type: 'hmi',           label: 'HMI',           defaultPurdueLevel: 2,   color: '#4CAF50' },
  { type: 'scada-server',  label: 'SCADA Server',  defaultPurdueLevel: 2,   color: '#9C27B0' },
  { type: 'switch',        label: 'Switch',         defaultPurdueLevel: 2,   color: '#FF9800' },
  { type: 'router',        label: 'Router',         defaultPurdueLevel: 3,   color: '#F44336' },
  { type: 'firewall',      label: 'Firewall',       defaultPurdueLevel: 3.5, color: '#E91E63' },
  { type: 'field-device',  label: 'Field Device',   defaultPurdueLevel: 0,   color: '#795548' },
  { type: 'workstation',   label: 'Workstation',    defaultPurdueLevel: 3,   color: '#607D8B' },
];

export function getComponentDef(type: OtComponentType): OtComponentDef {
  return OT_COMPONENTS.find(c => c.type === type)!;
}
