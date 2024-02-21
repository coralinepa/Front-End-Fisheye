class FilterMedia {
  /*Le constructeur prend quatre paramètres : medias (la liste des médias à filtrer/trier), mediaListView (la vue de la galerie des médias), lightbox (la lightbox pour afficher les médias en grand) et likes (la fonctionnalité de gestion des likes).*/
  constructor(medias, mediaListView, lightbox, likes) {
    this.medias = medias;
    this.mediaListView = mediaListView;
    this.lightbox = lightbox;
    this.likes = likes;

    /*Il initialise plusieurs propriétés de l'instance, notamment les éléments HTML associés au bouton de tri, aux options de tri, et aux options elles-mêmes.*/
    this.dropdownSelectElement = document.getElementById("dropdownSelect");
    this.sortButtonElement = document.getElementById("sortButton");
    this.sortOptionsElement = document.getElementById("sortOptions");
    this.optionsElements =
      this.sortOptionsElement.querySelectorAll('[role="option"]');
    this.currentSort = "likes";
    /*l attache la méthode handleKeyDown à l'instance en la liant à this.*/
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.init();
  }

  /*Cette méthode bascule l'état d'expansion du menu déroulant de tri en modifiant les attributs aria-expanded et aria-hidden et en ajoutant ou supprimant la classe CSS open pour afficher ou masquer le menu déroulant.*/
  toggleDropdown() {
    const isExpanded = this.sortButtonElement.getAttribute("aria-expanded");
    this.sortButtonElement.setAttribute("aria-expanded", !isExpanded);
    this.sortOptionsElement.setAttribute("aria-hidden", isExpanded);
    this.dropdownSelectElement.classList.toggle("open");
  }

  /*Cette méthode détermine quel élément doit avoir le focus lorsque le menu déroulant est ouvert, en mettant le focus sur la première option qui n'est pas déjà sélectionnée.*/
  setFocus() {
    const [firstOptionElement] = this.sortOptionsElement.querySelectorAll(
      '[aria-selected="false"]'
    );
    firstOptionElement.focus();
  }

  /*Cette méthode est appelée lorsque l'utilisateur sélectionne une option dans le menu déroulant.
  Elle met à jour la valeur de tri actuelle, modifie les attributs aria-selected des options, affiche le libellé de l'option sélectionnée dans le bouton de tri, réinitialise le focus et trie les médias en fonction de la nouvelle option sélectionnée.*/
  selectOption(event) {
    const previousSortValue = this.currentSort;
    const nextSortElement = event.target;
    const nextSortValue = nextSortElement.getAttribute("data-value");
    this.currentSort = nextSortValue;

    const previousSortElement = sortOptions.querySelector(
      `[data-value=${previousSortValue}]`
    );
    previousSortElement.style.display = "block";
    previousSortElement.setAttribute("aria-selected", false);

    nextSortElement.style.display = "none";
    nextSortElement.setAttribute("aria-selected", true);

    document.getElementById("currentSort").textContent =
      event.target.textContent;

    this.setFocus();
    this.sortBy(this.currentSort);
  }

  /*Ces méthodes gèrent la navigation dans les options du menu déroulant à l'aide des touches de flèche haut et bas, en déterminant quelle option doit recevoir le focus après chaque pression de touche.*/
  handleArrowDown(event, currentFocus) {
    event.preventDefault();
    const nextElement = currentFocus?.nextElementSibling;
    const nextElementIsSelected =
      nextElement &&
      nextElement.getAttribute("data-value") === this.currentSort;

    const nextElementToFocus = nextElementIsSelected
      ? nextElement.nextElementSibling
      : nextElement;

    if (nextElementToFocus) {
      nextElementToFocus.focus();
    }
  }

  handleArrowUp(event, currentFocus) {
    event.preventDefault();
    const previousElement = currentFocus?.previousElementSibling;
    const previousElementIsSelected =
      previousElement &&
      previousElement.getAttribute("data-value") === this.currentSort;

    const previousElementToFocus = previousElementIsSelected
      ? previousElement.previousElementSibling
      : previousElement;

    if (previousElementToFocus) {
      previousElementToFocus.focus();
    }
  }

  /*- Cette méthode est appelée lorsqu'une touche est enfoncée dans le menu déroulant.
- Elle appelle les méthodes appropriées en fonction de la touche enfoncée : `handleArrowDown()`, `handleArrowUp()`, `selectOption()` ou `toggleDropdown()`.*/
  handleKeyDown(event) {
    const currentFocus = document.activeElement;

    if (event.key === "ArrowDown") {
      this.handleArrowDown(event, currentFocus);
    }

    if (event.key === "ArrowUp") {
      this.handleArrowUp(event, currentFocus);
    }

    if (event.key === "Enter") {
      this.selectOption(event);
    }
    if (event.key === "Escape") {
      this.toggleDropdown();
      this.sortButtonElement.focus();
    }
  }

  /*- Cette méthode initialise la fonctionnalité de tri.
- Elle attache des gestionnaires d'événements aux éléments HTML associés au bouton de tri et aux options de tri.
- Elle attache également `handleKeyDown()` à l'événement `keydown` sur le menu déroulant.*/
  init() {
    this.sortBy(this.currentSort);

    this.sortButtonElement.addEventListener("click", () => {
      this.toggleDropdown();
      this.setFocus();
    });

    this.optionsElements.forEach((optionElement) => {
      optionElement.addEventListener("click", (event) => {
        this.selectOption(event);
      });
    });

    this.sortOptionsElement.addEventListener("keydown", this.handleKeyDown);
  }
  /*- Cette méthode trie les médias en fonction du filtre sélectionné.
   Elle utilise une instruction switch pour trier les médias en fonction des différents critères : par likes, par date, ou par titre.
   Une fois le tri effectué, elle actualise la vue de la galerie des médias, initialise la lightbox et initialise la fonctionnalité de gestion des likes.*/
  sortBy(filter) {
    switch (filter) {
      case "likes":
        this.medias.sort((a, b) => Number(a.likes) - Number(b.likes)).reverse();
        break;
      case "date":
        this.medias
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .reverse();
        break;
      case "title":
        this.medias.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    this.mediaListView.render();
    this.lightbox.init();
    this.likes.init();
  }
}

export default FilterMedia;
