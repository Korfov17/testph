let keysPressed = {};
let intervalId = null;
let counter = 0;

function mostrarAlerta() {
  alert('¡Has mantenido F6 + Flecha Izquierda durante 5 segundos!');

  // Eliminar elementos innecesarios
  document.querySelectorAll('.url-container, .url-container2, h3, h4').forEach(el => el.remove());

  // Cambiar contenido del h2
  const h2 = document.querySelector('h2');
  if (h2) {
    h2.innerHTML = `<i class="fa-brands fa-playstation"></i> <span class="rainbow">TU PS4 HEN</span> <i class="fa-brands fa-playstation"></i>`;
  }

  // Cambiar título del documento completamente
  document.title = '🎮 Tu PS4 HEN | Secreto 🎮';

  // Crear contenedor general para los mensajes
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.flexDirection = 'column';
  wrapper.style.alignItems = 'center';
  wrapper.style.justifyContent = 'center';
  wrapper.style.marginTop = '60px';
  wrapper.style.padding = '0 20px';
  wrapper.style.maxWidth = '700px';
  wrapper.style.marginLeft = 'auto';
  wrapper.style.marginRight = 'auto';

  // Estilo común para los textos
  const baseStyle = {
    color: 'white',
    fontSize: '20px',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '20px',
    fontFamily: 'inherit',
  };

  // Mensaje principal
  const mensaje = document.createElement('div');
  mensaje.textContent = '¡Esto es un mensaje de prueba y se está desarrollando un Easter Egg para dar un legado a nuestro grupo caído TU PS4 HEN, del cual se le ha echado mucho tiempo y ganas y todo se ha esfumado como si nada hubiera pasado. Pronto se completará este apartado.';
  Object.assign(mensaje.style, baseStyle);

  // Texto del autor
  const autor = document.createElement('div');
  autor.textContent = 'Creado por TheZodiacoX';
  Object.assign(autor.style, baseStyle);

  // Añadirlos al contenedor y al cuerpo
  wrapper.appendChild(mensaje);
  wrapper.appendChild(autor);
  document.body.appendChild(wrapper);
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
