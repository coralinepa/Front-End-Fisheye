/*cette classe représnete un photographe et ses informations*/
class Photographer {
  /*le constructeur de la classe photographer prend un objet data en paramètre qui est censé contenir les informations du photographe*/
  constructor(data) {
    /*Le constructeur initialise les propriétés de l'instance de Photographer avec les valeurs fournies dans l'objet data. 
    Chaque propriété est assignée à partir des données fournies.*/
    this.id = data.id;
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
  }
}

export default Photographer;
