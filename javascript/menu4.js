// JS ACTUALIZADO CON MENSAJES PERSONALIZADOS Y SEPARACIÓN INDEX/SETTINGS PARA MODO ARCOIRIS

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

    if (value === "zjb_rainbowdisabled") {
      const opciones = Object.keys(coloresConCodigo);
      const elegido = prompt(`¿Qué color deseas aplicar al Título?\nOpciones disponibles:\n${opciones.join(", ")}`);
      if (!elegido) return;

      const color = elegido.trim().toLowerCase();
      if (!opciones.includes(color)) {
        alert("❌ Color no válido.");
        return;
      }

      // Aplicar en index (si estamos en settings, preguntar luego)
      const spans = document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
      spans.forEach(span => {
        span.classList.remove("rainbow");
        span.classList.add("rainbow-disabled");
        span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[color]);
      });

      // Guardar solo en index por ahora
      localStorage.setItem("zjb_rainbowdisabled_index", color);

      // Preguntar si aplicar también en settings
      const aplicarSettings = confirm("¿Quieres aplicar también este cambio en settings?");
      if (aplicarSettings) {
        localStorage.setItem("zjb_rainbowdisabled_settings", color);
      }

      alert(`✅ Animación desactivada. Color fijo alternado a: ${color}`);
    }

    dropdown.selectedIndex = 0;
  });

  const path = window.location.pathname;
  const isSettings = path.includes("settings");

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
