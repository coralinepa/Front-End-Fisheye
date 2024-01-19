import Media from "./Media.js";

class ImageMedia extends Media {
  constructor(data) {
    super(data);
    this.image = data.image;
    this.src = `assets/photographers/${data.photographerId}/${data.image}`;
  }
}

export default ImageMedia;
