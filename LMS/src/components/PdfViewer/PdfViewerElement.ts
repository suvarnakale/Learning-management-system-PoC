import React from "react";
import ReactDOM from "react-dom/client";
import PdfViewer from "./PdfViewer";

class PdfViewerElement extends HTMLElement {
  private root: ReactDOM.Root | null = null;
  private mountPoint: HTMLDivElement;

  constructor() {
    super();
    this.mountPoint = document.createElement("div");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(this.mountPoint);
  }

  static get observedAttributes() {
    return ["file-url", "file-data"];
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  private render() {
    if (!this.root) {
      this.root = ReactDOM.createRoot(this.mountPoint);
    }

    const fileUrl = this.getAttribute("file-url");
    const fileData = this.getAttribute("file-data");
    let file: string | File | null = fileUrl;

    if (fileData) {
      const blob = new Blob([fileData], { type: "application/pdf" });
      file = new File([blob], "document.pdf", { type: "application/pdf" });
    }

    if (file) {
      this.root.render(
        React.createElement(PdfViewer, {
          file,
          onClose: () => {
            this.dispatchEvent(new CustomEvent("close"));
            if (this.parentElement) {
              this.parentElement.removeChild(this);
            }
          },
        })
      );
    }
  }
}

// Register the web component
customElements.define("pdf-viewer", PdfViewerElement);

export default PdfViewerElement;
