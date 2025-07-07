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

  const h2s = context.querySelectorAll("h2");
  const h3s = context.querySelectorAll("h3");
  const h4s = context.querySelectorAll("h4");
  const icons = context.querySelectorAll("h2 i");
  const spans = context.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");

  const fs1 = localStorage.getItem("zjb_sizefont1");
  if (fs1) h2s.forEach(el => el.style.fontSize = fs1);

  const margin = localStorage.getItem("zjb_margintitle");
  if (margin) h2s.forEach(el => el.style.margin = margin);

  const preset = localStorage.getItem("zjb_bordertitle");
  const shadows = {
    "0": "0px 0px 0px black",
    "2": "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black",
    "4": "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black"
  };
  if (shadows[preset]) h2s.forEach(el => el.style.textShadow = shadows[preset]);

  const icon = localStorage.getItem("zjb_changeicon");
  if (icon) icons.forEach(iconEl => iconEl.className = icon);

  const fs3 = localStorage.getItem("zjb_sizefont2_h3");
  if (fs3) h3s.forEach(el => el.style.fontSize = fs3);

  const fs4 = localStorage.getItem("zjb_sizefont2_h4");
  if (fs4) h4s.forEach(el => el.style.fontSize = fs4);

  const colorH3 = localStorage.getItem("zjb_colorfont_h3");
  if (colorH3 && coloresConCodigo[colorH3]) h3s.forEach(el => el.style.color = coloresConCodigo[colorH3]);

  const colorH4 = localStorage.getItem("zjb_colorfont_h4");
  if (colorH4 && coloresConCodigo[colorH4]) h4s.forEach(el => el.style.color = coloresConCodigo[colorH4]);

  const rainbow = localStorage.getItem("zjb_rainbowdisabled");
  if (rainbow && coloresConCodigo[rainbow]) {
    spans.forEach(span => {
      span.classList.remove("rainbow");
      span.classList.add("rainbow-disabled");
      span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[rainbow]);
    });
  }
}

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

    if (value === "zjb_sizefont1") {
      const current = 3;
      const nuevo = prompt(`Tamaño actual (h2): ${current}rem\nNuevo tamaño (solo número):`);
      if (!nuevo) return;
      const rem = `${parseFloat(nuevo)}rem`;
      document.querySelectorAll("h2").forEach(h => h.style.fontSize = rem);
      localStorage.setItem(value, rem);
      if (confirm("¿Aplicar también en settings?")) applyStylesInSettings(value, rem);
    }

    if (value === "zjb_changeicon") {
      const current = "fa-brands fa-playstation";
      const nuevo = prompt(`Icono actual: ${current}\nEscribe nuevo icono FA (solo lo que cambiarías):`);
      if (!nuevo) return;
      const className = `fa-brands ${nuevo}`;
      document.querySelectorAll("h2 i").forEach(i => i.className = className);
      localStorage.setItem(value, className);
      if (confirm("¿Aplicar también en settings?")) applyStylesInSettings(value, className);
    }

    if (value === "zjb_margintitle") {
      const current = 10;
      const msg = "Valores sugeridos:\nPequeño: 5\nMediano: 10 (actual)\nGrande: 20+";
      const nuevo = prompt(`Margen actual (h2): ${current}px\n${msg}\nNuevo margen (solo número):`);
      if (!nuevo) return;
      const px = `${parseInt(nuevo)}px`;
      document.querySelectorAll("h2").forEach(h => h.style.margin = px);
      localStorage.setItem(value, px);
      if (confirm("¿Aplicar también en settings?")) applyStylesInSettings(value, px);
    }

    if (value === "zjb_bordertitle") {
      const presets = {
        "0": "0px 0px 0px black",
        "2": "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black",
        "4": "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black"
      };
      const sel = prompt("Selecciona sombra de texto (solo número):\n0: Ninguna\n2: Por defecto\n4: Intensa");
      if (!presets[sel]) return;
      document.querySelectorAll("h2").forEach(h => h.style.textShadow = presets[sel]);
      localStorage.setItem(value, sel);
      if (confirm("¿Aplicar también en settings?")) applyStylesInSettings(value, sel);
    }

    if (value === "zjb_showiconfa") {
      const current = localStorage.getItem(value) === "visible" ? "hidden" : "visible";
      localStorage.setItem(value, current);
      alert(`✅ Estado alternado: ${current}`);
    }

    if (value === "zjb_sizefont2") {
      const h3default = 1.4;
      const h4default = 1.6;

      const nuevoH3 = prompt(`Tamaño actual h3: ${h3default}rem\nNuevo tamaño h3:`);
      if (nuevoH3) {
        const rem3 = `${parseFloat(nuevoH3)}rem`;
        document.querySelectorAll("h3").forEach(h => h.style.fontSize = rem3);
        localStorage.setItem("zjb_sizefont2_h3", rem3);
        if (confirm("¿Aplicar también en settings?")) applyStylesInSettings("zjb_sizefont2_h3", rem3);
      }

      const nuevoH4 = prompt(`Tamaño actual h4: ${h4default}rem\nNuevo tamaño h4:`);
      if (nuevoH4) {
        const rem4 = `${parseFloat(nuevoH4)}rem`;
        document.querySelectorAll("h4").forEach(h => h.style.fontSize = rem4);
        localStorage.setItem("zjb_sizefont2_h4", rem4);
        if (confirm("¿Aplicar también en settings?")) applyStylesInSettings("zjb_sizefont2_h4", rem4);
      }
    }

    if (value === "zjb_colorfont") {
      const opciones = Object.keys(coloresConCodigo);

      const colorH3 = prompt(`¿Qué color aplicar a h3?\nOpciones: ${opciones.join(", ")}`);
      if (colorH3 && coloresConCodigo[colorH3]) {
        document.querySelectorAll("h3").forEach(el => el.style.color = coloresConCodigo[colorH3]);
        localStorage.setItem("zjb_colorfont_h3", colorH3);
        if (confirm("¿Aplicar también en settings?")) applyStylesInSettings("zjb_colorfont_h3", colorH3);
      }

      const colorH4 = prompt(`¿Qué color aplicar a h4?\nOpciones: ${opciones.join(", ")}`);
      if (colorH4 && coloresConCodigo[colorH4]) {
        document.querySelectorAll("h4").forEach(el => el.style.color = coloresConCodigo[colorH4]);
        localStorage.setItem("zjb_colorfont_h4", colorH4);
        if (confirm("¿Aplicar también en settings?")) applyStylesInSettings("zjb_colorfont_h4", colorH4);
      }
    }

    if (value === "zjb_rainbowdisabled") {
      const opciones = Object.keys(coloresConCodigo);
      const elegido = prompt(`¿Qué color deseas aplicar al título?\nOpciones: ${opciones.join(", ")}`);
      if (!elegido || !coloresConCodigo[elegido]) {
        alert("❌ Color no válido.");
        return;
      }

      const spans = document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
      spans.forEach(span => {
        span.classList.remove("rainbow");
        span.classList.add("rainbow-disabled");
        span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[elegido]);
      });

      localStorage.setItem("zjb_rainbowdisabled", elegido);
      if (confirm("¿Aplicar también en settings?")) applyStylesInSettings("zjb_rainbowdisabled", elegido);
    }

    dropdown.selectedIndex = 0;
  });

  applyStylesInDocument(document);
}

function applyStylesInSettings(key, value) {
  window.opener?.postMessage({ type: "apply-style", key, value }, "*");
}

function initIndexMenu4() {
  applyStylesInDocument(document);

  // Escucha mensaje desde settings
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
