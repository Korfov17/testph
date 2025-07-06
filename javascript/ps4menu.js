// Detectar si se está usando una PlayStation 4
function isPS4() {
  return navigator.userAgent.includes("PlayStation 4");
}

// Verificar si estamos en la página index (por ejemplo que no sea settings)
function isIndexPage() {
  return !window.location.href.includes("settings");
}

document.addEventListener("DOMContentLoaded", () => {
  if (isPS4() && isIndexPage()) {
    // Intentamos obtener el select creado por settings.html (que tiene id="opcion2")
    const select = document.getElementById("opcion2");

    if (select) {
      // Al principio estará visible o no, aquí lo ocultamos para que empiece oculto
      select.style.position = "fixed";
      select.style.bottom = "10px";
      select.style.left = "10px";
      select.style.opacity = "0";
      select.style.pointerEvents = "none";
      select.style.transition = "opacity 0.3s";
      select.disabled = true;

      window.addEventListener("keydown", function (e) {
        if (e.keyCode === 117) { // F6
          select.disabled = false;
          select.style.opacity = "1";
          select.style.pointerEvents = "auto";

          // Simular clic para abrir select (puede que no funcione en todos los navegadores)
          const evt = new MouseEvent("mousedown", { bubbles: true });
          select.dispatchEvent(evt);

          // Ocultar rápido tras 100ms
          setTimeout(() => {
            select.disabled = true;
            select.style.opacity = "0";
            select.style.pointerEvents = "none";
          }, 100);
        }
      });
    } else {
      // Si no se encuentra el select aún, podrías intentar esperar o informar:
      console.warn("No se encontró el select con id 'opcion2'.");
    }
  }
});
