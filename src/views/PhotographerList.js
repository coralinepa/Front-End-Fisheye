/*constructeur de la classe prend un tableau d'objets photographers en tant que paramètre et l'assigne à la propriété photographers de l'instance créée.*/

class PhotographerList {
  constructor(photographers) {
    this.photographers = photographers;
  }

  render() {
    const html = this.photographers
      .map((photographer) => {
        const { name, portrait, id, city, country, tagline, price } =
          photographer;
        return `
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
      .join("");
    document.getElementById("photographers").innerHTML = html;
  }
}

export default PhotographerList;
