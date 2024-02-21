/*fonction appelée lorsque l'utilisateur appuie sur le clavier, elle prend event en paramètre qui représente l'événement de frappe au clavier*/
function handleEscapeKey(event) {
  /*la focntion vérifie si la touche appuyée est la touche "escape" en comparant event.key à la chaine de caractère escape.*/
  if (event.key === "Escape") {
    /*si la touche escape est cliquer, la focntion appelle closemodal pour fermer la modale de contact*/
    closeModal();
  }
}

/* On affiche la modal de contact */
function showModal() {
  const contentElement = document.getElementById("content");
  contentElement.setAttribute("aria-hidden", true);
  const modalElement = document.getElementById("contactModal");
  modalElement.setAttribute("aria-modal", true);
  modalElement.removeAttribute("aria-hidden");
  modalElement.style.display = "block";
  const closeModalElement = document.getElementById("closeModal");
  closeModalElement.focus();
  document.addEventListener("keydown", handleEscapeKey);
}

/* On masque la modal de contact */
function closeModal() {
  const contentElement = document.getElementById("content");
  contentElement.removeAttribute("aria-hidden");
  const modalElement = document.getElementById("contactModal");
  modalElement.setAttribute("aria-hidden", true);
  modalElement.removeAttribute("aria-modal");
  modalElement.style.display = "none";
  const contactElement = document.getElementById("photographerContact");
  contactElement.focus();
  document.removeEventListener("keydown", handleEscapeKey);
}

export { showModal, closeModal };
