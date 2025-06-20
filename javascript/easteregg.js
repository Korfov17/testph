function activarAtajoEspecial() {
  let keysPressed = {};
  let holdTimer = null;

  document.addEventListener('keydown', function(e) {
    keysPressed[e.keyCode] = true;

    if (keysPressed[117] && keysPressed[37]) {
      if (!holdTimer) {
        holdTimer = setTimeout(() => {
          alert("Atajo activado");

          // Clases a eliminar
          const clases = [
            'classname',
            'classname1',
            'large-button-container',
            'small-button-container',
            'small-button'
          ];

          // Eliminar elementos con esas clases
          clases.forEach(clase => {
            document.querySelectorAll(`.${clase}`).forEach(el => el.remove());
          });

          // Crear cuadro blanco moderno
          const box = document.createElement('div');
          box.style.position = 'fixed';
          box.style.top = '50%';
          box.style.left = '50%';
          box.style.transform = 'translate(-50%, -50%)';
          box.style.width = '80%';
          box.style.maxWidth = '600px';
          box.style.height = '300px';
          box.style.backgroundColor = 'white';
          box.style.borderRadius = '20px';
          box.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';
          box.style.display = 'flex';
          box.style.justifyContent = 'center';
          box.style.alignItems = 'center';
          box.style.fontSize = '1.5rem';
          box.style.fontFamily = 'sans-serif';
          box.innerText = "¡Modo especial activado!";

          document.body.appendChild(box);
        }, 5000);
      }
    }
  });

  document.addEventListener('keyup', function(e) {
    delete keysPressed[e.keyCode];
    clearTimeout(holdTimer);
    holdTimer = null;
  });
}
