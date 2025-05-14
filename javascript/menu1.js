function initSettingsPage() {
  // Aplicar fondo personalizado guardado para settings (si existe)
  const fondoAjustes = localStorage.getItem("settingsBackground");
  if (fondoAjustes) {
    applyBackground(fondoAjustes);
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
        const url = "background/extra2.jpg";
        localStorage.setItem("customBackground", url);
        applyBackground(url);
        alert("✅ Imagen establecida como fondo en index.");
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
          applyBackground(fondo);
          localStorage.setItem("settingsBackground", fondo);
          alert("✅ Fondo de index aplicado y guardado en ajustes.");
        } else {
          alert("⚠️ No se encontró fondo personalizado en index.");
        }
        break;

      case "removeBackground":
        localStorage.removeItem("customBackground");
        localStorage.removeItem("settingsBackground");
        document.body.style.background = ""; // Elimina inline styles, se usará el fondo por defecto del HTML
        alert("✅ Fondo eliminado. Se usará el definido por defecto en el HTML.");
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
    applyBackground(fondo);
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

function applyBackground(url) {
  document.body.style.backgroundImage = `url('${url}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
}

function resetAllSettings() {
  const confirmar = confirm("¿Estás seguro de que quieres restablecer todos los ajustes?");
  if (confirmar) {
    localStorage.removeItem("customBackground");
    localStorage.removeItem("customTitle");
    localStorage.removeItem("customSystemName");
    localStorage.removeItem("settingsBackground");

    alert("✅ Todos los ajustes han sido restablecidos. Se usará la configuración por defecto del HTML.");
    location.reload();
  }
}

// Detectar en qué página estamos
document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion1") !== null;
  if (isSettings) {
    initSettingsPage();
  } else {
    initIndexPage();
  }
});
