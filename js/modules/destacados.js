/**
 * Lo esencial: destacados curados (window.CC_DEST) en la portada y al inicio de cada sección.
 */
"use strict";

(function () {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const D = window.CC_DEST;
  if (!D) return;

  const card = (x, compact) => `<a class="dst dst-${x.tipo}${compact ? " sm" : ""}" href="${esc(x.link)}">
      <span class="dst-tag"><i aria-hidden="true">${D.tipos[x.tipo].i}</i>${D.tipos[x.tipo].t}</span>
      <b class="dst-big">${esc(x.big)}</b>
      <strong class="dst-t">${esc(x.titulo)}</strong>
      ${compact ? "" : `<span class="dst-x">${esc(x.texto)}</span>`}
      <span class="dst-f">${esc(x.fuente)}<em>${compact ? "Ver detalle" : "Ver más"} →</em></span>
    </a>`;

  // Portada: «Lo esencial en dos minutos», con filtro por tipo
  const home = document.getElementById("dstHome");
  if (home) {
    const cnt = k => D.items.filter(x => x.tipo === k).length;
    home.innerHTML = `
      <div class="dst-filt" role="group" aria-label="Filtrar destacados">
        <button type="button" class="on" data-t="">Todo <span>${D.items.length}</span></button>
        ${Object.entries(D.tipos).map(([k, T]) => `<button type="button" data-t="${k}" class="b-${k}"><i aria-hidden="true">${T.i}</i>${T.tp} <span>${cnt(k)}</span></button>`).join("")}
      </div>
      <div class="dst-grid">${D.items.map(x => card(x)).join("")}</div>`;
    home.querySelectorAll(".dst-filt button").forEach(b => b.addEventListener("click", () => {
      home.querySelectorAll(".dst-filt button").forEach(o => o.classList.toggle("on", o === b));
      home.querySelectorAll(".dst").forEach((c, i) => { c.hidden = !!b.dataset.t && D.items[i].tipo !== b.dataset.t; });
    }));
  }

  // Franja «Lo clave de esta sección» al inicio de cada vista
  document.querySelectorAll(".dst-strip[data-vista]").forEach(el => {
    const xs = D.items.filter(x => (x.vistas || []).includes(el.dataset.vista)).slice(0, 4);
    if (!xs.length) { el.remove(); return; }
    el.innerHTML = `<div class="wrap"><span class="dst-strip-h">Lo clave de esta sección</span>
      <div class="dst-row n${xs.length}">${xs.map(x => card(x, true)).join("")}</div></div>`;
  });
})();
