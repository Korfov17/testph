function initSettingsMenu4() {
  const dropdown = document.getElementById("opcion4");
  if (!dropdown) return;

  const coloresConCodigo = {
    blue: "#0000FF",
    green: "#008000",
    red: "#FF0000",
    orange: "#FFA500",
    purple: "#800080",
    black: "#000000",
    white: "#FFFFFF",
    gray: "#808080"
  };

  dropdown.addEventListener("change", async () => {
    const value = dropdown.value;
    dropdown.selectedIndex = 0;

    const isSettings = true;
    const askApplySettings = () => confirm("¿Quieres aplicar también este cambio en settings.html?");

    const applyToPage = (callback, applyInSettingsKey) => {
      callback(document);
      if (askApplySettings()) {
        localStorage.setItem(applyInSettingsKey, "true");
      } else {
        localStorage.removeItem(applyInSettingsKey);
      }
    };

    const applyFontSize = (selector, label, defaultSize, key) => {
      const size = prompt(`¿Qué tamaño deseas aplicar para ${label}? (por defecto: ${defaultSize}rem)`);
      if (!size) return;
      const newSize = `${parseFloat(size)}rem`;
      localStorage.setItem(key, newSize);
      applyToPage((doc) => {
        doc.querySelectorAll(selector).forEach(el => el.style.fontSize = newSize);
      }, `${key}_applyInSettings`);
    };

    const applyIconChange = () => {
      const currentIcon = "fa-playstation";
      const newIcon = prompt(`Icono actual: ${currentIcon}\n¿Qué parte del nombre quieres cambiar?`);
      if (!newIcon) return;
      const finalClass = `fa-brands ${newIcon}`;
      localStorage.setItem("zjb_changeicon", finalClass);
      applyToPage((doc) => {
        doc.querySelectorAll("h2 i.fa-brands").forEach(icon => {
          icon.className = finalClass;
        });
      }, "zjb_changeicon_applyInSettings");
    };

    const applyMargin = () => {
      const defaultMargin = "10px";
      const val = prompt(`¿Qué margen deseas aplicar al título? (por defecto: ${defaultMargin})\nEj: 5px (pequeño), 10px (medio), 20px (grande)`);
      if (!val) return;
      localStorage.setItem("zjb_margintitle", val);
      applyToPage((doc) => {
        doc.querySelectorAll("h2").forEach(h2 => h2.style.margin = val);
      }, "zjb_margintitle_applyInSettings");
    };

    const applyTextShadow = () => {
      const options = {
        "0": "none",
        "2": "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black",
        "4": "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black"
      };
      const preset = prompt("Elige un preset para el borde (0: sin sombra, 2: por defecto, 4: fuerte)");
      if (!options[preset]) return;
      const shadow = options[preset];
      localStorage.setItem("zjb_bordertitle", shadow);
      applyToPage((doc) => {
        doc.querySelectorAll("h2").forEach(h2 => h2.style.textShadow = shadow);
      }, "zjb_bordertitle_applyInSettings");
    };

    const toggleIcons = () => {
      const current = localStorage.getItem("zjb_showiconfa") || "visible";
      const newState = current === "visible" ? "hidden" : "visible";
      localStorage.setItem("zjb_showiconfa", newState);
      applyToPage((doc) => {
        doc.querySelectorAll("h2 i.fa-brands").forEach(i => i.style.visibility = newState);
      }, "zjb_showiconfa_applyInSettings");
    };

    const applyColorFont = () => {
      ["h3", "h4"].forEach(tag => {
        const opciones = Object.keys(coloresConCodigo);
        const elegido = prompt(`¿Qué color deseas aplicar para ${tag.toUpperCase()}?\nOpciones: ${opciones.join(", ")}`);
        if (!elegido || !coloresConCodigo[elegido]) return;
        const colorCode = coloresConCodigo[elegido];
        const key = `zjb_colorfont_${tag}`;
        localStorage.setItem(key, colorCode);
        applyToPage((doc) => {
          doc.querySelectorAll(tag).forEach(el => el.style.color = colorCode);
        }, `${key}_applyInSettings`);
      });
    };

    switch (value) {
      case "zjb_sizefont1":
        applyFontSize("h2", "Título (h2)", 3, value);
        break;
      case "zjb_sizefont2":
        applyFontSize("h3", "Descripción (h3)", 1.4, `${value}_h3`);
        applyFontSize("h4", "Descripción (h4)", 1.6, `${value}_h4`);
        break;
      case "zjb_changeicon":
        applyIconChange();
        break;
      case "zjb_margintitle":
        applyMargin();
        break;
      case "zjb_bordertitle":
        applyTextShadow();
        break;
      case "zjb_showiconfa":
        toggleIcons();
        break;
      case "zjb_colorfont":
        applyColorFont();
        break;
      case "zjb_rainbowdisabled": {
        const opciones = Object.keys(coloresConCodigo);
        const elegido = prompt(`¿Qué color deseas aplicar al Título?\nOpciones disponibles:\n${opciones.join(", ")}`);
        if (!elegido) return;

        const color = elegido.trim().toLowerCase();
        if (!opciones.includes(color)) {
          alert("❌ Color no válido.");
          return;
        }

        localStorage.setItem("zjb_rainbowdisabled", color);
        applyToPage((doc) => {
          const spans = doc.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
          spans.forEach(span => {
            span.classList.remove("rainbow");
            span.classList.add("rainbow-disabled");
            span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[color]);
          });
        }, "zjb_rainbowdisabled_applyInSettings");
        break;
      }
    }
  });

  // Al cargar
  const applySavedSettings = (doc, isSettings) => {
    const applyIf = (key, applyFn) => {
      const value = localStorage.getItem(key);
      const applyKey = `${key}_applyInSettings`;
      const shouldApply = isSettings ? localStorage.getItem(applyKey) === "true" : true;
      if (value && shouldApply) applyFn(value);
    };

    applyIf("zjb_sizefont1", val => {
      doc.querySelectorAll("h2").forEach(h2 => h2.style.fontSize = val);
    });

    ["h3", "h4"].forEach(tag => {
      applyIf(`zjb_sizefont2_${tag}`, val => {
        doc.querySelectorAll(tag).forEach(el => el.style.fontSize = val);
      });
    });

    applyIf("zjb_changeicon", val => {
      doc.querySelectorAll("h2 i.fa-brands").forEach(icon => icon.className = val);
    });

    applyIf("zjb_margintitle", val => {
      doc.querySelectorAll("h2").forEach(h2 => h2.style.margin = val);
    });

    applyIf("zjb_bordertitle", val => {
      doc.querySelectorAll("h2").forEach(h2 => h2.style.textShadow = val);
    });

    applyIf("zjb_showiconfa", val => {
      doc.querySelectorAll("h2 i.fa-brands").forEach(icon => icon.style.visibility = val);
    });

    ["h3", "h4"].forEach(tag => {
      applyIf(`zjb_colorfont_${tag}`, val => {
        doc.querySelectorAll(tag).forEach(el => el.style.color = val);
      });
    });

    applyIf("zjb_rainbowdisabled", color => {
      const spans = doc.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
      spans.forEach(span => {
        span.classList.remove("rainbow");
        span.classList.add("rainbow-disabled");
        span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[color]);
      });
    });
  };

  applySavedSettings(document, true);
}

