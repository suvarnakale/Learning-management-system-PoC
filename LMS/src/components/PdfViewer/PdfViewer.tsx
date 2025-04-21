import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./PdfViewer.css";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfViewerProps {
  file: string | File;
  onClose: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file, onClose }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages || 1);
    });
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-viewer-toolbar">
        <div className="pdf-viewer-controls">
          <button onClick={zoomOut} className="control-btn">
            -
          </button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} className="control-btn">
            +
          </button>

          <button
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className="control-btn"
          >
            ←
          </button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={nextPage}
            disabled={pageNumber >= (numPages || 1)}
            className="control-btn"
          >
            →
          </button>
        </div>
        <button onClick={onClose} className="close-btn">
          ×
        </button>
      </div>

      <div className="pdf-document-container">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          className="pdf-document"
        >
          <Page pageNumber={pageNumber} scale={scale} className="pdf-page" />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
