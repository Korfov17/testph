// JS COMPLETO ACTUALIZADO CON TODAS LAS OPCIONES Y CORRECCIONES

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
    const isSettings = window.location.pathname.includes("settings");

    if (value === "zjb_rainbowdisabled") {
      const opciones = Object.keys(coloresConCodigo);
      const elegido = prompt(`¿Qué color deseas aplicar al Título?\nOpciones disponibles:\n${opciones.join(", ")}`);
      if (!elegido) return;

      const color = elegido.trim().toLowerCase();
      if (!opciones.includes(color)) {
        alert("❌ Color no válido.");
        return;
      }

      document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled").forEach(span => {
        span.classList.remove("rainbow");
        span.classList.add("rainbow-disabled");
        span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[color]);
      });

      localStorage.setItem("zjb_rainbowdisabled_index", color);
      const applyToSettings = confirm("¿Aplicar también en settings?");
      if (applyToSettings) {
        localStorage.setItem("zjb_rainbowdisabled_settings", color);
      }
      alert(`✅ Animación desactivada. Color fijo alternado a: ${color}`);
    }

    if (value === "zjb_sizefont1") {
      const defaultSize = 3;
      const nuevo = prompt("Tamaño actual: 3rem. ¿Nuevo tamaño (solo número)?", defaultSize);
      if (!nuevo || isNaN(parseFloat(nuevo))) return;
      document.querySelectorAll("h2").forEach(el => el.style.fontSize = `${nuevo}rem`);
      localStorage.setItem("zjb_sizefont1_index", nuevo);
      if (confirm("¿Aplicar también en settings?")) {
        localStorage.setItem("zjb_sizefont1_settings", nuevo);
      }
      alert(`✅ Tamaño del título cambiado a: ${nuevo}rem`);
    }

    if (value === "zjb_changeicon") {
      const nuevo = prompt("Icono actual: fa-brands fa-playstation. ¿Nuevo icono (solo el nombre, ejemplo 'xbox')?");
      if (!nuevo) return;
      const nuevoIcono = `fab fa-${nuevo.trim()}`;
      document.querySelectorAll("h2 i").forEach(i => i.className = nuevoIcono);
      localStorage.setItem("zjb_changeicon_index", nuevoIcono);
      if (confirm("¿Aplicar también en settings?")) {
        localStorage.setItem("zjb_changeicon_settings", nuevoIcono);
      }
      alert(`✅ Icono cambiado correctamente a: ${nuevoIcono}`);
    }

    if (value === "zjb_margintitle") {
      const defaultMargin = 10;
      const nuevo = prompt("Margen actual: 10px. ¿Nuevo margen (número en px)? Ej: 5, 20", defaultMargin);
      if (!nuevo || isNaN(parseFloat(nuevo))) return;
      document.querySelectorAll("h2").forEach(el => el.style.margin = `${nuevo}px`);
      localStorage.setItem("zjb_margintitle_index", nuevo);
      if (confirm("¿Aplicar también en settings?")) {
        localStorage.setItem("zjb_margintitle_settings", nuevo);
      }
      alert(`✅ Margen del título cambiado a: ${nuevo}px`);
    }

    if (value === "zjb_bordertitle") {
      const presets = {
        0: "none",
        2: "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black",
        4: "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black"
      };
      const elegido = prompt("Elige nivel de borde: 0 (mínimo), 2 (normal), 4 (alto)", "2");
      if (!presets[elegido]) return;
      document.querySelectorAll("h2").forEach(el => el.style.textShadow = presets[elegido]);
      localStorage.setItem("zjb_bordertitle_index", elegido);
      if (confirm("¿Aplicar también en settings?")) {
        localStorage.setItem("zjb_bordertitle_settings", elegido);
      }
      alert(`✅ Bordes (text-shadow) actualizados al preset: ${elegido}`);
    }

    if (value === "zjb_showiconfa") {
      const current = localStorage.getItem("zjb_showiconfa_index") || "visible";
      const nuevo = current === "visible" ? "hidden" : "visible";
      document.querySelectorAll("h2 i").forEach(i => i.style.visibility = nuevo);
      localStorage.setItem("zjb_showiconfa_index", nuevo);
      if (confirm("¿Aplicar también en settings?")) {
        localStorage.setItem("zjb_showiconfa_settings", nuevo);
      }
      alert(`✅ Estado de iconos Font Awesome: ${nuevo === "visible" ? "Visible" : "Oculto"}`);
    }

    if (value === "zjb_sizefont2") {
      const sizeH3 = prompt("Tamaño actual h3: 1.4rem. ¿Nuevo tamaño para h3 (solo número)?", "1.4");
      const sizeH4 = prompt("Tamaño actual h4: 1.6rem. ¿Nuevo tamaño para h4 (solo número)?", "1.6");
      if (!sizeH3 || !sizeH4 || isNaN(sizeH3) || isNaN(sizeH4)) return;
      document.querySelectorAll("h3").forEach(el => el.style.fontSize = `${sizeH3}rem`);
      document.querySelectorAll("h4").forEach(el => el.style.fontSize = `${sizeH4}rem`);
      localStorage.setItem("zjb_sizefont2_index", `${sizeH3}|${sizeH4}`);
      if (confirm("¿Aplicar también en settings?")) {
        localStorage.setItem("zjb_sizefont2_settings", `${sizeH3}|${sizeH4}`);
      }
      alert(`✅ Tamaños de h3/h4 actualizados: h3: ${sizeH3}rem, h4: ${sizeH4}rem`);
    }

    if (value === "zjb_colorfont") {
      const opciones = Object.keys(coloresConCodigo);
      const colorH3 = prompt(`¿Color para h3? Opciones: ${opciones.join(", ")}`);
      const colorH4 = prompt(`¿Color para h4? Opciones: ${opciones.join(", ")}`);
      if (!colorH3 || !colorH4 || !opciones.includes(colorH3) || !opciones.includes(colorH4)) return;
      document.querySelectorAll("h3").forEach(el => el.style.color = coloresConCodigo[colorH3]);
      document.querySelectorAll("h4").forEach(el => el.style.color = coloresConCodigo[colorH4]);
      localStorage.setItem("zjb_colorfont_index", `${colorH3}|${colorH4}`);
      if (confirm("¿Aplicar también en settings?")) {
        localStorage.setItem("zjb_colorfont_settings", `${colorH3}|${colorH4}`);
      }
      alert(`✅ Colores aplicados: h3: ${colorH3}, h4: ${colorH4}`);
    }

    dropdown.selectedIndex = 0;
  });

  const path = window.location.pathname;
  const isSettings = path.includes("settings");
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

  const savedColor = localStorage.getItem(isSettings ? "zjb_rainbowdisabled_settings" : "zjb_rainbowdisabled_index");
  if (savedColor && coloresConCodigo[savedColor]) {
    const spans = document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
    spans.forEach(span => {
      span.classList.remove("rainbow");
      span.classList.add("rainbow-disabled");
      span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[savedColor]);
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

  const savedColor = localStorage.getItem("zjb_rainbowdisabled_index");
  if (savedColor && coloresConCodigo[savedColor]) {
    const spans = document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
    spans.forEach(span => {
      span.classList.remove("rainbow");
      span.classList.add("rainbow-disabled");
      span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[savedColor]);
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
