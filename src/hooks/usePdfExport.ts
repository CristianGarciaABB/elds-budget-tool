import { useCallback } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { drawTitleBlock, drawCableLegend, getDiagramArea } from '../utils/pdfTitleBlock';
import type { ProjectMetadata } from '../types/diagram';

export function usePdfExport() {
  const exportPdf = useCallback(async (metadata: ProjectMetadata, usedCableTypes: string[]) => {
    const flowElement = document.querySelector('.react-flow') as HTMLElement;
    if (!flowElement) throw new Error('Diagram canvas not found');

    // Hide controls, minimap, and on-screen legend for clean export
    const hideElements = flowElement.querySelectorAll(
      '.react-flow__controls, .react-flow__minimap'
    );
    const legendEl = document.querySelector('.cable-legend') as HTMLElement | null;
    hideElements.forEach((el) => ((el as HTMLElement).style.display = 'none'));
    if (legendEl) legendEl.style.display = 'none';

    try {
      const canvas = await html2canvas(flowElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // A3 Landscape
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a3',
      });

      // Draw title block and get diagram area
      drawTitleBlock(doc, metadata);
      const area = getDiagramArea(doc);

      // Calculate image dimensions to fit area
      const imgAspect = canvas.width / canvas.height;
      const areaAspect = area.width / area.height;

      let imgWidth: number, imgHeight: number, imgX: number, imgY: number;

      if (imgAspect > areaAspect) {
        imgWidth = area.width;
        imgHeight = area.width / imgAspect;
        imgX = area.x;
        imgY = area.y + (area.height - imgHeight) / 2;
      } else {
        imgHeight = area.height;
        imgWidth = area.height * imgAspect;
        imgX = area.x + (area.width - imgWidth) / 2;
        imgY = area.y;
      }

      // Draw border around diagram area
      doc.setLineWidth(0.3);
      doc.setDrawColor(200, 200, 200);
      doc.rect(area.x, area.y, area.width, area.height);

      // Add diagram image
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);

      // Draw cable legend in bottom-right of diagram area
      drawCableLegend(doc, usedCableTypes);

      // Save
      const filename = `${metadata.projectName.replace(/\s+/g, '_')}_${metadata.drawingNumber}.pdf`;
      doc.save(filename);
    } finally {
      // Restore hidden elements
      hideElements.forEach((el) => ((el as HTMLElement).style.display = ''));
      if (legendEl) legendEl.style.display = '';
    }
  }, []);

  return { exportPdf };
}
