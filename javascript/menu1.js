function initSettingsMenu1() {
  const nombreSistema = localStorage.getItem("tphCustomSystemName");
  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Menu 🎮`;
  }

  const dropdown = document.getElementById("opcion1");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    switch (selectedValue) {
      case "changeSystemName":
        const nuevoNombre = prompt("Introduce el nuevo nombre del sistema:");
        if (nuevoNombre) {
          localStorage.setItem("tphCustomSystemName", nuevoNombre);
          document.title = `🎮 ${nuevoNombre} | Menu 🎮`;
          alert("✅ Nombre del sistema actualizado.");
        }
        break;

      case "changeTitle":
        const nuevoTitulo = prompt("Introduce el nuevo texto para el título:");
        if (nuevoTitulo) {
          localStorage.setItem("tphCustomTitle", nuevoTitulo);
          alert("✅ Título actualizado.");
        }
        break;

      case "infoAlert":
        alert("ℹ️ Esta web está en fase de desarrollo y no está terminada.\n\nℹ️ Esta versión Nightly se actualizará cada pocos cambios aunque esté en desarrollo y pueda tener fallos.\n\nℹ️ Recomiendo usar esta versión a modo de prueba por futuras características que llegarán a tups4hen.vercel.app.");
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
