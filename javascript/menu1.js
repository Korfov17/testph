function initSettingsMenu1() {
  const nombreSistema = localStorage.getItem("zjb_customTitleHTML");
  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Ajustes 🎮`;
  }

  const dropdown = document.getElementById("opcion1");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    switch (selectedValue) {
      case "zjb_changetitleHTML":
        const nuevoNombre = prompt("Introduce el texto para reemplazar:");
        if (nuevoNombre) {
          localStorage.setItem("zjb_customTitleHTML", nuevoNombre);
          document.title = `🎮 ${nuevoNombre} | Ajustes 🎮`;
          alert("✅ Titulo HTML Actualizado.");
        }
        break;

      case "zjb_changeTitle":
        const nuevoTitulo = prompt("Introduce el texto para reemplazar el título principal:");
        if (nuevoTitulo) {
          localStorage.setItem("zjb_customTitle", nuevoTitulo);
          alert("✅ Título actualizado.");
        }
        break;

      case "zjb_showuseragent":
        const estadoActual = localStorage.getItem("zjb_filterUserAgent");
        localStorage.setItem(
          "zjb_filterUserAgent",
          estadoActual === "hidden" ? "visible" : "hidden"
        );
        alert("✅ Mostrar/Ocultar alternado.");
        break;

      case "zjb_about":
        const userAgent = navigator.userAgent;
        const isPS4 = userAgent.includes("PlayStation 4");
        let text_about = "";

        if (isPS4) {
          const firmwareMatch = userAgent.match(/PlayStation 4\/([\d.]+)/);
          const firmwareVersion = firmwareMatch ? firmwareMatch[1] : "00.00";
          text_about += `🎮 PlayStation 4 Firmware: v${firmwareVersion}\n\n`;
        }

        text_about +=
          "ℹ️ Este Sitio Web ha sido creado y actualizado por TheZodiacoX.\n\n" +
          "ℹ️ Puedes usarlo como centro de recursos tanto en PC/Movil como en PS4 para hacer Jailbreak o Cargr Payloads siendo un Host personalizable.\n\n" +
          "• Personalizable.\n" +
          "• Configurable.\n" +
          "• Host para Jailbreak.\n" +
          "• Gestion propio de Accesos directos.\n\n" +
          "ℹ️ NOTA: Este apartado esta todavia en creacion, mantengase atento a las proximas novedades del Sitio.";

        alert(text_about);
        break;
    }

    dropdown.selectedIndex = 0;
  });
}

function initIndexMenu1() {
  const titulo = localStorage.getItem("zjb_customTitle");
  const nombreSistema = localStorage.getItem("zjb_customTitleHTML");

  if (titulo) {
    const span = document.querySelector("h2 .rainbow");
    if (span) {
      span.textContent = titulo;
    }
  }

  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Menu 🎮`;
  }

  const h3 = document.getElementById("filterUserAgent");
  if (h3) {
    const estado = localStorage.getItem("zjb_filterUserAgent");
    h3.style.display = estado === "hidden" ? "none" : "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings1 = document.getElementById("opcion1") !== null;
  if (isSettings1) {
    initSettingsMenu1();
  }

  const isIndex =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";
  if (isIndex) {
    initIndexMenu1();
  }
});
