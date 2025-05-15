function initSettingsPage() {
  const whiteBG = localStorage.getItem("whiteBackground");
  const fondoAjustes = localStorage.getItem("settingsBackground");
  const fondoGeneral = localStorage.getItem("customBackground");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondoAjustes) {
    if (fondoAjustes.startsWith("color:") || fondoAjustes.startsWith("gradient:")) {
      applyColorOrGradient(fondoAjustes);
    } else {
      applyBackground(fondoAjustes);
    }
  } else if (fondoGeneral && fondoGeneral.startsWith("color:")) {
    applyColorOrGradient(fondoGeneral);
  } else if (fondoGeneral) {
    applyBackground(fondoGeneral);
  } else {
    applyDefaultBackground();
  }

  const nombreSistema = localStorage.getItem("customSystemName");
  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Menu 🎮`;
  }

  const dropdown = document.getElementById("opcion2");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;
    let nuevaImagen = null;

    // Fondos por imagen
    if (selectedValue.startsWith("img")) {
      const numero = selectedValue.replace("img", "");
      nuevaImagen = `background/extra${numero}.jpg`;
    } else if (selectedValue === "customURL") {
      const url = prompt("Introduce la URL de la imagen de fondo:");
      if (url) nuevaImagen = url;
    }

    // Color personalizado
    else if (selectedValue === "colorPersonalizado") {
      const colorInput = prompt("Introduce un código de color (ej: #ff0000):");
      const esValido = /^#([0-9A-Fa-f]{3}){1,2}$/.test(colorInput);
      if (esValido) {
        const fondo = `color:${colorInput}`;
        localStorage.setItem("customBackground", fondo);
        localStorage.setItem("whiteBackground", "true");
        applyColorOrGradient(fondo);

        const aplicarEnAjustes = confirm("¿También quieres aplicarlo en ajustes?");
        if (aplicarEnAjustes) {
          localStorage.setItem("settingsBackground", fondo);
        }

        alert("✅ Fondo personalizado aplicado.");
      } else {
        alert("❌ Código de color no válido.");
      }
    }

    // Colores y degradados predefinidos
    else if (selectedValue.startsWith("color:") || selectedValue.startsWith("gradient:")) {
      const aplicarEnAjustes = confirm("¿También quieres aplicarlo en ajustes?");
      localStorage.setItem("customBackground", selectedValue);
      localStorage.setItem("whiteBackground", "true");
      applyColorOrGradient(selectedValue);

      if (aplicarEnAjustes) {
        localStorage.setItem("settingsBackground", selectedValue);
      }

      alert("✅ Fondo aplicado.");
    }

    // Aplicar imagen (con confirmación)
    if (nuevaImagen) {
      localStorage.setItem("customBackground", nuevaImagen);
      localStorage.removeItem("whiteBackground");

      const aplicarEnAjustes = confirm("¿También quieres aplicarlo en ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("settingsBackground", nuevaImagen);
        applyBackground(nuevaImagen);
      } else {
        const fondoActualSettings = localStorage.getItem("settingsBackground");
        if (fondoActualSettings?.startsWith("color:") || fondoActualSettings?.startsWith("gradient:")) {
          applyColorOrGradient(fondoActualSettings);
        } else if (fondoActualSettings) {
          applyBackground(fondoActualSettings);
        } else if (whiteBG === "true") {
          setWhiteBackground();
        } else {
          applyDefaultBackground();
        }
      }

      alert("✅ Fondo guardado para el menú.");
    }

    // Eliminar fondo
    else if (selectedValue === "removeBackground") {
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      localStorage.setItem("whiteBackground", "true");
      setWhiteBackground();
      alert("✅ Fondos eliminados. Ambos fondos ahora son negros.");
    }

    // Fondo por defecto
    else if (selectedValue === "default") {
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      localStorage.removeItem("whiteBackground");
      alert("✅ Fondos restablecidos por defecto.");
      location.reload();
    }

    dropdown.selectedIndex = 0;
  });
}
