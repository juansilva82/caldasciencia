/**
 * Module: Pedagogy & Territorial Content
 * Gestiona los componentes interactivos de la plataforma:
 * - ¿Qué es el Plan de Acción de Caldas?
 * - ¿Cuál es el Diagnóstico actual en cifras (lo que hay y lo que encontramos)?
 * - ¿Para qué se hace? Los 4 Resultados Territoriales de Impacto
 * - Las 5 Fases de Construcción del Plan de Acción
 * - Líneas estratégicas y recomendaciones técnicas
 */
"use strict";

window.CC_PEDAGOGY = (function() {
  const D = window.CC_DATA;

  function init() {
    renderResultadosTerritoriales();
    renderDiagnosticoHome();
    renderFasesPlanTabs();
    renderContextLineas();
    renderRecomendaciones();
    initScrollReveal();
  }

  // 1. Render de los 4 Resultados Territoriales de Impacto
  function renderResultadosTerritoriales() {
    const el = document.getElementById("ejesContainer");
    if (!el) return;

    el.innerHTML = D.plan.resultadosTerritoriales.map((res, idx) => `
      <article class="eje-card reveal delay-${idx + 1}" style="--eje-color: ${res.color}">
        <span class="eje-badge">
          <i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${res.color}"></i>
          ${res.tag}
        </span>
        <h3>${res.titulo}</h3>
        <p>${res.descripcion}</p>
        <div class="eje-meta">
          <span><strong>Impacto esperado:</strong> ${res.impactoEsperado}</span>
        </div>
      </article>
    `).join("");
  }

  // 2. Render del Diagnóstico en Cifras en la página de Inicio
  function renderDiagnosticoHome() {
    const el = document.getElementById("diagHomeContainer");
    if (!el) return;

    el.innerHTML = D.plan.diagnostico.map((d, idx) => `
      <div class="stat reveal delay-${idx + 1}">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span class="eyebrow">Desconexión ${d.numero}</span>
          <span style="font-weight:700;font-size:12px;color:var(--muted)">Diagnóstico Actual</span>
        </div>
        <b style="font-size:36px;margin-top:6px">${d.datoPrincipal}</b>
        <span style="font-weight:700;color:var(--navy);font-size:14.5px">${d.datoSubtitulo}</span>
        <p style="font-size:13.5px;color:var(--muted);margin-top:6px;line-height:1.4">${d.notaCritica}</p>
        <div style="margin-top:10px;padding:8px 10px;background:var(--soft);border-radius:6px;font-size:12.5px;color:var(--teal)">
          <strong>Solución en el Plan:</strong> ${d.solucion}
        </div>
      </div>
    `).join("");
  }

  // 3. Render de las 5 Fases de Construcción del Plan con Tabs
  function renderFasesPlanTabs() {
    const navEl = document.getElementById("objTabsNav");
    const contentEl = document.getElementById("objDetailContainer");
    if (!navEl || !contentEl) return;

    navEl.innerHTML = D.plan.fasesPlan.map((fase, i) => `
      <button type="button" class="obj-tab ${i === 0 ? 'active' : ''}" data-fase-idx="${i}" aria-label="Fase ${fase.num}: ${fase.titulo}">
        <i>${fase.num}</i>
        <span>${fase.titulo}</span>
      </button>
    `).join("");

    showFaseDetail(0);

    navEl.addEventListener("click", e => {
      const btn = e.target.closest("[data-fase-idx]");
      if (!btn) return;
      const idx = +btn.dataset.faseIdx;

      navEl.querySelectorAll(".obj-tab").forEach((b, i) => {
        b.classList.toggle("active", i === idx);
      });

      showFaseDetail(idx);
    });
  }

  function showFaseDetail(idx) {
    const contentEl = document.getElementById("objDetailContainer");
    if (!contentEl) return;

    const fase = D.plan.fasesPlan[idx];
    if (!fase) return;

    contentEl.innerHTML = `
      <div class="obj-detail-header">
        <div>
          <span class="eyebrow" style="color:var(--teal)">Fase 0${fase.num} del Plan de Acción</span>
          <h3>${fase.num}. ${fase.titulo}</h3>
          <p style="font-size:15px;color:var(--navy);font-weight:600;margin-top:2px">${fase.subtitulo}</p>
          <p style="margin-top:8px;font-size:15.5px;line-height:1.5">${fase.descripcion}</p>
        </div>
        <div style="background:var(--soft);padding:14px 18px;border-radius:var(--radius-sm);border-left:4px solid var(--lime);max-width:320px">
          <small class="muted" style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;font-weight:700">Resultado Concreto de Esta Fase</small>
          <strong style="font-size:14px;color:var(--navy);line-height:1.35;display:block;margin-top:4px">${fase.entregableClave}</strong>
        </div>
      </div>
    `;
  }

  // 4. Render contextual de líneas y liderazgo
  function renderContextLineas() {
    const elLineas = document.getElementById("ctxLineas");
    const elLidera = document.getElementById("ctxLidera");
    if (elLineas) {
      const max = 4;
      elLineas.innerHTML = D.lineas.map(l => `
        <div class="r">
          <b>${l.lbl}</b>
          <div class="bar">
            <i style="width:calc(${l.p/max} * (100% - 210px));background:${D.misiones[l.m].c}"></i>
            <span><strong>${l.p}</strong> ${l.t}</span>
          </div>
        </div>
      `).join("");
    }
    if (elLidera) {
      elLidera.innerHTML = D.lidera.map(([n, v], i) => `
        <div class="r wide">
          <span>${n}</span>
          <div class="bar">
            <i style="width:calc(${v/28} * (100% - 40px));min-width:4px;background:${i ? "var(--teal)" : "var(--navy)"}"></i>
            <span><strong>${v}</strong></span>
          </div>
        </div>
      `).join("");
    }
  }

  // 5. Render recomendaciones
  function renderRecomendaciones() {
    const el = document.getElementById("recoBody");
    if (!el) return;
    el.innerHTML = D.recomendaciones.map((r, i) => `
      <tr>
        <td><b class="code">${i + 1}</b></td>
        <td><strong>${r[0]}</strong> ${r[1]}</td>
        <td><span class="tag">${r[2]}</span></td>
        <td>${r[3]}</td>
      </tr>
    `).join("");
  }

  // 6. Scroll Reveal Observer
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  return {
    init,
    showFaseDetail
  };
})();
