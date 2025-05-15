function initSettingsPage() {
  const whiteBG = localStorage.getItem("whiteBackground");
  const fondoAjustes = localStorage.getItem("settingsBackground");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondoAjustes) {
    applyBackground(fondoAjustes);
  } else {
    applyDefaultBackground();
  }

  const nombreSistema = localStorage.getItem("customSystemName");
  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Menu 🎮`;
  }

  const dropdown = document.getElementById("opcion2");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    // Si es una imagen extra
    if (selectedValue.startsWith("img")) {
      const numero = selectedValue.replace("img", "");
      const ruta = `background/extra${numero}.jpg`;
      localStorage.setItem("customBackground", ruta); // SOLO index.html
      alert(`✅ Fondo establecido en el menú: ${ruta}`);
    }

    // URL personalizada
    else if (selectedValue === "customURL") {
      const url = prompt("Introduce la URL de la imagen de fondo:");
      if (url) {
        localStorage.setItem("customBackground", url); // SOLO index.html
        alert("✅ Fondo personalizado guardado para el menú.");
      }
    }

    // Aplicar fondo de menú (index → ajustes)
    else if (selectedValue === "applyIndexBackground") {
      const fondoMenu = localStorage.getItem("customBackground");
      if (fondoMenu) {
        applyBackground(fondoMenu);
        localStorage.setItem("settingsBackground", fondoMenu);
        localStorage.removeItem("whiteBackground");
        alert("✅ Fondo de menú aplicado en ajustes.");
      } else {
        alert("⚠️ No se encontró fondo en el menú.");
      }
    }

    // Eliminar fondo (ambos blancos)
    else if (selectedValue === "removeBackground") {
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      localStorage.setItem("whiteBackground", "true");
      setWhiteBackground();
      alert("✅ Fondos eliminados. Ambos fondos ahora son blancos.");
    }

    // Restablecer fondo por defecto
    else if (selectedValue === "default") {
      localStorage.removeItem("customBackground");
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("whiteBackground");
      alert("✅ Fondos restablecidos por defecto.");
      location.reload();
    }

    dropdown.selectedIndex = 0; // Reiniciar selector
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
  } else {
    applyDefaultBackground();
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
  document.body.style.backgroundColor = "";
  document.body.style.backgroundImage = `url('${url}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
}

function applyDefaultBackground() {
  document.body.style.backgroundColor = "";
  document.body.style.backgroundImage = "url('background/default.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
}

function setWhiteBackground() {
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#000000"; // negro para confirmar que no hay fondo
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion2") !== null;
  if (isSettings) {
    initSettingsPage();
  } else {
    initIndexPage();
  }
});
