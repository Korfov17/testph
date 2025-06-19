function initSettingsMenu3() {
  const fuenteGuardada = localStorage.getItem("tph_font");

  if (fuenteGuardada) {
    applyFont(fuenteGuardada);
  }

  const dropdown = document.getElementById("opcion3");
  if (!dropdown) return;

  dropdown.selectedIndex = 0; // Dejar en placeholder al cargar

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    if (selectedValue === "tph_fontdefault") {
      localStorage.removeItem("tph_font");
      alert("✅ Fuente restablecida por defecto.");
      location.reload();
      return;
    }

    // Guardar la fuente seleccionada
    localStorage.setItem("tph_font", selectedValue);

    // Preguntar si aplicar también en ajustes
    const aplicarEnAjustes = confirm("¿Quieres aplicar esta fuente también en ajustes?");
    if (aplicarEnAjustes) {
      applyFont(selectedValue);
    } else {
      // Si no se aplica en ajustes, mantenemos la fuente actual (o default)
      const fuenteActual = localStorage.getItem("tph_font");
      if (fuenteActual) {
        applyFont(fuenteActual);
      } else {
        applyFont(null);
      }
    }

    alert("✅ Fuente aplicada.");
    dropdown.selectedIndex = 0;
  });
}

function initIndexMenu3() {
  const fuente = localStorage.getItem("tph_font");
  if (fuente) {
    applyFont(fuente);
  }
}

function applyFont(claseFuente) {
  document.body.classList.remove(
    ...Array.from(document.body.classList).filter(c => c.startsWith("tph_font"))
  );
  if (claseFuente) {
    document.body.classList.add(claseFuente);
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
