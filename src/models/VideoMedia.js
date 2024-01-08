import Media from "./Media.js";

class VideoMedia extends Media {
  constructor(data) {
    super(data);
    this.video = data.video;
  }
}

export default VideoMedia;
