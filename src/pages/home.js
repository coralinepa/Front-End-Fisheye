import Photographer from "../models/Photographer.js";
import PhotographerListView from "../views/PhotographerList.js";

/*Récupère les données à partir du fichier JSON en utilisant l'API Fetch. 
Ensuite, elle extrait le tableau "photographers" de la réponse JSON et le retourne */
async function getPhotographers() {
  try {
    const response = await fetch("data/photographers.json");
    const { photographers } = await response.json();
    return photographers;
  } catch (error) {
    console.error(error);
  }
}

/*Cette fonction sert de point d'entrée. 
Elle appelle d'abord la fonction getPhotographers pour récupérer les données des photographes. 
Ensuite, elle parcourt le tableau des photographes en créant des instances de la classe Photographer pour chaque objet photographe du tableau. 
Elle crée une nouvelle instance de la classe PhotographerListView en passant le tableau d'instances de Photographer en tant que paramètre. 
Enfin, elle appelle la méthode render de l'objet view pour afficher la liste des photographes.*/

async function renderHome() {
  const photographersData = await getPhotographers();
  const photographers = photographersData.map(
    (photographer) => new Photographer(photographer)
  );
  const view = new PhotographerListView(photographers);

  view.render();
}

export default renderHome;
