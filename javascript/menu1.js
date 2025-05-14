document.addEventListener("DOMContentLoaded", () => {
  const selector1 = document.getElementById("opcion1");

  selector1.addEventListener("change", () => {
    const selectedValue = selector1.value;

    switch (selectedValue) {
      case "setBackgroundImage":
        setBackground("background/extra2.jpg");
        break;
      case "changeTitle":
        changeMainTitle();
        break;
      case "changeSystemName":
        changeSystemName();
        break;
      case "applyIndexBackground":
        applyIndexBackgroundToSettings();
        break;
      case "clearBackground":
        clearBackgroundBoth();
        break;
      default:
        break;
    }

    selector1.selectedIndex = 0; // Restablece el selector
  });

  applySavedSettings();
});

function setBackground(url) {
  document.body.style.backgroundImage = `url('${url}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundColor = "";
  localStorage.setItem("customBackground", url); // Clave única para ambos
}

function clearBackgroundBoth() {
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#ffffff";
  localStorage.removeItem("customBackground");
}

function changeMainTitle() {
  const newText = prompt("Nuevo texto para el título:");
  if (!newText) return;

  const span = document.querySelector("h2 .arcoiris");
  if (span) span.textContent = newText;

  document.title = `🎮 ${newText} | Menu 🎮`;

  localStorage.setItem("customTitle", newText);
}

function changeSystemName() {
  const newName = prompt("Nuevo nombre del sistema (aplicará en index.html también):");
  if (!newName) return;

  localStorage.setItem("customSystemName", newName);
  alert("✅ Nombre guardado. Recarga settings.html e index.html para aplicarlo.");
}

function applyIndexBackgroundToSettings() {
  const bg = localStorage.getItem("customBackground");
  if (!bg) return alert("⚠️ No se encontró fondo en index.");

  if (confirm("¿Quieres aplicar el fondo de index.html a settings.html?")) {
    setBackground(bg);
    alert("✅ Fondo aplicado a settings.html");
  }
}

function applySavedSettings() {
  const savedTitle = localStorage.getItem("customTitle");
  if (savedTitle) {
    const span = document.querySelector("h2 .arcoiris");
    if (span) span.textContent = savedTitle;
    document.title = `🎮 ${savedTitle} | Menu 🎮`;
  }

  const bg = localStorage.getItem("customBackground");
  if (bg) {
    setBackground(bg);
  }

  const systemName = localStorage.getItem("customSystemName");
  if (systemName && !savedTitle) {
    const span = document.querySelector("h2 .arcoiris");
    if (span) span.textContent = systemName;
    document.title = `🎮 ${systemName} | Menu 🎮`;
  }
}
