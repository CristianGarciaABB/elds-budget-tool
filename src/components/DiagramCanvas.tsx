import React, { useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { nodeTypes } from '../nodes/nodeTypes';
import { getComponentDef } from '../constants/otComponents';
import type { OtNode, OtNodeData } from '../types/diagram';
import PurdueZones from './PurdueZones';

interface DiagramCanvasProps {
  purdueZonesVisible: boolean;
  onSelectionChange: (nodeId: string | null) => void;
}

export interface DiagramCanvasRef {
  getNodes: () => OtNode[];
  getEdges: () => Edge[];
  setNodes: (nodes: OtNode[]) => void;
  setEdges: (edges: Edge[]) => void;
}

let nodeIdCounter = 0;

const DiagramCanvas = forwardRef<DiagramCanvasRef, DiagramCanvasProps>(
  ({ purdueZonesVisible, onSelectionChange }, ref) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<OtNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

    useImperativeHandle(ref, () => ({
      getNodes: () => nodes,
      getEdges: () => edges,
      setNodes: (n: OtNode[]) => setNodes(n),
      setEdges: (e: Edge[]) => setEdges(e),
    }));

    const onConnect = useCallback(
      (connection: Connection) => {
        setEdges((eds) => addEdge({ ...connection, animated: true, style: { stroke: '#888', strokeWidth: 2 } }, eds));
      },
      [setEdges]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
      (event: React.DragEvent) => {
        event.preventDefault();
        const componentType = event.dataTransfer.getData('application/ot-component');
        if (!componentType || !reactFlowInstance.current) return;

        const def = getComponentDef(componentType as OtNodeData['componentType']);
        const position = reactFlowInstance.current.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const newNode: OtNode = {
          id: `node_${++nodeIdCounter}_${Date.now()}`,
          type: componentType,
          position,
          data: {
            label: def.label,
            componentType: componentType as OtNodeData['componentType'],
            ipAddress: '',
            description: '',
            purdueLevel: def.defaultPurdueLevel,
          },
        };

        setNodes((nds) => [...nds, newNode]);
      },
      [setNodes]
    );

    const onSelectionChangeHandler = useCallback(
      ({ nodes: selectedNodes }: { nodes: OtNode[] }) => {
        onSelectionChange(selectedNodes.length > 0 ? selectedNodes[0].id : null);
      },
      [onSelectionChange]
    );

    return (
      <div style={{ flex: 1, height: '100%', position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onInit={(instance) => { reactFlowInstance.current = instance as unknown as ReactFlowInstance; }}
          onSelectionChange={onSelectionChangeHandler}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode="Delete"
          multiSelectionKeyCode="Shift"
          snapToGrid
          snapGrid={[20, 20]}
          defaultEdgeOptions={{ animated: true, style: { stroke: '#888', strokeWidth: 2 } }}
        >
          {purdueZonesVisible && <PurdueZones />}
          <Background gap={20} size={1} color="#e0e0e0" />
          <Controls />
          <MiniMap
            nodeStrokeWidth={3}
            style={{ background: '#f8f8f8' }}
          />
        </ReactFlow>
      </div>
    );
  }
);

DiagramCanvas.displayName = 'DiagramCanvas';

export default DiagramCanvas;
