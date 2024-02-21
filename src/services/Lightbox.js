import ImageMedia from "../models/ImageMedia.js";
import VideoMedia from "../models/VideoMedia.js";

class Lightbox {
  /*le constructeur prend un paramètre médias, qui comprend un tableau contenant les médias à afficher dans la lightbox*/
  constructor(medias) {
    this.medias = medias;
    this.currentIndex = 0;
    /*Il initialise également d'autres éléments de l'interface utilisateur, tels que les boutons de navigation et les éléments de la lightbox, en récupérant leurs références à partir du DOM.*/
    this.lightboxModalElement = document.getElementById("lightboxModal");
    this.lightboxMediaElement = document.getElementById("lightboxMedia");
    this.lightboxCloseElement = document.getElementById("lightboxClose");
    this.nextMediaElement = document.getElementById("nextMedia");
    this.previousMediaElement = document.getElementById("previousMedia");
  }

  /*méthode init initialise les écouteurs d'événements sur les liens des médias pour ouvrir la lightbox au clic sur un média*/
  init() {
    const mediaLinkElements = document.querySelectorAll(".media_link");
    mediaLinkElements.forEach((mediaLinkElement, index) => {
      mediaLinkElement.addEventListener("click", (event) => {
        event.preventDefault();
        this.open(index);
      });
    });
  }

  /*cette méthode prend un objet média en paramètre et génère le contenu html correspondant à ce média. selon le type de média, elle génère le code htmlapproprié pour afficher l'image ou la vidéo dans le lightbox*/
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
  /*Cette méthode ferme la lightbox en masquant son élément et en désactivant son attribut aria-hidden. Elle supprime également les écouteurs d'événements pour éviter les fuites de mémoire*/
  close() {
    this.clearEventListeners();
    this.lightboxModalElement.style.display = "none";
    this.lightboxModalElement.setAttribute("aria-hidden", "true");
  }

  /*Ces méthodes permettent de naviguer vers le média suivant ou précédent dans la lightbox. Elles mettent à jour l'index actuel et affichent le média correspondant en utilisant la méthode getMediaHtml().*/
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.medias.length;
    const media = this.medias[this.currentIndex];
    const html = this.getMediaHtml(media);
    this.lightboxMediaElement.innerHTML = html;
  }

  previous() {
    this.currentIndex =
      (this.currentIndex - 1 + this.medias.length) % this.medias.length;

    const media = this.medias[this.currentIndex];
    const html = this.getMediaHtml(media);
    this.lightboxMediaElement.innerHTML = html;
  }

  /*Cette méthode est appelée lorsqu'une touche est enfoncée. Elle détecte les touches "Escape", "ArrowRight" et "ArrowLeft" pour fermer la lightbox, naviguer vers le média suivant ou précédent.*/
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

  /*Ces méthodes sont utilisées pour ajouter et supprimer les écouteurs d'événements sur les éléments de la lightbox.*/
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

  /*Cette méthode ouvre la lightbox en affichant son élément, en activant son attribut aria-hidden, en initialisant les écouteurs d'événements et en affichant le média correspondant à l'index spécifié.*/
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
