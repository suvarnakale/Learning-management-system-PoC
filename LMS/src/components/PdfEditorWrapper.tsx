import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PdfEditorWrapper: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically import the web component
    const loadWebComponent = async () => {
      try {
        await import("../web-components/pdf-editor/PdfEditorComponent");

        // Add event listener for the pdf-upload custom event
        const handlePdfUpload = (event: Event) => {
          const customEvent = event as CustomEvent;
          console.log("PDF Upload:", customEvent.detail);
          // Handle the upload here
          navigate("/");
        };

        document.addEventListener("pdf-upload", handlePdfUpload);
        return () => {
          document.removeEventListener("pdf-upload", handlePdfUpload);
        };
      } catch (error) {
        console.error("Error loading PDF editor:", error);
      }
    };

    loadWebComponent();
  }, [navigate]);

  return (
    <div className="pdf-editor-wrapper">
      <h2>PDF Editor</h2>
      <pdf-editor></pdf-editor>
    </div>
  );
};

export default PdfEditorWrapper;
