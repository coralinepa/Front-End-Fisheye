class PhotographerAside {
  /*Le constructeur de la classe PhotographerAside prend deux paramètres :
  - medias : Un tableau contenant les médias du photographe.
  - photographer : Un objet représentant le photographe lui-même, contenant des informations telles que le prix.*/
  constructor(medias, photographer) {
    this.medias = medias;
    this.photographer = photographer;
  }
  /*méthode responsable de gérer le contenu HTML pour afficher la section latérale du profil du photographe, en utilisant les données fournies dans le constructeur*/
  render() {
    /*méthode calcul le nombre total de likes pour tous les médias du photographe*/
    const likes = this.medias.reduce((acc, { likes }) => acc + likes, 0);
    /*extrait le prix du photographe à partir des données fournies*/
    const { price } = this.photographer;
    /*construit le contenu de la section latérale*/
    const html = `
        <span id="photographerLikes" class="photographer_likes">${likes}</span>
        <span class="photographer_likes_icon fa-solid fa-heart" aria-hidden="true"></span>
        <span class="photographer_price">${price}€ /jour</span>
      `;
    /*sélectionne l'élément dans le document avec l'ID et remplace le contenu par le html générée*/
    document.getElementById("photographerAside").innerHTML = html;
  }
}

export default PhotographerAside;
