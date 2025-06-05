document.addEventListener("DOMContentLoaded", () => {
  const buttonnav = document.querySelector(".buttonnav");
  const modal = document.querySelector(".modal-overlay");
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const cross = document.querySelector(".cross");

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

  cross.addEventListener("click", () => {
    modal.classList.add("display-none");
    body.classList.remove("disable-scroll");
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

  document
    .querySelector("#contactForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        firstname: document.querySelector("#firstname").value,
        lastname: document.querySelector("#lastname").value,
        email: document.querySelector("#email").value,
        message: document.querySelector("#message").value,
      };

      const response = await axios.post(
        "https://site--tripadvisor-demo--7c4ycv44wqj9.code.run/form",
        data
      );
      console.log(response);
    });
});
