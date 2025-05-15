function initSettingsMenu1() {
  const nombreSistema = localStorage.getItem("customSystemName");
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
          localStorage.setItem("customSystemName", nuevoNombre);
          document.title = `🎮 ${nuevoNombre} | Menu 🎮`;
          alert("✅ Nombre del sistema actualizado.");
        }
        break;

      case "changeTitle":
        const nuevoTitulo = prompt("Introduce el nuevo texto para el título:");
        if (nuevoTitulo) {
          localStorage.setItem("customTitle", nuevoTitulo);
          alert("✅ Título actualizado.");
        }
        break;

      case "infoAlert":
        alert("ℹ️ Este es un mensaje informativo personalizado.");
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
