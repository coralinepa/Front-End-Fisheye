import renderHome from "./pages/home.js";
import renderPhotographer from "./pages/photographer.js";

/*orchestre en fonction de l'url va appeler la fonction pour faire le rendu de la page*/
const pathname = window.location.pathname;
if (pathname.includes("index")) {
  renderHome();
}
if (pathname.includes("photographer")) {
  renderPhotographer();
}
