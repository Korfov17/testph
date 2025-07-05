function initSettingsMenu4() {
  const dropdown = document.getElementById("opcion4");
  if (!dropdown) return;

  // Lista de colores con código hexadecimal
  const coloresConCodigo = {
    blue: "#0000FF",
    green: "#008000",
    red: "#FF0000",
    orange: "#FFA500",
    purple: "#800080",
    black: "#000000",
    gray: "#808080"
  };

  dropdown.addEventListener("change", () => {
    const value = dropdown.value;

    // Solo implementamos la opción de desactivar animación y aplicar color fijo
    if (value === "zjb_rainbowdisabled") {
      const opciones = Object.keys(coloresConCodigo);
      const elegido = prompt(`¿Qué color deseas aplicar al título?\nOpciones disponibles:\n${opciones.join(", ")}`);
      if (!elegido) return;

      const color = elegido.trim().toLowerCase();
      if (!opciones.includes(color)) {
        alert("❌ Color no válido.");
        return;
      }

      // Seleccionamos los span.rainbow dentro de los h2 (ignorando los <i>)
      const spans = document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
      spans.forEach(span => {
        span.classList.remove("rainbow");
        span.classList.add("rainbow-disabled");
        // Aplicamos el color usando variable CSS para que el CSS se encargue del color
        span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[color]);
      });

      // Guardamos en localStorage el color elegido (nombre, no código)
      localStorage.setItem("zjb_rainbowdisabled", color);

      alert(`✅ Animación desactivada y color fijo aplicado: ${color}`);
    }

    dropdown.selectedIndex = 0;
  });

  // Al cargar, aplicar estado guardado si existe
  const savedColor = localStorage.getItem("zjb_rainbowdisabled");
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
  // Si necesitas lógica en index para aplicar color, aquí la pondrías
  const coloresConCodigo = {
    blue: "#0000FF",
    green: "#008000",
    red: "#FF0000",
    orange: "#FFA500",
    purple: "#800080",
    black: "#000000",
    gray: "#808080"
  };

  const savedColor = localStorage.getItem("zjb_rainbowdisabled");
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
