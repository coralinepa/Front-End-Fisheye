function handleKeydown(event) {
  const keyCode = event.keyCode ? event.keyCode : event.which;

  if (keyCode === 39) {
    goToNextSlide();
  }

  if (keyCode === 37) {
    goToPreviousSlide();
  }
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}
