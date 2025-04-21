import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ContentTypeSelector from "./components/ContentTypeSelector";
import PdfEditorPage from "./pages/PdfEditorPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ContentTypeSelector />} />
          <Route path="/pdf-editor" element={<PdfEditorPage />} />
          {/* Add routes for video and youtube editors when they are implemented */}
          <Route
            path="/video-editor"
            element={<div>Video Editor - Coming Soon</div>}
          />
          <Route
            path="/youtube-editor"
            element={<div>YouTube Editor - Coming Soon</div>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
