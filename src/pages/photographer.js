import PhotographerModel from "../models/Photographer.js";
import PhotographerHeaderView from "../views/PhotographerHeader.js";
import PhotographerMediaListView from "../views/PhotographerMediaList.js";
import MediaFactory from "../factories/MediaFactory.js";
import PhotographerAsideView from "../views/PhotographerAside.js";

async function getPhotographer(id) {
  const response = await fetch("data/photographers.json");
  const { photographers = [], medias = [] } = await response.json();
  const photographer = photographers.find(
    (photographer) => photographer.id === id
  );
  const photographerMedias = medias.filter(
    (media) => media.photographerId === photographer.id
  );

  return { ...photographer, medias: photographerMedias };
}

async function renderPhotographer() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const photographerId = Number(urlSearchParams.get("id"));
  const { medias: mediasData, ...restPhotographer } = await getPhotographer(
    photographerId
  );
  const medias = mediasData.map((media) => MediaFactory.createMedia(media));
  const photographer = new PhotographerModel(restPhotographer);
  const headerView = new PhotographerHeaderView(photographer);
  const mediaListView = new PhotographerMediaListView(medias);
  const asideView = new PhotographerAsideView(medias, photographer);
  headerView.render();
  mediaListView.render();
  asideView.render();
}

export default renderPhotographer;
