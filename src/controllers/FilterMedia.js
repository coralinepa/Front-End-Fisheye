class FilterMedia {
  constructor(medias, mediaListView, lightbox, likes) {
    this.medias = medias;
    this.mediaListView = mediaListView;
    this.lightbox = lightbox;
    this.likes = likes;
    this.dropdownSelectElement = document.getElementById("dropdownSelect");
    this.sortButtonElement = document.getElementById("sortButton");
    this.sortOptionsElement = document.getElementById("sortOptions");
    this.optionsElements =
      this.sortOptionsElement.querySelectorAll('[role="option"]');
    this.currentSort = "likes";
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.init();
  }

  toggleDropdown() {
    const isExpanded = this.sortButtonElement.getAttribute("aria-expanded");
    this.sortButtonElement.setAttribute("aria-expanded", !isExpanded);
    this.sortOptionsElement.setAttribute("aria-hidden", isExpanded);
    this.dropdownSelectElement.classList.toggle("open");
  }

  setFocus() {
    const [firstOptionElement] = this.sortOptionsElement.querySelectorAll(
      '[aria-selected="false"]'
    );
    firstOptionElement.focus();
  }

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
