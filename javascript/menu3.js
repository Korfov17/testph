function initSettingsMenu3() {
  const fuenteSettings = localStorage.getItem("tph_font_settings");
  if (fuenteSettings) {
    applyFont(fuenteSettings);
    // Si está activado el símbolo Robofan, reaplicar
    if (localStorage.getItem("tph_robofan_symbols_enabled") === "true") {
      reemplazarIconosRobofan(localStorage.getItem("tph_robofan_symbol_selected") || "b");
    }
  }

  const dropdown = document.getElementById("opcion3");
  if (!dropdown) return;

  dropdown.selectedIndex = 0; // placeholder

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    if (selectedValue === "tph_fontdefault") {
      // Comprobar si hubo reemplazo de íconos
      const symbolsWereEnabled = localStorage.getItem("tph_robofan_symbols_enabled") === "true";

      if (symbolsWereEnabled) {
        const restaurar = confirm("¿Quieres restaurar los íconos Font Awesome originales?");
        if (restaurar) {
          restaurarIconosFA();
          localStorage.removeItem("tph_robofan_symbols_enabled");
          localStorage.removeItem("tph_robofan_symbol_selected");
        }
      }

      localStorage.removeItem("tph_font_index");
      localStorage.removeItem("tph_font_settings");

      alert("✅ Fuente restablecida por defecto.");
      location.reload();
      return;
    }

    // 🔧 NUEVA OPCIÓN PARA RESTABLECER LOS ÍCONOS
    if (selectedValue === "tph_iconsdefault") {
      const confirmar = confirm("¿Quieres restaurar los íconos Font Awesome originales en toda la aplicación?");
      if (confirmar) {
        restaurarIconosFA();
        localStorage.removeItem("tph_robofan_symbols_enabled");
        localStorage.removeItem("tph_robofan_symbol_selected");
        alert("✅ Íconos restaurados por defecto.");
        location.reload();
        return;
      } else {
        dropdown.selectedIndex = 0;
        return;
      }
    }

    // Si selecciona tph_font3, preguntar por los símbolos personalizados
    if (selectedValue === "tph_font3") {
      const usarRobofan = confirm("¿Deseas reemplazar los íconos Font Awesome por los símbolos de la fuente Robofan?");
      if (usarRobofan) {
        // Preguntar por el símbolo a usar
        const simbolo = prompt(
          "Introduce la letra que quieres usar como símbolo:\n" +
          "Mayúsculas: A B C D E F G H I\n" +
          "Minúsculas: a b c d e f g h i j k l m n o p q r s t u v w x y z",
          "b"
        ) || "b";

        // Guardar y aplicar símbolo
        localStorage.setItem("tph_robofan_symbols_enabled", "true");
        localStorage.setItem("tph_robofan_symbol_selected", simbolo);
        reemplazarIconosRobofan(simbolo);
      } else {
        // Si no quiere, limpiar posibles símbolos previos
        restaurarIconosFA();
        localStorage.removeItem("tph_robofan_symbols_enabled");
        localStorage.removeItem("tph_robofan_symbol_selected");
      }
    }

    // Apply Font
    const aplicarH2 = confirm("¿Quieres aplicar la fuente seleccionada al Titulo?");
    const aplicarH3H4 = confirm("¿Quieres aplicar la fuente seleccionada al Texto?");
    const aplicarButtons = confirm("¿Quieres aplicar la fuente seleccionada a los Botones y Desplegables?");

    if (!aplicarH2 && !aplicarH3H4 && !aplicarButtons) {
      alert("❌ No se aplicó la fuente a ningún elemento.");
      return;
    }

    function parseFonts(str) {
      const res = { h2: null, h3h4: null, buttons: null };
      if (!str) return res;
      str.split(" ").forEach(clase => {
        if (clase.endsWith("-h2")) res.h2 = clase.replace("-h2", "");
        else if (clase.endsWith("-h3h4")) res.h3h4 = clase.replace("-h3h4", "");
        else if (clase.endsWith("-buttons")) res.buttons = clase.replace("-buttons", "");
      });
      return res;
    }

    // Read Values
    const indexFonts = parseFonts(localStorage.getItem("tph_font_index"));
    const settingsFonts = parseFonts(localStorage.getItem("tph_font_settings"));

    // Update Current Values
    function updateFonts(currentFonts) {
      if (aplicarH2) currentFonts.h2 = selectedValue;
      if (aplicarH3H4) currentFonts.h3h4 = selectedValue;
      if (aplicarButtons) currentFonts.buttons = selectedValue;
      return currentFonts;
    }

    const newIndexFonts = updateFonts(indexFonts);
    localStorage.setItem("tph_font_index",
      [newIndexFonts.h2 && `${newIndexFonts.h2}-h2`,
       newIndexFonts.h3h4 && `${newIndexFonts.h3h4}-h3h4`,
       newIndexFonts.buttons && `${newIndexFonts.buttons}-buttons`]
       .filter(Boolean).join(" ")
    );

    const aplicarEnAjustes = confirm("¿Quieres aplicar la fuente seleccionads en ajustes?");
    if (aplicarEnAjustes) {
      const newSettingsFonts = updateFonts(settingsFonts);
      localStorage.setItem("tph_font_settings",
        [newSettingsFonts.h2 && `${newSettingsFonts.h2}-h2`,
         newSettingsFonts.h3h4 && `${newSettingsFonts.h3h4}-h3h4`,
         newSettingsFonts.buttons && `${newSettingsFonts.buttons}-buttons`]
        .filter(Boolean).join(" ")
      );
      applyFont(localStorage.getItem("tph_font_settings"));

      // Reaplicar símbolos en settings si estaba activado
      if (localStorage.getItem("tph_robofan_symbols_enabled") === "true") {
        reemplazarIconosRobofan(localStorage.getItem("tph_robofan_symbol_selected") || "b");
      }
    } else {
      applyFont(localStorage.getItem("tph_font_settings") || null);
    }

    alert("✅ Fuente aplicada.");
    dropdown.selectedIndex = 0;
  });
}

function initIndexMenu3() {
  // Load Index Font
  const fuenteIndex = localStorage.getItem("tph_font_index");
  if (fuenteIndex) {
    applyFont(fuenteIndex);
  }

  // Reaplicar símbolo si está activado
  if (localStorage.getItem("tph_robofan_symbols_enabled") === "true") {
    reemplazarIconosRobofan(localStorage.getItem("tph_robofan_symbol_selected") || "b");
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

function reemplazarIconosRobofan(simbolo) {
  const faIcons = document.querySelectorAll("i[class*='fa']");
  faIcons.forEach(icon => {
    // Si ya es un span robofan, no hacer nada para evitar duplicados
    if (icon.tagName.toLowerCase() === "span" && icon.classList.contains("robofan-icon")) return;

    const span = document.createElement("span");
    span.classList.add("robofan-icon");
    span.textContent = simbolo;
    span.style.fontFamily = "'Robofan-Symbol', sans-serif";
    span.dataset.originalIcon = icon.outerHTML;
    icon.replaceWith(span);
  });
}

function restaurarIconosFA() {
  const robofanIcons = document.querySelectorAll("span.robofan-icon[data-original-icon]");
  robofanIcons.forEach(span => {
    const temp = document.createElement("div");
    temp.innerHTML = span.dataset.originalIcon;
    const originalIcon = temp.firstElementChild;
    span.replaceWith(originalIcon);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion3") !== null;
  if (isSettings) {
    initSettingsMenu3();
  } else {
    initIndexMenu3();
  }
});
