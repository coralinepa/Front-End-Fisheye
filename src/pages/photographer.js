import PhotographerModel from "../models/Photographer.js";
import PhotographerHeaderView from "../views/PhotographerHeader.js";
import PhotographerMediaListView from "../views/PhotographerMediaList.js";
import MediaFactory from "../factories/MediaFactory.js";
import PhotographerAsideView from "../views/PhotographerAside.js";

import { showModal, closeModal } from "../utils/modal.js";
import Lightbox from "../services/Lightbox.js";
import Likes from "../services/Likes.js";
import FilterMediaController from "../controllers/FilterMedia.js";

import validateForm from "../utils/form.js";

/*Rendre la page d'un photographe avec toutes les informations et médias associés*/

/*Récupère les données du photographe à partir d'un fichier JSON.
Elle prend l'id du photographe comme paramètre*/
async function getPhotographer(id) {
  /*puis utilise une requête fetch pour obtenir les données*/
  const response = await fetch("data/photographers.json");
  const { photographers = [], medias = [] } = await response.json();
  const photographer = photographers.find(
    (photographer) => photographer.id === id
  );
  /*Elle filtre ensuite les données pour obtenir le photographe avec l'id correspondant ainsi que les médias*/
  const photographerMedias = medias.filter(
    (media) => media.photographerId === photographer.id
  );

  return { ...photographer, medias: photographerMedias };
}

/*resposnable de l'affichage des infos du photographe dans le DOM*/
async function renderPhotographer() {
  /* On récupère l'id du photographe grace aux searchParams de l'url */
  const urlSearchParams = new URLSearchParams(window.location.search);
  const photographerId = Number(urlSearchParams.get("id"));

  /* On requête le photographe et ses médias pour récupérer les données */
  const { medias: mediasData, ...restPhotographer } = await getPhotographer(
    photographerId
  );

  /* On instancie un vidéo ou une photo en fonction du type de média grace à la factory */
  const Medias = mediasData.map((media) => MediaFactory.createMedia(media));

  /* On instancie un objet représentant un photographe à partir des données obtenues*/
  const Photographer = new PhotographerModel(restPhotographer);

  /* On instancie nos différentes vues (header, liste des médias, aside) */
  const HeaderView = new PhotographerHeaderView(Photographer);
  const MediaListView = new PhotographerMediaListView(Medias);
  const AsideView = new PhotographerAsideView(Medias, Photographer);

  /* On affiche nos différentes vues dans le DOM */
  HeaderView.render();
  MediaListView.render();
  AsideView.render();

  /* On instancie la lightbox */
  const lightbox = new Lightbox(Medias);

  /* On instancie la gestion des likes */
  const likes = new Likes(Medias);

  // Créez une instance de la classe MediaGallery avec les données des médias
  new FilterMediaController(Medias, MediaListView, lightbox, likes);

  /* On ajoute le nom du photographe sur le formulaire de contact */
  const contactName = document.getElementById("contactModalTitle");
  contactName.innerHTML = `
  Contactez-moi </br>
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
