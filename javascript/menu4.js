function initSettingsMenu4() {
  const dropdown = document.getElementById("opcion4");
  if (!dropdown) return;

  // Lista de colores para la opción disabled con códigos hex
  const coloresDisponibles = {
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

    if (value === "zjb_rainbowcolor") {
      // Colores base del arcoiris
      const baseColors = ["red", "orange", "yellow", "green", "blue", "indigo"];
      const input = prompt(`Introduce los colores para la animación arcoiris separados por comas.\nColores disponibles:\n${baseColors.join(", ")}`, baseColors.join(", "));
      if (!input) return;

      const selectedColors = input.split(",").map(c => c.trim().toLowerCase()).filter(c => baseColors.includes(c));
      if (selectedColors.length === 0) {
        alert("❌ No se seleccionó ningún color válido.");
        return;
      }

      localStorage.setItem("zjb_rainbowcolor", selectedColors.join(","));
      localStorage.removeItem("zjb_rainbowdisabled");

      applyRainbowAnimation(selectedColors);

      alert(`✅ Animación arcoiris aplicada con estos colores:\n${selectedColors.join(", ")}`);
    }

    else if (value === "zjb_rainbowdisabled") {
      // Mostrar opciones con nombre y código
      let listaColores = Object.entries(coloresDisponibles).map(([nombre, codigo]) => `${nombre} (${codigo})`).join("\n");
      const elegido = prompt(`¿Qué color deseas aplicar al título?\nOpciones disponibles:\n${listaColores}`);
      if (!elegido) return;

      const color = elegido.trim().toLowerCase();
      if (!Object.keys(coloresDisponibles).includes(color)) {
        alert("❌ Color no válido.");
        return;
      }

      const spans = document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
      spans.forEach(span => {
        span.classList.remove("rainbow");
        span.classList.add("rainbow-disabled");
        span.style.setProperty("--rainbow-fixed-color", coloresDisponibles[color]);
        span.style.animation = "none";
      });

      localStorage.setItem("zjb_rainbowdisabled", color);
      localStorage.removeItem("zjb_rainbowcolor");

      alert(`✅ Animación desactivada y color fijo aplicado: ${color}`);
    }

    dropdown.selectedIndex = 0;
  });

  // Al cargar, primero aplicamos animación personalizada si existe
  const savedRainbowColors = localStorage.getItem("zjb_rainbowcolor");
  if (savedRainbowColors) {
    const colores = savedRainbowColors.split(",").map(c => c.trim());
    applyRainbowAnimation(colores);
  }
  else {
    // Si no, aplicamos color fijo si existe
    const savedColor = localStorage.getItem("zjb_rainbowdisabled");
    if (savedColor && coloresDisponibles[savedColor]) {
      const spans = document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
      spans.forEach(span => {
        span.classList.remove("rainbow");
        span.classList.add("rainbow-disabled");
        span.style.setProperty("--rainbow-fixed-color", coloresDisponibles[savedColor]);
        span.style.animation = "none";
      });
    }
  }
}

function applyRainbowAnimation(colors) {
  const allowedColors = ["red", "orange", "yellow", "green", "blue", "indigo"];
  const filteredColors = colors.filter(c => allowedColors.includes(c));
  if (filteredColors.length === 0) return;

  // Eliminar cualquier regla de estilo anterior
  const styleId = "dynamic-rainbow-style";
  const oldStyle = document.getElementById(styleId);
  if (oldStyle) oldStyle.remove();

  // Duración fija 6 segundos y 6 pasos base para mantener ritmo
  const baseSteps = 6;
  let keyframes = `@keyframes rainbow {\n`;

  filteredColors.forEach((color, index) => {
    const percent = (index / baseSteps) * 100;
    keyframes += `  ${percent.toFixed(2)}% { color: ${color}; }\n`;
  });

  keyframes += `  100% { color: ${filteredColors[0]}; }\n}`;

  // Insertar nuevo estilo
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = keyframes;
  document.head.appendChild(style);

  // Aplicar la animación
  const spans = document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
  spans.forEach(span => {
    span.classList.remove("rainbow-disabled");
    span.classList.add("rainbow");
    span.style.animation = "none"; // reiniciar
    void span.offsetWidth; // reflow para reiniciar
    span.style.removeProperty("--rainbow-fixed-color");
    span.style.animation = "rainbow 6s linear infinite"; // duración fija
  });
}

function initIndexMenu4() {
  const coloresDisponibles = {
    blue: "#0000FF",
    green: "#008000",
    red: "#FF0000",
    orange: "#FFA500",
    purple: "#800080",
    black: "#000000",
    gray: "#808080"
  };

  const savedRainbowColors = localStorage.getItem("zjb_rainbowcolor");
  if (savedRainbowColors) {
    const colores = savedRainbowColors.split(",").map(c => c.trim());
    applyRainbowAnimation(colores);
  }
  else {
    const savedColor = localStorage.getItem("zjb_rainbowdisabled");
    if (savedColor && coloresDisponibles[savedColor]) {
      const spans = document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
      spans.forEach(span => {
        span.classList.remove("rainbow");
        span.classList.add("rainbow-disabled");
        span.style.setProperty("--rainbow-fixed-color", coloresDisponibles[savedColor]);
        span.style.animation = "none";
      });
    }
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
