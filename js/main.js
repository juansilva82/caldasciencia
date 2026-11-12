/**
 * Main Application Orchestrator
 * Inicialización, enrutamiento hash, sincronización de vistas.
 */
"use strict";

(function() {
  const VIEWS = ["inicio", "contexto", "consulta", "resultados"];
  const HOME_ANCHORS = ["que-es", "diagnostico", "resultados-esperados", "ruta-construccion", "participacion", "objetivos", "ejes", "objeto"];

  function route() {
    let hash = (location.hash || "#inicio").slice(1);
    
    // Si navegan a anclas internas de la página de inicio, activar inicio y hacer scroll
    if (HOME_ANCHORS.includes(hash)) {
      activateView("inicio");
      setTimeout(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }

    if (!VIEWS.includes(hash)) hash = "inicio";
    activateView(hash);
    window.scrollTo(0, 0);
  }

  function activateView(v) {
    document.querySelectorAll("[data-view]").forEach(el => {
      el.hidden = el.id !== "v-" + v;
    });

    document.querySelectorAll(".nav a").forEach(a => {
      const href = a.getAttribute("href");
      if (href === "#" + v || (v === "inicio" && (href === "#inicio" || href === "#"))) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });

    if (v === "consulta" && window.CC_SURVEY) {
      window.CC_SURVEY.renderStep();
    }
    if (v === "resultados" && window.CC_RESULTS) {
      window.CC_RESULTS.renderResults();
    }
  }

  // Inicialización cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicializar Módulos
    if (window.CC_PEDAGOGY) window.CC_PEDAGOGY.init();
    if (window.CC_SURVEY) window.CC_SURVEY.init();
    if (window.CC_ADMIN) window.CC_ADMIN.init();
    if (window.CC_RESULTS) window.CC_RESULTS.init();

    // 2. Enrutador
    window.addEventListener("hashchange", route);
    route();

    // 3. Auto recarga de resultados en vivo cada 2 minutos
    setInterval(() => {
      if (!document.hidden && location.hash === "#resultados" && window.CC_RESULTS) {
        if (window.CC_RESULTS.getMode() === "db") {
          window.CC_RESULTS.load();
        }
      }
    }, 120000);
  });
})();
