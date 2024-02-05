import ImageMedia from "../models/ImageMedia.js";
import VideoMedia from "../models/VideoMedia.js";

class PhotographerMediaList {
  constructor(medias) {
    this.medias = medias;
  }

  render() {
    const html = this.medias
      .map((media) => {
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
      .join("");

    document.getElementById("medias").innerHTML = html;
  }
}

export default PhotographerMediaList;
