import ImageMedia from "../models/ImageMedia.js";
import VideoMedia from "../models/VideoMedia.js";

/*classe responsable de l'affichage de la liste des médias associés à un photographe*/
class PhotographerMediaList {
  /*le constructeur prend le paramètre médias, qui est un tableau contenant les médias associés du photographe*/
  constructor(medias) {
    this.medias = medias;
  }
  /*méthode render pour générer le contenu html pour afficher la liste des médias dans le DOM*/
  render() {
    const html = this.medias
      /*méthode map pour parcourir chaque média dans le tableau médias*/
      .map((media) => {
        /*pour chaque média, elle vérifie son type en utilmisant l'opérateur instanceOf avec les classes ImageMedia et VideoMedia*/
        /*si le média est une instance de ImageMedia, elle extrait les informations aéquates*/
        if (media instanceof ImageMedia) {
          const { title, id, src, likes } = media;
          return `
            <article class='media'>
              <figure class="media_figure">
                <a class="media_link" href="#" role="link" aria-label="${title}, closeup view" data-media=${id}>
                  <img src="${src}" alt="${title}">
                </a>
                <figcaption>${title}</figcaption>
              </figure>
              <div class="media_likes">
                <span class="media_likes_mention">${likes}</span>
                <button role="button" type="button" aria-label="Cliques pour ajouter un like" class="media_likes_button">
                <span class="media_likes_icon fa-regular fa-heart" aria-hidden="true"></span>
                </button>
                
              </div>
            </article>
          `;
          /*si le média est une instance de VideoMedia, elle extrait les informations aéquates*/
        } else if (media instanceof VideoMedia) {
          const { title, id, src, likes } = media;
          return `
            <article class="media">
              <figure class="media_figure">
                <a class="media_link" href="#" role="link" aria-label="Vue large" data-media=${id}>
                  <video src="${src}"  alt="${title}" type="video/mp4"></video> 
                </a>
                <figcaption>${title}</figcaption>
              </figure>
              <div class="media_likes">
                <span class="media_likes_mention">${likes}</span>
                <button role="button" type="button" aria-label="Cliques pour ajouter un like" class="media_likes_button">
                <span class="media_likes_icon fa-regular fa-heart" aria-hidden="true"></span>
                </button>
              </div>
            </article> 
          `;
        }
      })
      /*methode join("") pour concaténer tous les éléments html générés*/
      .join("");
    /*SÉLECTIONNE L'ÉLÉMENT DANS LE DOCUMENT HTML AVEC L'ID MÉDIAS ET REMPLACE SON CONTENU PAR LA CHAINE HTML GÉNÉRÉE*/
    document.getElementById("medias").innerHTML = html;
  }
}

export default PhotographerMediaList;
