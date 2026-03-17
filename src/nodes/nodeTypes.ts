import type { NodeTypes } from '@xyflow/react';
import BaseOtNode from './BaseOtNode';

// All OT component types use the same BaseOtNode renderer.
// The icon and styling are determined by the componentType in node data.
export const nodeTypes: NodeTypes = {
  'plc': BaseOtNode,
  'hmi': BaseOtNode,
  'scada-server': BaseOtNode,
  'switch': BaseOtNode,
  'router': BaseOtNode,
  'firewall': BaseOtNode,
  'field-device': BaseOtNode,
  'workstation': BaseOtNode,
};
