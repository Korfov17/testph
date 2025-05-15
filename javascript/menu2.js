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
    let nuevoFondo = null;

    // Fondos por imagen extra
    if (selectedValue.startsWith("img")) {
      const numero = selectedValue.replace("img", "");
      nuevoFondo = `background/extra${numero}.jpg`;
    }

    // Colores sólidos 🎨
    const coloresSolidos = {
      color1: "#1E1E1E", color2: "#202020", color3: "#444", color4: "#666",
      color5: "#999", color6: "#111", color7: "#222", color8: "#333",
      color9: "#555", color10: "#777"
    };
    if (selectedValue in coloresSolidos) {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = coloresSolidos[selectedValue];
      localStorage.setItem("whiteBackground", "true");
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      alert("✅ Color aplicado como fondo.");
      dropdown.selectedIndex = 0;
      return;
    }

    // Degradados 🌈
    const degradados = {
      gradient1: "linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)",   // Azul → Morado
      gradient2: "linear-gradient(to right, #ff512f, #f09819)",            // Naranja → Amarillo
      gradient3: "linear-gradient(to right, #00c6ff, #0072ff)",            // Verde → Azul
      gradient4: "linear-gradient(to right, #ff9a9e, #fad0c4)"             // Rosa → Lila
    };
    if (selectedValue in degradados) {
      document.body.style.backgroundImage = degradados[selectedValue];
      document.body.style.backgroundColor = "";
      localStorage.setItem("whiteBackground", "true");
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      alert("✅ Degradado aplicado como fondo.");
      dropdown.selectedIndex = 0;
      return;
    }

    // Color personalizado
    if (selectedValue === "customColor") {
      const color = prompt("Introduce un código de color hexadecimal (ej: #1e1e1e):");
      if (color) {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = color;
        localStorage.setItem("whiteBackground", "true");
        localStorage.removeItem("settingsBackground");
        localStorage.removeItem("customBackground");
        alert("✅ Color personalizado aplicado.");
      }
      dropdown.selectedIndex = 0;
      return;
    }

    // Fondo por URL
    if (selectedValue === "customURL") {
      const url = prompt("Introduce la URL de la imagen de fondo:");
      if (url) nuevoFondo = url;
    }

    // Aplicar fondo seleccionado
    if (nuevoFondo) {
      localStorage.setItem("customBackground", nuevoFondo);
      const aplicarEnAjustes = confirm("¿También quieres aplicarlo en ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("settingsBackground", nuevoFondo);
        localStorage.removeItem("whiteBackground");
        applyBackground(nuevoFondo);
      } else {
        const fondoActualSettings = localStorage.getItem("settingsBackground");
        if (fondoActualSettings) {
          applyBackground(fondoActualSettings);
        } else if (localStorage.getItem("whiteBackground") === "true") {
          setWhiteBackground();
        } else {
          applyDefaultBackground();
        }
      }
      alert("✅ Fondo guardado para el menú.");
    }

    // Eliminar fondo ❌
    if (selectedValue === "removeBackground") {
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      localStorage.setItem("whiteBackground", "true");
      setWhiteBackground();
      alert("✅ Fondos eliminados. Ambos fondos ahora son blancos.");
    }

    // Fondo por defecto ♻️
    if (selectedValue === "default") {
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      localStorage.removeItem("whiteBackground");
      alert("✅ Fondos restablecidos por defecto.");
      location.reload();
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
  document.body.style.backgroundColor = "#000000"; // fondo neutro para confirmar
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion2") !== null;
  if (isSettings) {
    initSettingsPage();
  } else {
    initIndexPage();
  }
});