function initIndexMenu4() {
  const coloresConCodigo = {
    blue: "#0000FF",
    green: "#008000",
    red: "#FF0000",
    orange: "#FFA500",
    purple: "#800080",
    black: "#000000",
    white: "#FFFFFF",
    gray: "#808080"
  };

  const applySavedSettings = (doc) => {
    const applyIf = (key, applyFn) => {
      const value = localStorage.getItem(key);
      if (value) applyFn(value);
    };

    applyIf("zjb_sizefont1", val => {
      doc.querySelectorAll("h2").forEach(h2 => h2.style.fontSize = val);
    });

    ["h3", "h4"].forEach(tag => {
      applyIf(`zjb_sizefont2_${tag}`, val => {
        doc.querySelectorAll(tag).forEach(el => el.style.fontSize = val);
      });
    });

    applyIf("zjb_changeicon", val => {
      doc.querySelectorAll("h2 i.fa-brands").forEach(icon => icon.className = val);
    });

    applyIf("zjb_margintitle", val => {
      doc.querySelectorAll("h2").forEach(h2 => h2.style.margin = val);
    });

    applyIf("zjb_bordertitle", val => {
      doc.querySelectorAll("h2").forEach(h2 => h2.style.textShadow = val);
    });

    applyIf("zjb_showiconfa", val => {
      doc.querySelectorAll("h2 i.fa-brands").forEach(icon => icon.style.visibility = val);
    });

    ["h3", "h4"].forEach(tag => {
      applyIf(`zjb_colorfont_${tag}`, val => {
        doc.querySelectorAll(tag).forEach(el => el.style.color = val);
      });
    });

    applyIf("zjb_rainbowdisabled", color => {
      const spans = doc.querySelectorAll("h2 span.rainbow, h2 span.rainbow-disabled");
      spans.forEach(span => {
        span.classList.remove("rainbow");
        span.classList.add("rainbow-disabled");
        span.style.setProperty("--rainbow-fixed-color", coloresConCodigo[color]);
      });
    });
  };

  applySavedSettings(document);
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion4") !== null;
  if (isSettings) {
    initSettingsMenu4();
  } else {
    initIndexMenu4();
  }
});
