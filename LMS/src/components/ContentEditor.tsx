import React, { useState } from "react";
import "./ContentEditor.css";
import ContentCard from "./ContentCard";

interface ContentItem {
  id: string;
  type: "pdf" | "video" | "youtube";
  name: string;
  content: File | string;
}

interface ContentEditorProps {
  onSubmit: (data: {
    type: "pdf" | "video" | "youtube";
    content: File | string;
  }) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ onSubmit }) => {
  const [selectedType, setSelectedType] = useState<"pdf" | "video" | "youtube">(
    "pdf"
  );
  const [youtubeLink, setYoutubeLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [contentList, setContentList] = useState<ContentItem[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType === "youtube" && youtubeLink) {
      const newContent: ContentItem = {
        id: Date.now().toString(),
        type: "youtube",
        name: new URL(youtubeLink).hostname + new URL(youtubeLink).pathname,
        content: youtubeLink,
      };
      setContentList((prev) => [...prev, newContent]);
      onSubmit({ type: "youtube", content: youtubeLink });
      setYoutubeLink("");
    } else if ((selectedType === "pdf" || selectedType === "video") && file) {
      const newContent: ContentItem = {
        id: Date.now().toString(),
        type: selectedType,
        name: file.name,
        content: file,
      };
      setContentList((prev) => [...prev, newContent]);
      onSubmit({ type: selectedType, content: file });
      setFile(null);
      // Reset the file input
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDelete = (id: string) => {
    setContentList((prev) => prev.filter((item) => item.id !== id));
    localStorage.removeItem(`pdf-${id}`); // Clean up stored PDF data
  };

  return (
    <div className="content-editor">
      <h2>Content Editor</h2>
      <form onSubmit={handleSubmit} className="editor-form">
        <div className="type-selector">
          <label>
            <input
              type="radio"
              value="pdf"
              checked={selectedType === "pdf"}
              onChange={(e) => setSelectedType(e.target.value as "pdf")}
            />
            PDF Upload
          </label>
          <label>
            <input
              type="radio"
              value="video"
              checked={selectedType === "video"}
              onChange={(e) => setSelectedType(e.target.value as "video")}
            />
            Video Upload
          </label>
          <label>
            <input
              type="radio"
              value="youtube"
              checked={selectedType === "youtube"}
              onChange={(e) => setSelectedType(e.target.value as "youtube")}
            />
            YouTube Link
          </label>
        </div>

        {selectedType === "youtube" ? (
          <div className="input-group">
            <label>YouTube Link:</label>
            <input
              type="url"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="Enter YouTube URL"
              required
            />
          </div>
        ) : (
          <div className="input-group">
            <label>
              {selectedType === "pdf" ? "PDF File:" : "Video File:"}
            </label>
            <input
              type="file"
              accept={selectedType === "pdf" ? ".pdf" : "video/*"}
              onChange={handleFileChange}
              required
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Upload Content
        </button>
      </form>

      {contentList.length > 0 && (
        <div className="content-list">
          <h3>Uploaded Content</h3>
          <div className="content-grid">
            {contentList.map((content) => (
              <ContentCard
                key={content.id}
                id={content.id}
                type={content.type}
                name={content.name}
                content={content.content}
                onDelete={() => handleDelete(content.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
