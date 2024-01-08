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
          const { photographerId, image, title } = media;
          return `
            <article class='media'>
              <figure class="media_figure">
                <img src="assets/photographers/${photographerId}/${image}" alt="${title}">
                <figcaption>${title}</figcaption>
              </figure>
            </article>
          `;
        } else if (media instanceof VideoMedia) {
          const { photographerId, video, title } = media;
          return `
            
          <article class="media">
            <figure class="media_figure">
              <video src="assets/photographers/${photographerId}/${video}" type="video/mp4"></video>
              <figcaption>${title}</figcaption>
            </figure>
          </article>
            
          `;
        }
      })
      .join("");

    document.getElementById("medias").innerHTML = html;
  }
}

export default PhotographerMediaList;
