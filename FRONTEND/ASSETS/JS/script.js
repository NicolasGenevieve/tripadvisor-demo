function exportToExcel() {
  const table = document.getElementById("data-table");
  const wb = XLSX.utils.table_to_book(table, { sheet: "Feuille1" });
  XLSX.writeFile(wb, "tableau.xlsx");
}

window.exportToPDF = async function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("landscape");

  const table = document.getElementById("data-table");

  const rows = Array.from(table.querySelectorAll("tbody tr")).map((row) =>
    Array.from(row.querySelectorAll("td")).map((cell) =>
      cell.textContent.trim()
    )
  );

  const headers = Array.from(table.querySelectorAll("thead th")).map((th) =>
    th.textContent.trim()
  );

  doc.autoTable({
    head: [headers],
    body: rows,
    theme: "grid", // ou "striped", "plain"
    styles: {
      fontSize: 12,
      cellPadding: 4,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: [50, 50, 50], // gris foncé
      textColor: [255, 255, 255], // texte blanc
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240], // gris clair pour une ligne sur deux
    },
    didParseCell: function (data) {
      // Appliquer un style selon le contenu d'une cellule
      if (data.section === "body") {
        if (data.column.index === 3) {
          // colonne "pays"
          if (data.cell.raw === "France") {
            data.cell.styles.fillColor = [0, 85, 255]; // bleu
            data.cell.styles.textColor = [255, 255, 255]; // blanc
          } else if (data.cell.raw === "Espagne") {
            data.cell.styles.fillColor = [255, 215, 0]; // jaune
            data.cell.styles.textColor = [0, 0, 0];
          } else if (data.cell.raw === "Italie") {
            data.cell.styles.fillColor = [0, 170, 80]; // vert
            data.cell.styles.textColor = [255, 255, 255];
          }
        }
      }
    },
  });

  doc.save("tableau.pdf");
};

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

  const formTable = document.getElementById("data-form");
  const tableBody = document.querySelector("#data-table tbody");

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
                <td class="${countryClass}">${pays}</td>`;
    tableBody.appendChild(newRow);
    formTable.reset();
  });

  document.getElementById("filter").addEventListener("change", function () {
    const value = this.value;
    const rows = document.querySelectorAll("#data-table tbody tr");

    rows.forEach((row) => {
      const countryCell = row.querySelector("td:last-child");
      if (value === "all" || countryCell.textContent === value) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});
