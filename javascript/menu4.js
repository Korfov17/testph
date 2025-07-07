// JavaScript actualizado completamente con todas las opciones funcionales

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
    dropdown.selectedIndex = 0;

    const aplicarEnSettings = async (accionCallback) => {
      const aplicar = confirm("¿También deseas aplicar este cambio en settings?");
      if (aplicar) accionCallback("settings");
    };

    const aplicarCambio = (selector, propiedad, valor, context = "index") => {
      const destino = context === "settings" ? document.getElementById("settings-container") : document;
      const elementos = destino.querySelectorAll(selector);
      elementos.forEach(el => el.style[propiedad] = valor);
    };

    if (value === "zjb_rainbowdisabled") {
      const opciones = Object.keys(coloresConCodigo);
      const elegido = prompt(`¿Qué color deseas aplicar al Título?\nOpciones disponibles:\n${opciones.join(", ")}`);
      if (!elegido) return;

      const color = elegido.trim().toLowerCase();
      if (!opciones.includes(color)) return alert("❌ Color no válido.");

      const aplicarColor = (context) => {
        const destino = context === "settings" ? document.getElementById("settings-container") : document;
        const spans = destino.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
        spans.forEach(span => {
          span.classList.remove("rainbow");
          span.classList.add("rainbow-disabled");
          span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[color]);
        });
        localStorage.setItem(`zjb_rainbowdisabled_${context}`, color);
      };

      aplicarColor("index");
      await aplicarEnSettings(aplicarColor);

      alert(`✅ Alternado al color: ${color}`);
    }

    if (value === "zjb_sizefont1") {
      const size = prompt("¿Qué tamaño deseas para el título? Valor por defecto: 3 (rem)");
      if (!size || isNaN(size)) return;
      const fontSize = `${size}rem`;

      const aplicar = (context) => {
        const destino = context === "settings" ? document.getElementById("settings-container") : document;
        const elementos = destino.querySelectorAll("h2");
        elementos.forEach(el => el.style.fontSize = fontSize);
        localStorage.setItem(`zjb_sizefont1_${context}`, fontSize);
      };

      aplicar("index");
      await aplicarEnSettings(aplicar);

      alert(`✅ Tamaño de título cambiado a: ${fontSize}`);
    }

    if (value === "zjb_changeicon") {
      const nuevoIcono = prompt("Escribe el nuevo icono FA (ejemplo: fa-brands fa-xbox):", "fa-brands fa-playstation");
      if (!nuevoIcono) return;

      const aplicar = (context) => {
        const destino = context === "settings" ? document.getElementById("settings-container") : document;
        const elementos = destino.querySelectorAll("h2 i");
        elementos.forEach(el => {
          el.className = nuevoIcono;
        });
        localStorage.setItem(`zjb_changeicon_${context}`, nuevoIcono);
      };

      aplicar("index");
      await aplicarEnSettings(aplicar);

      alert(`✅ Icono cambiado a: ${nuevoIcono}`);
    }

    if (value === "zjb_margintitle") {
      const size = prompt("¿Qué margen deseas?\nValores comunes:\nPequeño: 5px\nMediano: 10px (por defecto)\nGrande: 20px");
      if (!size || isNaN(parseInt(size))) return;

      const aplicar = (context) => {
        aplicarCambio("h2", "margin", `${size}px`, context);
        localStorage.setItem(`zjb_margintitle_${context}`, size);
      };

      aplicar("index");
      await aplicarEnSettings(aplicar);

      alert(`✅ Margen del título cambiado a: ${size}px`);
    }

    if (value === "zjb_bordertitle") {
      const preset = prompt("¿Qué estilo de borde deseas para el título?\n0: Sin sombra\n2: Por defecto\n4: Más separado", "2");
      const valores = {
        "0": "none",
        "2": "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black",
        "4": "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black"
      };

      if (!(preset in valores)) return;

      const aplicar = (context) => {
        aplicarCambio("h2", "textShadow", valores[preset], context);
        localStorage.setItem(`zjb_bordertitle_${context}`, preset);
      };

      aplicar("index");
      await aplicarEnSettings(aplicar);

      alert("✅ Borde del título actualizado");
    }

    if (value === "zjb_showiconfa") {
      const current = localStorage.getItem("zjb_showiconfa") || "visible";
      const nuevo = current === "visible" ? "hidden" : "visible";

      const aplicar = (context) => {
        const destino = context === "settings" ? document.getElementById("settings-container") : document;
        const iconos = destino.querySelectorAll("h2 i");
        iconos.forEach(i => i.style.visibility = nuevo);
        localStorage.setItem(`zjb_showiconfa_${context}`, nuevo);
      };

      aplicar("index");
      await aplicarEnSettings(aplicar);

      alert(`✅ Iconos FA alternados a: ${nuevo}`);
    }

    if (value === "zjb_sizefont2") {
      const sizeH3 = prompt("¿Qué tamaño deseas para h3? Por defecto: 1.4");
      const sizeH4 = prompt("¿Qué tamaño deseas para h4? Por defecto: 1.6");
      if (!sizeH3 || !sizeH4) return;

      const aplicar = (context) => {
        aplicarCambio("h3", "fontSize", `${sizeH3}rem`, context);
        aplicarCambio("h4", "fontSize", `${sizeH4}rem`, context);
        localStorage.setItem(`zjb_sizefont2_h3_${context}`, sizeH3);
        localStorage.setItem(`zjb_sizefont2_h4_${context}`, sizeH4);
      };

      aplicar("index");
      await aplicarEnSettings(aplicar);

      alert(`✅ Tamaños cambiados: h3: ${sizeH3}rem, h4: ${sizeH4}rem`);
    }

    if (value === "zjb_colorfont") {
      const keys = Object.keys(coloresConCodigo);
      const colorH3 = prompt(`¿Qué color deseas para h3?\nOpciones: ${keys.join(", ")}`);
      const colorH4 = prompt(`¿Qué color deseas para h4?\nOpciones: ${keys.join(", ")}`);
      if (!colorH3 || !colorH4 || !coloresConCodigo[colorH3] || !coloresConCodigo[colorH4]) return;

      const aplicar = (context) => {
        aplicarCambio("h3", "color", coloresConCodigo[colorH3], context);
        aplicarCambio("h4", "color", coloresConCodigo[colorH4], context);
        localStorage.setItem(`zjb_colorfont_h3_${context}`, colorH3);
        localStorage.setItem(`zjb_colorfont_h4_${context}`, colorH4);
      };

      aplicar("index");
      await aplicarEnSettings(aplicar);

      alert(`✅ Colores cambiados: h3: ${colorH3}, h4: ${colorH4}`);
    }
  });

  // Al cargar: aplicar todos los estados guardados
  const context = "settings";
  const cargarValor = (clave, selector, propiedad, transform = v => v) => {
    const valor = localStorage.getItem(`${clave}_${context}`);
    if (valor) {
      document.querySelectorAll(selector).forEach(e => e.style[propiedad] = transform(valor));
    }
  };

  const colorRainbow = localStorage.getItem("zjb_rainbowdisabled_settings");
  if (colorRainbow && coloresConCodigo[colorRainbow]) {
    document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled").forEach(span => {
      span.classList.remove("rainbow");
      span.classList.add("rainbow-disabled");
      span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[colorRainbow]);
    });
  }
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

  const colorRainbow = localStorage.getItem("zjb_rainbowdisabled_index");
  if (colorRainbow && coloresConCodigo[colorRainbow]) {
    document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled").forEach(span => {
      span.classList.remove("rainbow");
      span.classList.add("rainbow-disabled");
      span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[colorRainbow]);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion4") !== null;
  if (isSettings) {
    initSettingsMenu4();
  } else {
    initIndexMenu4();
  }
});
