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
    } else {
      // Aquí va el código solo para index (no settings)
      const select = document.getElementById("opcion2");
      if (!select) return; // Si no existe, salir

      // Ocultar select inicialmente
      select.style.opacity = '0';
      select.style.pointerEvents = 'none';
      select.disabled = true;

      window.addEventListener('keydown', (e) => {
        if (e.keyCode === 117) { // F6
          select.disabled = false;
          select.style.opacity = '1';
          select.style.pointerEvents = 'auto';

          // Intentar abrir el select
          const evt = new MouseEvent('mousedown', { bubbles: true });
          select.dispatchEvent(evt);

          // Ocultar rápido en 100ms
          setTimeout(() => {
            select.disabled = true;
            select.style.opacity = '0';
            select.style.pointerEvents = 'none';
          }, 100);
        }
      });
    }
  });
}
