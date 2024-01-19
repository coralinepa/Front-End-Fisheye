class Lightbox {
  constructor(medias) {
    this.medias = medias;
    this.currentIndex = 0;
    this.lightboxModalElement = document.getElementById("lightboxModal");
    this.lightboxImage = document.getElementById("lightboxImage");

    this.lightboxCloseElement = document.getElementById("lightboxClose");
    this.lightboxCloseElement.addEventListener("click", () => this.close());

    this.mediaLinkElements = document.querySelectorAll(".media_link");
    this.mediaLinkElements.forEach((mediaLinkElement, index) => {
      mediaLinkElement.addEventListener("click", (event) => {
        event.preventDefault();
        this.open(index);
      });
    });

    this.nextMediaElement = document.getElementById("nextMedia");
    this.nextMediaElement.addEventListener("click", () => this.next());

    this.previousMediaElement = document.getElementById("previousMedia");
    this.previousMediaElement.addEventListener("click", () => this.prev());
  }

  open(index) {
    this.currentIndex = index;
    const media = this.medias[index];
    this.lightboxImage.src = media.src;
    this.lightboxImage.alt = media.title;
    this.lightboxModalElement.style.display = "block";
    this.lightboxModalElement.setAttribute("aria-hidden", "false");
  }

  close() {
    this.lightboxModalElement.style.display = "none";
    this.lightboxModalElement.setAttribute("aria-hidden", "true");
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.medias.length;
    this.open(this.currentIndex);
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.medias.length) % this.medias.length;
    this.open(this.currentIndex);
  }

  bindUIActions() {
    // Optional: Handle keyboard events for accessibility
    document.addEventListener("keydown", (e) => {
      if (this.lightboxModalElement.style.display === "block") {
        switch (e.key) {
          case "Escape":
            this.close();
            break;
          case "ArrowRight":
            this.next();
            break;
          case "ArrowLeft":
            this.prev();
            break;
        }
      }
    });
  }
}

export default Lightbox;
