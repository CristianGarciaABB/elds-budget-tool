export interface CableTypeDef {
  type: string;
  label: string;
  color: string;
  strokeWidth: number;
  dashArray?: string;
  animated: boolean;
}

export const CABLE_TYPES: CableTypeDef[] = [
  { type: 'cat6',          label: 'Cat6 Ethernet',     color: '#000000', strokeWidth: 2,   animated: false },
  { type: 'cat6a',         label: 'Cat6a Ethernet',    color: '#333333', strokeWidth: 2.5, animated: false },
  { type: 'fiber-mm',      label: 'Fiber MM (OM)',     color: '#FF8C00', strokeWidth: 2.5, animated: false },
  { type: 'fiber-sm',      label: 'Fiber SM (OS)',     color: '#FFD700', strokeWidth: 2.5, animated: false },
  { type: 'rs232',         label: 'RS-232 Serial',     color: '#000000', strokeWidth: 1.5, dashArray: '8 4',   animated: false },
  { type: 'rs485',         label: 'RS-485 Serial',     color: '#000000', strokeWidth: 1.5, dashArray: '4 4',   animated: false },
  { type: 'profinet',      label: 'PROFINET',          color: '#00A651', strokeWidth: 2.5, animated: false },
  { type: 'profibus',      label: 'PROFIBUS DP',       color: '#800080', strokeWidth: 2,   dashArray: '10 3',  animated: false },
  { type: 'modbus-tcp',    label: 'Modbus TCP',        color: '#0066CC', strokeWidth: 2,   animated: false },
  { type: 'modbus-rtu',    label: 'Modbus RTU',        color: '#0066CC', strokeWidth: 1.5, dashArray: '6 4',   animated: false },
  { type: 'ethernet-ip',   label: 'EtherNet/IP',       color: '#CC0000', strokeWidth: 2.5, animated: false },
  { type: 'opc-ua',        label: 'OPC UA',            color: '#4169E1', strokeWidth: 2,   dashArray: '12 4 4 4', animated: true },
  { type: 'wireless',      label: 'Wireless',          color: '#888888', strokeWidth: 1.5, dashArray: '3 3',   animated: true },
  { type: 'redundant',     label: 'Redundant Link',    color: '#FF000F', strokeWidth: 3,   animated: false },
];

export function getCableTypeDef(type: string): CableTypeDef {
  return CABLE_TYPES.find(c => c.type === type) || CABLE_TYPES[0];
}

export function getEdgeStyle(cableType: string) {
  const def = getCableTypeDef(cableType);
  return {
    stroke: def.color,
    strokeWidth: def.strokeWidth,
    ...(def.dashArray ? { strokeDasharray: def.dashArray } : {}),
  };
}
