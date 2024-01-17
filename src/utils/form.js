// Création d'une fonction isRequired pour vérifier si un champ obligatoire est bien renseigné
// La fonction trim() permet de supprimer les espaces vides.
function isRequired(value) {
  return value && value.trim();
}

// Création d'une fonction isEmail pour déterminer s'il s'agit d'une adresse e-mail valide et la regex permet de valider l'adresse e-mail avec les caractères adéquates.
function isEmail(value) {
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return emailRegex.test(value);
}

function getErrors(values) {
  //Création d'une constante pour stocker les erreurs des différents champs s'il y en a.
  const errors = {};

  // Instruction d'une condition : si le nom n'est pas renseigné, on ajoute une erreur à l'objet errors.
  if (!isRequired(values.firstName)) {
    errors.firstName = "Veuillez renseigner un prénom";
  }

  // Instruction d'une condition : si le prénom n'est pas renseigné, on ajoute une erreur à l'objet errors
  if (!isRequired(values.lastName)) {
    errors.lastName = "Veuillez renseigner un nom.";
  }

  // Instruction d'une condition : si l'email est invalide et ne respecte pas les caractères adéquates, on ajoute une erreur à l'objet errors
  if (!isEmail(values.email)) {
    errors.email = "Veuillez renseigner un email valide.";
  }

  // Instruction d'une condition : si le message n'est pas indiqué, on ajoute une erreur à l'objet errors.
  if (!isRequired(values.message)) {
    errors.message = "Veuillez entrer un message";
  }

  return errors;
}

function validateForm(form) {
  /* Création de constante pour récupérer les éléments html des champs du formulaire */
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  /* Stockage de ces élements dans un objet */
  const formElements = {
    firstName,
    lastName,
    email,
    message,
  };

  // Création d'une constante formData pour créer une instance formData qui contient les valeurs du formulaire.
  const formData = new FormData(form);

  // Création d'une constante values pour transformer en objet les couples clé/valeur des entrées du formulaire
  const values = Object.fromEntries(formData.entries());

  // Création d'une constante pour récupérer l'ensemble des clés des champs de formulaire
  const fieldNames = Object.keys(formElements);

  // Création d'une constante errors pour regrouper toutes les erreurs du formulaire.
  const errors = getErrors(values);

  // Création d'une constante pour savoir si la validation retourne des erreurs.
  const hasErrors = Object.keys(errors).length > 0;

  // Instruction d'une condition : s'il y a des erreurs
  // S'il y a une erreur le message d'erreur s'affiche, sinon le message ne s'affiche pas car le formulaire ne contient pas d'erreurs.
  if (hasErrors) {
    // On récupère l'ensemble des clés de nos champs de formulaire et on itère dessus
    fieldNames.forEach((field) => {
      // Pour chaque élément on récupère une erreur si elle existe
      const error = errors[field];

      const fieldElement = formElements[field];

      // Pour chaque élément on récupère l'élement qui nous permet d'afficher ou masquer l'erreur
      const errorMessageElement = fieldElement.nextElementSibling;

      if (error) {
        // Si une erreur pour le champ existe on l'affiche et on l'indique
        fieldElement.setAttribute("aria-invalid", true);
        errorMessageElement.innerHTML = error;
      } else {
        // Si une erreur n'existe pas on la masque, permet de gérer la revalidation
        fieldElement.setAttribute("aria-invalid", false);
        errorMessageElement.innerHTML = "";
      }
    });

    // Si des erreurs sont rencontrées on retourne false pour ne pas envoyer le formulaire
    return false;
  }

  console.log(values);
}

export default validateForm;
