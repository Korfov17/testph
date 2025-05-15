function initSettingsPage() {
  const whiteBG = localStorage.getItem("whiteBackground");
  const fondoAjustes = localStorage.getItem("settingsBackground");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondoAjustes) {
    applyBackgroundOrColor(fondoAjustes);
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
    let esColor = false;  // para saber si es color sólido o degradado

    // Imagen extra (img1, img2, etc.)
    if (selectedValue.startsWith("img")) {
      const numero = selectedValue.replace("img", "");
      nuevoFondo = `background/extra${numero}.jpg`;
      esColor = false;
    }
    // Imagen por URL
    else if (selectedValue === "customURL") {
      const url = prompt("Introduce la URL de la imagen de fondo:");
      if (url) {
        nuevoFondo = url;
        esColor = false;
      }
    }
    // Colores sólidos predefinidos
    else if (selectedValue.startsWith("color")) {
      nuevoFondo = getColorCode(selectedValue);
      esColor = true;
    }
    // Degradados predefinidos
    else if (selectedValue.startsWith("grad")) {
      nuevoFondo = getGradientCode(selectedValue);
      esColor = true;
    }
    // Color personalizado por código
    else if (selectedValue === "customColorCode") {
      const code = prompt("Introduce el código del color sólido (ej: #ff0000 o red):");
      if (code) {
        nuevoFondo = code;
        esColor = true;
      }
    }

    if (nuevoFondo !== null) {
      // Aplicar fondo en index
      localStorage.setItem("customBackground", nuevoFondo);

      // Preguntar si aplicar también en ajustes
      const aplicarEnAjustes = confirm("¿También quieres aplicarlo en ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("settingsBackground", nuevoFondo);
        localStorage.removeItem("whiteBackground");
        applyBackgroundOrColor(nuevoFondo);
      } else {
        // Reaplicar fondo actual en ajustes para no cambiarlo
        const fondoActualSettings = localStorage.getItem("settingsBackground");
        if (fondoActualSettings) {
          applyBackgroundOrColor(fondoActualSettings);
        } else if (localStorage.getItem("whiteBackground") === "true") {
          setWhiteBackground();
        } else {
          applyDefaultBackground();
        }
      }
      alert("✔️ Fondo guardado para el menú.");
    }
    // Eliminar fondo
    else if (selectedValue === "removeBackground") {
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      localStorage.setItem("whiteBackground", "true");
      setWhiteBackground();
      alert("✔️ Fondos eliminados. Ambos fondos ahora son negros.");
    }
    // Restablecer fondo por defecto
    else if (selectedValue === "default") {
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      localStorage.removeItem("whiteBackground");
      alert("✔️ Fondos restablecidos por defecto.");
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
    applyBackgroundOrColor(fondo);
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

function applyBackgroundOrColor(fondo) {
  // Si el fondo empieza por linear-gradient o contiene # o es un color CSS (no url)
  if (
    fondo.startsWith("linear-gradient") ||
    fondo.startsWith("#") ||
    /^[a-zA-Z]+$/.test(fondo) // color por nombre CSS tipo "red"
  ) {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = fondo;
  } else {
    document.body.style.backgroundColor = "";
    document.body.style.backgroundImage = `url('${fondo}')`;
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

function getColorCode(value) {
  const colors = {
    color1: "#ff0000", // ❤️ rojo
    color2: "#00ff00", // 💚 verde
    color3: "#0000ff", // 💙 azul
    color4: "#ffff00", // 💛 amarillo
    color5: "#ff00ff", // 💜 magenta
    color6: "#00ffff", // 🩵 cian
    color7: "#ffffff", // 🤍 blanco
    color8: "#000000", // 🖤 negro
    color9: "#808080", // 🩶 gris
    color10: "#ffa500" // 🧡 naranja
  };
  return colors[value] || "#000000";
}

function getGradientCode(value) {
  const gradients = {
    grad1: "linear-gradient(to right, #ff7e5f, #feb47b)", // naranja-rosado
    grad2: "linear-gradient(to right, #6a11cb, #2575fc)", // morado-azul
    grad3: "linear-gradient(to right, #00c6ff, #0072ff)", // azul claro-oscuro
    grad4: "linear-gradient(to right, #f7971e, #ffd200)"  // amarillo-naranja
  };
  return gradients[value] || "linear-gradient(to right, #000000, #ffffff)";
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion2") !== null;
  if (isSettings) {
    initSettingsPage();
  } else {
    initIndexPage();
  }
});
