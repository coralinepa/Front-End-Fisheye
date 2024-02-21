class Likes {
  /*Le constructeur de la classe Likes prend un paramètre medias, qui est un tableau contenant les médias auxquels les likes seront appliqués. Il initialise également d'autres propriétés telles que index, media et mediaLikesButtonElements.*/
  constructor(medias) {
    this.medias = medias;
    this.index = 0;
    this.media;
    this.mediaLikesButtonElements;
  }

  /*Cette méthode initialise les écouteurs d'événements sur les boutons de likes de chaque média. 
  Elle sélectionne tous les boutons de likes dans le DOM et leur ajoute un écouteur d'événements de clic. 
  Lorsque l'utilisateur clique sur un bouton de like, la méthode met à jour les données du média (nombre de likes, statut de like) et actualise l'affichage.*/
  init() {
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

        /*Cette méthode met à jour l'affichage du nombre de likes pour un média spécifique dans le DOM. 
        Elle sélectionne l'élément correspondant au nombre de likes pour le média actuel et met à jour son contenu avec le nombre de likes du média.*/
        this.updateMediaLikesRender();
        /*Cette méthode met à jour l'affichage du nombre total de likes pour tous les médias du photographe dans le DOM. 
        Elle calcule d'abord le nombre total de likes en additionnant les likes de tous les médias à l'aide de la méthode reduce(). 
        Ensuite, elle sélectionne l'élément correspondant dans le DOM et met à jour son contenu avec le nombre total de likes.*/
        this.updateTotalLikesRender();
        /*Cette méthode met à jour le style visuel du bouton de like pour le média actuel dans le DOM. 
        Selon le statut de like du média, elle modifie le contenu HTML du bouton pour afficher un cœur rempli (si le média est aimé) ou un cœur vide (si le média n'est pas aimé).*/
        this.updateLikeButtonStyle();
      });
    });
  }

  updateMediaLikesRender() {
    const mediaLikesMentionElements = document.querySelectorAll(
      ".media_likes_mention"
    );
    const mediaLikesMentionElement = mediaLikesMentionElements[this.index];
    mediaLikesMentionElement.innerHTML = this.media.likes;
  }

  updateTotalLikesRender() {
    const totalLikesElement = document.getElementById("photographerLikes");
    const totalLikes = this.medias.reduce((acc, { likes }) => acc + likes, 0);
    totalLikesElement.textContent = `${totalLikes}`;
  }

  updateLikeButtonStyle() {
    const mediaLikesButtonElement = this.mediaLikesButtonElements[this.index];
    if (this.media.liked) {
      mediaLikesButtonElement.innerHTML = `<button role="button" type="button" aria-label="Cliques pour ajouter un like" class="media_likes_button liked">
        <span class="media_likes_icon fa-solid fa-heart" aria-label="likes" aria-hidden="true"></span>
       </button>`;
    } else {
      mediaLikesButtonElement.innerHTML = `<button class="media_likes_button">
         <span class="media_likes_icon fa-regular fa-heart" aria-label="likes" aria-hidden="true"></span>
      </button>`;
    }
  }
}

export default Likes;
