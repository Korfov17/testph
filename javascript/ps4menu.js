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
    return select;
  }

  // Acción que se ejecuta en PS4
  function ejecutarAccionPS4() {
    alert("✅ Estás en una PlayStation 4");
  }

  // Teclas presionadas
  let keysPressed = {};

  // Detectar combinación en index.html (← + F6)
  document.addEventListener("keydown", (event) => {
    keysPressed[event.keyCode] = true;

    if (!isSettingsPage() && keysPressed[37] && keysPressed[117]) {
      ejecutarAccionPS4();
    }
  });

  document.addEventListener("keyup", (event) => {
    delete keysPressed[event.keyCode];
  });

  // Insertar el select en settings
  document.addEventListener("DOMContentLoaded", () => {
    if (isSettingsPage()) {
      const contenedor = document.querySelector(".select-menu") || document.body;
      const select = crearSelectPS4();
      contenedor.appendChild(select);

      select.addEventListener("change", () => {
        if (select.value === "ps4_detected") {
          ejecutarAccionPS4();
        }
        select.selectedIndex = 0;
      });
    }
  });
}
