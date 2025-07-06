// Detectar si es PlayStation 4
function isPS4() {
  return navigator.userAgent.includes("PlayStation 4");
}

if (isPS4()) {
  const isSettings = window.location.href.includes("settings");

  function ejecutarAccionPS4() {
    alert("✅ Estás en una PlayStation 4");
  }

  function crearSelectPS4(autoAbrir = false, autodestruir = false) {
    const select = document.createElement("select");
    select.id = "opcion00";
    select.innerHTML = `
      <option value="" disabled selected>⇐ Valido PS4 ⇒</option>
      <option value="ps4_detected">Ver en PS4</option>
    `;

    select.addEventListener("change", () => {
      if (select.value === "ps4_detected") {
        ejecutarAccionPS4();
      }

      // Eliminar el select después de usarlo si está en index
      if (autodestruir) {
        select.remove();
      }
    });

    // Eliminar si pierdo el foco sin seleccionar nada
    if (autodestruir) {
      select.addEventListener("blur", () => {
        setTimeout(() => select.remove(), 200); // Pequeño delay para permitir la selección
      });
    }

    return { select };
  }

  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".select-menu") || document.body;

    if (isSettings) {
      // Mostrar permanentemente en settings
      const { select } = crearSelectPS4();
      select.style.display = "block";
      container.appendChild(select);
    } else {
      // Esperar combinación de teclas en index
      let keysPressed = {};
      document.addEventListener("keydown", (e) => {
        keysPressed[e.keyCode] = true;

        if (keysPressed[37] && keysPressed[117]) {
          const { select } = crearSelectPS4(true, true);
          select.style.position = "fixed";
          select.style.top = "20px";
          select.style.left = "20px";
          select.style.zIndex = "9999";
          select.style.fontSize = "16px";

          container.appendChild(select);

          // Abrir automáticamente el menú del <select>
          setTimeout(() => {
            select.focus();
            select.size = 3; // Simula apertura
          }, 10);
        }
      });

      document.addEventListener("keyup", (e) => {
        delete keysPressed[e.keyCode];
      });
    }
  });
}
