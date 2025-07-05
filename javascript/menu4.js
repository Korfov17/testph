function initSettingsMenu4() {
  const dropdown = document.getElementById("opcion4");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const value = dropdown.value;

    // 🟣 Opción: Activar animación arcoiris con colores personalizados
    if (value === "zjb_rainbowcolor") {
      const input = prompt("Introduce una lista de colores separados por comas (ej: red, orange, blue):");
      if (!input) return;

      const colores = input.split(",").map(c => c.trim()).filter(Boolean);
      const confirmar = confirm(`¿Aplicar animación arcoiris con estos colores?\n\n${colores.join(", ")}`);
      if (!confirmar) return;

      const h2s = document.querySelectorAll("h2");
      h2s.forEach(h2 => {
        h2.style.animation = "rainbow 5s linear infinite";
        h2.style.color = ""; // Limpia cualquier color fijo anterior
        h2.setAttribute("data-rainbow", colores.join(","));
      });

      alert("✅ Animación arcoiris aplicada con colores personalizados.");
    }

    // 🔵 Opción: Desactivar animación y aplicar color fijo
    else if (value === "zjb_rainbowdisabled") {
      const opciones = ["blue", "green", "red", "orange", "purple", "black", "gray"];
      const elegido = prompt(`¿Qué color deseas aplicar al título?\nOpciones disponibles:\n${opciones.join(", ")}`);
      if (!elegido) return;

      const color = elegido.trim().toLowerCase();
      if (!opciones.includes(color)) {
        alert("❌ Color no válido.");
        return;
      }

      const h2s = document.querySelectorAll("h2");
      h2s.forEach(h2 => {
        h2.style.animation = "none";
        h2.style.color = color;
        h2.removeAttribute("data-rainbow");
      });

      alert(`✅ Color fijo aplicado: ${color}`);
    }

    dropdown.selectedIndex = 0;
  });
}

function initIndexMenu4() {
  // Si en el futuro necesitas aplicar animaciones también aquí
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion4") !== null;
  if (isSettings) {
    initSettingsMenu4();
  } else {
    initIndexMenu4();
  }
});
