import React, { useState, lazy, Suspense } from "react";
import "./ContentEditor.css";

// Lazy load the PDF editor wrapper
const PdfEditorWrapper = lazy(() => import("./PdfEditorWrapper"));

const ContentTypeSelector: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const contentTypes = [
    {
      type: "pdf" as const,
      title: "PDF Upload",
      description: "Upload PDF documents for your course content",
      icon: "📄",
    },
    {
      type: "video" as const,
      title: "Video Upload",
      description: "Upload video files directly to the platform",
      icon: "🎥",
    },
    {
      type: "youtube" as const,
      title: "YouTube Link",
      description: "Add YouTube videos to your course content",
      icon: "▶️",
    },
  ];

  const handleCardClick = (type: string) => {
    setSelectedType(type);
  };

  const handleBack = () => {
    setSelectedType(null);
  };

  if (selectedType === "pdf") {
    return (
      <div className="content-editor">
        <button onClick={handleBack} className="back-button">
          ← Back to Selection
        </button>
        <Suspense fallback={<div>Loading PDF Editor...</div>}>
          <PdfEditorWrapper />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="content-editor">
      <h2>Add Course Content</h2>
      <div className="content-type-grid">
        {contentTypes.map((content) => (
          <div
            key={content.type}
            className="content-type-card"
            onClick={() => handleCardClick(content.type)}
          >
            <div className="content-type-icon">{content.icon}</div>
            <h3>{content.title}</h3>
            <p>{content.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentTypeSelector;
