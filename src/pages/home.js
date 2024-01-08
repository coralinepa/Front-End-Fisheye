import Photographer from "../models/Photographer.js";
import PhotographerListView from "../views/PhotographerList.js";

async function getPhotographers() {
  try {
    const response = await fetch("data/photographers.json");
    const { photographers } = await response.json();
    return photographers;
  } catch (error) {
    console.error(error);
  }
}

async function renderHome() {
  const photographersData = await getPhotographers();
  const photographers = photographersData.map(
    (photographer) => new Photographer(photographer)
  );
  const view = new PhotographerListView(photographers);

  view.render();
}

export default renderHome;
