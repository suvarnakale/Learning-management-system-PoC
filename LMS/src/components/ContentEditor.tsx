import React from "react";
import "./ContentEditor.css";

interface ContentEditorProps {
  onSubmit: (data: {
    type: "pdf" | "video" | "youtube";
    content: File | string;
  }) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ onSubmit }) => {
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

  const handleCardClick = (type: "pdf" | "video" | "youtube") => {
    console.log(`Selected ${type} upload`);
    // Temporary empty submission to fix the unused prop warning
    onSubmit({ type, content: "" });
  };

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

export default ContentEditor;
