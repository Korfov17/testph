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

    const aplicarH2 = confirm("¿Quieres aplicar esta fuente a los h2?");
    const aplicarH3H4 = confirm("¿Quieres aplicar esta fuente a los h3 y h4?");
    const aplicarButtons = confirm("¿Quieres aplicar esta fuente a los botones y desplegables?");

    if (!aplicarH2 && !aplicarH3H4 && !aplicarButtons) {
      alert("❌ No se aplicó la fuente a ningún elemento.");
      return;
    }

    // Construir clases según lo seleccionado
    const clases = [];
    if (aplicarH2) clases.push(`${selectedValue}-h2`);
    if (aplicarH3H4) clases.push(`${selectedValue}-h3h4`);
    if (aplicarButtons) clases.push(`${selectedValue}-buttons`);

    // Guardar clases en localStorage como string separado por espacios
    localStorage.setItem("tph_font", clases.join(" "));

    // Preguntar si aplicar en ajustes solo si alguna clase fue elegida
    const aplicarEnAjustes = confirm("¿Quieres aplicar esta fuente también en ajustes?");
    if (aplicarEnAjustes) {
      applyFont(clases.join(" "));
    } else {
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
  // Eliminar todas las clases que empiezan con "tph_font"
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
