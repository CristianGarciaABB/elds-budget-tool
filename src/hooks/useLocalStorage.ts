import { useCallback } from 'react';
import type { DiagramState, SavedDiagram } from '../types/diagram';

const STORAGE_KEY = 'ot-diagrams';

export function useLocalStorage() {
  const listDiagrams = useCallback((): SavedDiagram[] => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, []);

  const saveDiagram = useCallback((name: string, state: DiagramState): SavedDiagram => {
    const diagrams = listDiagrams();
    const existing = diagrams.findIndex((d) => d.name === name);
    const saved: SavedDiagram = {
      id: existing >= 0 ? diagrams[existing].id : `diagram_${Date.now()}`,
      name,
      state,
      savedAt: new Date().toISOString(),
    };

    if (existing >= 0) {
      diagrams[existing] = saved;
    } else {
      diagrams.push(saved);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(diagrams));
    return saved;
  }, [listDiagrams]);

  const loadDiagram = useCallback((id: string): DiagramState | null => {
    const diagrams = listDiagrams();
    const found = diagrams.find((d) => d.id === id);
    return found ? found.state : null;
  }, [listDiagrams]);

  const deleteDiagram = useCallback((id: string): void => {
    const diagrams = listDiagrams().filter((d) => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(diagrams));
  }, [listDiagrams]);

  const exportToJson = useCallback((state: DiagramState, filename: string) => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith('.json') ? filename : `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const importFromJson = useCallback((): Promise<DiagramState> => {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return reject(new Error('No file selected'));
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const state = JSON.parse(reader.result as string) as DiagramState;
            resolve(state);
          } catch {
            reject(new Error('Invalid JSON file'));
          }
        };
        reader.readAsText(file);
      };
      input.click();
    });
  }, []);

  return { listDiagrams, saveDiagram, loadDiagram, deleteDiagram, exportToJson, importFromJson };
}
