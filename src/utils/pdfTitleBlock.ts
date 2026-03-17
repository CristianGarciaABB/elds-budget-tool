import type { jsPDF } from 'jspdf';
import type { ProjectMetadata } from '../types/diagram';
import { CABLE_TYPES } from '../constants/cableTypes';

const BLOCK_HEIGHT = 35; // mm
const MARGIN = 10; // mm

export function drawTitleBlock(doc: jsPDF, metadata: ProjectMetadata) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const blockY = pageHeight - BLOCK_HEIGHT - MARGIN;
  const blockWidth = pageWidth - 2 * MARGIN;

  // Outer border
  doc.setLineWidth(0.8);
  doc.setDrawColor(0, 0, 0);
  doc.rect(MARGIN, blockY, blockWidth, BLOCK_HEIGHT);

  // Vertical dividers
  const col1 = MARGIN;
  const col2 = MARGIN + blockWidth * 0.15;
  const col3 = MARGIN + blockWidth * 0.45;
  const col4 = MARGIN + blockWidth * 0.65;
  const col5 = MARGIN + blockWidth * 0.80;
  const colEnd = MARGIN + blockWidth;

  doc.setLineWidth(0.3);
  doc.line(col2, blockY, col2, blockY + BLOCK_HEIGHT);
  doc.line(col3, blockY, col3, blockY + BLOCK_HEIGHT);
  doc.line(col4, blockY, col4, blockY + BLOCK_HEIGHT);
  doc.line(col5, blockY, col5, blockY + BLOCK_HEIGHT);

  // Horizontal divider (middle)
  const midY = blockY + BLOCK_HEIGHT / 2;
  doc.line(MARGIN, midY, MARGIN + blockWidth, midY);

  // ABB Logo area
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 0, 15);
  doc.text('ABB', col1 + (col2 - col1) / 2, blockY + BLOCK_HEIGHT / 2 + 2, { align: 'center' });

  // Helper to draw cell content
  const drawCell = (label: string, value: string, x: number, y: number, w: number) => {
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text(label, x + 2, y + 4);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    const maxWidth = w - 4;
    const text = doc.splitTextToSize(value, maxWidth);
    doc.text(text, x + 2, y + 10);
  };

  // Top row
  drawCell('PROJECT', metadata.projectName, col2, blockY, col3 - col2);
  drawCell('TITLE', metadata.diagramTitle, col3, blockY, col4 - col3);
  drawCell('DRAWING NO.', metadata.drawingNumber, col4, blockY, col5 - col4);
  drawCell('REVISION', metadata.revisionNumber, col5, blockY, colEnd - col5);

  // Bottom row
  drawCell('AUTHOR', metadata.author, col2, midY, col3 - col2);
  drawCell('DATE', metadata.modifiedDate, col3, midY, col4 - col3);
  drawCell('APPROVER', metadata.approver || '—', col4, midY, col5 - col4);
  drawCell('STATUS', 'DRAFT', col5, midY, colEnd - col5);

  return blockY - 5;
}

export function drawCableLegend(doc: jsPDF, usedCableTypes: string[]) {
  const usedCables = CABLE_TYPES.filter((c) => usedCableTypes.includes(c.type));
  if (usedCables.length === 0) return;

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const legendWidth = 55; // mm
  const rowHeight = 5; // mm
  const legendHeight = 8 + usedCables.length * rowHeight; // header + rows
  const legendX = pageWidth - MARGIN - legendWidth;
  const legendY = pageHeight - MARGIN - BLOCK_HEIGHT - 8 - legendHeight;

  // Background
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.roundedRect(legendX, legendY, legendWidth, legendHeight, 2, 2, 'FD');

  // Header
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 100, 100);
  doc.text('CABLE LEGEND', legendX + 3, legendY + 5);

  // Entries
  usedCables.forEach((cable, i) => {
    const y = legendY + 9 + i * rowHeight;

    // Parse color hex to RGB
    const hex = cable.color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Draw line sample
    doc.setDrawColor(r, g, b);
    doc.setLineWidth(Math.min(cable.strokeWidth * 0.4, 1));

    if (cable.dashArray) {
      // Draw dashed line manually (jsPDF doesn't support dasharray directly)
      const lineStartX = legendX + 3;
      const lineEndX = legendX + 15;
      const segments = cable.dashArray.split(' ').map(Number);
      let cx = lineStartX;
      let draw = true;
      let segIdx = 0;
      while (cx < lineEndX) {
        const segLen = Math.min((segments[segIdx % segments.length] || 3) * 0.3, lineEndX - cx);
        if (draw) {
          doc.line(cx, y + 1.5, cx + segLen, y + 1.5);
        }
        cx += segLen;
        draw = !draw;
        segIdx++;
      }
    } else {
      doc.line(legendX + 3, y + 1.5, legendX + 15, y + 1.5);
    }

    // Label
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(cable.label, legendX + 17, y + 2.5);
  });
}

export function getDiagramArea(doc: jsPDF) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  return {
    x: MARGIN,
    y: MARGIN,
    width: pageWidth - 2 * MARGIN,
    height: pageHeight - 2 * MARGIN - BLOCK_HEIGHT - 5,
  };
}
