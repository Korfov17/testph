function initSettingsMenu3() {
  // Cargar las fuentes separadas o el combinado para aplicar en ajustes
  const h2Font = localStorage.getItem("tph_font_h2") || "";
  const h3h4Font = localStorage.getItem("tph_font_h3h4") || "";
  const buttonsFont = localStorage.getItem("tph_font_buttons") || "";

  const combinedSettings = [h2Font, h3h4Font, buttonsFont].filter(Boolean).join(" ");
  applyFont(combinedSettings);

  const dropdown = document.getElementById("opcion3");
  if (!dropdown) return;

  dropdown.selectedIndex = 0; // placeholder

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    if (selectedValue === "tph_fontdefault") {
      // Eliminar todos los settings relacionados a fuentes
      localStorage.removeItem("tph_font_h2");
      localStorage.removeItem("tph_font_h3h4");
      localStorage.removeItem("tph_font_buttons");
      localStorage.removeItem("tph_font_settings");
      localStorage.removeItem("tph_font_index");
      alert("✅ Fuentes restablecidas por defecto.");
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

    if (aplicarH2) {
      localStorage.setItem("tph_font_h2", `${selectedValue}-h2`);
    } else {
      localStorage.removeItem("tph_font_h2");
    }

    if (aplicarH3H4) {
      localStorage.setItem("tph_font_h3h4", `${selectedValue}-h3h4`);
    } else {
      localStorage.removeItem("tph_font_h3h4");
    }

    if (aplicarButtons) {
      localStorage.setItem("tph_font_buttons", `${selectedValue}-buttons`);
    } else {
      localStorage.removeItem("tph_font_buttons");
    }

    // Combinar clases para index y settings
    const combinedClasses = [
      localStorage.getItem("tph_font_h2"),
      localStorage.getItem("tph_font_h3h4"),
      localStorage.getItem("tph_font_buttons")
    ].filter(Boolean).join(" ");

    // Guardar combinado en settings e index para sincronizar
    localStorage.setItem("tph_font_settings", combinedClasses);
    localStorage.setItem("tph_font_index", combinedClasses);

    applyFont(combinedClasses);

    alert("✅ Fuente aplicada.");
    dropdown.selectedIndex = 0;
  });
}

function initIndexMenu3() {
  // Cargar las fuentes combinadas para index
  const fuenteIndex = localStorage.getItem("tph_font_index");
  if (fuenteIndex) {
    applyFont(fuenteIndex);
  }
}

function applyFont(claseFuente) {
  // Limpiar clases previas de fuentes
  document.body.classList.remove(
    ...Array.from(document.body.classList).filter(c => c.startsWith("tph_font"))
  );

  // Aplicar nuevas clases
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
