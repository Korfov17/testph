function initSettingsPage() {
  const whiteBG = localStorage.getItem("whiteBackground");
  const fondoAjustes = localStorage.getItem("settingsBackground");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondoAjustes) {
    applyColorOrGradient(fondoAjustes);
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
    let nuevaImagen = null;

    // Imagen extra (img1, img2, etc.)
    if (selectedValue.startsWith("img")) {
      const numero = selectedValue.replace("img", "");
      nuevaImagen = `background/extra${numero}.jpg`;
    }

    // Imagen por URL
    else if (selectedValue === "customURL") {
      const url = prompt("Introduce la URL de la imagen de fondo:");
      if (url) nuevaImagen = url;
    }

    // Color sólido predefinido
    else if (selectedValue.startsWith("color")) {
      const colorMap = {
        color1: "#000000",
        color2: "#1e1e1e",
        color3: "#2c2c2c",
        color4: "#3a3a3a",
        color5: "#4b4b4b",
        color6: "#5c5c5c",
        color7: "#6d6d6d",
        color8: "#7e7e7e",
        color9: "#8f8f8f",
        color10: "#a0a0a0"
      };
      const color = colorMap[selectedValue];
      if (color) {
        aplicarColorSolido(color);
      }
    }

    // Color personalizado ingresado
    else if (selectedValue === "customColor") {
      const color = prompt("Introduce un código de color hexadecimal (ej: #1e1e1e o #FFF):");
      const hexRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;
      if (color && hexRegex.test(color)) {
        aplicarColorSolido(color);
      } else {
        alert("❌ Código de color inválido. Usa formato como #1e1e1e o #FFF.");
      }
    }

    // Degradados
    else if (selectedValue.startsWith("gradient")) {
      const gradientMap = {
        gradient1: "linear-gradient(to right, #000428, #004e92)",
        gradient2: "linear-gradient(to right, #373B44, #4286f4)",
        gradient3: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        gradient4: "linear-gradient(to right, #ff5f6d, #ffc371)"
      };
      const gradient = gradientMap[selectedValue];
      if (gradient) {
        document.body.style.backgroundImage = gradient;
        document.body.style.backgroundColor = "";

        localStorage.setItem("customBackground", `gradient:${gradient}`);
        localStorage.setItem("whiteBackground", "true");
        localStorage.removeItem("settingsBackground");

        const aplicarEnAjustes = confirm("¿También quieres aplicarlo en ajustes?");
        if (aplicarEnAjustes) {
          localStorage.setItem("settingsBackground", `gradient:${gradient}`);
          applyColorOrGradient(`gradient:${gradient}`);
        }

        alert("✅ Degradado aplicado.");
      }
    }

    // Aplicar nueva imagen (solo index, con confirm para ajustes)
    if (nuevaImagen) {
      localStorage.setItem("customBackground", nuevaImagen); // Para index.html

      const aplicarEnAjustes = confirm("¿También quieres aplicarlo en ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("settingsBackground", nuevaImagen);
        localStorage.removeItem("whiteBackground");
        applyBackground(nuevaImagen); // Mostrar en ajustes
      } else {
        const fondoActualSettings = localStorage.getItem("settingsBackground");

        if (fondoActualSettings) {
          applyColorOrGradient(fondoActualSettings);
        } else if (localStorage.getItem("whiteBackground") === "true") {
          setWhiteBackground();
        } else {
          applyDefaultBackground();
        }
      }

      alert("✅ Fondo guardado para el menú.");
    }

    // Eliminar fondo
    else if (selectedValue === "removeBackground") {
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      localStorage.setItem("whiteBackground", "true");
      setWhiteBackground();
      alert("✅ Fondos eliminados. Ambos fondos ahora son negros.");
    }

    // Restablecer fondo por defecto
    else if (selectedValue === "default") {
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      localStorage.removeItem("whiteBackground");
      alert("✅ Fondos restablecidos por defecto.");
      location.reload();
    }

    dropdown.selectedIndex = 0; // Reiniciar selector
  });
}

function aplicarColorSolido(color) {
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = color;

  localStorage.setItem("customBackground", `color:${color}`);
  localStorage.setItem("whiteBackground", "true");
  localStorage.removeItem("settingsBackground");

  const aplicarEnAjustes = confirm("¿También quieres aplicarlo en ajustes?");
  if (aplicarEnAjustes) {
    localStorage.setItem("settingsBackground", `color:${color}`);
    applyColorOrGradient(`color:${color}`);
  }

  alert("✅ Color aplicado.");
}

function initIndexPage() {
  const whiteBG = localStorage.getItem("whiteBackground");
  const fondo = localStorage.getItem("customBackground");
  const titulo = localStorage.getItem("customTitle");
  const nombreSistema = localStorage.getItem("customSystemName");

  if (whiteBG === "true") {
    if (fondo && fondo.startsWith("color:") || fondo.startsWith("gradient:")) {
      applyColorOrGradient(fondo);
    } else {
      setWhiteBackground();
    }
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

function applyColorOrGradient(entry) {
  if (entry.startsWith("color:")) {
    const color = entry.replace("color:", "");
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = color;
  } else if (entry.startsWith("gradient:")) {
    const gradient = entry.replace("gradient:", "");
    document.body.style.backgroundColor = "";
    document.body.style.backgroundImage = gradient;
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
