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
      const baseColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
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
  // Creamos/actualizamos estilo dinámico para keyframes
  const styleId = "dynamic-rainbow-style";
  let styleTag = document.getElementById(styleId);
  if (styleTag) styleTag.remove();

  const totalColors = colors.length;
  let keyframes = `@keyframes rainbow-custom {`;

  colors.forEach((color, index) => {
    const percent = (index / totalColors) * 100;
    keyframes += `${percent}% { color: ${color}; } `;
  });
  keyframes += `100% { color: ${colors[0]}; } }`;

  styleTag = document.createElement("style");
  styleTag.id = styleId;
  styleTag.textContent = keyframes;
  document.head.appendChild(styleTag);

  // Aplicamos clase rainbow y animación dinámica
  const spans = document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
  spans.forEach(span => {
    span.classList.remove("rainbow-disabled");
    span.classList.add("rainbow");
    span.style.removeProperty("--rainbow-fixed-color");
    span.style.animation = "rainbow-custom 10s linear infinite";
  });
}

function initIndexMenu4() {
  // Lo mismo que en settings para aplicar estado guardado
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
