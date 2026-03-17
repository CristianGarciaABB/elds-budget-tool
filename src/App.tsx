import React, { useState, useCallback, useRef } from 'react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import { ReactFlowProvider } from '@xyflow/react';

import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import ComponentPalette from './components/ComponentPalette';
import DiagramCanvas, { type DiagramCanvasRef } from './components/DiagramCanvas';
import PropertiesPanel from './components/PropertiesPanel';
import SaveLoadDialog from './components/SaveLoadDialog';
import PdfExportDialog from './components/PdfExportDialog';

import { useLocalStorage } from './hooks/useLocalStorage';
import { usePdfExport } from './hooks/usePdfExport';
import {
  createDefaultMetadata,
  type ProjectMetadata,
  type DiagramState,
  type OtNodeData,
  type OtNode,
} from './types/diagram';

function DiagramEditor() {
  const { accounts } = useMsal();
  const canvasRef = useRef<DiagramCanvasRef>(null);

  const [metadata, setMetadata] = useState<ProjectMetadata>(() =>
    createDefaultMetadata(accounts[0]?.name || 'Unknown')
  );
  const [purdueZonesVisible, setPurdueZonesVisible] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<'save' | 'load' | 'pdf' | null>(null);

  const { listDiagrams, saveDiagram, loadDiagram, deleteDiagram, exportToJson, importFromJson } =
    useLocalStorage();
  const { exportPdf } = usePdfExport();

  const getState = useCallback((): DiagramState => {
    const canvas = canvasRef.current;
    return {
      nodes: canvas?.getNodes() || [],
      edges: canvas?.getEdges() || [],
      metadata,
      purdueZonesVisible,
    };
  }, [metadata, purdueZonesVisible]);

  const loadState = useCallback((state: DiagramState) => {
    canvasRef.current?.setNodes(state.nodes);
    canvasRef.current?.setEdges(state.edges);
    setMetadata(state.metadata);
    setPurdueZonesVisible(state.purdueZonesVisible);
  }, []);

  const handleSave = useCallback(
    (name: string) => {
      const state = getState();
      state.metadata.projectName = name;
      state.metadata.modifiedDate = new Date().toISOString().split('T')[0];
      saveDiagram(name, state);
      setMetadata((m) => ({
        ...m,
        projectName: name,
        modifiedDate: state.metadata.modifiedDate,
      }));
      setDialog(null);
    },
    [getState, saveDiagram]
  );

  const handleLoad = useCallback(
    (id: string) => {
      const state = loadDiagram(id);
      if (state) {
        loadState(state);
        setDialog(null);
      }
    },
    [loadDiagram, loadState]
  );

  const handleImport = useCallback(async () => {
    try {
      const state = await importFromJson();
      loadState(state);
      setDialog(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Import failed');
    }
  }, [importFromJson, loadState]);

  const handleExportJson = useCallback(() => {
    const state = getState();
    exportToJson(state, metadata.projectName || 'diagram');
  }, [getState, exportToJson, metadata.projectName]);

  const handleExportPdf = useCallback(
    async (meta: ProjectMetadata) => {
      try {
        setDialog(null);
        await new Promise((r) => setTimeout(r, 200));
        await exportPdf(meta);
        setMetadata(meta);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'PDF export failed');
      }
    },
    [exportPdf]
  );

  const selectedNode = selectedNodeId
    ? canvasRef.current?.getNodes().find((n) => n.id === selectedNodeId) || null
    : null;

  const handleUpdateNode = useCallback((nodeId: string, data: Partial<OtNodeData>) => {
    canvasRef.current?.setNodes(
      (canvasRef.current?.getNodes() || []).map((n: OtNode) =>
        n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n
      )
    );
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <Header
        projectName={metadata.projectName}
        purdueZonesVisible={purdueZonesVisible}
        onTogglePurdue={() => setPurdueZonesVisible((v) => !v)}
        onSave={() => setDialog('save')}
        onLoad={() => setDialog('load')}
        onExportPdf={() => setDialog('pdf')}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <ComponentPalette />

        <ReactFlowProvider>
          <DiagramCanvas
            ref={canvasRef}
            purdueZonesVisible={purdueZonesVisible}
            onSelectionChange={setSelectedNodeId}
          />
        </ReactFlowProvider>

        <PropertiesPanel
          selectedNode={selectedNode as OtNode | null}
          onUpdateNode={handleUpdateNode}
        />
      </div>

      {dialog === 'save' && (
        <SaveLoadDialog
          mode="save"
          currentName={metadata.projectName}
          diagrams={listDiagrams()}
          onSave={handleSave}
          onLoad={handleLoad}
          onDelete={deleteDiagram}
          onImport={handleImport}
          onExport={handleExportJson}
          onClose={() => setDialog(null)}
        />
      )}
      {dialog === 'load' && (
        <SaveLoadDialog
          mode="load"
          currentName={metadata.projectName}
          diagrams={listDiagrams()}
          onSave={handleSave}
          onLoad={handleLoad}
          onDelete={deleteDiagram}
          onImport={handleImport}
          onExport={handleExportJson}
          onClose={() => setDialog(null)}
        />
      )}
      {dialog === 'pdf' && (
        <PdfExportDialog
          metadata={metadata}
          onExport={handleExportPdf}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <>
      <UnauthenticatedTemplate>
        <LoginScreen />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <DiagramEditor />
      </AuthenticatedTemplate>
    </>
  );
}
