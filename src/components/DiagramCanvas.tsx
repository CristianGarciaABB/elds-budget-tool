import React, { useCallback, useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
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
  type EdgeTypes,
  type ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { nodeTypes } from '../nodes/nodeTypes';
import CableEdge from '../nodes/CableEdge';
import { getComponentDef } from '../constants/otComponents';
import { getEdgeStyle } from '../constants/cableTypes';
import type { OtNode, OtNodeData } from '../types/diagram';
import type { CableEdgeData } from '../nodes/CableEdge';
import PurdueZones from './PurdueZones';
import CableLegend from './CableLegend';

interface DiagramCanvasProps {
  purdueZonesVisible: boolean;
  selectedCableType: string;
  showCableLabels: boolean;
  onSelectionChange: (nodeId: string | null, edgeId: string | null) => void;
}

export interface DiagramCanvasRef {
  getNodes: () => OtNode[];
  getEdges: () => Edge[];
  setNodes: (nodes: OtNode[]) => void;
  setEdges: (edges: Edge[]) => void;
}

let nodeIdCounter = 0;

const edgeTypes: EdgeTypes = {
  cable: CableEdge,
};

const DiagramCanvas = forwardRef<DiagramCanvasRef, DiagramCanvasProps>(
  ({ purdueZonesVisible, selectedCableType, showCableLabels, onSelectionChange }, ref) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<OtNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

    useImperativeHandle(ref, () => ({
      getNodes: () => nodes,
      getEdges: () => edges,
      setNodes: (n: OtNode[]) => setNodes(n),
      setEdges: (e: Edge[]) => setEdges(e),
    }));

    // Inject showLabel into all edge data when toggle changes
    const edgesWithLabels = useMemo(
      () =>
        edges.map((e) => ({
          ...e,
          data: { ...(e.data || {}), showLabel: showCableLabels },
        })),
      [edges, showCableLabels]
    );

    // Collect used cable types for legend
    const usedCableTypes = useMemo(() => {
      const types = new Set<string>();
      edges.forEach((e) => {
        const d = e.data as CableEdgeData | undefined;
        if (d?.cableType) types.add(d.cableType);
      });
      return Array.from(types);
    }, [edges]);

    const onConnect = useCallback(
      (connection: Connection) => {
        const style = getEdgeStyle(selectedCableType);
        setEdges((eds) =>
          addEdge(
            {
              ...connection,
              type: 'cable',
              data: { cableType: selectedCableType, showLabel: showCableLabels },
              animated: false,
              style,
            },
            eds
          )
        );
      },
      [setEdges, selectedCableType, showCableLabels]
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
      ({ nodes: selectedNodes, edges: selectedEdges }: { nodes: OtNode[]; edges: Edge[] }) => {
        const nodeId = selectedNodes.length > 0 ? selectedNodes[0].id : null;
        const edgeId = selectedEdges.length > 0 ? selectedEdges[0].id : null;
        onSelectionChange(nodeId, edgeId);
      },
      [onSelectionChange]
    );

    const defaultEdgeOptions = useMemo(
      () => ({
        type: 'cable' as const,
        data: { cableType: selectedCableType, showLabel: showCableLabels },
        animated: false,
        style: getEdgeStyle(selectedCableType),
      }),
      [selectedCableType, showCableLabels]
    );

    return (
      <div style={{ flex: 1, height: '100%', position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edgesWithLabels}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onInit={(instance) => {
            reactFlowInstance.current = instance as unknown as ReactFlowInstance;
          }}
          onSelectionChange={onSelectionChangeHandler}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          deleteKeyCode="Delete"
          multiSelectionKeyCode="Shift"
          snapToGrid
          snapGrid={[20, 20]}
          defaultEdgeOptions={defaultEdgeOptions}
        >
          {purdueZonesVisible && <PurdueZones />}
          <Background gap={20} size={1} color="#e0e0e0" />
          <Controls />
          <MiniMap nodeStrokeWidth={3} style={{ background: '#f8f8f8' }} />
        </ReactFlow>
        <CableLegend usedCableTypes={usedCableTypes} />
      </div>
    );
  }
);

DiagramCanvas.displayName = 'DiagramCanvas';

export default DiagramCanvas;
