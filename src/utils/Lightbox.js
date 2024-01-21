import ImageMedia from "../models/ImageMedia.js";
import VideoMedia from "../models/VideoMedia.js";

class Lightbox {
  constructor(medias) {
    this.medias = medias;
    this.currentIndex = 0;
    this.lightboxModalElement = document.getElementById("lightboxModal");
    this.lightboxMediaElement = document.getElementById("lightboxMedia");
    this.lightboxCloseElement = document.getElementById("lightboxClose");
    this.mediaLinkElements = document.querySelectorAll(".media_link");
    this.nextMediaElement = document.getElementById("nextMedia");
    this.previousMediaElement = document.getElementById("previousMedia");

    this.mediaLinkElements.forEach((mediaLinkElement, index) => {
      mediaLinkElement.addEventListener("click", (event) => {
        event.preventDefault();
        this.open(index);
      });
    });
  }

  getMediaHtml(media) {
    if (media instanceof ImageMedia) {
      const { src, title } = media;
      return `
            <img src="${src}" alt="${title}">
            <figcaption>${title}</figcaption>
        `;
    }
    if (media instanceof VideoMedia) {
      const { src, title } = media;
      return `
        <video src="${src}" controls type="video/mp4"></video> 
        <figcaption>${title}</figcaption>
      `;
    }

    return "";
  }

  close() {
    this.clearEventListeners();
    this.lightboxModalElement.style.display = "none";
    this.lightboxModalElement.setAttribute("aria-hidden", "true");
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.medias.length;
    this.open(this.currentIndex);
  }

  previous() {
    this.currentIndex =
      (this.currentIndex - 1 + this.medias.length) % this.medias.length;
    this.open(this.currentIndex);
  }

  handleKeydown = (event) => {
    if (event.key === "Escape") {
      this.close();
    }

    if (event.key === "ArrowRight") {
      this.next();
    }

    if (event.key === "ArrowLeft") {
      this.previous();
    }
  };

  initEventListeners() {
    this.lightboxCloseElement.addEventListener("click", () => this.close());
    this.nextMediaElement.addEventListener("click", () => this.next());
    this.previousMediaElement.addEventListener("click", () => this.previous());
    document.addEventListener("keydown", this.handleKeydown);
  }

  clearEventListeners() {
    this.lightboxCloseElement.removeEventListener("click", () => this.close());
    this.nextMediaElement.removeEventListener("click", () => this.next());
    this.previousMediaElement.removeEventListener("click", () =>
      this.previous()
    );

    document.removeEventListener("keydown", this.handleKeydown);
  }

  open(index) {
    this.currentIndex = index;
    const media = this.medias[index];
    this.lightboxModalElement.style.display = "block";
    this.lightboxModalElement.setAttribute("aria-hidden", "false");
    this.initEventListeners();

    const html = this.getMediaHtml(media);
    this.lightboxMediaElement.innerHTML = html;
  }
}

export default Lightbox;
