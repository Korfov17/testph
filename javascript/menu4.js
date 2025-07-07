// SETTINGS MENU ACTUALIZADO Y CORREGIDO
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

  dropdown.addEventListener("change", async () => {
    const value = dropdown.value;

    const aplicarEnSettings = async () => {
      return confirm("¿También quieres aplicar este cambio en settings?");
    };

    const aplicarCambio = (selector, propiedad, nuevoValor, settings) => {
      document.querySelectorAll(selector).forEach(e => {
        e.style[propiedad] = nuevoValor;
      });
      if (settings) {
        localStorage.setItem(value + "_settings", nuevoValor);
      }
      localStorage.setItem(value, nuevoValor);
    };

    if (value === "zjb_sizefont1") {
      const actual = parseFloat(getComputedStyle(document.querySelector("h2")).fontSize) / 16;
      const nuevo = prompt(`Tamaño actual: ${actual}rem. ¿Nuevo tamaño (en rem)?`, actual);
      if (!nuevo) return;
      aplicarCambio("h2", "fontSize", `${nuevo}rem`, await aplicarEnSettings());
    }

    else if (value === "zjb_changeicon") {
      const actual = document.querySelector("h2 i")?.className || "fa-brands fa-playstation";
      const nuevo = prompt(`Icono actual: ${actual}\nIntroduce nuevo valor (ej: fa-brands fa-xbox)`, actual);
      if (!nuevo) return;
      const iconos = document.querySelectorAll("h2 i");
      iconos.forEach(icon => icon.className = nuevo);
      localStorage.setItem(value, nuevo);
      if (await aplicarEnSettings()) localStorage.setItem(value + "_settings", nuevo);
    }

    else if (value === "zjb_margintitle") {
      const actual = getComputedStyle(document.querySelector("h2")).margin;
      const mensaje = `Margen actual: ${actual}\nRecomendado: pequeño (5px), medio (10px), grande (20px)`;
      const nuevo = prompt(mensaje, "10px");
      if (!nuevo) return;
      aplicarCambio("h2", "margin", nuevo, await aplicarEnSettings());
    }

    else if (value === "zjb_bordertitle") {
      const opciones = {
        "0": "none",
        "2": "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black",
        "4": "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black"
      };
      const preset = prompt("Presets disponibles:\n0: Sin borde\n2: Por defecto\n4: Más pronunciado", "2");
      if (!opciones[preset]) return alert("❌ Opción no válida");
      aplicarCambio("h2", "textShadow", opciones[preset], await aplicarEnSettings());
    }

    else if (value === "zjb_showiconfa") {
      const alternar = confirm("¿Deseas alternar visibilidad de los iconos FontAwesome?");
      const estado = alternar ? "hidden" : "visible";
      document.querySelectorAll("h2 i").forEach(icon => {
        icon.style.visibility = estado;
      });
      localStorage.setItem(value, estado);
      if (await aplicarEnSettings()) localStorage.setItem(value + "_settings", estado);
    }

    else if (value === "zjb_sizefont2") {
      const font3 = prompt("Tamaño actual h3: 1.4rem\nIntroduce nuevo tamaño para h3:", "1.4");
      if (font3) document.querySelectorAll("h3").forEach(h => h.style.fontSize = `${font3}rem`);
      const font4 = prompt("Tamaño actual h4: 1.6rem\nIntroduce nuevo tamaño para h4:", "1.6");
      if (font4) document.querySelectorAll("h4").forEach(h => h.style.fontSize = `${font4}rem`);
      localStorage.setItem("zjb_sizefont2_h3", font3);
      localStorage.setItem("zjb_sizefont2_h4", font4);
      if (await aplicarEnSettings()) {
        localStorage.setItem("zjb_sizefont2_h3_settings", font3);
        localStorage.setItem("zjb_sizefont2_h4_settings", font4);
      }
    }

    else if (value === "zjb_colorfont") {
      const opciones = Object.keys(coloresConCodigo);
      const h3Color = prompt(`¿Qué color deseas aplicar a h3?\nOpciones: ${opciones.join(", ")}`);
      const h4Color = prompt(`¿Qué color deseas aplicar a h4?\nOpciones: ${opciones.join(", ")}`);
      if (coloresConCodigo[h3Color]) {
        document.querySelectorAll("h3").forEach(el => el.style.color = coloresConCodigo[h3Color]);
        localStorage.setItem("zjb_colorfont_h3", h3Color);
      }
      if (coloresConCodigo[h4Color]) {
        document.querySelectorAll("h4").forEach(el => el.style.color = coloresConCodigo[h4Color]);
        localStorage.setItem("zjb_colorfont_h4", h4Color);
      }
      if (await aplicarEnSettings()) {
        localStorage.setItem("zjb_colorfont_h3_settings", h3Color);
        localStorage.setItem("zjb_colorfont_h4_settings", h4Color);
      }
    }

    dropdown.selectedIndex = 0;
  });

  // APLICAR GUARDADO EN SETTINGS AL CARGAR
  const map = {
    zjb_sizefont1: "h2",
    zjb_changeicon: "icon",
    zjb_margintitle: "h2",
    zjb_bordertitle: "h2",
    zjb_showiconfa: "icon",
    zjb_sizefont2_h3: "h3",
    zjb_sizefont2_h4: "h4",
    zjb_colorfont_h3: "h3",
    zjb_colorfont_h4: "h4"
  };

  Object.entries(map).forEach(([key, tag]) => {
    const isIcon = tag === "icon";
    const settingsValue = localStorage.getItem(`${key}_settings`);
    if (settingsValue) {
      if (isIcon) {
        document.querySelectorAll("h2 i").forEach(el => {
          if (key === "zjb_showiconfa") el.style.visibility = settingsValue;
          else el.className = settingsValue;
        });
      } else {
        const prop = key.includes("size") ? "fontSize" : key.includes("color") ? "color" : key.includes("margin") ? "margin" : key.includes("border") ? "textShadow" : null;
        if (prop)
          document.querySelectorAll(tag).forEach(el => el.style[prop] = prop === "fontSize" && !settingsValue.endsWith("rem") ? `${settingsValue}rem` : coloresConCodigo[settingsValue] || settingsValue);
      }
    }
  });
}

function initIndexMenu4() {
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

  const map = {
    zjb_sizefont1: "h2",
    zjb_changeicon: "icon",
    zjb_margintitle: "h2",
    zjb_bordertitle: "h2",
    zjb_showiconfa: "icon",
    zjb_sizefont2_h3: "h3",
    zjb_sizefont2_h4: "h4",
    zjb_colorfont_h3: "h3",
    zjb_colorfont_h4: "h4"
  };

  Object.entries(map).forEach(([key, tag]) => {
    const isIcon = tag === "icon";
    const value = localStorage.getItem(key);
    if (value) {
      if (isIcon) {
        document.querySelectorAll("h2 i").forEach(el => {
          if (key === "zjb_showiconfa") el.style.visibility = value;
          else el.className = value;
        });
      } else {
        const prop = key.includes("size") ? "fontSize" : key.includes("color") ? "color" : key.includes("margin") ? "margin" : key.includes("border") ? "textShadow" : null;
        if (prop)
          document.querySelectorAll(tag).forEach(el => el.style[prop] = prop === "fontSize" && !value.endsWith("rem") ? `${value}rem` : coloresConCodigo[value] || value);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion4") !== null;
  if (isSettings) {
    initSettingsMenu4();
  } else {
    initIndexMenu4();
  }
});
