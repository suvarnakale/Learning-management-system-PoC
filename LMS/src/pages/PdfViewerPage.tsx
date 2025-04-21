import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import "./PdfViewerPage.css";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const PdfViewerPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [numPages, setNumPages] = React.useState(0);
  const [scale, setScale] = React.useState(1.5);

  useEffect(() => {
    // Get PDF data from localStorage (you might want to use a better state management solution)
    const pdfData = localStorage.getItem(`pdf-${id}`);
    if (!pdfData) {
      navigate("/");
      return;
    }

    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfData);
        const pdf = await loadingTask.promise;
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
        renderPage(1);
      } catch (error) {
        console.error("Error loading PDF:", error);
        navigate("/");
      }
    };

    loadPdf();

    return () => {
      if (pdfRef.current) {
        pdfRef.current.destroy();
      }
    };
  }, [id, navigate]);

  const renderPage = async (pageNumber: number) => {
    if (!pdfRef.current || !canvasRef.current) return;

    const page = await pdfRef.current.getPage(pageNumber);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
  };

  const changePage = (delta: number) => {
    const newPage = currentPage + delta;
    if (newPage >= 1 && newPage <= numPages) {
      setCurrentPage(newPage);
      renderPage(newPage);
    }
  };

  const handleZoom = (delta: number) => {
    const newScale = scale + delta;
    if (newScale >= 0.5 && newScale <= 3) {
      setScale(newScale);
      renderPage(currentPage);
    }
  };

  return (
    <div className="pdf-viewer-page">
      <div className="viewer-toolbar">
        <button onClick={() => navigate("/")} className="back-btn">
          ← Back
        </button>
        <div className="viewer-controls">
          <button onClick={() => handleZoom(-0.1)} className="control-btn">
            -
          </button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={() => handleZoom(0.1)} className="control-btn">
            +
          </button>

          <button
            onClick={() => changePage(-1)}
            disabled={currentPage <= 1}
            className="control-btn"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {numPages}
          </span>
          <button
            onClick={() => changePage(1)}
            disabled={currentPage >= numPages}
            className="control-btn"
          >
            Next
          </button>
        </div>
      </div>
      <div className="canvas-container">
        <canvas ref={canvasRef} className="pdf-canvas" />
      </div>
    </div>
  );
};

export default PdfViewerPage;
