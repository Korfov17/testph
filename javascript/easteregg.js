let keysPressed = {};
let intervalId = null;
let counter = 0;

function mostrarAlerta() {
  alert('¡Has mantenido F6 + Flecha Izquierda durante 5 segundos!');

  // ✅ Eliminar directamente los elementos .url-container y .url-container2
  document.querySelectorAll('.url-container').forEach(el => el.remove());
  document.querySelectorAll('.url-container2').forEach(el => el.remove());

  // Crear contenedor principal del mensaje
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '50%';
  container.style.left = '50%';
  container.style.transform = 'translate(-50%, -50%)';
  container.style.background = 'rgba(0,0,0,0.3)';
  container.style.border = '2px solid white';
  container.style.padding = '30px 60px';
  container.style.borderRadius = '10px';
  container.style.boxShadow = '0 0 12px 2px white';
  container.style.color = 'white';
  container.style.textAlign = 'center';
  container.style.zIndex = '1000';
  container.style.userSelect = 'none';

  // Mensaje principal
  const mensaje = document.createElement('h3');
  mensaje.textContent = '¡Esto es un mensaje de prueba y se está desarrollando un Easter Egg para dar un legado a nuestro grupo caído TU PS4 HEN, del cual se le ha echado mucho tiempo y ganas y todo se ha esfumado como si nada hubiera pasado. Pronto se completará este apartado.';
  mensaje.style.fontSize = '22px';
  mensaje.style.marginBottom = '20px';
  container.appendChild(mensaje);

  // Texto de autor debajo del mensaje
  const autor = document.createElement('p');
  autor.textContent = 'Creado por Z-DEV con amor para TU PS4 HEN.';
  autor.style.fontSize = '16px';
  autor.style.fontStyle = 'italic';
  autor.style.marginTop = '10px';
  autor.style.opacity = '0.85';
  container.appendChild(autor);

  // Agregar al body
  document.body.appendChild(container);

  // Cambiar <h2>
  const h2 = document.querySelector('h2');
  if (h2) {
    h2.innerHTML = `<i class="fa-brands fa-playstation"></i> <span class="rainbow">TU PS4 HEN</span> <i class="fa-brands fa-playstation"></i>`;
  }

  // Cambiar <h3>
  document.querySelectorAll('h3').forEach(h3 => {
    h3.textContent = h3.textContent.replace(/Z-Jailbreak/gi, 'Tu PS4 HEN');
  });

  // Cambiar <title>
  document.title = document.title.replace(/Z-JAILBREAK/gi, 'Tu PS4 HEN');
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
