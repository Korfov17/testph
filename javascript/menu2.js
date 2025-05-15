function initSettingsPage() {
  const fondoAjustes = localStorage.getItem("settingsBackground");
  const whiteBG = localStorage.getItem("whiteBackground");

  if (fondoAjustes) {
    applyBackground(fondoAjustes);
  } else if (whiteBG === "true") {
    setWhiteBackground();
  } else {
    applyDefaultBackground();
  }

  const nombreSistema = localStorage.getItem("customSystemName");
  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Menu 🎮`;
  }

  setupSelector("settingsBackground");
}

function initIndexPage() {
  const fondo = localStorage.getItem("customBackground");
  const whiteBG = localStorage.getItem("whiteBackground");
  const titulo = localStorage.getItem("customTitle");
  const nombreSistema = localStorage.getItem("customSystemName");

  if (fondo) {
    applyBackground(fondo);
  } else if (whiteBG === "true") {
    setWhiteBackground();
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

  setupSelector("customBackground");
}

function setupSelector(storageKey) {
  const dropdown = document.getElementById("opcion2");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const selected = dropdown.value;
    let fondo = null;

    // Imagen predefinida
    if (selected.startsWith("img")) {
      const numero = selected.replace("img", "");
      fondo = `background/extra${numero}.jpg`;
    }

    // Imagen por URL
    else if (selected === "customURL") {
      const url = prompt("Introduce la URL de la imagen:");
      if (url) fondo = url;
    }

    // Colores sólidos
    else if (selected.startsWith("color")) {
      fondo = getColorCode(selected);
    }

    // Degradados
    else if (selected.startsWith("grad")) {
      fondo = getGradientCode(selected);
    }

    // Color por código
    else if (selected === "customColorCode") {
      const code = prompt("Introduce el código de color (ej: #ff0000 o red):");
      if (code) fondo = code;
    }

    // Aplicar fondo (imagen/color/degradado)
    if (fondo) {
      const isColor = !fondo.includes("url("); // si es color sólido o degradado

      // Vista previa
      document.body.style.background = fondo;
      document.body.style.backgroundImage = isColor ? "none" : fondo;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";

      // Confirmar si también aplicar en ajustes
      const aplicarEnSettings = confirm("¿También quieres aplicarlo en ajustes?");
      localStorage.setItem("customBackground", fondo);
      if (aplicarEnSettings) {
        localStorage.setItem("settingsBackground", fondo);
        localStorage.removeItem("whiteBackground");
      }

      alert("✅ Fondo aplicado correctamente.");
    }

    // Eliminar fondo
    else if (selected === "removeBackground") {
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      localStorage.setItem("whiteBackground", "true");
      setWhiteBackground();
      alert("✅ Fondos eliminados. Ambos fondos ahora son negros.");
    }

    // Fondo por defecto
    else if (selected === "default") {
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      localStorage.removeItem("whiteBackground");
      alert("✅ Fondos restablecidos.");
      location.reload();
    }

    dropdown.selectedIndex = 0;
  });
}

function applyBackground(fondo) {
  const isColor = !fondo.includes("url(") && !fondo.endsWith(".jpg") && !fondo.endsWith(".png");
  if (isColor) {
    document.body.style.backgroundImage = "none";
    document.body.style.background = fondo;
  } else {
    document.body.style.background = "";
    document.body.style.backgroundImage = `url('${fondo}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }
}

function applyDefaultBackground() {
  document.body.style.background = "";
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
    color1: "#ff0000", // ❤️
    color2: "#00ff00", // 💚
    color3: "#0000ff", // 💙
    color4: "#ffff00", // 💛
    color5: "#ff00ff", // 💜
    color6: "#00ffff", // 🩵
    color7: "#ffffff", // 🤍
    color8: "#000000", // 🖤
    color9: "#808080", // 🩶
    color10: "#ffa500" // 🧡
  };
  return colors[value] || "#000000";
}

function getGradientCode(value) {
  const gradients = {
    grad1: "linear-gradient(to right, #ff7e5f, #feb47b)", // 🎨
    grad2: "linear-gradient(to right, #6a11cb, #2575fc)", // 🎨
    grad3: "linear-gradient(to right, #00c6ff, #0072ff)", // 🎨
    grad4: "linear-gradient(to right, #f7971e, #ffd200)"  // 🎨
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
