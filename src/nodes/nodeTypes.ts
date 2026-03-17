import type { NodeTypes } from '@xyflow/react';
import BaseOtNode from './BaseOtNode';
import SwitchNode from './SwitchNode';

// All OT component types use BaseOtNode except Switch,
// which has 12 connection ports (4 top, 4 bottom, 2 left, 2 right).
export const nodeTypes: NodeTypes = {
  'plc': BaseOtNode,
  'hmi': BaseOtNode,
  'scada-server': BaseOtNode,
  'switch': SwitchNode,
  'router': BaseOtNode,
  'firewall': BaseOtNode,
  'field-device': BaseOtNode,
  'workstation': BaseOtNode,
};
