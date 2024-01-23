class PhotographerAside {
  constructor(medias, photographer) {
    this.medias = medias;
    this.photographer = photographer;
  }

  render() {
    const likes = this.medias.reduce((acc, { likes }) => acc + likes, 0);
    const { price } = this.photographer;

    const html = `
        <span id="photographerLikes" class="photographer_likes">${likes}</span>
        <span class="photographer_likes_icon fa-solid fa-heart" aria-hidden="true"></span>
        <span class="photographer_price">${price}€ /jour</span>
      `;

    document.getElementById("photographerAside").innerHTML = html;
  }
}

export default PhotographerAside;
