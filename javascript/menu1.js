function initSettingsMenu1() {
  const nombreSistema = localStorage.getItem("zjb_customTitleHTML");
  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Ajustes 🎮`;
  }

  const dropdown = document.getElementById("opcion1");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    switch (selectedValue) {
      case "zjb_changetitleHTML":
        const nuevoNombre = prompt("Introduce el texto para reemplazar:");
        if (nuevoNombre) {
          localStorage.setItem("zjb_customTitleHTML", nuevoNombre);
          document.title = `🎮 ${nuevoNombre} | Ajustes 🎮`;
          alert("✅ Titulo HTML Actualizado.");
        }
        break;

      case "zjb_changeTitle":
        const nuevoTitulo = prompt("Introduce el texto para reemplazar el título principal:");
        if (nuevoTitulo) {
          localStorage.setItem("zjb_customTitle", nuevoTitulo);
          alert("✅ Título actualizado.");
        }
        break;

      case "zjb_showuseragent":
        const estadoActual = localStorage.getItem("zjb_filterUserAgent");
        localStorage.setItem(
          "zjb_filterUserAgent",
          estadoActual === "hidden" ? "visible" : "hidden"
        );
        alert("✅ Mostrar/Ocultar alternado.");
        break;

      case "infoAlert":
        alert(
          "ℹ️ Esta web esta en fase de desarrollo y no esta terminada.\n\nℹ️ Esta version Nightly se actualizara cada pocos cambios aunque este en desarrollo y puedan tener fallos.\n\nℹ️ Recomiendo usar esta version a modo de prueba por futuras Carasteristicas que llegaran a tups4hen.vercel.app."
        );
        break;
    }

    dropdown.selectedIndex = 0;
  });
}

function initIndexMenu1() {
  const titulo = localStorage.getItem("zjb_customTitle");
  const nombreSistema = localStorage.getItem("zjb_customTitleHTML");

  if (titulo) {
    const span = document.querySelector("h2 .arcoiris");
    if (span) {
      span.textContent = titulo;
    }
  }

  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Menu 🎮`;
  }

  const h3 = document.getElementById("filterUserAgent");
  if (h3) {
    const estado = localStorage.getItem("zjb_filterUserAgent");
    h3.style.display = estado === "hidden" ? "none" : "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings1 = document.getElementById("opcion1") !== null;
  if (isSettings1) {
    initSettingsMenu1();
  }

  const isIndex =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";
  if (isIndex) {
    initIndexMenu1();
  }
});
