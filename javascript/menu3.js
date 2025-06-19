function initSettingsMenu3() {
  const fuenteAjustes = localStorage.getItem("settingsFont");
  if (fuenteAjustes) {
    applyFont(fuenteAjustes);
  }

  const dropdown = document.getElementById("opcion3");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    if (selectedValue === "tph_fontdefault") {
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
      const fuenteActualSettings = localStorage.getItem("settingsFont");
      if (fuenteActualSettings) {
        applyFont(fuenteActualSettings);
      }
    }

    alert("✅ Fuente aplicada.");
    dropdown.selectedIndex = 0;
  });
}

function initIndexMenu3() {
  const fuente = localStorage.getItem("customFont");
  if (fuente) {
    applyFont(fuente);
  }
}

// Asignar clase CSS según nombre de fuente
function applyFont(fontKey) {
  document.body.classList.remove(
    ...Array.from(document.body.classList).filter(c => c.startsWith("tph_font"))
  );
  if (fontKey) {
    document.body.classList.add(fontKey);
  }
}

// Detectar si es settings o index
document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion3") !== null;
  if (isSettings) {
    initSettingsMenu3();
  } else {
    initIndexMenu3();
  }
});
