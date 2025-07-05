function initSettingsMenu4() {
  const dropdown = document.getElementById("opcion4");
  if (!dropdown) return;

  const coloresDisponibles = [
    { nombre: "blue", codigo: "#0000FF" },
    { nombre: "green", codigo: "#008000" },
    { nombre: "red", codigo: "#FF0000" },
    { nombre: "orange", codigo: "#FFA500" },
    { nombre: "purple", codigo: "#800080" },
    { nombre: "black", codigo: "#000000" },
    { nombre: "gray", codigo: "#808080" }
  ];

  dropdown.addEventListener("change", () => {
    const value = dropdown.value;

    if (value === "zjb_rainbowdisabled") {
      const nombres = coloresDisponibles.map(c => c.nombre).join(", ");
      const elegido = prompt(`¿Qué color deseas aplicar al título?\nOpciones disponibles:\n${nombres}`);
      if (!elegido) return;

      const colorNombre = elegido.trim().toLowerCase();
      const colorObj = coloresDisponibles.find(c => c.nombre === colorNombre);
      if (!colorObj) {
        alert("❌ Color no válido.");
        return;
      }

      const spans = document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");

      spans.forEach(span => {
        span.classList.remove("rainbow");
        span.classList.add("rainbow-disabled");
        span.style.setProperty("--rainbow-fixed-color", colorObj.codigo);
      });

      localStorage.setItem("zjb_rainbowdisabled", colorNombre);

      alert(`✅ Animación desactivada y color fijo aplicado: ${colorNombre}`);
    }

    dropdown.selectedIndex = 0;
  });
}

function applySavedRainbowSettings() {
  const colorGuardado = localStorage.getItem("zjb_rainbowdisabled");
  if (colorGuardado) {
    const coloresDisponibles = [
      { nombre: "blue", codigo: "#0000FF" },
      { nombre: "green", codigo: "#008000" },
      { nombre: "red", codigo: "#FF0000" },
      { nombre: "orange", codigo: "#FFA500" },
      { nombre: "purple", codigo: "#800080" },
      { nombre: "black", codigo: "#000000" },
      { nombre: "gray", codigo: "#808080" }
    ];

    const colorObj = coloresDisponibles.find(c => c.nombre === colorGuardado.toLowerCase());
    if (!colorObj) return;

    const spans = document.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");

    spans.forEach(span => {
      span.classList.remove("rainbow");
      span.classList.add("rainbow-disabled");
      span.style.setProperty("--rainbow-fixed-color", colorObj.codigo);
    });
  }
}

function initIndexMenu4() {
  applySavedRainbowSettings();
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion4") !== null;
  if (isSettings) {
    initSettingsMenu4();
  } else {
    initIndexMenu4();
  }
});
