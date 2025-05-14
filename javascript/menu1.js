function initSettingsPage() {
  // Aplicar el título desde localStorage al cargar la página
  const nombreSistema = localStorage.getItem("customSystemName");
  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Menu 🎮`;
  }

  const dropdown = document.getElementById("opcion1");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    switch (selectedValue) {
      case "setBackgroundImage":
        localStorage.setItem("customBackground", "background/extra2.jpg");
        alert("✅ Imagen establecida como fondo.");
        break;

      case "changeTitle":
        const nuevoTexto = prompt("Introduce el nuevo texto para el título:");
        if (nuevoTexto) {
          localStorage.setItem("customTitle", nuevoTexto);
          alert("✅ Título actualizado.");
        }
        break;

      case "changeSystemName":
        const nuevoNombre = prompt("Introduce el nuevo nombre del sistema (ej: Mi PS4 Hack):");
        if (nuevoNombre) {
          localStorage.setItem("customSystemName", nuevoNombre);
          document.title = `🎮 ${nuevoNombre} | Menu 🎮`;
          alert("✅ Nombre del sistema actualizado.");
        }
        break;

      case "applyIndexBackground":
        const fondo = localStorage.getItem("customBackground");
        if (fondo) {
          document.body.style.backgroundImage = `url('${fondo}')`;
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          document.body.style.backgroundPosition = "center";
          alert("✅ Fondo de index aplicado en ajustes.");
        } else {
          alert("⚠️ No se encontró fondo personalizado en index.");
        }
        break;
    }

    // Restablecer el desplegable tras la acción
    dropdown.selectedIndex = 0;
  });
}

function initIndexPage() {
  const fondo = localStorage.getItem("customBackground");
  const titulo = localStorage.getItem("customTitle");
  const nombreSistema = localStorage.getItem("customSystemName");

  if (fondo) {
    document.body.style.backgroundImage = `url('${fondo}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";

    // Guardar el fondo actual como temporal por si se necesita para otras acciones
    localStorage.setItem("currentBackgroundTemp", fondo);
  }

  if (titulo) {
    const span = document.querySelector("h2 .arcoiris");
    if (span) {
      span.textContent = titulo;
    }
  }

  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Menu 🎮`;
  }
}

// Detección automática de qué página estamos
document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion1") !== null;
  if (isSettings) {
    initSettingsPage();
  } else {
    initIndexPage();
  }
});
