import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ContentEditor from "./components/ContentEditor";
import PdfViewerPage from "./pages/PdfViewerPage";

function App() {
  const handleContentSubmit = (data: {
    type: "pdf" | "video" | "youtube";
    content: File | string;
  }) => {
    // Handle the content submission
    console.log("Content submitted:", data);
    if (data.type === "youtube") {
      console.log("YouTube link:", data.content);
    } else {
      console.log("File name:", (data.content as File).name);
    }
    // Here you would typically upload the file to a server
    // or process the YouTube link
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Learning Management System</h1>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={<ContentEditor onSubmit={handleContentSubmit} />}
            />
            <Route path="/view-pdf/:id" element={<PdfViewerPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
