class PhotographerHeader {
  constructor(photographer) {
    this.photographer = photographer;
  }

  render() {
    const { name, country, city, portrait, tagline } = this.photographer;
    const imgPath = `assets/photographers/profiles/${portrait}`;
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

    const headerElement = document.getElementById("photographerHeader");
    headerElement.insertAdjacentHTML("afterbegin", profileHtml);
    headerElement.insertAdjacentHTML("beforeend", imgHtml);
  }
}

export default PhotographerHeader;
