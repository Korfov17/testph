// Actualización de initSettingsMenu4 y initIndexMenu4 con todas las funciones nuevas y arregladas

function initSettingsMenu4() {
  const dropdown = document.getElementById("opcion4");
  if (!dropdown) return;

  const coloresConCodigo = {
    blue: "#0000FF",
    green: "#008000",
    red: "#FF0000",
    orange: "#FFA500",
    purple: "#800080",
    black: "#000000",
    white: "#FFFFFF",
    gray: "#808080"
  };

  const isSettings = true;

  dropdown.addEventListener("change", async () => {
    const value = dropdown.value;

    const applyToSettings = await (async () => {
      return confirm("¿Deseas aplicar este cambio también en Settings?");
    })();

    function updateElements(selector, callback) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(callback);
    }

    switch (value) {
      case "zjb_sizefont1": {
        const current = 3;
        const size = prompt(`Tamaño actual: ${current}rem\n¿Qué tamaño deseas aplicar al título (h2)?`);
        if (!size || isNaN(size)) return;
        updateElements("h2", el => el.style.fontSize = `${size}rem`);
        localStorage.setItem("zjb_sizefont1", size);
        if (applyToSettings) localStorage.setItem("zjb_sizefont1_settings", size);
        break;
      }
      case "zjb_changeicon": {
        const current = "fa-playstation";
        const icon = prompt(`Icono actual: ${current}\n¿Qué icono deseas aplicar?`);
        if (!icon) return;
        updateElements("h2 i", el => {
          el.className = `fab ${icon}`;
        });
        localStorage.setItem("zjb_changeicon", icon);
        if (applyToSettings) localStorage.setItem("zjb_changeicon_settings", icon);
        break;
      }
      case "zjb_margintitle": {
        const current = 10;
        const msg = `Separación actual: ${current}px\nValores sugeridos:\nPequeño: 5\nMediano: 10\nGrande: 20`;
        const margin = prompt(msg);
        if (!margin || isNaN(margin)) return;
        updateElements("h2", el => el.style.margin = `${margin}px`);
        localStorage.setItem("zjb_margintitle", margin);
        if (applyToSettings) localStorage.setItem("zjb_margintitle_settings", margin);
        break;
      }
      case "zjb_bordertitle": {
        const presets = {
          "0": "none",
          "2": "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black",
          "4": "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black"
        };
        const preset = prompt("Presets disponibles: 0 (sin borde), 2 (por defecto), 4 (más fuerte)");
        if (!preset || !presets[preset]) return;
        updateElements("h2", el => el.style.textShadow = presets[preset]);
        localStorage.setItem("zjb_bordertitle", preset);
        if (applyToSettings) localStorage.setItem("zjb_bordertitle_settings", preset);
        break;
      }
      case "zjb_showiconfa": {
        let current = localStorage.getItem("zjb_showiconfa") || "visible";
        const newState = current === "visible" ? "hidden" : "visible";
        updateElements("h2 i", el => el.style.visibility = newState);
        localStorage.setItem("zjb_showiconfa", newState);
        if (applyToSettings) localStorage.setItem("zjb_showiconfa_settings", newState);
        alert(`Iconos ahora están: ${newState}`);
        break;
      }
      case "zjb_sizefont2": {
        const h3size = prompt("Tamaño de h3 actual: 1.4rem\n¿Qué tamaño deseas aplicar?");
        if (h3size && !isNaN(h3size)) {
          updateElements("h3", el => el.style.fontSize = `${h3size}rem`);
          localStorage.setItem("zjb_sizefont2_h3", h3size);
          if (applyToSettings) localStorage.setItem("zjb_sizefont2_h3_settings", h3size);
        }
        const h4size = prompt("Tamaño de h4 actual: 1.6rem\n¿Qué tamaño deseas aplicar?");
        if (h4size && !isNaN(h4size)) {
          updateElements("h4", el => el.style.fontSize = `${h4size}rem`);
          localStorage.setItem("zjb_sizefont2_h4", h4size);
          if (applyToSettings) localStorage.setItem("zjb_sizefont2_h4_settings", h4size);
        }
        break;
      }
      case "zjb_colorfont": {
        const opciones = Object.keys(coloresConCodigo);

        const colorH3 = prompt(`¿Qué color deseas para h3?\nOpciones: ${opciones.join(", ")}`);
        if (colorH3 && coloresConCodigo[colorH3]) {
          updateElements("h3", el => el.style.color = coloresConCodigo[colorH3]);
          localStorage.setItem("zjb_colorfont_h3", colorH3);
          if (applyToSettings) localStorage.setItem("zjb_colorfont_h3_settings", colorH3);
        }

        const colorH4 = prompt(`¿Qué color deseas para h4?\nOpciones: ${opciones.join(", ")}`);
        if (colorH4 && coloresConCodigo[colorH4]) {
          updateElements("h4", el => el.style.color = coloresConCodigo[colorH4]);
          localStorage.setItem("zjb_colorfont_h4", colorH4);
          if (applyToSettings) localStorage.setItem("zjb_colorfont_h4_settings", colorH4);
        }

        break;
      }
    }

    dropdown.selectedIndex = 0;
  });

  // Aplicar valores guardados si existen
  applySavedStyles(isSettings);
}

