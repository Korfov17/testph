// Detectar si se está usando una PlayStation 4
function isPS4() {
  return navigator.userAgent.includes("PlayStation 4");
}

// Ejecutar solo si estamos en una PS4
if (isPS4()) {
  // Verificar si estamos en settings.html
  function isSettingsPage() {
    return window.location.href.includes("settings");
  }

  // Crear el <select> para PS4
  function crearSelectPS4() {
    const select = document.createElement("select");
    select.id = "opcion2";

    select.innerHTML = `
      <option value="" disabled selected>Selecciona una opción</option>
      <option value="ps4_detected">Verificar si estoy en PS4</option>
    `;

    select.addEventListener("change", () => {
      if (select.value === "ps4_detected") {
        alert("✅ Estás en una PlayStation 4");
      }
      select.selectedIndex = 0;
    });

    return select;
  }

  // Insertar el select en settings si aplica
  document.addEventListener("DOMContentLoaded", () => {
    if (isSettingsPage()) {
      const contenedor = document.querySelector(".select-menu");
      if (contenedor) {
        const select = crearSelectPS4();
        contenedor.appendChild(select);
      }
    }
  });
}
