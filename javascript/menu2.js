function initBackgroundSelector() {
  const whiteBG = localStorage.getItem("whiteBackground");
  const fondoAjustes = localStorage.getItem("settingsBackground");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondoAjustes) {
    applyBackground(fondoAjustes);
  } else {
    applyDefaultBackground();
  }

  const dropdown = document.getElementById("opcion2");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const value = dropdown.value;

    if (value.startsWith("img")) {
      const num = value.replace("img", "");
      const url = `background/extra${num}.jpg`;
      applyBackground(url);
      localStorage.setItem("settingsBackground", url); // SOLO settings
      localStorage.removeItem("whiteBackground");
    }

    if (value === "customURL") {
      const url = prompt("Introduce la URL de la imagen:");
      if (url) {
        applyBackground(url);
        localStorage.setItem("settingsBackground", url); // SOLO settings
        localStorage.removeItem("whiteBackground");
      }
    }

    if (value === "applyIndexBackground") {
      const indexBG = localStorage.getItem("customBackground");
      if (indexBG) {
        applyBackground(indexBG);
        localStorage.setItem("settingsBackground", indexBG); // copia a settings
        localStorage.removeItem("whiteBackground");
        alert("✅ Fondo de index aplicado en ajustes.");
      } else {
        alert("⚠️ No se encontró fondo personalizado en index.");
      }
    }

    if (value === "removeBackground") {
      setWhiteBackground();
      localStorage.removeItem("settingsBackground");
      localStorage.setItem("whiteBackground", "true");
      alert("✅ Fondo eliminado. Ajustes se verá en blanco.");
    }

    if (value === "default") {
      const url = "background/default.jpg";
      applyBackground(url);
      localStorage.setItem("settingsBackground", url); // SOLO settings
      localStorage.removeItem("whiteBackground");
      alert("✅ Fondo por defecto aplicado en ajustes.");
    }

    dropdown.selectedIndex = 0;
  });
}

function applyBackground(url) {
  document.body.style.backgroundImage = `url('${url}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundColor = "";
}

function setWhiteBackground() {
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#000000";
}

function applyDefaultBackground() {
  const url = "background/default.jpg";
  applyBackground(url);
}

document.addEventListener("DOMContentLoaded", () => {
  initBackgroundSelector();
});
