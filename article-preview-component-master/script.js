document.addEventListener("DOMContentLoaded", () => {
  const shareContainer = document.querySelector(".share-active");
  const detailsContainer = document.querySelector(".details");
  const shareIcon = document.querySelector(".details i");
  const pageWidth = window.innerWidth;
  if (pageWidth <= 678) {
    shareIcon.addEventListener("click", () => {
      detailsContainer.classList.add("hidden");
      shareContainer.classList.remove("hidden");
    });
  } else {
    shareIcon.addEventListener("mouseover", () => {
      shareContainer.classList.remove("hidden");
    });
	shareIcon.addEventListener('mouseout', ()=> {
		shareContainer.classList.add('hidden')
	})
  }
});
