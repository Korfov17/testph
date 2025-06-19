function initSettingsMenu3() {
  const fuenteAjustes = localStorage.getItem("settingsFont");
  if (fuenteAjustes) {
    applyFont(fuenteAjustes);
  }

  const dropdown = document.getElementById("opcion3");
  if (!dropdown) return;

  // Seleccionar la opción guardada en el dropdown al iniciar
  if (fuenteAjustes) {
    dropdown.value = fuenteAjustes;
  } else {
    dropdown.selectedIndex = 0; // opción por defecto (disabled)
  }

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    if (selectedValue === "tph_fontdefault") {
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
      const fuenteActualSettings = localStorage.getItem("settingsFont");
      if (fuenteActualSettings) {
        applyFont(fuenteActualSettings);
        dropdown.value = fuenteActualSettings; // Actualizar dropdown a la fuente aplicada
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
  // Eliminar todas las clases que empiezan con "tph_font"
  document.body.classList.remove(
    ...Array.from(document.body.classList).filter(c => c.startsWith("tph_font"))
  );

  // Añadir la clase correspondiente si hay valor
  if (fontKey) {
    document.body.classList.add(fontKey);
  }
}

// Detectar si es settings o index y ejecutar la función correspondiente
document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion3") !== null;
  if (isSettings) {
    initSettingsMenu3();
  } else {
    initIndexMenu3();
  }
});
