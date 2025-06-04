document.addEventListener("DOMContentLoaded", () => {
  const buttonnav = document.querySelector(".buttonnav");
  const modal = document.querySelector(".modal-overlay");
  const body = document.querySelector("body");
  const header = document.querySelector("header");

  buttonnav.addEventListener("click", () => {
    modal.classList.remove("display-none");
    body.classList.add("disable-scroll");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("display-none");
      body.classList.remove("disable-scroll");
    }
  });

  window.addEventListener("scroll", () => {
    let scroll = window.scrollY;
    if (scroll !== 0) {
      header.classList.add("border-bottom-grey");
    } else {
      header.classList.remove("border-bottom-grey");
    }
  });

  const easterEgg = document.querySelector("#easteregg");
  easterEgg.addEventListener("click", () => {
    const src = easterEgg.getAttribute("src");
    if (src === "./ASSETS/IMG/favicon-tripadvisor.svg") {
      easterEgg.setAttribute("src", "./ASSETS/IMG/easteregg.png");
    } else {
      easterEgg.setAttribute("src", "./ASSETS/IMG/favicon-tripadvisor.svg");
    }
  });
});
