function activateSpecialShortcut() {
  let keysPressed = {};
  let holdTimer = null;
  let visualIndicator = null;

  document.addEventListener('keydown', function(e) {
    keysPressed[e.keyCode] = true;

    if (keysPressed[117] && keysPressed[37]) {
      if (!holdTimer) {
        // Create visual indicator
        visualIndicator = document.createElement('div');
        visualIndicator.textContent = "Hold keys to activate...";
        visualIndicator.style.position = 'fixed';
        visualIndicator.style.bottom = '20px';
        visualIndicator.style.right = '20px';
        visualIndicator.style.backgroundColor = 'rgba(0,0,0,0.7)';
        visualIndicator.style.color = 'white';
        visualIndicator.style.padding = '10px 15px';
        visualIndicator.style.borderRadius = '8px';
        visualIndicator.style.fontFamily = 'sans-serif';
        visualIndicator.style.zIndex = '9999';
        document.body.appendChild(visualIndicator);

        holdTimer = setTimeout(() => {
          alert("Shortcut activated");

          // Remove buttons with specific classes
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

          // Create white box
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

          // Remove visual indicator
          if (visualIndicator) {
            visualIndicator.remove();
            visualIndicator = null;
          }

        }, 5000);
      }
    }
  });

  document.addEventListener('keyup', function(e) {
    delete keysPressed[e.keyCode];
    clearTimeout(holdTimer);
    holdTimer = null;

    // Remove visual indicator if keys released early
    if (visualIndicator) {
      visualIndicator.remove();
      visualIndicator = null;
    }
  });
}
