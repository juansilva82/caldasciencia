/**
 * El Plan de Acción 2026-2033
 * Dibuja P-04 (líneas y metas), P-05 (portafolio) y P-06 (voz del ecosistema y validación) desde window.CC_PLAN.
 */
"use strict";

window.CC_PLAN_VIEW = (function () {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const mill = v => "$" + Number(v).toLocaleString("es-CO") + " M";
  const milM = v => (v / 1000).toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const LB = { cert: ["A certificar", "#b07a12"], lev: ["Por levantar", "#b8432f"], propia: ["Fuente propia", "#2f8a4c"] };
  let done = false;

  const shead = (n, id, h, p) => `<div class="shead"><span class="n">${n}</span><div><h2 id="${id}">${h}</h2><p>${p}</p></div></div>`;
  const src = t => `<p class="cf-src">Fuente: ${esc(t)}.</p>`;

  function lineCard(P, l) {
    const M = P.misiones[l.m];
    const nP = l.ind.filter(i => i[0] === "P").length, nR = l.ind.length - nP;
    return `<details class="pl-l" data-m="${l.m}" style="--c:${M.c}">
      <summary>
        <span class="pl-lc">${esc(l.c)}</span>
        <span class="pl-lt"><b>${esc(l.n)}</b><small>${esc(l.o)}</small></span>
        <span class="pl-ln">${nP} de producto · ${nR} de resultado</span>
      </summary>
      <div class="pl-lb">
        <div class="scroll"><table class="pl-it">
          <thead><tr><th>Nivel</th><th>Indicador</th><th>Línea base</th><th>2027</th><th>2030</th><th>2033</th></tr></thead>
          <tbody>${l.ind.map(i => `<tr><td><span class="pl-niv ${i[0]}">${i[0] === "P" ? "Producto" : "Resultado"}</span></td><td>${esc(i[1])}</td>
            <td class="b">${esc(i[2])}<small style="color:${LB[i[6]][1]}">${LB[i[6]][0]}</small></td><td>${esc(i[3])}</td><td>${esc(i[4])}</td><td><b>${esc(i[5])}</b></td></tr>`).join("")}</tbody>
        </table></div>
        <dl class="pl-raci"><div><dt>Responsable</dt><dd>${esc(l.r)}</dd></div><div><dt>Aprueba</dt><dd>${esc(l.a)}</dd></div><div><dt>Financiación</dt><dd>${esc(l.f)}</dd></div><div><dt>Reporte</dt><dd>${esc(l.rep)}</dd></div></dl>
      </div></details>`;
  }

  function trlBar(t) {
    if (!t) return `<div class="pl-trl"><span class="pl-trl-l">Madurez</span><span class="pl-trl-x">Apropiación social del conocimiento (sin escala TRL)</span></div>`;
    return `<div class="pl-trl"><span class="pl-trl-l">Madurez TRL</span>
      <div class="pl-trl-t" role="img" aria-label="De TRL ${t[0]} a TRL ${t[1]}">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<i class="${n >= t[0] && n <= t[1] ? "on" : ""}${n === t[0] ? " a" : ""}${n === t[1] ? " z" : ""}${n >= 4 && n <= 7 ? " v" : ""}">${n}</i>`).join("")}</div>
      <span class="pl-trl-x">${t[0]} → ${t[1]}</span></div>`;
  }

  function iniCard(P, x) {
    const M = P.misiones[x.m], F = P.fuentesFin, tot = x.fu.reduce((a, f) => a + f[1], 0);
    return `<article class="pl-i" style="--c:${M.c}">
      <header><span class="pl-ic">${esc(x.c)}</span><span class="pl-icost">${mill(x.costo)}</span></header>
      <h3>${esc(x.n)}</h3><p class="pl-id">${esc(x.d)}</p>
      <div class="pl-chips">${x.l.map((c, i) => `<span class="${i ? "" : "main"}">${esc(c)}</span>`).join("")}<span class="dur">${esc(x.dur)}</span></div>
      ${trlBar(x.trl)}
      <div class="pl-fu"><span class="pl-trl-l">Fuentes</span>
        <div class="pl-fu-b" role="img" aria-label="${esc(x.fu.map(f => F[f[0]][0] + " " + mill(f[1])).join("; "))}">${x.fu.map(f => `<i style="flex:${f[1]};background:${F[f[0]][1]}" title="${esc(F[f[0]][0])}: ${mill(f[1])}"></i>`).join("")}</div>
        <ul>${x.fu.map(f => `<li><i style="background:${F[f[0]][1]}"></i>${esc(F[f[0]][0])}<b>${mill(f[1])}</b></li>`).join("")}</ul></div>
      <div class="pl-ent"><span class="pl-trl-l">Entregables al cierre</span><ul>${x.ent.map(e => `<li>${esc(e)}</li>`).join("")}</ul></div>
      <p class="pl-terr"><b>Dónde:</b> ${esc(x.terr)}</p>
      <p class="pl-lid"><b>Lidera:</b> ${esc(x.lider)}</p>
      <details class="pl-vida"><summary>¿Qué cambia en la vida de la gente?</summary><p>${esc(x.vida)}</p>
        <blockquote>«${esc(x.q[0])}»<cite>${esc(x.q[1])}</cite></blockquote></details>
    </article>`;
  }

  function scatter(P) {
    const mOf = c => (P.lineas.find(l => l.c === c) || {}).m;
    const W = 560, H = 340, L = 46, R = 14, T = 14, B = 42, x0 = 25, x1 = 85, y0 = 75, y1 = 100;
    const sx = v => L + (v - x0) / (x1 - x0) * (W - L - R), sy = v => T + (1 - (v - y0) / (y1 - y0)) * (H - T - B);
    const xm = 50, ym = 90;
    const grid = [30, 40, 50, 60, 70, 80].map(t => `<line x1="${sx(t)}" x2="${sx(t)}" y1="${T}" y2="${H - B}" class="g"/><text x="${sx(t)}" y="${H - B + 16}" text-anchor="middle" class="ax">${t}</text>`).join("")
      + [75, 80, 85, 90, 95, 100].map(t => `<line x1="${L}" x2="${W - R}" y1="${sy(t)}" y2="${sy(t)}" class="g"/><text x="${L - 6}" y="${sy(t) + 4}" text-anchor="end" class="ax">${t}</text>`).join("");
    const quad = `<line x1="${sx(xm)}" x2="${sx(xm)}" y1="${T}" y2="${H - B}" class="q"/><line x1="${L}" x2="${W - R}" y1="${sy(ym)}" y2="${sy(ym)}" class="q"/>
      <text x="${L + 6}" y="${T + 14}" class="ql">Victorias tempranas</text><text x="${W - R - 6}" y="${T + 14}" text-anchor="end" class="ql">Apuestas estructurales</text>
      <text x="${L + 6}" y="${H - B - 8}" class="ql">Ajustes de bajo costo</text><text x="${W - R - 6}" y="${H - B - 8}" text-anchor="end" class="ql">Revisar alcance</text>`;
    const pts = P.propuestas.map(p => {
      const c = (P.misiones[mOf(p[3][0])] || { c: "#7d8a9c" }).c;
      return `<g class="pl-sp" tabindex="0" data-n="${p[0]}"><circle cx="${sx(p[4])}" cy="${sy(p[5])}" r="8" fill="${c}"><title>${p[0]}. ${esc(p[1])} — ${esc(p[2])} · esfuerzo ${p[4]}, impacto ${p[5]}</title></circle><text x="${sx(p[4])}" y="${sy(p[5]) + 3.5}" text-anchor="middle">${p[0]}</text></g>`;
    }).join("");
    return `<svg viewBox="0 0 ${W} ${H}" class="mx pl-sc" role="img" aria-label="Esfuerzo frente a impacto de las 36 propuestas">${grid}${quad}
      <text x="${(L + W - R) / 2}" y="${H - 6}" text-anchor="middle" class="at">Esfuerzo estimado (0 a 100) →</text>
      <text transform="translate(12 ${(T + H - B) / 2}) rotate(-90)" text-anchor="middle" class="at">Impacto estimado →</text>${pts}</svg>`;
  }

  function render() {
    const P = window.CC_PLAN, el = document.getElementById("plBody");
    if (!P || !el || done) return;
    done = true;
    const nInd = P.lineas.reduce((a, l) => a + l.ind.length, 0);
    const total = P.iniciativas.reduce((a, x) => a + x.costo, 0);
    const porM = Object.keys(P.misiones).map(k => [k, P.iniciativas.filter(x => x.m === k).reduce((a, x) => a + x.costo, 0)]);
    const porF = Object.keys(P.fuentesFin).map(k => [k, P.iniciativas.reduce((a, x) => a + x.fu.filter(f => f[0] === k).reduce((s, f) => s + f[1], 0), 0)]).filter(f => f[1]).sort((a, b) => b[1] - a[1]);
    const conIni = new Set(P.iniciativas.flatMap(x => x.l));
    const lineasOpts = P.lineas.map(l => l.c).sort((a, b) => +a.slice(2) - +b.slice(2));

    el.innerHTML = `
    <nav class="cf-sub" aria-label="Partes del Plan">
      <a href="#pl-metas">Líneas y metas</a><a href="#pl-port">Proyectos</a><a href="#pl-fin">Financiación</a><a href="#pl-voz">Voz del ecosistema</a><a href="#pl-val">Validación</a>
    </nav>

    <section class="band white" aria-labelledby="pl-h1">
      <div class="wrap">
        <div class="pl-status"><i aria-hidden="true"></i><span><b>Estado:</b> ${esc(P.estado)}.</span></div>
        ${shead("01", "pl-h1", "El Plan en cifras", "Lo que se le propone al CODECTI para 2026-2033")}
        <div class="grid5">
          <div class="stat"><b>14</b><span>líneas de la Ordenanza 952 reformuladas</span></div>
          <div class="stat t"><b>${nInd}</b><span>indicadores de producto y de resultado</span></div>
          <div class="stat s"><b>${nInd * 3}</b><span>metas a 2027, 2030 y 2033</span></div>
          <div class="stat l"><b>${P.iniciativas.length}</b><span>proyectos prioritarios, tres por misión</span></div>
          <div class="stat o"><b>${milM(total)}<small> mil M</small></b><span>de inversión estimada a 2033</span></div>
        </div>
        <div class="pl-cortes">${P.cortes.map((c, i) => `<div class="pl-corte" style="--i:${i}"><b>${c.a}</b><span>${esc(c.t)}</span><p>${esc(c.d)}</p></div>`).join("")}</div>
        ${src(P.fuentes.p04)}
      </div>
    </section>

    <section class="band" id="pl-metas" aria-labelledby="pl-h2">
      <div class="wrap">
        ${shead("02", "pl-h2", "Las 14 líneas y sus metas", "Cada línea conserva su nombre legal y recibe objetivo, indicadores y responsables")}
        <div class="pl-filt" role="group" aria-label="Filtrar por misión">
          <button type="button" class="on" data-m="">Todas</button>${Object.entries(P.misiones).map(([k, M]) => `<button type="button" data-m="${k}" style="--c:${M.c}"><i></i>${esc(M.t)}</button>`).join("")}
        </div>
        <div class="pl-ls">${P.lineas.map(l => lineCard(P, l)).join("")}</div>
        <p class="muted cf-p">Abra cada línea para ver sus indicadores. «A certificar» indica que la línea base existe pero debe validarla la fuente oficial; «Por levantar», que todavía no hay medición de partida. El avance de cada indicador se publica en el <a href="#seguimiento">tablero de seguimiento</a>.</p>
        <h3 class="pl-h3">Macro-metas de impacto departamental</h3>
        <div class="scroll"><table class="tbl cf-tbl">
          <thead><tr><th>Indicador</th><th>Línea base</th><th>2027</th><th>2030</th><th>2033</th></tr></thead>
          <tbody>${P.macro.map(m => `<tr><td>${esc(m[0])}</td><td class="b">${esc(m[1])}</td><td>${esc(m[2])}</td><td>${esc(m[3])}</td><td><b>${esc(m[4])}</b></td></tr>`).join("")}</tbody>
        </table></div>
        ${src(P.fuentes.p04)}
      </div>
    </section>

    <section class="band white" id="pl-port" aria-labelledby="pl-h3">
      <div class="wrap">
        ${shead("03", "pl-h3", "Nueve proyectos para cumplir las metas", "Ninguna meta sin fuente identificada: cada proyecto tiene costo, fuentes, líder y territorio")}
        <div class="grid2 pl-sum">
          <div class="card"><span class="eyebrow">Inversión por misión</span>
            <div class="pl-mbar">${porM.map(([k, v]) => `<div style="flex:${v};background:${P.misiones[k].c}"><b>${milM(v)}</b><span>mil M</span></div>`).join("")}</div>
            <ul class="pl-leg">${porM.map(([k, v]) => `<li><i style="background:${P.misiones[k].c}"></i>${esc(P.misiones[k].t)}<b>${mill(v)}</b></li>`).join("")}</ul>
          </div>
          <div class="card"><span class="eyebrow">¿De dónde salen los recursos?</span>
            <div class="pl-mbar">${porF.map(([k, v]) => `<div style="flex:${v};background:${P.fuentesFin[k][1]}" title="${esc(P.fuentesFin[k][0])}"><b>${Math.round(v / total * 100)} %</b></div>`).join("")}</div>
            <ul class="pl-leg">${porF.map(([k, v]) => `<li><i style="background:${P.fuentesFin[k][1]}"></i>${esc(P.fuentesFin[k][0])}<b>${mill(v)}</b></li>`).join("")}</ul>
            <p class="muted cf-p">Las fuentes son indicativas: se confirman en cada convocatoria del SGR, de MinCiencias o de cooperación, y con los aportes de las entidades aliadas.</p>
          </div>
        </div>
        ${Object.entries(P.misiones).map(([k, M]) => `<h3 class="pl-mh" style="--c:${M.c}">${esc(M.t)}<span>${mill(porM.find(p => p[0] === k)[1])}</span></h3>
          <div class="grid3 pl-is">${P.iniciativas.filter(x => x.m === k).map(x => iniCard(P, x)).join("")}</div>`).join("")}
        <div class="pl-cov card"><span class="eyebrow">Cobertura de las 14 líneas</span>
          <div class="pl-covg">${lineasOpts.map(c => { const n = P.iniciativas.filter(x => x.l.includes(c)).length; return `<div class="${n ? "" : "no"}"><b>${esc(c)}</b><span>${n ? n + (n === 1 ? " proyecto" : " proyectos") : "Sin proyecto"}</span></div>`; }).join("")}</div>
          ${P.faltan.map(f => `<div class="rule ochre" style="margin-top:12px"><b>${esc(f[0])}</b><span>${esc(f[1])}</span></div>`).join("")}
        </div>
        ${src(P.fuentes.p05)}
      </div>
    </section>


    ${P.financiacion ? (() => { const F = P.financiacion, mx = Math.max(...F.bienios.map(b => b[1])); return `
    <section class="band" id="pl-fin" aria-labelledby="pl-hf">
      <div class="wrap">
        ${shead("04", "pl-hf", "¿Cómo se financia?", "Hay recursos, pero Caldas no logra ejecutarlos: la trampa de la absorción")}
        <p class="cf-lead" style="max-width:86ch">${esc(F.lectura).replace("solo se ha ejecutado el 46,7 %", '<mark class="hl">solo se ha ejecutado el 46,7 %</mark>').replace("«trampa de la absorción»", '<mark class="hl">«trampa de la absorción»</mark>')}</p>
        <div class="grid2 pl-fin" style="align-items:start;margin-top:20px">
          <div class="card"><span class="eyebrow">Regalías para CTeI: asignado frente a ejecutado</span>
            <div class="pl-bi">${F.bienios.map(b => `<div class="pl-bi-r"><span>${esc(b[0])}</span>
              <div class="pl-bi-t" role="img" aria-label="${esc(b[0])}: asignado ${mill(b[1])}, ejecutado ${mill(b[2])}"><i class="a" style="width:${b[1] / mx * 100}%"></i><i class="e" style="width:${b[2] / mx * 100}%"></i></div>
              <b class="${b[3] < 50 ? "low" : ""}">${b[3].toLocaleString("es-CO")} %</b></div>`).join("")}</div>
            <p class="nt-leg"><span><i style="background:#c9d6e3"></i>Asignado</span><span><i style="background:#12294a"></i>Ejecutado o girado</span><span>% = absorción real</span></p>
            <p class="muted cf-p">* Bienio 2025-2026 estimado a la fecha de corte del estudio. Al cierre de 2023-2024 quedaron $23.400 millones sin comprometer.</p>
          </div>
          <div class="card"><span class="eyebrow">De cada 100 ideas de proyecto…</span>
            <div class="pl-fun">${F.embudo.map((e, i) => `<div style="--w:${e[0]}%"><i>${e[0]}</i><span>${esc(e[1])}</span></div>`).join("")}</div>
            <p class="muted cf-p">Causas más frecuentes de observación: ${F.causas.map(c => `${c[0]} ${esc(c[1])}`).join("; ")}. La respuesta propuesta es una oficina departamental de estructuración (PMO) con clínica de proyectos MGA.</p>
          </div>
        </div>
        <div class="grid4 pl-pil">${F.pilares.map((p, i) => `<div class="card"><span class="cf-num">${i + 1}</span><h4>${esc(p[0])}</h4><small>Certeza ${esc(p[1].toLowerCase())}</small><p>${esc(p[2])}</p></div>`).join("")}</div>
        <div class="card pl-sem">
          <div><span class="eyebrow">Fondo Semilla de Co-Inversión (modelo Yozma)</span>
            <h3>${mill(F.semilla.total)} para el ${esc(F.semilla.periodo)}</h3>
            <p>${esc(F.semilla.ticket)} Lo administra un fideicomiso vigilado por la Superfinanciera, con un comité de inversión técnico de cinco miembros.</p></div>
          <div><div class="pl-mbar">${F.semilla.aportes.map((a, i) => `<div style="flex:${a[1]};background:${["#12294a", "#c8892e", "#17839f"][i]}"><b>${Math.round(a[1] / F.semilla.total * 100)} %</b></div>`).join("")}</div>
            <ul class="pl-leg">${F.semilla.aportes.map((a, i) => `<li><i style="background:${["#12294a", "#c8892e", "#17839f"][i]}"></i>${esc(a[0])}<b>${mill(a[1])}</b></li>`).join("")}</ul></div>
        </div>
        ${src(F.fuente)}
      </div>
    </section>`; })() : ""}
    <section class="band white" id="pl-voz" aria-labelledby="pl-h4">
      <div class="wrap">
        ${shead("05", "pl-h4", "La voz del ecosistema", `${P.escucha.lideres} líderes en ${P.escucha.entrevistas} entrevistas a profundidad, convertidas en ${P.escucha.propuestas} propuestas`)}
        <div class="grid2" style="align-items:start">
          <div class="card"><span class="eyebrow">Tres consensos</span>
            <div class="pl-cons">${P.consensos.map(c => `<div><div class="pl-cons-h"><b>${esc(c[0])}</b><em>${c[1]} de ${P.escucha.entrevistas}</em></div>
              <div class="pl-cons-b"><i style="width:${c[1] / P.escucha.entrevistas * 100}%"></i></div><p>${esc(c[2])}</p></div>`).join("")}</div>
          </div>
          <div class="card"><span class="eyebrow">Cuatro disensos que decide el CODECTI</span>
            <ol class="pl-dis">${P.disensos.map(d => `<li><b>${esc(d[0])}</b><span>${esc(d[1])}</span></li>`).join("")}</ol>
          </div>
        </div>
        <div class="mx-wrap pl-pw">
          <div class="card mx-c">${scatter(P)}
            <p class="nt-leg">${Object.values(P.misiones).map(M => `<span><i style="background:${M.c};border-radius:50%"></i>${esc(M.t)}</span>`).join("")}</p>
            <p class="muted cf-p">Priorización preliminar del equipo consultor; se valida en las mesas por bloque de actor.</p></div>
          <div class="pl-pl">
            <label class="pl-sel">Ver propuestas de la línea <select id="plSel"><option value="">Todas</option>${lineasOpts.map(c => `<option value="${c}">${c}</option>`).join("")}</select></label>
            <ol class="pl-props">${P.propuestas.map(p => `<li data-n="${p[0]}" data-l="${p[3].join(" ")}"><b>${p[0]}</b><div>${esc(p[1])}<small>${esc(p[2])} · ${p[3].map(esc).join(", ")}</small></div></li>`).join("")}</ol>
          </div>
        </div>
        ${src(P.fuentes.p06)}
      </div>
    </section>

    <section class="band" id="pl-val" aria-labelledby="pl-h5">
      <div class="wrap">
        ${shead("06", "pl-h5", "La ruta de validación ante el CODECTI", "Cinco pasos y seis decisiones en una sesión plenaria")}
        <ol class="pl-steps">${P.pasos.map((s, i) => `<li><span>${i + 1}</span><b>${esc(s[0])}</b><p>${esc(s[1])}</p></li>`).join("")}</ol>
        <div class="grid3 pl-dec">${P.decisiones.map((d, i) => `<div class="card"><span class="cf-num">${i + 1}</span><h4>${esc(d[0])}</h4><p>${esc(d[1])}</p></div>`).join("")}</div>
        <div class="rule g" style="margin-top:24px"><b>El Plan no queda validado hasta que se firme el acta</b><span>Mientras tanto, cualquier organización del ecosistema puede aportar en la <a href="#consulta">consulta</a> y ver cómo coinciden sus prioridades con el diagnóstico en <a href="#resultados">Resultados</a>.</span></div>
        ${src(P.fuentes.p06)}
      </div>
    </section>`;

    // Filtro por misión
    el.querySelectorAll(".pl-filt button").forEach(b => b.addEventListener("click", () => {
      el.querySelectorAll(".pl-filt button").forEach(x => x.classList.toggle("on", x === b));
      el.querySelectorAll(".pl-l").forEach(c => { c.hidden = !!b.dataset.m && c.dataset.m !== b.dataset.m; });
    }));
    // Propuestas: filtro por línea y resaltado desde el gráfico
    const sel = el.querySelector("#plSel");
    sel.addEventListener("change", () => {
      const v = sel.value;
      el.querySelectorAll(".pl-props li").forEach(li => { li.hidden = !!v && !li.dataset.l.split(" ").includes(v); });
      el.querySelectorAll(".pl-sp").forEach(g => { const li = el.querySelector(`.pl-props li[data-n="${g.dataset.n}"]`); g.classList.toggle("dim", !!li && li.hidden); });
    });
    el.querySelectorAll(".pl-sp").forEach(g => {
      const on = v => { const li = el.querySelector(`.pl-props li[data-n="${g.dataset.n}"]`); if (li) li.classList.toggle("on", v); };
      g.addEventListener("mouseenter", () => on(true)); g.addEventListener("mouseleave", () => on(false));
      g.addEventListener("focus", () => on(true)); g.addEventListener("blur", () => on(false));
    });
    el.querySelectorAll(".cf-sub a").forEach(a => a.addEventListener("click", e => {
      e.preventDefault(); const t = document.querySelector(a.getAttribute("href")); if (t) t.scrollIntoView({ behavior: "smooth" });
    }));
  }

  return { render };
})();
