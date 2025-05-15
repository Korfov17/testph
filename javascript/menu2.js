function initBackgroundSelector() {
  const fondoGuardado = localStorage.getItem("settingsBackground");
  const whiteBG = localStorage.getItem("whiteBackground");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondoGuardado) {
    applyBackground(fondoGuardado);
  } else {
    applyDefaultBackground();
  }

  const dropdown = document.getElementById("opcion2");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const value = dropdown.value;

    // Si la opción es "img1" a "img15", cargar "background/extraX.jpg"
    if (value.startsWith("img")) {
      const numero = value.replace("img", "");
      const url = `background/extra${numero}.jpg`;
      applyBackground(url);
      localStorage.setItem("settingsBackground", url);
      localStorage.removeItem("whiteBackground");
    }

    // Si el usuario introduce una URL personalizada
    if (value === "customURL") {
      const url = prompt("Introduce la URL de la imagen:");
      if (url) {
        applyBackground(url);
        localStorage.setItem("settingsBackground", url);
        localStorage.removeItem("whiteBackground");
      }
    }

    // Aplica el fondo que esté en index (customBackground)
    if (value === "applyIndexBackground") {
      const indexBG = localStorage.getItem("customBackground");
      if (indexBG) {
        applyBackground(indexBG);
        localStorage.setItem("settingsBackground", indexBG);
        localStorage.removeItem("whiteBackground");
      } else {
        alert("⚠️ No se encontró fondo personalizado en index.");
      }
    }

    // Elimina el fondo actual y pone fondo blanco (negro como indicador)
    if (value === "removeBackground") {
      setWhiteBackground();
      localStorage.removeItem("settingsBackground");
      localStorage.setItem("whiteBackground", "true");
    }

    // Restaura el fondo por defecto
    if (value === "default") {
      const url = "background/default.jpg";
      applyBackground(url);
      localStorage.setItem("settingsBackground", url);
      localStorage.removeItem("whiteBackground");
    }

    // Restablece el menú desplegable a su estado inicial
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
