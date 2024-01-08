import renderHome from "./pages/home.js";
import renderPhotographer from "./pages/photographer.js";

const pathname = window.location.pathname;
if (pathname.includes("index")) {
  renderHome();
}
if (pathname.includes("photographer")) {
  renderPhotographer();
}
