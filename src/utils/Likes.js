class Likes {
  constructor(medias) {
    this.medias = medias;
    this.index = 0;
    this.media;

    this.totalLikesElement = document.getElementById("photographerLikes");

    this.mediaLikesMentionElements = document.querySelectorAll(
      ".media_likes_mention"
    );
    this.mediaLikesButtonElements = document.querySelectorAll(
      ".media_likes_button"
    );
    this.mediaLikesButtonElements.forEach((mediaLikesButtonElement, index) => {
      mediaLikesButtonElement.addEventListener("click", (event) => {
        event.preventDefault();
        this.index = index;
        this.media = this.medias[index];
        if (this.media.liked) {
          this.media.liked = false;
          this.media.likes = this.media.likes - 1;
        } else {
          this.media.liked = true;
          this.media.likes = this.media.likes + 1;
        }

        this.updateMediaLikesRender();
        this.updateTotalLikesRender();
        this.updateLikeButtonStyle();
      });
    });
  }

  updateMediaLikesRender() {
    const mediaLikesMentionElement = this.mediaLikesMentionElements[this.index];
    mediaLikesMentionElement.innerHTML = this.media.likes;
  }

  updateTotalLikesRender() {
    const totalLikes = this.medias.reduce((acc, { likes }) => acc + likes, 0);
    this.totalLikesElement.textContent = `${totalLikes}`;
  }

  updateLikeButtonStyle() {
    const mediaLikesButtonElement = this.mediaLikesButtonElements[this.index];
    if (this.media.liked) {
      mediaLikesButtonElement.innerHTML = `<button class="media_likes_button liked">
        <span class="media_likes_icon fa-solid fa-heart" aria-hidden="true"></span>
        </button>`;
    } else {
      mediaLikesButtonElement.innerHTML = `<button class="media_likes_button">
      <span class="media_likes_icon fa-regular fa-heart" aria-hidden="true"></span>
      </button>`;
    }
  }
}

export default Likes;
