import type { Node, Edge } from '@xyflow/react';

export type OtComponentType =
  | 'plc'
  | 'hmi'
  | 'scada-server'
  | 'switch'
  | 'router'
  | 'firewall'
  | 'field-device'
  | 'workstation';

export type PurdueLevel = 0 | 1 | 2 | 3 | 3.5 | 4 | 5;

export interface OtNodeData {
  label: string;
  componentType: OtComponentType;
  ipAddress?: string;
  description?: string;
  purdueLevel?: PurdueLevel;
  [key: string]: unknown;
}

export type OtNode = Node<OtNodeData>;

export interface ProjectMetadata {
  projectName: string;
  diagramTitle: string;
  author: string;
  revisionNumber: string;
  drawingNumber: string;
  approver: string;
  createdDate: string;
  modifiedDate: string;
}

export interface DiagramState {
  nodes: OtNode[];
  edges: Edge[];
  metadata: ProjectMetadata;
  purdueZonesVisible: boolean;
}

export interface SavedDiagram {
  id: string;
  name: string;
  state: DiagramState;
  savedAt: string;
}

export function createDefaultMetadata(authorName: string): ProjectMetadata {
  const now = new Date().toISOString().split('T')[0];
  return {
    projectName: 'New Project',
    diagramTitle: 'Network Architecture',
    author: authorName,
    revisionNumber: 'A',
    drawingNumber: 'DWG-001',
    approver: '',
    createdDate: now,
    modifiedDate: now,
  };
}