function initIndexMenu4() {
  const isSettings = false;
  applySavedStyles(isSettings);
}

function applySavedStyles(isSettings) {
  const scope = isSettings ? "_settings" : "";
  const coloresConCodigo = {
    blue: "#0000FF",
    green: "#008000",
    red: "#FF0000",
    orange: "#FFA500",
    purple: "#800080",
    black: "#000000",
    white: "#FFFFFF",
    gray: "#808080"
  };

  const savedSize = localStorage.getItem(`zjb_sizefont1${scope}`);
  if (savedSize) document.querySelectorAll("h2").forEach(h2 => h2.style.fontSize = `${savedSize}rem`);

  const savedIcon = localStorage.getItem(`zjb_changeicon${scope}`);
  if (savedIcon) document.querySelectorAll("h2 i").forEach(i => i.className = `fab ${savedIcon}`);

  const savedMargin = localStorage.getItem(`zjb_margintitle${scope}`);
  if (savedMargin) document.querySelectorAll("h2").forEach(h2 => h2.style.margin = `${savedMargin}px`);

  const preset = localStorage.getItem(`zjb_bordertitle${scope}`);
  const presets = {
    "0": "none",
    "2": "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black",
    "4": "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black"
  };
  if (preset && presets[preset]) document.querySelectorAll("h2").forEach(h2 => h2.style.textShadow = presets[preset]);

  const visibility = localStorage.getItem(`zjb_showiconfa${scope}`);
  if (visibility) document.querySelectorAll("h2 i").forEach(i => i.style.visibility = visibility);

  const h3size = localStorage.getItem(`zjb_sizefont2_h3${scope}`);
  if (h3size) document.querySelectorAll("h3").forEach(h3 => h3.style.fontSize = `${h3size}rem`);

  const h4size = localStorage.getItem(`zjb_sizefont2_h4${scope}`);
  if (h4size) document.querySelectorAll("h4").forEach(h4 => h4.style.fontSize = `${h4size}rem`);

  const colorH3 = localStorage.getItem(`zjb_colorfont_h3${scope}`);
  if (colorH3 && coloresConCodigo[colorH3]) document.querySelectorAll("h3").forEach(h3 => h3.style.color = coloresConCodigo[colorH3]);

  const colorH4 = localStorage.getItem(`zjb_colorfont_h4${scope}`);
  if (colorH4 && coloresConCodigo[colorH4]) document.querySelectorAll("h4").forEach(h4 => h4.style.color = coloresConCodigo[colorH4]);
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion4") !== null;
  if (isSettings) {
    initSettingsMenu4();
  } else {
    initIndexMenu4();
  }
});
