// Detectar si se está usando una PlayStation 4
function isPS4() {
  return navigator.userAgent.includes("PlayStation 4");
}

// Ejecutar solo si estamos en una PS4
if (isPS4()) {
  function isSettingsPage() {
    return window.location.href.includes("settings");
  }

  // Acción al seleccionar opción PS4
  function ejecutarAccionPS4() {
    alert("✅ Estás en una PlayStation 4");
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
        ejecutarAccionPS4();
      }
      select.selectedIndex = 0;
    });

    return select;
  }

  // Insertar el <select> en settings o index según el caso
  document.addEventListener("DOMContentLoaded", () => {
    if (isSettingsPage()) {
      // En settings: añadirlo al contenedor .select-menu
      const contenedor = document.querySelector(".select-menu");
      if (contenedor) {
        const select = crearSelectPS4();
        contenedor.appendChild(select);
      }
    } else {
      // En index: añadirlo dentro de #url00-container como botón
      const contenedor = document.querySelector("#url00-container");
      if (contenedor) {
        const select = crearSelectPS4();
        contenedor.appendChild(select);
      }
    }
  });
}
