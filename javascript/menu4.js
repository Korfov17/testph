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

  dropdown.addEventListener("change", () => {
    const value = dropdown.value;

    const h2s = document.querySelectorAll("h2");
    const h3s = document.querySelectorAll("h3");
    const h4s = document.querySelectorAll("h4");
    const icons = document.querySelectorAll("h2 i");
    const spans = document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");

    if (value === "zjb_sizefont1") {
      const nuevo = prompt("Nuevo tamaño para títulos (rem):");
      if (nuevo) {
        const rem = `${parseFloat(nuevo)}rem`;
        h2s.forEach(h => h.style.fontSize = rem);
        localStorage.setItem(value, rem);
        if (confirm("¿Aplicar también en settings?")) applyStylesInSettings(value, rem);
      }
    }

    if (value === "zjb_changeicon") {
      const nuevo = prompt("Escribe nuevo icono FA (ej. fa-xbox):");
      if (nuevo) {
        const className = `fa-brands ${nuevo}`;
        icons.forEach(i => i.className = className);
        localStorage.setItem(value, className);
        if (confirm("¿Aplicar también en settings?")) applyStylesInSettings(value, className);
      }
    }

    if (value === "zjb_margintitle") {
      const nuevo = prompt("Nuevo margen (px):");
      if (nuevo) {
        const px = `${parseInt(nuevo)}px`;
        h2s.forEach(h => h.style.margin = px);
        localStorage.setItem(value, px);
        if (confirm("¿Aplicar también en settings?")) applyStylesInSettings(value, px);
      }
    }

    if (value === "zjb_bordertitle") {
      const sombras = {
        "0": "0px 0px 0px black",
        "2": "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black",
        "4": "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black"
      };
      const sel = prompt("Sombra (0, 2, 4):");
      if (sombras[sel]) {
        h2s.forEach(h => h.style.textShadow = sombras[sel]);
        localStorage.setItem(value, sel);
        if (confirm("¿Aplicar también en settings?")) applyStylesInSettings(value, sel);
      }
    }

    if (value === "zjb_showiconfa") {
      const current = localStorage.getItem(value) === "visible" ? "hidden" : "visible";
      localStorage.setItem(value, current);
      alert(`✅ Estado alternado: ${current}`);
    }

    if (value === "zjb_sizefont2") {
      const nuevoH3 = prompt("Tamaño para h3 (rem):");
      if (nuevoH3) {
        const rem3 = `${parseFloat(nuevoH3)}rem`;
        h3s.forEach(h => h.style.fontSize = rem3);
        localStorage.setItem("zjb_sizefont2_h3", rem3);
        if (confirm("¿Aplicar también en settings?")) applyStylesInSettings("zjb_sizefont2_h3", rem3);
      }

      const nuevoH4 = prompt("Tamaño para h4 (rem):");
      if (nuevoH4) {
        const rem4 = `${parseFloat(nuevoH4)}rem`;
        h4s.forEach(h => h.style.fontSize = rem4);
        localStorage.setItem("zjb_sizefont2_h4", rem4);
        if (confirm("¿Aplicar también en settings?")) applyStylesInSettings("zjb_sizefont2_h4", rem4);
      }
    }

    if (value === "zjb_colorfont") {
      const colorH3 = prompt(`Color para h3:\nOpciones: ${Object.keys(coloresConCodigo).join(", ")}`);
      if (colorH3 && coloresConCodigo[colorH3]) {
        h3s.forEach(h => h.style.color = coloresConCodigo[colorH3]);
        localStorage.setItem("zjb_colorfont_h3", colorH3);
        if (confirm("¿Aplicar también en settings?")) applyStylesInSettings("zjb_colorfont_h3", colorH3);
      }

      const colorH4 = prompt(`Color para h4:\nOpciones: ${Object.keys(coloresConCodigo).join(", ")}`);
      if (colorH4 && coloresConCodigo[colorH4]) {
        h4s.forEach(h => h.style.color = coloresConCodigo[colorH4]);
        localStorage.setItem("zjb_colorfont_h4", colorH4);
        if (confirm("¿Aplicar también en settings?")) applyStylesInSettings("zjb_colorfont_h4", colorH4);
      }
    }

    if (value === "zjb_rainbowdisabled") {
      const color = prompt(`Color sólido para título:\nOpciones: ${Object.keys(coloresConCodigo).join(", ")}`);
      if (color && coloresConCodigo[color]) {
        spans.forEach(span => {
          span.classList.remove("rainbow");
          span.classList.add("rainbow-disabled");
          span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[color]);
        });
        localStorage.setItem("zjb_rainbowdisabled", color);
        if (confirm("¿Aplicar también en settings?")) applyStylesInSettings("zjb_rainbowdisabled", color);
      }
    }

    if (value === "zjb_rainbowtitle") {
      spans.forEach(span => {
        span.classList.remove("rainbow-disabled");
        span.classList.add("rainbow");
        span.style.removeProperty("--rainbow-fixed-color");
      });
      localStorage.removeItem("zjb_rainbowdisabled");
      if (confirm("¿Aplicar también en settings?")) applyStylesInSettings("zjb_rainbowdisabled", "");
    }

    dropdown.selectedIndex = 0;
  });

  applyStylesInDocument(document);
}

function applyStylesInDocument(context) {
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

  const fs1 = localStorage.getItem("zjb_sizefont1");
  if (fs1) context.querySelectorAll("h2").forEach(el => el.style.fontSize = fs1);

  const margin = localStorage.getItem("zjb_margintitle");
  if (margin) context.querySelectorAll("h2").forEach(el => el.style.margin = margin);

  const shadowPreset = localStorage.getItem("zjb_bordertitle");
  const shadows = {
    "0": "0px 0px 0px black",
    "2": "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black",
    "4": "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black"
  };
  if (shadows[shadowPreset]) context.querySelectorAll("h2").forEach(el => el.style.textShadow = shadows[shadowPreset]);

  const icon = localStorage.getItem("zjb_changeicon");
  if (icon) context.querySelectorAll("h2 i").forEach(el => el.className = icon);

  const fs3 = localStorage.getItem("zjb_sizefont2_h3");
  if (fs3) context.querySelectorAll("h3").forEach(el => el.style.fontSize = fs3);

  const fs4 = localStorage.getItem("zjb_sizefont2_h4");
  if (fs4) context.querySelectorAll("h4").forEach(el => el.style.fontSize = fs4);

  const colorH3 = localStorage.getItem("zjb_colorfont_h3");
  if (colorH3 && coloresConCodigo[colorH3]) context.querySelectorAll("h3").forEach(el => el.style.color = coloresConCodigo[colorH3]);

  const colorH4 = localStorage.getItem("zjb_colorfont_h4");
  if (colorH4 && coloresConCodigo[colorH4]) context.querySelectorAll("h4").forEach(el => el.style.color = coloresConCodigo[colorH4]);

  const rainbow = localStorage.getItem("zjb_rainbowdisabled");
  if (rainbow && coloresConCodigo[rainbow]) {
    context.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled").forEach(span => {
      span.classList.remove("rainbow");
      span.classList.add("rainbow-disabled");
      span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[rainbow]);
    });
  }
}

function applyStylesInSettings(key, value) {
  window.opener?.postMessage({ type: "apply-style", key, value }, "*");
}

function initIndexMenu4() {
  applyStylesInDocument(document);
  window.addEventListener("message", (event) => {
    if (event.data.type === "apply-style") {
      localStorage.setItem(event.data.key, event.data.value);
      applyStylesInDocument(document);
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
