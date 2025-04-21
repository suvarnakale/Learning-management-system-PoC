import React from "react";
import "./ContentCard.css";
import { useNavigate } from "react-router-dom";

interface ContentCardProps {
  id: string;
  type: "pdf" | "video" | "youtube";
  name: string;
  content: File | string;
  onDelete?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  type,
  name,
  content,
  onDelete,
}) => {
  const navigate = useNavigate();

  // Function to get random image based on content type
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

  const handleClick = async () => {
    if (type === "pdf") {
      if (typeof content === "string") {
        // If content is a URL
        localStorage.setItem(`pdf-${id}`, content);
      } else {
        // If content is a File, convert to data URL
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          localStorage.setItem(`pdf-${id}`, base64);
          navigate(`/view-pdf/${id}`);
        };
        reader.readAsDataURL(content);
        return;
      }
      navigate(`/view-pdf/${id}`);
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
