import Media from "./Media.js";

/*Cette classe étend la classe Media, ce qui signifie qu'elle hérite de toutes ses propriétés.*/
class VideoMedia extends Media {
  /*Le constructeur de la classe VideoMedia prend un objet data en paramètre. Ce paramètre data est censé contenir des informations sur l'image*/
  constructor(data) {
    /*La méthode super(data) appelle le constructeur de la classe parente Media, ce qui permet d'initialiser les propriétés héritées de manière appropriée.*/
    super(data);
    /*le constructeur initialise les propriétés spécifiques à une vidéo*/
    this.video = data.video;
    this.src = `assets/photographers/${data.photographerId}/${data.video}`;
  }
}

export default VideoMedia;
