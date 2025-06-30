let keysPressed = {};
let intervalId = null;
let counter = 0;

function mostrarAlerta() {
  alert('¡Has mantenido F6 + Flecha Izquierda durante 5 segundos!');

  // Eliminar elementos innecesarios
  document.querySelectorAll('.url-container, .url-container2').forEach(el => el.remove());
  document.querySelectorAll('h3').forEach(h3 => h3.remove()); // Elimina todos los h3

  // Cambiar contenido del h2
  const h2 = document.querySelector('h2');
  if (h2) {
    h2.innerHTML = `<i class="fa-brands fa-playstation"></i> <span class="rainbow">TU PS4 HEN</span> <i class="fa-brands fa-playstation"></i>`;
  }

  // Cambiar el título de la página
  document.title = document.title.replace(/Z-JAILBREAK/gi, 'Tu PS4 HEN');

  // Crear el mensaje libre (sin cuadro)
  const mensaje = document.createElement('div');
  mensaje.textContent = '¡Esto es un mensaje de prueba y se está desarrollando un Easter Egg para dar un legado a nuestro grupo caído TU PS4 HEN, del cual se le ha echado mucho tiempo y ganas y todo se ha esfumado como si nada hubiera pasado. Pronto se completará este apartado.';
  mensaje.style.color = 'white';
  mensaje.style.fontSize = '20px';
  mensaje.style.fontWeight = '500';
  mensaje.style.textAlign = 'center';
  mensaje.style.marginTop = '50px';
  mensaje.style.padding = '0 20px';

  // Crear el texto del autor
  const autor = document.createElement('div');
  autor.textContent = 'Creado por TheZodiacoX';
  autor.style.color = 'white';
  autor.style.fontSize = '16px';
  autor.style.fontStyle = 'italic';
  autor.style.opacity = '0.85';
  autor.style.textAlign = 'center';
  autor.style.marginTop = '20px';

  // Añadirlos al cuerpo del documento
  document.body.appendChild(mensaje);
  document.body.appendChild(autor);
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
