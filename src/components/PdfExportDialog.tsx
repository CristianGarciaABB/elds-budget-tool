import React, { useState } from 'react';
import { modalOverlay, modalContent, inputStyle, primaryButton, secondaryButton, GRAY_BORDER } from '../constants/styles';
import type { ProjectMetadata } from '../types/diagram';

interface PdfExportDialogProps {
  metadata: ProjectMetadata;
  onExport: (metadata: ProjectMetadata) => void;
  onClose: () => void;
}

const PdfExportDialog: React.FC<PdfExportDialogProps> = ({ metadata, onExport, onClose }) => {
  const [form, setForm] = useState<ProjectMetadata>({
    ...metadata,
    modifiedDate: new Date().toISOString().split('T')[0],
  });

  const update = (field: keyof ProjectMetadata, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const fieldStyle = { marginBottom: 12 };
  const labelStyle = { fontSize: 12, fontWeight: 600 as const, color: '#555', display: 'block' as const, marginBottom: 4 };

  return (
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ margin: '0 0 20px', fontSize: 18, color: '#222' }}>
          Export PDF
        </h2>
        <p style={{ fontSize: 12, color: '#888', margin: '0 0 16px' }}>
          Fill in the title block fields for the engineering drawing.
        </p>

        <div style={fieldStyle}>
          <label style={labelStyle}>Project Name</label>
          <input style={inputStyle} value={form.projectName} onChange={(e) => update('projectName', e.target.value)} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Diagram Title</label>
          <input style={inputStyle} value={form.diagramTitle} onChange={(e) => update('diagramTitle', e.target.value)} />
        </div>

        <div style={{ display: 'flex', gap: 12, ...fieldStyle }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Drawing Number</label>
            <input style={inputStyle} value={form.drawingNumber} onChange={(e) => update('drawingNumber', e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Revision</label>
            <input style={inputStyle} value={form.revisionNumber} onChange={(e) => update('revisionNumber', e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, ...fieldStyle }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Author</label>
            <input style={inputStyle} value={form.author} onChange={(e) => update('author', e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Date</label>
            <input style={inputStyle} type="date" value={form.modifiedDate} onChange={(e) => update('modifiedDate', e.target.value)} />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Approver</label>
          <input style={inputStyle} value={form.approver} onChange={(e) => update('approver', e.target.value)} placeholder="Name of approver" />
        </div>

        <div style={{ borderTop: '1px solid ' + GRAY_BORDER, paddingTop: 16, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={secondaryButton}>Cancel</button>
          <button onClick={() => onExport(form)} style={primaryButton}>
            📄 Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfExportDialog;
