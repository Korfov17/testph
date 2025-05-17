function initSettingsPage() {
  const whiteBG = localStorage.getItem("tph.whiteBackground");
  const fondoAjustes = localStorage.getItem("tph.settingsBackground");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondoAjustes) {
    applyBackground(fondoAjustes);
  } else {
    applyDefaultBackground();
  }

  const nombreSistema = localStorage.getItem("tph.customtitleHTML");
  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Menu 🎮`;
  }

  const dropdown = document.getElementById("opcion2");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;
    let nuevaImagen = null;
    let nuevoColor = null;
    let nuevoGradiente = null;

    // Extra IMG
    if (selectedValue.startsWith("tph.img")) {
      const numero = selectedValue.replace("tph.img", "");
      nuevaImagen = `background/extra${numero}.jpg`;
    }

    // URL Custom
    else if (selectedValue === "tph.customURL") {
      const url = prompt("Introduce la URL de la imagen como fondo que quieres insertar:");
      if (url) nuevaImagen = url;
    }

    // Hex Color
    else if (selectedValue.startsWith("tph.")) {
      const colores = {
        solidRed: "#ff0000",
        solidBlue: "#0000ff",
        solidGreen: "#16b516",
        solidYellow: "#ffff00",
        solidOrange: "#eb6b00",
        solidPurple: "#800080",
        solidPink: "#e02284",
        solidBrown: "#8b4513",
        solidGray: "#b4b4b4",
        solidBlack: "#000000"
      };
      nuevoColor = colores[selectedValue];
    }

    else if (selectedValue.startsWith("tph.gradient")) {
      const degradados = {
        tph.gradient1: "linear-gradient(to right, #2193b0, #6dd5ed)",
        tph.gradient2: "linear-gradient(to right, #ff0000, #ffff00)",
        tph.gradient3: "linear-gradient(to right, #008000, #bfff00)",
        tph.gradient4: "linear-gradient(to right, #00c6ff, #ffffff)"
      };
      nuevoGradiente = degradados[selectedValue];
    }

    // Custom Hex Color
    else if (selectedValue === "tph.customColor") {
      const colorPersonalizado = prompt("Introduce el código del color (ej. #ffcc00):");
      if (colorPersonalizado) nuevoColor = colorPersonalizado;
    }

    // Apply IMG
    if (nuevaImagen) {
      localStorage.setItem("tph.customBackground", nuevaImagen);
      const aplicarEnAjustes = confirm("¿También quieres aplicar el fondo en ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("tph.settingsBackground", nuevaImagen);
        localStorage.removeItem("tph.whiteBackground");
        applyBackground(nuevaImagen);
      } else {
        mantenerFondoActual();
      }
      alert("✅ Fondo cambiado.");
    }

    // Apply Hex Color
    else if (nuevoColor) {
      const valor = `color:${nuevoColor}`;
      applyBackground(valor);
      localStorage.setItem("customBackground", valor);
      const aplicarEnAjustes = confirm("¿También quieres aplicar este color en ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("settingsBackground", valor);
        localStorage.removeItem("whiteBackground");
      } else {
        mantenerFondoActual();
      }
      alert("✅ Color aplicado como fondo.");
    }

    else if (nuevoGradiente) {
      const valor = `gradient:${nuevoGradiente}`;
      applyBackground(valor);
      localStorage.setItem("tph.customBackground", valor);
      const aplicarEnAjustes = confirm("¿También quieres aplicar este fondo degradado en ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("tph.settingsBackground", valor);
        localStorage.removeItem("tph.whiteBackground");
      } else {
        mantenerFondoActual();
      }
      alert("✅ Fondo con color Degradado aplicado.");
    }

    // Remove Background
    else if (selectedValue === "tph.removeBackground") {
      localStorage.removeItem("tph.settingsBackground");
      localStorage.removeItem("tph.customBackground");
      localStorage.setItem("tph.whiteBackground", "true");
      setWhiteBackground();
      alert("✅ Fondo eliminado completamente.");
    }

    // Background Default
    else if (selectedValue === "tph.default") {
      localStorage.removeItem("tph.settingsBackground");
      localStorage.removeItem("tph.customBackground");
      localStorage.removeItem("tph.whiteBackground");
      alert("✅ Fondo restablecido por defecto.");
      location.reload();
    }

    dropdown.selectedIndex = 0;
  });
}

function mantenerFondoActual() {
  const fondoActualSettings = localStorage.getItem("tph.settingsBackground");
  if (fondoActualSettings) {
    applyBackground(fondoActualSettings);
  } else if (localStorage.getItem("tph.whiteBackground") === "true") {
    setWhiteBackground();
  } else {
    applyDefaultBackground();
  }
}

function initIndexPage() {
  const whiteBG = localStorage.getItem("tph.whiteBackground");
  const fondo = localStorage.getItem("tph.customBackground");
  const titulo = localStorage.getItem("tph.customTitle");
  const nombreSistema = localStorage.getItem("tph.customtitleHTML");

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

function applyBackground(valor) {
  if (valor.startsWith("color:")) {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = valor.replace("color:", "");
  } else if (valor.startsWith("tph.gradient:")) {
    document.body.style.backgroundColor = "";
    document.body.style.backgroundImage = valor.replace("tph.gradient:", "");
  } else {
    document.body.style.backgroundColor = "";
    document.body.style.backgroundImage = `url('${valor}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }
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
  document.body.style.backgroundColor = "#000000";
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion2") !== null;
  if (isSettings) {
    initSettingsPage();
  } else {
    initIndexPage();
  }
});
