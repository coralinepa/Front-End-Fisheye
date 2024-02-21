import ImageMedia from "../models/ImageMedia.js";
import VideoMedia from "../models/VideoMedia.js";

/* Création de la media factory pour gérer le type de media */

/*méthode pour créer une instance de média en fonction des données fournies. 
Elle prend en paramètre data qui est un objet contenant des informations sur le média à créer.*/
class MediaFactory {
  static createMedia(data) {
    /*Si les données fournies contiennent une propriété image, cela signifie qu'il s'agit d'une image, 
    alors la méthode crée et retourne une instance de ImageMedia en utilisant les données fournies.*/
    if (data.image) {
      return new ImageMedia(data);
    } else if (data.video) {
      /*si les données fournies contiennent une propriété video, cela signifie qu'il s'agit d'une vidéo, alors la méthode crée 
       et retourne une instance de VideoMedia en utilisant les données fournies.*/
      return new VideoMedia(data);
    }
    /*Si les données ne correspondent à aucun type de média valide, la méthode lance une erreur avec le message "Invalid media type".*/
    throw new Error("Invalid media type");
  }
}

export default MediaFactory;
