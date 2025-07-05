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

      // Solo afectar al <span class="rainbow"> dentro de cada h2
      const spans = document.querySelectorAll("h2 span.rainbow");
      spans.forEach(span => {
        // Quitar animación (asumiendo que la animación está en CSS vinculada a la clase 'rainbow')
        span.style.animation = "none";
        // Aplicar color fijo
        span.style.color = colorObj.codigo;
        // Eliminar la clase rainbow para que no siga animando (opcional)
        span.classList.remove("rainbow");
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

    const spans = document.querySelectorAll("h2 span.rainbow");
    spans.forEach(span => {
      span.style.animation = "none";
      span.style.color = colorObj.codigo;
      span.classList.remove("rainbow");
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
