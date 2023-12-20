//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographer(id) {
  const response = await fetch("data/photographers.json");
  const { photographers = [] } = await response.json();
  const photographer = photographers.find(
    (photographer) => photographer.id === id
  );

  return photographer;
}

function displayData(photographer) {
  console.log(photographer);
}

async function init() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const photographerId = Number(urlSearchParams.get("id"));
  const photographer = await getPhotographer(photographerId);
  displayData(photographer);
}

init();
