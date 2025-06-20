function activateSpecialShortcut() {
  let keysPressed = {};
  let holdTimer = null;

  document.addEventListener('keydown', function(e) {
    keysPressed[e.keyCode] = true;

    if (keysPressed[117] && keysPressed[37]) {
      if (!holdTimer) {
        holdTimer = setTimeout(() => {
          alert("Shortcut activated");

          const classesToRemove = [
            'classname',
            'classname1',
            'large-button-container',
            'small-button-container',
            'small-button'
          ];

          classesToRemove.forEach(className => {
            document.querySelectorAll(`.${className}`).forEach(el => el.remove());
          });

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
          box.innerText = "Special mode activated!";

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

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.endsWith("special-page.html")) {
    activateSpecialShortcut();
  }
});
