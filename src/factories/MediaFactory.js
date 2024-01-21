import ImageMedia from "../models/ImageMedia.js";
import VideoMedia from "../models/VideoMedia.js";

/* Création de la media factory pour gérer le type de media
[Voir mes notes](NOTE.md#media-factory) */

class MediaFactory {
  static createMedia(data) {
    if (data.image) {
      return new ImageMedia(data);
    } else if (data.video) {
      return new VideoMedia(data);
    }
    throw new Error("Invalid media type");
  }
}

export default MediaFactory;
