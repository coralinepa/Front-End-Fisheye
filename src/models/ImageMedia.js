import Media from "./Media.js";

/*Cette classe étend la classe Media, ce qui signifie qu'elle hérite de toutes ses propriétés.*/
class ImageMedia extends Media {
  /*Le constructeur de la classe ImageMedia prend un objet data en paramètre. Ce paramètre data est censé contenir des informations sur l'image*/
  constructor(data) {
    /*La méthode super(data) appelle le constructeur de la classe parente Media, ce qui permet d'initialiser les propriétés héritées de manière appropriée.*/
    super(data);
    /*le constructeur initialise les propriétés spécifiques à une image*/
    this.image = data.image;
    this.src = `assets/photographers/${data.photographerId}/${data.image}`;
  }
}
export default ImageMedia;
