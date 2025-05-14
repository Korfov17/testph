function initSettingsPage() {
  const whiteBG = localStorage.getItem("whiteBackground");
  const fondoAjustes = localStorage.getItem("settingsBackground");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondoAjustes) {
    applyBackground(fondoAjustes);
  }

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
        localStorage.removeItem("whiteBackground");
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
        const nuevoNombre = prompt("Introduce el nuevo nombre del sistema:");
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
          localStorage.removeItem("whiteBackground");
          alert("✅ Fondo de index aplicado en ajustes.");
        } else {
          alert("⚠️ No se encontró fondo personalizado en index.");
        }
        break;

      case "removeBackground":
        localStorage.removeItem("customBackground");
        localStorage.removeItem("settingsBackground");
        localStorage.setItem("whiteBackground", "true");
        setWhiteBackground();
        alert("✅ Fondo eliminado. Ambas páginas ahora están en blanco.");
        break;
    }

    dropdown.selectedIndex = 0;
  });
}

function initIndexPage() {
  const whiteBG = localStorage.getItem("whiteBackground");
  const fondo = localStorage.getItem("customBackground");
  const titulo = localStorage.getItem("customTitle");
  const nombreSistema = localStorage.getItem("customSystemName");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondo) {
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
  document.body.style.backgroundColor = "";
}

function setWhiteBackground() {
  document.body.style.background = "#ffffff";
  document.body.style.backgroundImage = "none";
}

function resetAllSettings() {
  const confirmar = confirm("¿Estás seguro de que quieres restablecer todos los ajustes?");
  if (confirmar) {
    localStorage.removeItem("customBackground");
    localStorage.removeItem("settingsBackground");
    localStorage.removeItem("customTitle");
    localStorage.removeItem("customSystemName");
    localStorage.removeItem("whiteBackground");
    alert("✅ Ajustes restablecidos. Se usará la configuración por defecto.");
    location.reload();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion1") !== null;
  if (isSettings) {
    initSettingsPage();
  } else {
    initIndexPage();
  }
});
