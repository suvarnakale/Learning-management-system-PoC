import React from "react";
import "./ContentCard.css";

interface ContentCardProps {
  type: "pdf" | "video" | "youtube";
  name: string;
  onDelete?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ type, name, onDelete }) => {
  const getRandomImage = (type: string) => {
    const images = {
      pdf: [
        "https://picsum.photos/200/120?pdf=1",
        "https://picsum.photos/200/120?pdf=2",
        "https://picsum.photos/200/120?pdf=3",
      ],
      video: [
        "https://picsum.photos/200/120?video=1",
        "https://picsum.photos/200/120?video=2",
        "https://picsum.photos/200/120?video=3",
      ],
      youtube: [
        "https://picsum.photos/200/120?youtube=1",
        "https://picsum.photos/200/120?youtube=2",
        "https://picsum.photos/200/120?youtube=3",
      ],
    };

    const typeImages = images[type as keyof typeof images];
    const randomIndex = Math.floor(Math.random() * typeImages.length);
    return typeImages[randomIndex];
  };

  const handleClick = () => {
    if (type === "pdf") {
      // PDF viewer implementation will go here
      console.log("PDF clicked:", name);
    }
    // Handle video and youtube types here later
  };

  return (
    <div className="content-card" onClick={handleClick}>
      <img
        src={getRandomImage(type)}
        alt={`${type} content thumbnail`}
        className="content-thumbnail"
      />
      <div className="content-info">
        <div className="content-name">{name}</div>
        <div className="content-type">{type.toUpperCase()}</div>
      </div>
      {onDelete && (
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ContentCard;
