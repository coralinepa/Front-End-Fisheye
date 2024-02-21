/*Cette classe est conçue pour être une classe générique représentant un média. */

class Media {
  /*Le constructeur de la classe Media prend un objet data en paramètre, qui est censé contenir des informations sur le média*/
  constructor(data) {
    /*Le constructeur initialise les propriétés de l'instance de Media avec les valeurs fournies dans l'objet data*/
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.liked = false;
  }
}

export default Media;
