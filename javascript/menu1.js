function initSettingsMenu1() {
  const nombreSistema = localStorage.getItem("tph_customTitleHTML");
  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Menu 🎮`;
  }

  const dropdown = document.getElementById("opcion1");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    switch (selectedValue) {
      case "tph_changetitleHTML":
        const nuevoNombre = prompt("Introduce el nuevo nombre del sistema:");
        if (nuevoNombre) {
          localStorage.setItem("tph_customTitleHTML", nuevoNombre);
          document.title = `🎮 ${nuevoNombre} | Menu 🎮`;
          alert("✅ Titulo HTML Actualizado.");
        }
        break;

      case "tph_changeTitle":
        const nuevoTitulo = prompt("Introduce el nuevo texto para el título:");
        if (nuevoTitulo) {
          localStorage.setItem("tph_customTitle", nuevoTitulo);
          alert("✅ Título Actualizado.");
        }
        break;

      case "infoAlert":
        alert("ℹ️ Esta web esta en fase de desarrollo y no esta terminada.\n\nℹ️ Esta version Nightly se actualizara cada pocos cambios aunque este en desarrollo y puedan tener fallos.\n\nℹ️ Recomiendo usar esta version a modo de prueba por futuras Carasteristicas que llegaran a tups4hen.vercel.app.");
        break;
    }

    dropdown.selectedIndex = 0;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings1 = document.getElementById("opcion1") !== null;
  if (isSettings1) {
    initSettingsMenu1();
  }
});
