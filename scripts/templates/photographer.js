function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const imgPath = `assets/photographers/profiles/${portrait}`;

  function getUserCardDOM() {
    /* Create parent article */
    const article = document.createElement("article");

    const linkElement = document.createElement("a");
    linkElement.href = `/photographer.html?id=${id}`;
    linkElement.classList.add("card-link");

    /* Create image */
    const img = document.createElement("img");
    img.setAttribute("src", imgPath);
    img.setAttribute("alt", name);

    /* Create Title */
    const h2 = document.createElement("h2");
    h2.textContent = name;

    const locationElement = document.createElement("p");
    locationElement.textContent = `${city}, ${country}`;
    locationElement.classList.add("card-location");

    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;
    taglineElement.classList.add("card-text");

    const priceElement = document.createElement("p");
    priceElement.textContent = `${price} €/jour`;
    priceElement.classList.add("card-price");

    linkElement.appendChild(img);
    linkElement.appendChild(h2);
    article.appendChild(linkElement);
    article.appendChild(locationElement);
    article.appendChild(taglineElement);
    article.appendChild(priceElement);

    return article;
  }

  return { getUserCardDOM };
}
