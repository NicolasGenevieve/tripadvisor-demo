document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      if (scroll !== 0) {
        header.classList.add("border-bottom-grey");
      } else {
        header.classList.remove("border-bottom-grey");
      }
    });
  }

  const easterEgg = document.querySelector("#easteregg");
  if (easterEgg) {
    easterEgg.addEventListener("click", () => {
      const src = easterEgg.getAttribute("src");
      easterEgg.setAttribute(
        "src",
        src === "./ASSETS/IMG/favicon-tripadvisor.svg"
          ? "./ASSETS/IMG/easteregg.png"
          : "./ASSETS/IMG/favicon-tripadvisor.svg"
      );
    });
  }

  const buttonnav = document.querySelector(".buttonnav");
  const modal = document.querySelector(".modal-overlay");
  const cross = document.querySelector(".cross");
  const body = document.querySelector("body");

  if (buttonnav && modal && body && cross) {
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

    cross.addEventListener("click", () => {
      modal.classList.add("display-none");
      body.classList.remove("disable-scroll");
    });
  }

  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
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
  }

  const formTable = document.getElementById("data-form");
  const tableBody = document.querySelector("#data-table tbody");

  if (formTable && tableBody) {
    formTable.addEventListener("submit", function (e) {
      e.preventDefault();
      const nom = document.getElementById("nom").value;
      const age = document.getElementById("age").value;
      const mail = document.getElementById("mail").value;
      const pays = document.getElementById("pays").value;

      const newRow = document.createElement("tr");

      let countryClass = "";
      switch (pays) {
        case "France":
          countryClass = "cell-france";
          break;
        case "Espagne":
          countryClass = "cell-espagne";
          break;
        case "Italie":
          countryClass = "cell-italie";
          break;
        case "Allemagne":
          countryClass = "cell-allemagne";
          break;
        default:
          countryClass = "";
      }

      newRow.innerHTML = `
        <td>${nom}</td>
        <td>${age}</td>
        <td>${mail}</td>
        <td class="${countryClass}">${pays}</td>
        <td><button class="delete-btn">Supprimer</button></td>`;

      tableBody.appendChild(newRow);
      formTable.reset();
      updateSummaryBars();
      addDeleteListeners();
    });

    updateSummaryBars();
    addDeleteListeners();
  }

  const filter = document.getElementById("filter");
  if (filter) {
    filter.addEventListener("change", function () {
      const value = this.value;
      const rows = document.querySelectorAll("#data-table tbody tr");

      rows.forEach((row) => {
        const countryCell = row.querySelector("td:nth-child(4)");
        if (value === "all" || countryCell.textContent === value) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  }
});
