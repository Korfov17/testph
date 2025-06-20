function initSettingsMenu3() {
  // Cargar y aplicar solo la fuente de ajustes
  const fuenteSettings = localStorage.getItem("tph_font_settings");
  if (fuenteSettings) {
    applyFont(fuenteSettings);
  }

  const dropdown = document.getElementById("opcion3");
  if (!dropdown) return;

  dropdown.selectedIndex = 0; // placeholder

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    if (selectedValue === "tph_fontdefault") {
      // Borrar ambas claves para reset completo
      localStorage.removeItem("tph_font_index");
      localStorage.removeItem("tph_font_settings");
      alert("✅ Fuente restablecida por defecto.");
      location.reload();
      return;
    }

    const aplicarH2 = confirm("¿Quieres aplicar esta fuente a los h2?");
    const aplicarH3H4 = confirm("¿Quieres aplicar esta fuente a los h3 y h4?");
    const aplicarButtons = confirm("¿Quieres aplicar esta fuente a los botones y desplegables?");

    if (!aplicarH2 && !aplicarH3H4 && !aplicarButtons) {
      alert("❌ No se aplicó la fuente a ningún elemento.");
      return;
    }

    // Construir clases según selección
    const clases = [];
    if (aplicarH2) clases.push(`${selectedValue}-h2`);
    if (aplicarH3H4) clases.push(`${selectedValue}-h3h4`);
    if (aplicarButtons) clases.push(`${selectedValue}-buttons`);

    // Guardar en index siempre
    localStorage.setItem("tph_font_index", clases.join(" "));

    // Preguntar si aplicar también en ajustes
    const aplicarEnAjustes = confirm("¿Quieres aplicar esta fuente también en ajustes?");
    if (aplicarEnAjustes) {
      // Guardar y aplicar en settings
      localStorage.setItem("tph_font_settings", clases.join(" "));
      applyFont(clases.join(" "));
    } else {
      // Solo aplicar en index (no cambiar settings)
      applyFont(localStorage.getItem("tph_font_settings") || null);
    }

    alert("✅ Fuente aplicada.");
    dropdown.selectedIndex = 0;
  });
}

function initIndexMenu3() {
  // Solo cargar la fuente de index
  const fuenteIndex = localStorage.getItem("tph_font_index");
  if (fuenteIndex) {
    applyFont(fuenteIndex);
  }
}

function applyFont(claseFuente) {
  document.body.classList.remove(
    ...Array.from(document.body.classList).filter(c => c.startsWith("tph_font"))
  );

  if (claseFuente) {
    claseFuente.split(" ").forEach(cl => {
      document.body.classList.add(cl);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion3") !== null;
  if (isSettings) {
    initSettingsMenu3();
  } else {
    initIndexMenu3();
  }
});
