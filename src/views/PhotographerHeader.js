class PhotographerHeader {
  /*Le constructeur de la classe prend un objet photographer en tant que paramètre et l'assigne à la propriété photographer de l'instance créée.*/
  constructor(photographer) {
    this.photographer = photographer;
  }
  /*Cette méthode génère le contenu HTML de l'en-tête du photographe en utilisant les données fournies dans l'objet photographer.*/
  render() {
    /*Elle déstructure les propriétés de l'objet photographer*/
    const { name, country, city, portrait, tagline } = this.photographer;
    const imgPath = `assets/photographers/profiles/${portrait}`;
    /*Elle construit ensuite deux parties de contenu HTML : une pour le profil du photographe (profileHtml) et une pour l'image du photographe (imgHtml).*/
    const profileHtml = `
      <div class="profile">
        <h1 class="profile_name">${name}</h1>
        <h2 class="profile_location">${city}, ${country}</h2>
        <p class="profile_tagline">${tagline}</p>
      </div>
    `;

    const imgHtml = `
      <img src=${imgPath} class="photographer_img" alt=${name} />
    `;

    /*Elle sélectionne l'élément avec l'ID photographerHeader dans le document HTML.*/
    const headerElement = document.getElementById("photographerHeader");
    /*Elle insère le contenu HTML du profil du photographe au début de cet élément (afterbegin) et l'image du photographe à la fin de cet élément (beforeend), en utilisant insertAdjacentHTML.*/
    headerElement.insertAdjacentHTML("afterbegin", profileHtml);
    headerElement.insertAdjacentHTML("beforeend", imgHtml);
  }
}

export default PhotographerHeader;
