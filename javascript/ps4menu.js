// Detectar si se está usando una PlayStation 4
function isPS4() {
  return navigator.userAgent.includes("PlayStation 4");
}

if (isPS4()) {
  // Verificar si estamos en settings.html
  function isSettingsPage() {
    return window.location.href.includes("settings");
  }

  // Crear el <select> para PS4 (para settings)
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

  document.addEventListener("DOMContentLoaded", () => {
    if (isSettingsPage()) {
      // Insertar select en settings (tu código original)
      const contenedor = document.querySelector(".select-menu");
      if (contenedor) {
        const select = crearSelectPS4();
        contenedor.appendChild(select);
      }
    } else {
      // Estamos en index (o cualquier otra página que NO sea settings)
      // Crear un select igual pero controlado para mostrar/ocultar rápido con F6
      const select = crearSelectPS4();

      // Añadir estilos para que esté fijo abajo y oculto
      Object.assign(select.style, {
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        opacity: '0',
        pointerEvents: 'none',
        transition: 'opacity 0.1s',
        zIndex: 9999,
      });

      // Insertar en body para que sea visible en index
      document.body.appendChild(select);

      // Inicialmente deshabilitado
      select.disabled = true;

      window.addEventListener('keydown', (e) => {
        if (e.keyCode === 117) { // F6
          select.disabled = false;
          select.style.opacity = '1';
          select.style.pointerEvents = 'auto';

          // Intentar abrir el select (no funciona siempre pero vale intentar)
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
