let keysPressed = {};
let intervalId = null;
let counter = 0;

function mostrarAlerta() {
  alert('¡Has mantenido F6 + Flecha Izquierda durante 5 segundos!');
}

function iniciarContador() {
  counter = 0;
  intervalId = setInterval(() => {
    counter++;
    if (counter >= 5) {
      clearInterval(intervalId);
      intervalId = null;
      mostrarAlerta();
    }
  }, 1000);
}

function cancelarContador() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  counter = 0;
}

document.addEventListener('keydown', (e) => {
  keysPressed[e.keyCode] = true;

  if (keysPressed[117] && keysPressed[37] && !intervalId) {
    iniciarContador();
  }
});

document.addEventListener('keyup', (e) => {
  delete keysPressed[e.keyCode];
  if (!keysPressed[117] || !keysPressed[37]) {
    cancelarContador();
  }
});
