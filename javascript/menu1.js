function initSettingsPage() {
  // Aplicar fondo personalizado guardado para settings
  const fondoAjustes = localStorage.getItem("settingsBackground");
  if (fondoAjustes) {
    document.body.style.backgroundImage = `url('${fondoAjustes}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }

  // Aplicar el título desde localStorage al cargar
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

          // Guardar también como fondo de ajustes para que persista
          localStorage.setItem("settingsBackground", fondo);
          alert("✅ Fondo de index aplicado y guardado en ajustes.");
        } else {
          alert("⚠️ No se encontró fondo personalizado en index.");
        }
        break;

      case "resetSettings":
        resetAllSettings();
        break;
    }

    // Restablecer selección
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

    // Guardar como fondo actual temporal (opcional)
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

function resetAllSettings() {
  const confirmar = confirm("¿Estás seguro de que quieres restablecer todos los ajustes?");
  if (confirmar) {
    localStorage.removeItem("customBackground");
    localStorage.removeItem("customTitle");
    localStorage.removeItem("customSystemName");
    localStorage.removeItem("currentBackgroundTemp");
    localStorage.removeItem("settingsBackground");
    alert("✅ Todos los ajustes han sido restablecidos.");
    location.reload();
  }
}

// Detectar qué página es
document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion1") !== null;
  if (isSettings) {
    initSettingsPage();
  } else {
    initIndexPage();
  }
});
