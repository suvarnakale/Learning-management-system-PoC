import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("pdf-editor")
export class PdfEditorComponent extends LitElement {
  @property({ type: String }) moduleName = "";
  @property({ type: String }) className = "";
  @property({ type: String }) coverImage = "";
  @state() private pdfFile: File | null = null;
  @state() private previewUrl: string = "";

  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .editor-container {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    input[type="text"] {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .file-input-container {
      border: 2px dashed #ddd;
      padding: 2rem;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 1rem;
    }

    .file-input-container:hover {
      border-color: #4caf50;
    }

    .preview-container {
      margin-top: 1rem;
    }

    .preview-image {
      max-width: 200px;
      max-height: 200px;
      object-fit: cover;
      border-radius: 4px;
    }

    .submit-btn {
      background: #4caf50;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .submit-btn:hover {
      background: #45a049;
    }

    .error {
      color: #f44336;
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }
  `;

  private handlePdfChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.pdfFile = input.files[0];
      // You might want to show a preview of the first page
      console.log("PDF selected:", this.pdfFile.name);
    }
  }

  private handleCoverImageChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.coverImage = URL.createObjectURL(file);
    }
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.pdfFile) {
      return;
    }

    const formData = new FormData();
    formData.append("moduleName", this.moduleName);
    formData.append("className", this.className);
    formData.append("coverImage", this.coverImage);
    formData.append("pdfFile", this.pdfFile);

    // Dispatch a custom event with the form data
    const event = new CustomEvent("pdf-upload", {
      detail: {
        moduleName: this.moduleName,
        className: this.className,
        coverImage: this.coverImage,
        pdfFile: this.pdfFile,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="editor-container">
        <form @submit=${this.handleSubmit}>
          <div class="form-group">
            <label for="moduleName">Module Name</label>
            <input
              type="text"
              id="moduleName"
              .value=${this.moduleName}
              @input=${(e: Event) =>
                (this.moduleName = (e.target as HTMLInputElement).value)}
              required
            />
          </div>

          <div class="form-group">
            <label for="className">Class</label>
            <input
              type="text"
              id="className"
              .value=${this.className}
              @input=${(e: Event) =>
                (this.className = (e.target as HTMLInputElement).value)}
              required
            />
          </div>

          <div class="form-group">
            <label for="coverImage">Cover Image</label>
            <div class="file-input-container">
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                @change=${this.handleCoverImageChange}
                required
              />
            </div>
            ${this.coverImage
              ? html`
                  <div class="preview-container">
                    <img
                      src=${this.coverImage}
                      alt="Cover preview"
                      class="preview-image"
                    />
                  </div>
                `
              : ""}
          </div>

          <div class="form-group">
            <label for="pdfFile">PDF File</label>
            <div class="file-input-container">
              <input
                type="file"
                id="pdfFile"
                accept=".pdf"
                @change=${this.handlePdfChange}
                required
              />
            </div>
            ${this.pdfFile
              ? html`
                  <div class="preview-container">
                    <p>Selected file: ${this.pdfFile.name}</p>
                  </div>
                `
              : ""}
          </div>

          <button type="submit" class="submit-btn">Upload PDF</button>
        </form>
      </div>
    `;
  }
}
