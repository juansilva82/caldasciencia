/**
 * Tablero de seguimiento del Plan de Acción de CTeI
 * Indicadores, líneas base y metas: window.CC_PLAN (P-04). Mediciones por corte: window.CC_SEG.
 */
"use strict";

window.CC_SEG_VIEW = (function () {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ST = {
    senda:      { t: "En senda", c: "#2f8a4c", d: "85 % o más de lo esperado al corte" },
    alerta:     { t: "Alerta", c: "#d39a1c", d: "Entre 70 % y 85 %" },
    critico:    { t: "Crítico", c: "#b8432f", d: "Menos del 70 %; exige memoria explicativa y ruta de contingencia" },
    base:       { t: "Línea base levantada", c: "#17839f", d: "Primera medición; el semáforo empieza en el siguiente corte" },
    sinreporte: { t: "Sin reporte aún", c: "#9aa6b5", d: "Tiene línea base; espera su primer corte" },
    levantar:   { t: "Por levantar", c: "#c9b8b3", d: "No hay medición de partida" }
  };
  const LB = { cert: ["A certificar", "#d39a1c"], lev: ["Por levantar", "#b8432f"], propia: ["Fuente propia", "#2f8a4c"], ok: ["Certificada", "#17839f"] };
  let done = false;

  // "$1.850 M (2022)" → 1850 · "12,4 % (2022)" → 12.4 · "< 15 min" → 15 · "Por levantar" → null
  const num = s => { const m = String(s).replace(/\((?:\d{4}).*?\)/g, "").match(/-?\d[\d.]*(?:,\d+)?/); return m ? parseFloat(m[0].replace(/\./g, "").replace(",", ".")) : null; };
  const yearOf = s => { const m = String(s).match(/\((\d{4})/); return m ? +m[1] : null; };
  const t = d => new Date(d + "T12:00:00").getTime();
  const fdate = d => new Date(d + "T12:00:00").toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
  const fnum = v => v == null ? "–" : Number(v).toLocaleString("es-CO", { maximumFractionDigits: 1 });

  function indicadores() {
    const P = window.CC_PLAN, S = window.CC_SEG;
    return P.lineas.flatMap(l => l.ind.map((i, n) => {
      const key = l.c + "|" + n, cert = S.certificadas[key];
      const base = cert ? cert.valor : num(i[2]);
      const by = cert ? new Date(cert.fecha).getFullYear() : (yearOf(i[2]) || 2026);
      const metas = [[2027, num(i[3])], [2030, num(i[4])], [2033, num(i[5])]];
      const meds = (S.mediciones[key] || []).slice().sort((a, b) => t(a.fecha) - t(b.fecha));
      const ult = meds[meds.length - 1];
      let estado, pct = null, esperado = null, meta = metas[0];
      if (!ult) estado = base == null ? "levantar" : "sinreporte";
      else if (base == null || (meds.length === 1 && i[6] === "lev" && !cert)) estado = "base";
      else {
        // Valor esperado en la fecha del corte: trayectoria lineal entre la línea base y la meta del corte siguiente
        const d = t(ult.fecha);
        let prev = [by, base];
        for (const m of metas) { meta = m; if (d <= t(m[0] + "-12-31")) break; prev = m; }
        const t0 = t(prev[0] + "-12-31"), t1 = t(meta[0] + "-12-31");
        esperado = prev[1] + (meta[1] - prev[1]) * Math.min(1, Math.max(0, (d - t0) / (t1 - t0)));
        pct = esperado === base ? 100 : (ult.valor - base) / (esperado - base) * 100;
        estado = pct >= S.umbrales.senda ? "senda" : pct >= S.umbrales.critico ? "alerta" : "critico";
      }
      return { l, i, n, key, base, by, metas, meds, ult, estado, pct, esperado, meta, lb: cert ? "ok" : i[6] };
    }));
  }

  function track(x) {
    const vals = [x.base, ...x.metas.map(m => m[1]), x.ult && x.ult.valor].filter(v => v != null);
    if (vals.length < 2) return `<div class="sg-tr empty"><span>Sin línea base numérica</span></div>`;
    const lo = Math.min(...vals), hi = Math.max(...vals), pos = v => hi === lo ? 0 : (v - lo) / (hi - lo) * 100;
    const inv = x.metas[2][1] < (x.base ?? x.metas[0][1]); // indicador que debe bajar (p. ej. minutos de alerta)
    const p = v => inv ? 100 - pos(v) : pos(v);
    return `<div class="sg-tr" role="img" aria-label="Línea base ${fnum(x.base)}; metas ${x.metas.map(m => m[0] + ": " + fnum(m[1])).join(", ")}${x.ult ? "; último valor " + fnum(x.ult.valor) : ""}">
      <i class="rail"></i>
      ${x.base != null ? `<i class="b" style="left:${p(x.base)}%" title="Línea base"></i>` : ""}
      ${x.metas.map(m => `<i class="m" style="left:${p(m[1])}%" title="Meta ${m[0]}"><em>${String(m[0]).slice(2)}</em></i>`).join("")}
      ${x.ult ? `<i class="v" style="left:${p(x.ult.valor)}%;background:${ST[x.estado].c}" title="Último valor"></i>` : ""}
    </div>`;
  }

  function render() {
    const P = window.CC_PLAN, S = window.CC_SEG, el = document.getElementById("sgBody");
    if (!P || !S || !el || done) return;
    done = true;
    const X = indicadores(), N = X.length;
    const cnt = k => X.filter(x => x.estado === k).length, cntLB = k => X.filter(x => x.lb === k).length;
    const conRep = X.filter(x => x.ult).length;
    const hoy = new Date(), dias = Math.ceil((t(S.proximoCorte) - hoy.getTime()) / 864e5);
    const ultimo = S.cortes.length ? S.cortes[S.cortes.length - 1] : null;
    const ordenEst = ["senda", "alerta", "critico", "base", "sinreporte", "levantar"];

    el.innerHTML = `
    <section class="band white" aria-labelledby="sg-h1">
      <div class="wrap">
        <div class="sg-banner ${ultimo ? "ok" : ""}">
          <div><b>${ultimo ? `Último corte reportado: ${fdate(ultimo.fecha)}` : "Aún no hay cortes reportados"}</b>
          <span>${ultimo ? esc(ultimo.acta || "") : `El Plan está en validación del CODECTI. El primer corte de seguimiento es el ${fdate(S.proximoCorte)}; mientras tanto, el tablero muestra la línea base y las metas de cada indicador.`}</span></div>
          ${dias > 0 ? `<div class="sg-count"><b>${dias.toLocaleString("es-CO")}</b><span>días para el próximo corte</span></div>` : ""}
        </div>
        <div class="grid4">
          <div class="stat"><b>${N}</b><span>indicadores con meta a 2027, 2030 y 2033</span></div>
          <div class="stat t"><b>${conRep}</b><span>con al menos un reporte</span></div>
          <div class="stat o"><b>${cntLB("cert") + cntLB("lev")}</b><span>líneas base por certificar o levantar antes de adoptar las metas</span></div>
          <div class="stat l"><b>${cnt("senda")}</b><span>en senda frente a lo esperado al corte</span></div>
        </div>
        <div class="grid2 sg-ready">
          <div class="card"><span class="eyebrow">¿Está listo para medir?</span>
            <div class="sg-bar">${["ok", "propia", "cert", "lev"].filter(k => cntLB(k)).map(k => `<i style="flex:${cntLB(k)};background:${LB[k][1]}"><b>${cntLB(k)}</b></i>`).join("")}</div>
            <ul class="pl-leg">${["ok", "propia", "cert", "lev"].filter(k => cntLB(k)).map(k => `<li><i style="background:${LB[k][1]}"></i>${LB[k][0]}<b>${cntLB(k)}</b></li>`).join("")}</ul>
            <p class="muted cf-p">Antes de que el CODECTI adopte las metas, cada línea base debe tener soporte de su fuente oficial (ONAC, MinCiencias, DANE, DTSC…), como exige el protocolo metrológico del P-04.</p>
          </div>
          <div class="card"><span class="eyebrow">Semáforo de los ${N} indicadores</span>
            <div class="sg-bar">${ordenEst.filter(k => cnt(k)).map(k => `<i style="flex:${cnt(k)};background:${ST[k].c}"><b>${cnt(k)}</b></i>`).join("")}</div>
            <ul class="sg-leg">${ordenEst.map(k => `<li><i style="background:${ST[k].c}"></i><span><b>${ST[k].t}</b> · ${ST[k].d}</span><em>${cnt(k)}</em></li>`).join("")}</ul>
          </div>
        </div>
      </div>
    </section>

    <section class="band" aria-labelledby="sg-h2">
      <div class="wrap">
        <div class="shead"><span class="n">01</span><div><h2 id="sg-h2">Indicador por indicador</h2><p>Línea base, metas y último valor reportado de cada línea de la Ordenanza 952</p></div></div>
        <div class="sg-tools">
          <div class="pl-filt" role="group" aria-label="Filtrar por misión"><button type="button" class="on" data-m="">Todas</button>${Object.entries(P.misiones).map(([k, M]) => `<button type="button" data-m="${k}" style="--c:${M.c}"><i></i>${esc(M.t)}</button>`).join("")}</div>
          <label class="pl-sel">Estado <select id="sgEst"><option value="">Todos</option>${ordenEst.map(k => `<option value="${k}">${ST[k].t}</option>`).join("")}</select></label>
        </div>
        <p class="sg-key"><span><i class="b"></i>Línea base</span><span><i class="m"></i>Metas 2027 · 2030 · 2033</span><span><i class="v"></i>Último valor</span></p>
        <div class="sg-ls">${P.lineas.map(l => {
          const xs = X.filter(x => x.l === l);
          return `<article class="sg-l" data-m="${l.m}" style="--c:${P.misiones[l.m].c}">
            <header><b>${esc(l.c)}</b><h3>${esc(l.n)}</h3><span>${esc(l.r)} · reporte ${esc(l.rep.toLowerCase())}</span></header>
            ${xs.map(x => `<div class="sg-i" data-e="${x.estado}">
              <span class="sg-dot" style="background:${ST[x.estado].c}" title="${ST[x.estado].t}"></span>
              <div class="sg-n"><b>${esc(x.i[1])}</b><small><span class="pl-niv ${x.i[0]}">${x.i[0] === "P" ? "Producto" : "Resultado"}</span> <span style="color:${LB[x.lb][1]}">${LB[x.lb][0]}</span>${x.ult ? ` · Último reporte: ${fdate(x.ult.fecha)}` : ""}</small></div>
              ${track(x)}
              <div class="sg-v"><span>Base<b>${esc(x.i[2])}</b></span><span>Último<b>${x.ult ? fnum(x.ult.valor) : "–"}</b></span><span>Meta 2027<b>${esc(x.i[3])}</b></span><span>Estado<b style="color:${ST[x.estado].c}">${ST[x.estado].t}${x.pct != null ? ` · ${Math.round(x.pct)} %` : ""}</b></span></div>
            </div>`).join("")}
          </article>`;
        }).join("")}</div>
        <p class="cf-src">Fuente de indicadores, líneas base y metas: ${esc(P.fuentes.p04)}. Mediciones: reportes semestrales de la Secretaría Técnica del CODECTI.</p>
      </div>
    </section>

    <section class="band white" aria-labelledby="sg-h3">
      <div class="wrap">
        <div class="shead"><span class="n">02</span><div><h2 id="sg-h3">Cómo y cuándo se rinde cuentas</h2><p>Ciclo anual de reporte ante el CODECTI y la Asamblea Departamental</p></div></div>
        <ol class="sg-cal">${S.calendario.map(c => `<li><b>${esc(c.mes)}</b><span>${esc(c.t)}</span><p>${esc(c.d)}</p></li>`).join("")}</ol>
        <div class="grid2" style="margin-top:26px;align-items:start">
          <div class="card"><span class="eyebrow">¿Cómo se calcula el semáforo?</span>
            <ul class="cx-met-l">
              <li>En cada corte se compara el valor reportado con el <b>valor esperado</b> en esa fecha, sobre una trayectoria lineal entre la línea base y la meta del corte siguiente (2027, 2030 o 2033).</li>
              <li><b>Cumplimiento</b> = avance logrado desde la línea base ÷ avance esperado. En senda desde 85 %, alerta entre 70 % y 85 % y crítico por debajo del 70 %, como fija el P-04.</li>
              <li>Una desviación mayor al 15 % exige memoria explicativa y ruta de contingencia del responsable de la línea.</li>
              <li>Si el indicador no tenía línea base, su primera medición la establece y el semáforo empieza en el corte siguiente.</li>
            </ul>
          </div>
          <div class="card"><span class="eyebrow">Riesgos para cumplir las metas</span>
            <ul class="sg-risk">${S.riesgos.map(r => `<li><b class="${r[2] >= 16 ? "hi" : r[2] >= 12 ? "md" : ""}">${esc(r[0])}</b><div><strong>${esc(r[1])}</strong><span>${esc(r[3])}</span></div><em title="Probabilidad × impacto">${r[2]}</em></li>`).join("")}</ul>
          </div>
        </div>
        <p class="cf-src">Fuente: ${esc(P.fuentes.p04)}, capítulos 5 y 8. El modelo de gobernanza (P-07) y el tablero oficial (P-08) están en construcción; esta vista se ajustará a ellos.</p>
      </div>
    </section>`;

    const apply = () => {
      const m = (el.querySelector(".sg-tools .pl-filt button.on") || {}).dataset?.m || "", e = el.querySelector("#sgEst").value;
      el.querySelectorAll(".sg-l").forEach(a => {
        let vis = 0;
        a.querySelectorAll(".sg-i").forEach(r => { const ok = !e || r.dataset.e === e; r.hidden = !ok; vis += ok; });
        a.hidden = (m && a.dataset.m !== m) || !vis;
      });
    };
    el.querySelectorAll(".sg-tools .pl-filt button").forEach(b => b.addEventListener("click", () => {
      el.querySelectorAll(".sg-tools .pl-filt button").forEach(x => x.classList.toggle("on", x === b)); apply();
    }));
    el.querySelector("#sgEst").addEventListener("change", apply);
  }

  // Resumen para la portada
  function resumen() {
    if (!window.CC_PLAN || !window.CC_SEG) return null;
    const X = indicadores();
    return { total: X.length, reportados: X.filter(x => x.ult).length, porCertificar: X.filter(x => x.lb === "cert" || x.lb === "lev").length, proximo: window.CC_SEG.proximoCorte };
  }

  return { render, resumen, _indicadores: indicadores };
})();
