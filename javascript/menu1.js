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
        break;

      case "changeTitle":
        const nuevoTexto = prompt("Introduce el nuevo texto para el título:");
        if (nuevoTexto) {
          localStorage.setItem("customTitle", nuevoTexto);
        }
        break;

      case "changeSystemName":
        const nuevoNombre = prompt("Introduce el nuevo nombre del sistema (ej: Mi PS4 Hack):");
        if (nuevoNombre) {
          localStorage.setItem("customSystemName", nuevoNombre);
          document.title = `🎮 ${nuevoNombre} | Menu 🎮`;
        }
        break;
    }

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
