function initSettingsMenu4() {
  const dropdown = document.getElementById("opcion4");
  if (!dropdown) return;

  // Lista de colores con nombre y código hex
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

      const h2s = document.querySelectorAll("h2");
      h2s.forEach(h2 => {
        h2.style.animation = "none";
        h2.style.color = colorObj.codigo;  // Aplica el código hex del color
        h2.removeAttribute("data-rainbow");
      });

      // Guardar solo el nombre del color en localStorage
      localStorage.setItem("zjb_rainbowdisabled", colorNombre);

      alert(`✅ Animación desactivada y color fijo aplicado: ${colorNombre}`);
    }

    dropdown.selectedIndex = 0;
  });
}

function applySavedRainbowSettings() {
  const colorGuardado = localStorage.getItem("zjb_rainbowdisabled");
  if (colorGuardado) {
    // Buscar el código del color guardado
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

    const h2s = document.querySelectorAll("h2");
    h2s.forEach(h2 => {
      h2.style.animation = "none";
      h2.style.color = colorObj.codigo;
      h2.removeAttribute("data-rainbow");
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
