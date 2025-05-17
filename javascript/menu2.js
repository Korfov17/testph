function initSettingsMenu2() {
  const whiteBG = localStorage.getItem("tph_whiteBackground");
  const fondoAjustes = localStorage.getItem("tph_settingsBackground");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondoAjustes) {
    applyBackground(fondoAjustes);
  } else {
    applyDefaultBackground();
  }
} 

  const dropdown = document.getElementById("opcion2");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;
    let nuevaImagen = null;
    let nuevoColor = null;
    let nuevoGradiente = null;

    // Extra IMG
    if (selectedValue.startsWith("tph_img")) {
      const numero = selectedValue.replace("tph_img", "");
      nuevaImagen = `background/extra${numero}.jpg`;
    }

    // URL Custom
    else if (selectedValue === "tph_customURL") {
      const url = prompt("Introduce la URL para aplicar como fondo:");
      if (url) nuevaImagen = url;
    }

    // Hex Color
    else if (selectedValue.startsWith("tph_")) {
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

    else if (selectedValue.startsWith("tph_gradient")) {
      const degradados = {
        tph_gradient1: "linear-gradient(to right, #2193b0, #6dd5ed)",
        tph_gradient2: "linear-gradient(to right, #ff0000, #ffff00)",
        tph_gradient3: "linear-gradient(to right, #008000, #bfff00)",
        tph_gradient4: "linear-gradient(to right, #00c6ff, #ffffff)"
      };
      nuevoGradiente = degradados[selectedValue];
    }

    // Custom Hex Color
    else if (selectedValue === "tph_customColor") {
      const colorPersonalizado = prompt("Introduce el código hexadecimal del color (ej. #ffcc00):");
      if (colorPersonalizado) nuevoColor = colorPersonalizado;
    }

    // Apply IMG
    if (nuevaImagen) {
      localStorage.setItem("tph_customBackground", nuevaImagen);
      const aplicarEnAjustes = confirm("¿Quieres aplicar el fondo en el menu de ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("tph_settingsBackground", nuevaImagen);
        localStorage.removeItem("tph_whiteBackground");
        applyBackground(nuevaImagen);
      } else {
        mantenerFondoActual();
      }
      alert("✅ Fondo guardado correctamente.");
    }

    // Apply Hex Color
    else if (nuevoColor) {
      const valor = `color:${nuevoColor}`;
      applyBackground(valor);
      localStorage.setItem("tph_customBackground", valor);
      const aplicarEnAjustes = confirm("¿Quieres aplicar este color como fondo en el menu de ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("tph_settingsBackground", valor);
        localStorage.removeItem("tph_whiteBackground");
      } else {
        mantenerFondoActual();
      }
      alert("✅ Color aplicado como fondo.");
    }

    else if (nuevoGradiente) {
      const valor = `tph_gradient:${nuevoGradiente}`;
      applyBackground(valor);
      localStorage.setItem("tph_customBackground", valor);
      const aplicarEnAjustes = confirm("¿Quieres aplicar este degradado como fondo en el menu de ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("tph_settingsBackground", valor);
        localStorage.removeItem("tph_whiteBackground");
      } else {
        mantenerFondoActual();
      }
      alert("✅ Degradado aplicado como fondo.");
    }

    // Remove Background
    else if (selectedValue === "tph_removeBackground") {
      localStorage.removeItem("tph_settingsBackground");
      localStorage.removeItem("tph_customBackground");
      localStorage.setItem("tph_whiteBackground", "true");
      setWhiteBackground();
      alert("✅ Fondo eliminado.");
    }

    // Background Default
    else if (selectedValue === "tph_default") {
      localStorage.removeItem("tph_settingsBackground");
      localStorage.removeItem("tph_customBackground");
      localStorage.removeItem("tph_whiteBackground");
      alert("✅ Fondo restablecido por defecto.");
      location.reload();
    }

    dropdown.selectedIndex = 0;
  });
}

function mantenerFondoActual() {
  const fondoActualSettings = localStorage.getItem("tph_settingsBackground");
  if (fondoActualSettings) {
    applyBackground(fondoActualSettings);
  } else if (localStorage.getItem("tph_whiteBackground") === "true") {
    setWhiteBackground();
  } else {
    applyDefaultBackground();
  }
}

function initIndexMenu2() {
  const whiteBG = localStorage.getItem("tph_whiteBackground");
  const fondo = localStorage.getItem("tph_customBackground");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondo) {
    applyBackground(fondo);
  } else {
    applyDefaultBackground();
  }
}

function applyBackground(valor) {
  if (valor.startsWith("color:")) {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = valor.replace("color:", "");
  } else if (valor.startsWith("tph_gradient:")) {
    document.body.style.backgroundColor = "";
    document.body.style.backgroundImage = valor.replace("tph_gradient:", "");
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
    initSettingsMenu2();
  } else {
    initIndexMenu2();
  }
});
