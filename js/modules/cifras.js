/**
 * Caldas en cifras de CTeI
 * Dibuja la línea base (P-01) y las capacidades y brechas (P-02) a partir de window.CC_CIFRAS.
 */
"use strict";

window.CC_CIFRAS_VIEW = (function () {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const n1 = v => Number(v).toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const HC = { academia: "#17839f", empresa: "#c8892e", estado: "#12294a", sociedad: "#8dc63f" };
  const EST = {
    avanzo:  { t: "Avanzó", c: "#2f8a4c", s: "#e6f3ea", i: "●" },
    parcial: { t: "Avance parcial", c: "#b07a12", s: "#fbf1dc", i: "◐" },
    sin:     { t: "Sin avance", c: "#b8432f", s: "#f9e5e0", i: "○" }
  };
  const PRIO = { 1: { t: "Prioridad I", c: "#b8432f" }, 2: { t: "Prioridad II", c: "#c8892e" }, 3: { t: "Prioridad III", c: "#7d8a9c" } };
  let done = false;

  const shead = (n, id, h, p) => `<div class="shead"><span class="n">${n}</span><div><h2 id="${id}">${h}</h2><p>${p}</p></div></div>`;
  const fuente = (D, k, extra) => `<p class="cf-src">Fuente: ${esc(D.fuentes[k].cod)} · ${esc(D.fuentes[k].nombre)} (${esc(D.fuentes[k].version)}, ${esc(D.fuentes[k].fecha)})${extra ? ". " + esc(extra) : ""}.</p>`;

  /* ---------- 01 · La paradoja caldense: gráfico de puestos ---------- */
  function paradoja(D) {
    const P = D.paradoja, MAX = 20, all = [...P.capacidades.map(x => ({ ...x, g: "c" })), ...P.resultados.map(x => ({ ...x, g: "r" }))];
    const row = x => `<div class="pr-row ${x.g}">
        <span class="pr-k">${esc(x.k)}${x.nota ? ` <small>(${esc(x.nota)})</small>` : ""}</span>
        <div class="pr-track" role="img" aria-label="${esc(x.k)}: puesto ${x.p} de 33 departamentos">
          <i class="pr-dot" style="left:calc(${(x.p - 1) / (MAX - 1)} * (100% - 34px))">${x.p}.º</i>
        </div></div>`;
    return `<div class="card pr">
      <div class="pr-axis" aria-hidden="true"><span></span><div>${[1, 5, 10, 15, 20].map(t => `<b style="left:calc(${(t - 1) / (MAX - 1)} * (100% - 34px) + 17px)">${t}.º</b>`).join("")}</div></div>
      <h4 class="pr-g c">Capacidades: donde Caldas está arriba</h4>
      ${P.capacidades.map(x => row({ ...x, g: "c" })).join("")}
      <h4 class="pr-g r">Resultados: donde Caldas cae</h4>
      ${P.resultados.map(x => row({ ...x, g: "r" })).join("")}
      <p class="pr-note">Puesto nacional entre los departamentos de Colombia (1.º es el mejor).</p>
    </div>`;
  }

  /* ---------- 02 · Semáforo de las 14 líneas ---------- */
  function semaforo(D) {
    const cnt = k => D.lineas.filter(l => l.e === k).length;
    return `<div class="sem-sum">${["avanzo", "parcial", "sin"].map(k => `<div style="--c:${EST[k].c};--s:${EST[k].s}"><b>${cnt(k)}</b><span>${EST[k].t}</span></div>`).join("")}</div>
      <div class="sem-grid">${D.lineas.map(l => `<article class="sem" style="--c:${EST[l.e].c};--s:${EST[l.e].s}">
        <header><b>${esc(l.c)}</b><span class="sem-st"><i aria-hidden="true">${EST[l.e].i}</i>${EST[l.e].t}</span></header>
        <h4>${esc(l.n)}</h4><p>${esc(l.d)}</p></article>`).join("")}</div>`;
  }

  /* ---------- 03 · Notas de los empresarios ---------- */
  function notas(D) {
    const col = v => v >= 7 ? "#2f8a4c" : v >= 5 ? "#c8892e" : "#b8432f";
    return `<div class="nt">${D.notas.map(x => `<div class="nt-r">
        <span>${esc(x.k)}</span>
        <div class="nt-bar" role="img" aria-label="${esc(x.k)}: ${n1(x.v)} sobre 10"><i style="width:${x.v * 10}%;background:${col(x.v)}"></i><em class="nt-pass" aria-hidden="true"></em></div>
        <b style="color:${col(x.v)}">${n1(x.v)}</b></div>`).join("")}
      <p class="nt-leg"><span><i style="background:#2f8a4c"></i>7 o más</span><span><i style="background:#c8892e"></i>5 a 6,9</span><span><i style="background:#b8432f"></i>Menos de 5</span><span><em class="nt-pass sm"></em>aprobación (6)</span></p></div>`;
  }

  /* ---------- 05 · CODECTI ---------- */
  function codecti(D) {
    const C = D.codecti;
    const seats = C.helices.flatMap(h => Array.from({ length: h.n }, () => h));
    return `<div class="grid2">
      <div class="card">
        <span class="eyebrow">Los ${C.total} asientos del consejo</span>
        <div class="seats" role="img" aria-label="${esc(C.helices.map(h => h.k + ": " + h.n).join("; "))}">${seats.map(h => `<i style="background:${HC[h.h]}" title="${esc(h.k)}"></i>`).join("")}</div>
        <ul class="seat-l">${C.helices.map(h => `<li><i style="background:${HC[h.h]}"></i><div><b>${esc(h.k)} · ${h.n}</b><span>${esc(h.d)}</span></div></li>`).join("")}</ul>
      </div>
      <div class="card">
        <span class="eyebrow">Cómo ha funcionado (2023-2026)</span>
        <div class="big-n"><b>${esc(C.asistencia)}</b><span>asistencia de los titulares</span></div>
        <ol class="cf-ol">${C.problemas.map(p => `<li>${esc(p)}</li>`).join("")}</ol>
      </div></div>`;
  }

  /* ---------- 06 · Oferta científica ---------- */
  function oferta(D) {
    const O = D.oferta, tot = O.grupos, cc = ["#12294a", "#17839f", "#41b6e0", "#a9c4d6"];
    const max = Math.max(...O.instituciones.map(x => x.v));
    const dots = Array.from({ length: tot }, (_, i) => `<i class="${i < O.centroSur ? "in" : "out"}"></i>`).join("");
    return `<div class="grid2">
      <div class="card">
        <span class="eyebrow">${tot} grupos reconocidos por categoría</span>
        <div class="stack" role="img" aria-label="${esc(O.categorias.map(c => "Categoría " + c.k + ": " + c.v).join("; "))}">${O.categorias.map((c, i) => `<i style="flex:${c.v};background:${cc[i]}"><b>${c.k}</b><span>${c.v}</span></i>`).join("")}</div>
        <p class="muted cf-p">${O.categorias[0].v + O.categorias[1].v} grupos (${Math.round((O.categorias[0].v + O.categorias[1].v) / tot * 100)} %) están en las categorías más altas, A1 y A.</p>
        <span class="eyebrow" style="margin-top:22px;display:block">Grupos por institución</span>
        <div class="inst">${O.instituciones.map(x => `<div class="inst-r">
          <span><b>${esc(x.k)}</b><small>${esc(x.areas)}</small></span>
          <div class="inst-bar" role="img" aria-label="${esc(x.k)}: ${x.v} grupos, ${x.a} en A1 o A"><i class="t" style="width:calc(${x.v / max} * (100% - 44px))"><i class="a" style="width:${x.v ? x.a / x.v * 100 : 0}%"></i></i><em>${x.v}</em></div></div>`).join("")}</div>
        <p class="nt-leg"><span><i style="background:#12294a"></i>Grupos A1 y A</span><span><i style="background:#a9c4d6"></i>Grupos B y C</span></p>
      </div>
      <div class="card">
        <span class="eyebrow">¿Dónde están los grupos?</span>
        <div class="big-n"><b>${O.centroSur} de ${tot}</b><span>grupos tienen su sede en Centro Sur (Manizales y Villamaría)</span></div>
        <div class="dots" role="img" aria-label="${O.centroSur} de ${tot} grupos en Centro Sur">${dots}</div>
        <p class="nt-leg"><span><i style="background:#17839f"></i>Centro Sur</span><span><i style="background:#c8892e"></i>Resto del departamento</span></p>
        <div class="rule ochre" style="margin-top:16px"><b>Alerta territorial</b><span>En Norte, Alto y Bajo Occidente, Alto Oriente y Magdalena Caldense la presencia de grupos formales de investigación es casi nula; dependen de salidas de campo universitarias puntuales.</span></div>
      </div></div>`;
  }

  /* ---------- 07 · Demanda productiva ---------- */
  function demanda(D) {
    const M = D.demanda;
    return `<div class="grid3 cf-k3">
        <div class="stat t"><b>${M.empresas}</b><span>empresas en el Clúster TIC Mantix</span></div>
        <div class="stat o"><b>${esc(M.ventas.replace(" millones", ""))}<small> M</small></b><span>en ventas agregadas en 2025</span></div>
        <div class="stat l"><b>${M.empleos.toLocaleString("es-CO")}</b><span>empleos calificados</span></div>
      </div>
      <div class="grid4 cf-dem">${M.datos.map(x => `<div class="card"><b>${esc(x.b)}</b><p>${esc(x.t)}</p></div>`).join("")}</div>`;
  }

  /* ---------- 09 · Brechas por eje ---------- */
  function ejes(D) {
    return `<div class="ejes">${D.ejes.map(e => `<div class="eje" style="--c:${e.c}">
        <div class="eje-h"><h4>${esc(e.k)}</h4><span>${esc(e.nivel)}</span></div>
        <div class="eje-bar" role="img" aria-label="Severidad ${n1(e.v)} sobre 10"><i style="width:${e.v * 10}%"></i><b>${n1(e.v)}</b></div>
        <p>${esc(e.d)}</p></div>`).join("")}</div>`;
  }

  /* ---------- 10 · Matriz de priorización (SVG) ---------- */
  function matriz(D) {
    const W = 560, H = 380, L = 48, R = 16, T = 16, B = 44, x0 = 3.5, x1 = 10, y0 = 3.5, y1 = 10;
    const sx = v => L + (v - x0) / (x1 - x0) * (W - L - R), sy = v => T + (1 - (v - y0) / (y1 - y0)) * (H - T - B);
    const ticks = [4, 5, 6, 7, 8, 9, 10];
    // desplazamientos de etiqueta para puntos cercanos
    const off = { "L-13": [-8, -12, "end"], "L-6": [10, 4, "start"], "L-8": [10, 4, "start"], "L-11": [10, 4, "start"], "L-9": [10, 4, "start"], "L-4": [-10, 4, "end"], "L-2": [10, 4, "start"], "L-12": [-10, 4, "end"], "L-1": [-10, 4, "end"], "L-14": [10, 12, "start"], "L-10": [10, 4, "start"], "L-5": [-10, 4, "end"], "L-7": [10, 4, "start"], "L-3": [10, 4, "start"] };
    const pts = D.brechas.map(b => {
      const o = off[b.l] || [10, 4, "start"];
      return `<g class="mx-p" tabindex="0" data-l="${esc(b.l)}"><circle cx="${sx(b.u)}" cy="${sy(b.i)}" r="9" fill="${PRIO[b.p].c}"><title>${esc(b.l)} · ${esc(b.n)} — impacto ${n1(b.i)}, urgencia ${n1(b.u)}. ${esc(b.b)}</title></circle>
        <text x="${sx(b.u) + o[0]}" y="${sy(b.i) + o[1]}" text-anchor="${o[2]}">${esc(b.l)}</text></g>`;
    }).join("");
    const svg = `<svg viewBox="0 0 ${W} ${H}" class="mx" role="img" aria-label="Matriz de impacto territorial frente a urgencia post-sismo de las 14 brechas">
      ${ticks.map(t => `<line x1="${sx(t)}" x2="${sx(t)}" y1="${T}" y2="${H - B}" class="g"/><text x="${sx(t)}" y="${H - B + 18}" text-anchor="middle" class="ax">${t}</text>
        <line x1="${L}" x2="${W - R}" y1="${sy(t)}" y2="${sy(t)}" class="g"/><text x="${L - 8}" y="${sy(t) + 4}" text-anchor="end" class="ax">${t}</text>`).join("")}
      <text x="${(L + W - R) / 2}" y="${H - 6}" text-anchor="middle" class="at">Urgencia de la reconstrucción post-sismo →</text>
      <text transform="translate(13 ${(T + H - B) / 2}) rotate(-90)" text-anchor="middle" class="at">Impacto territorial →</text>
      ${pts}</svg>`;
    const list = [1, 2, 3].map(p => `<div class="mx-g"><h4 style="--c:${PRIO[p].c}">${PRIO[p].t}</h4>
      ${D.brechas.filter(b => b.p === p).map(b => `<div class="mx-i" data-l="${esc(b.l)}"><b>${esc(b.l)}</b><div><strong>${esc(b.n)}</strong> · ${esc(b.b)} <span class="tag">${esc(b.ini)}</span></div></div>`).join("")}</div>`).join("");
    return `<div class="mx-wrap"><div class="card mx-c">${svg}
        <p class="nt-leg">${[1, 2, 3].map(p => `<span><i style="background:${PRIO[p].c};border-radius:50%"></i>${PRIO[p].t}</span>`).join("")}</p></div>
      <div class="mx-list">${list}</div></div>`;
  }

  function render() {
    const D = window.CC_CIFRAS, el = document.getElementById("cfBody");
    if (!D || !el || done) return;
    done = true;
    const P = D.plan, A = D.oferta;
    el.innerHTML = `
    <nav class="cf-sub" aria-label="Partes de Caldas en cifras">
      <a href="#cf-base">Línea base de la política</a><a href="#cf-brechas">Capacidades y brechas</a>
    </nav>

    <section class="band white" id="cf-base" aria-labelledby="cf-h1">
      <div class="wrap">
        ${shead("01", "cf-h1", "La paradoja caldense", "Mucho conocimiento, poco retorno económico")}
        <div class="grid4">
          <div class="stat t"><b>${A.grupos}</b><span>grupos de investigación reconocidos por MinCiencias</span></div>
          <div class="stat s"><b>2.º</b><span>lugar del país en investigadores por habitante</span></div>
          <div class="stat l"><b>7.º</b><span>lugar en el Índice Departamental de Innovación (IDIC 2021)</span></div>
          <div class="stat o"><b>18.º</b><span>lugar en eficiencia de la innovación (0,629)</span></div>
        </div>
        <div class="grid2 cf-par">
          ${paradoja(D)}
          <div class="cf-txt">
            <p class="cf-lead">${esc(D.paradoja.lectura)}</p>
            <div class="rule"><b>La meta que propone la línea base</b><span>Subir la razón de eficiencia del IDIC de 0,629 a 0,700 en 2027 y a 0,750 en 2030, midiendo exportaciones, licencias de patentes y empleo tecnológico.</span></div>
          </div>
        </div>
        ${fuente(D, "p01", "Con base en el IDIC (DNP/OCyT), el IDC (Consejo Privado de Competitividad) y el ICC")}
      </div>
    </section>

    <section class="band" aria-labelledby="cf-h2">
      <div class="wrap">
        ${shead("02", "cf-h2", "¿Cómo va la política vigente?", "Estado de las 14 líneas de la Ordenanza 952 de 2023")}
        ${semaforo(D)}
        <div class="card cf-plan">
          <div><span class="eyebrow">Plan de Acción 2022 · productos de corto plazo</span>
            <h3>Los ${P.productos} compromisos para 2022-2025 vencieron y ninguno se cumplió por completo</h3>
            <p class="muted">La línea base calcula una eficacia global de ${n1(P.eficacia)} %: el ${n1(P.parcialPct)} % de los productos tuvo avances parciales y el ${n1(P.sinPct)} % no se ejecutó. Los empresarios lo llamaron el «efecto plantilla»: metas genéricas que no nombran los activos propios de Caldas, como Cenicafé, BIOS, la Facultad de IA de la U. de Caldas, FUTURA o Mantix.</p></div>
          <div class="cf-ring" role="img" aria-label="Eficacia global ${n1(P.eficacia)} %" style="--p:${P.eficacia}"><b>${n1(P.eficacia)} %</b><span>eficacia</span></div>
        </div>
        ${fuente(D, "p01", "Auditoría del Anexo 1 del Plan de Acción (CINDE, 2022)")}
      </div>
    </section>

    <section class="band white" aria-labelledby="cf-h3">
      <div class="wrap">
        ${shead("03", "cf-h3", "Lo que dicen los empresarios", "Calificación de la mesa focal con empresas de tecnología de Manizales")}
        <div class="grid2" style="align-items:start">
          <div class="card">${notas(D)}</div>
          <div class="cf-txt">
            <div class="quote"><i>“</i><p>${esc(D.citaEmpresarial)}</p></div>
            <p class="cf-lead" style="margin-top:18px">El talento es lo mejor calificado. Lo peor: no hay capital de riesgo («todo es muy romántico, pero nadie habla de plata») y las comunicaciones colapsaron en la primera hora del sismo, incluido el edificio de FUTURA.</p>
            <p class="muted">La línea base propone un Fondo Caldense de Capital Semilla de $800 a $1.000 millones al año, con aportes de $50 a $100 millones por empresa, condonables por exportaciones, empleo joven y patentes.</p>
          </div>
        </div>
        ${fuente(D, "p01", "Mesa de validación con empresarios TIC")}
      </div>
    </section>

    <section class="band" aria-labelledby="cf-h4">
      <div class="wrap">
        ${shead("04", "cf-h4", "Las metas hacia 2033", "Indicadores oficiales del CONPES Departamental de CTeI 2026-2033")}
        <div class="scroll"><table class="tbl cf-tbl">
          <thead><tr><th>Indicador</th><th>Línea base</th><th>2027</th><th>2030</th><th>2033</th></tr></thead>
          <tbody>${D.metas.map(m => `<tr><td>${esc(m.k)}</td><td class="b">${esc(m.base)}</td><td>${esc(m.m27)}</td><td>${esc(m.m30)}</td><td><b>${esc(m.m33)}</b></td></tr>`).join("")}</tbody>
        </table></div>
        <p class="muted cf-p">«Por levantar» indica que todavía no hay una medición de partida; el Plan de Acción que se está construyendo debe fijarla.</p>
        ${fuente(D, "p01")}
      </div>
    </section>

    <section class="band white" aria-labelledby="cf-h5">
      <div class="wrap">
        ${shead("05", "cf-h5", "El CODECTI por dentro", "Quién se sienta en el Consejo Departamental de CTeI y cómo ha funcionado")}
        ${codecti(D)}
        ${fuente(D, "p01", "Las actas oficiales del consejo siguen en requerimiento formal")}
      </div>
    </section>

    <section class="band" id="cf-brechas" aria-labelledby="cf-h6">
      <div class="wrap">
        ${shead("06", "cf-h6", "La oferta científica", `${A.grupos} grupos de investigación, casi todos en Manizales`)}
        ${oferta(D)}
        ${fuente(D, "p02", `Grupos reconocidos en ${A.fuente}, corte ${A.corte}`)}
      </div>
    </section>

    <section class="band white" aria-labelledby="cf-h7">
      <div class="wrap">
        ${shead("07", "cf-h7", "La demanda de las empresas", "Un clúster tecnológico grande en número, pero muy concentrado")}
        ${demanda(D)}
        ${fuente(D, "p02", D.demanda.fuente)}
      </div>
    </section>

    <section class="band" aria-labelledby="cf-h8">
      <div class="wrap">
        ${shead("08", "cf-h8", "Tres desajustes entre oferta y demanda", "Por qué el conocimiento no llega a la empresa")}
        <div class="grid3 cf-des">${D.desajustes.map((d, i) => `<div class="card"><span class="cf-num">${i + 1}</span><h3>${esc(d.t)}</h3><p>${esc(d.d)}</p></div>`).join("")}</div>
        ${fuente(D, "p02")}
      </div>
    </section>

    <section class="band white" aria-labelledby="cf-h9">
      <div class="wrap">
        ${shead("09", "cf-h9", "Las brechas en los cuatro ejes", "Severidad de 0 a 10, con el efecto del sismo del 10 de agosto de 2026")}
        ${ejes(D)}
        ${fuente(D, "p02")}
      </div>
    </section>

    <section class="band" aria-labelledby="cf-h10">
      <div class="wrap">
        ${shead("10", "cf-h10", "¿Qué brechas cerrar primero?", "Las 14 brechas según su impacto territorial y su urgencia después del sismo")}
        ${matriz(D)}
        <div class="rule g" style="margin-top:24px"><b>Siguiente paso</b><span>Esta matriz se cruza con lo que priorizan los actores en la consulta y las entrevistas para definir las líneas del nuevo Plan de Acción. <a href="#resultados">Vea dónde coinciden las tres fuentes</a>. ¿Su organización aún no ha participado? <a href="#consulta">Responda la consulta</a>.</span></div>
        ${fuente(D, "p02", "Documento en versión borrador, sujeto a validación en mesa técnica")}
      </div>
    </section>`;

    // Resaltar en la lista el punto de la matriz al pasar el cursor
    el.querySelectorAll(".mx-p").forEach(g => {
      const on = v => el.querySelectorAll(`.mx-i[data-l="${g.dataset.l}"]`).forEach(i => i.classList.toggle("on", v));
      g.addEventListener("mouseenter", () => on(true)); g.addEventListener("mouseleave", () => on(false));
      g.addEventListener("focus", () => on(true)); g.addEventListener("blur", () => on(false));
    });
    el.querySelectorAll(".cf-sub a").forEach(a => a.addEventListener("click", e => {
      e.preventDefault(); const t = document.querySelector(a.getAttribute("href")); if (t) t.scrollIntoView({ behavior: "smooth" });
    }));
  }

  return { render };
})();
