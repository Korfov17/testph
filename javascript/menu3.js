function initSettingsMenu3() {
  const fuenteAjustes = localStorage.getItem("settingsFont") || "tph_fontdefault";
  applyFont(fuenteAjustes);

  const dropdown = document.getElementById("opcion3");
  if (!dropdown) return;

  // Siempre dejar la opción inicial seleccionada al cargar
  dropdown.selectedIndex = 0;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    if (selectedValue === "tph_fontdefault") {
      // Restablecer fuente por defecto
      document.body.classList.remove(
        ...Array.from(document.body.classList).filter(c => c.startsWith("tph_font"))
      );
      localStorage.removeItem("customFont");
      localStorage.removeItem("settingsFont");
      alert("✅ Fuente restablecida por defecto.");
      location.reload();
      return;
    }

    // Guardar fuente para index
    localStorage.setItem("customFont", selectedValue);

    const aplicarEnAjustes = confirm("¿También quieres aplicar esta fuente en ajustes?");
    if (aplicarEnAjustes) {
      localStorage.setItem("settingsFont", selectedValue);
      applyFont(selectedValue);
    } else {
      // Si no aplicar en ajustes, mantener la fuente anterior en ajustes
      const fuenteActualSettings = localStorage.getItem("settingsFont") || "tph_fontdefault";
      applyFont(fuenteActualSettings);
    }

    alert("✅ Fuente aplicada.");
    // Después de aplicar, reiniciar el dropdown a la opción inicial
    dropdown.selectedIndex = 0;
  });
}

function initIndexMenu3() {
  const fuente = localStorage.getItem("customFont") || "tph_fontdefault";
  applyFont(fuente);
}

// Asignar clase CSS según nombre de fuente
function applyFont(fontKey) {
  document.body.classList.remove(
    ...Array.from(document.body.classList).filter(c => c.startsWith("tph_font"))
  );
  if (fontKey && fontKey !== "tph_fontdefault") {
    document.body.classList.add(fontKey);
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
