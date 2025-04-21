import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../web-components/pdf-editor/PdfEditorComponent";

// Extend the Window interface to include our custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "pdf-editor": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const PdfEditorPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add event listener for the pdf-upload custom event
    const handlePdfUpload = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log("PDF Upload:", customEvent.detail);
      // Handle the upload here
      // After successful upload, navigate back
      navigate("/");
    };

    document.addEventListener("pdf-upload", handlePdfUpload);

    return () => {
      document.removeEventListener("pdf-upload", handlePdfUpload);
    };
  }, [navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>PDF Editor</h1>
      <pdf-editor></pdf-editor>
    </div>
  );
};

export default PdfEditorPage;
