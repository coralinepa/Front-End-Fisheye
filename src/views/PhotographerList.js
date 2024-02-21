/*constructeur de la classe prend un tableau d'objets photographers en tant que paramètre et l'assigne à la propriété photographers de l'instance créée.*/

class PhotographerList {
  constructor(photographers) {
    this.photographers = photographers;
  }
  /*méthode render génère le contenu HTML de la listes des photographes en utilisant les données du tableau photographers*/
  render() {
    const html = this.photographers
      /*utilisation de la méthode map pour parcourir le tableau photographers et génère le HTML pour chaque photographe*/
      .map((photographer) => {
        /*pour chaque photographe, elle extrait les informations demandées*/
        const { name, portrait, id, city, country, tagline, price } =
          photographer;
        return /*construction d'une balise article pour chaque photographe avec un lien vers la page du photographe*/ `
          <article role="article">
            <a href="photographer.html?id=${id}" class="card_link" role="link" aria-labelledby="cardTitle">
              <img src=assets/photographers/profiles/${portrait} class="card_img" alt=${name} role="img" aria-labelledby="cardTitle"/>
              <h2 class="card_title">${name}</h2>
            </a>
              <p class="card_location">${city}, ${country}</p>
              <p class="card_text">${tagline}</p>
              <p class="card_price">${price}€ /jour</p>
        </article>
      `;
      })
      /*utilisation de la méthode join("") pour concaténer toutes les chaines de caractères HTML en une seule chaine*/
      .join("");
    /*sélectionne l'élément avec id photographers dans le dicument HTML et remplace son contenu par la chaine HTML générée*/
    document.getElementById("photographers").innerHTML = html;
  }
}

export default PhotographerList;
