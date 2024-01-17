import PhotographerModel from "../models/Photographer.js";
import PhotographerHeaderView from "../views/PhotographerHeader.js";
import PhotographerMediaListView from "../views/PhotographerMediaList.js";
import MediaFactory from "../factories/MediaFactory.js";
import PhotographerAsideView from "../views/PhotographerAside.js";

import { showModal, closeModal } from "../utils/modal.js";
import validateForm from "../utils/form.js";

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
  /* On récupère l'id du photographe grace aux searchParams de l'url */
  const urlSearchParams = new URLSearchParams(window.location.search);
  const photographerId = Number(urlSearchParams.get("id"));

  /* On requête le photographer et ses médias */
  const { medias: mediasData, ...restPhotographer } = await getPhotographer(
    photographerId
  );

  /* On instancie un vidéo ou une photo en fonction du type de média grace à la factory */
  const Medias = mediasData.map((media) => MediaFactory.createMedia(media));

  /* On instancie un photographe */
  const Photographer = new PhotographerModel(restPhotographer);

  /* On instancie nos différentes vues (header, liste des médias, aside) */
  const headerView = new PhotographerHeaderView(Photographer);
  const mediaListView = new PhotographerMediaListView(Medias);
  const asideView = new PhotographerAsideView(Medias, Photographer);

  /* On affiche nos différentes vues dans le DOM */
  headerView.render();
  mediaListView.render();
  asideView.render();

  /* On ajoute le nom du photographe sur le formulaire de contact */
  const contactName = document.getElementById("contactModalTitle");
  contactName.innerHTML = `
  Contactez-moi
  ${Photographer.name}
`;

  /* On ajoute un écouteur d'évènement sur le bouton de contact pour afficher la modale de contact au clic */
  const contactElement = document.getElementById("photographerContact");
  contactElement.addEventListener("click", showModal);

  /* On ajoute un écouteur d'évènement sur le bouton de fermeture de la modale de contact au clic pour fermer la modale */
  const closeModalElement = document.getElementById("closeModal");
  closeModalElement.addEventListener("click", closeModal);

  /* On ajoute un écouteur d'évènement sur le bouton de soumission du formulaire pour valider les données */
  const form = document.getElementById("form");
  // Création d'une fonction pour écouter l'événement submit et valider les valeurs du formulaire
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    validateForm(form);
  });
}

export default renderPhotographer;
