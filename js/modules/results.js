/**
 * Module: Results & Live Aggregations
 * Conexión a la base de datos (Google Apps Script / Local), render de KPIs y gráficos.
 */
"use strict";

window.CC_RESULTS = (function() {
  const D = window.CC_DATA;
  const CFG = window.CC_CONFIG || {};
  const API = (CFG.apiUrl || "").trim();
  const LKEY = "caldasciencia.respuestas.local";
  const AKEY = "caldasciencia.admin";

  let records = [];
  let mode = "loading";
  let adminKey = (function() { try { return sessionStorage.getItem(AKEY) || ""; } catch(e) { return ""; } })();

  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch(e) { return null; } }
  function lsSet(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} }
  function ssGet(k) { try { return sessionStorage.getItem(k) || ""; } catch(e) { return ""; } }
  function ssSet(k, v) { try { v ? sessionStorage.setItem(k, v) : sessionStorage.removeItem(k); } catch(e) {} }

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isAdmin = () => !!adminKey;

  function setSync(t) {
    const el = document.getElementById("syncState");
    if (el) el.textContent = t;
  }

  async function apiGet(params) {
    const u = new URL(API);
    Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
    const r = await fetch(u, { cache: "no-store" });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || "error del servidor");
    return j;
  }

  async function apiPost(body) {
    const r = await fetch(API, { method: "POST", body: JSON.stringify(body) });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || "error del servidor");
    return j;
  }

  async function load() {
    if (!API) {
      mode = "local";
      records = lsGet(LKEY) || [];
      setSync("Modo demostración: falta conectar la base de datos (config.js)");
      renderResults();
      return;
    }
    try {
      const j = await apiGet(adminKey ? { action: "list", key: adminKey } : { action: "list" });
      records = j.records || [];
      mode = "db";
      setSync(`En línea · ${records.length} respuesta(s)` + (isAdmin() ? " · administrador" : ""));
    } catch(e) {
      if (adminKey && /clave/i.test(e.message || "")) {
        adminKey = "";
        ssSet(AKEY, "");
        if (window.CC_ADMIN) window.CC_ADMIN.refresh();
        return load();
      }
      mode = "db";
      setSync("Sin conexión con la base de datos");
    }
    renderResults();
  }

  async function saveRecord(rec) {
    if (mode === "local") {
      delete rec.hp;
      rec.id = "L" + Date.now();
      rec.creado = new Date().toISOString();
      records.push(rec);
      lsSet(LKEY, records);
      renderResults();
      return rec.id;
    }
    const j = await apiPost({ action: "create", record: rec });
    await load();
    return j.id;
  }

  async function deleteRecord(id) {
    if (mode === "local") {
      records = records.filter(r => r.id !== id);
      lsSet(LKEY, records);
      renderResults();
      return;
    }
    await apiPost({ action: "delete", id, key: adminKey });
    await load();
  }

  function count(list) {
    const m = new Map();
    list.forEach(v => {
      if (v) m.set(v, (m.get(v) || 0) + 1);
    });
    return m;
  }

  function hbars(entries, { total, color = "var(--teal)", wide = true } = {}) {
    const max = Math.max(1, ...entries.map(e => e[1]));
    return `<div class="hb">${entries.map(([k, v]) => `
      <div class="r ${wide ? "wide" : "mid"}">
        <span title="${esc(k)}">${esc(k)}</span>
        <div class="bar">
          <i style="width:calc(${v/max} * (100% - 70px));min-width:${v ? 4 : 0}px;background:${color}"></i>
          <span><strong>${v}</strong>${total ? ` · ${Math.round(v/total * 100)} %` : ""}</span>
        </div>
      </div>
    `).join("")}</div>`;
  }

  function renderResults() {
    const kpisEl = document.getElementById("kpis");
    const bodyEl = document.getElementById("resBody");
    if (!kpisEl || !bodyEl) return;

    const N = records.length;
    const R = records;
    const subs = new Set(R.flatMap(r => r.subregiones || []));
    const nProj = R.reduce((a, r) => a + (r.proyectos || []).length, 0);
    const nMet = R.reduce((a, r) => a + (r.metas || []).length, 0);
    const nRoles = R.filter(r => (r.anclas || []).some(a => (a.roles || []).length)).length;

    kpisEl.innerHTML = [
      [N, "respuestas recibidas", ""],
      [subs.has("Todo el departamento") ? 6 : subs.size, "de 6 subregiones representadas", "t"],
      [nMet, "metas propuestas", "s"],
      [nProj, "proyectos o ideas", "l"],
      [nRoles, "organizaciones con compromiso", "o"]
    ].map(([v, l, c]) => `
      <div class="stat ${c}">
        <b>${v}</b>
        <span>${l}</span>
      </div>
    `).join("");

    if (!N) {
      bodyEl.innerHTML = `
        <div class="empty">
          <strong>${mode === "loading" ? "Cargando resultados…" : "Aún no hay respuestas registradas."}</strong>
          <span>Los resultados agregados aparecerán a medida que los integrantes del CODECTI y actores del SNCTeI respondan la consulta.</span>
          <a class="btn small" href="#consulta">Responder la consulta</a>
        </div>`;
      if (window.CC_ADMIN) window.CC_ADMIN.render(records, mode);
      return;
    }

    const actorLbl = r => r.actor === "__otro" ? "Otro" : r.actor;
    const lineRows = D.lineas.map(l => {
      const vs = R.map(r => (r.lineas || {})[l.k]).filter(Boolean);
      const c = {};
      D.decisiones.forEach(([d]) => c[d] = vs.filter(v => v.d === d).length);
      const ps = vs.map(v => +v.p).filter(Boolean);
      const tot = Object.values(c).reduce((a, b) => a + b, 0);
      return {
        l,
        c,
        tot,
        avg: ps.length ? (ps.reduce((a, b) => a + b, 0) / ps.length) : 0
      };
    });

    const maxTot = Math.max(1, ...lineRows.map(x => x.tot));
    const stack = `
      <div class="stack">${lineRows.map(({ l, c, tot, avg }) => `
        <div class="r">
          <span class="lbl"><b>${l.lbl}</b>${esc(l.t)}</span>
          <div class="bar" role="img" aria-label="${l.lbl}: ${D.decisiones.map(([d, DName]) => `${DName} ${c[d]}`).join(", ")}" style="width:calc(${Math.max(tot, 0) / maxTot * 100}%);min-width:${tot ? 0 : 100}%">
            ${tot ? D.decisiones.map(([d, DName, col]) => c[d] ? `<i title="${DName}: ${c[d]}" style="width:${c[d]/tot * 100}%;background:${col}"></i>` : "").join("") : ""}
          </div>
          <span class="pr" title="Prioridad promedio">${avg ? avg.toFixed(1) : "–"}</span>
        </div>
      `).join("")}</div>
      <div class="legend">
        ${D.decisiones.map(([d, DName, col]) => `<span style="--c:${col}"><i></i>${DName}</span>`).join("")}
        <span>· Columna derecha: prioridad promedio (1 a 3)</span>
      </div>`;

    const nuevas = [...count(R.flatMap(r => (r.nuevas || []).map(n => n === "__otro" ? "Otra" : n)))].sort((a, b) => b[1] - a[1]);
    const actores = [...count(R.map(actorLbl))].sort((a, b) => b[1] - a[1]);
    const subA = [...count(R.flatMap(r => r.subregiones || []))].sort((a, b) => b[1] - a[1]);
    const p2s = D.subregiones.map(s => [s, R.filter(r => (r.p2sub || []).includes(s)).length]).sort((a, b) => b[1] - a[1]);
    const p2p = [...count(R.flatMap(r => (r.p2pob || []).map(n => n === "__otro" ? "Otra" : n)))].sort((a, b) => b[1] - a[1]);
    const proys = R.flatMap(r => r.proyectos || []);
    const mad = D.madurez.map(([a], i) => [`${i + 1} · ${a}`, proys.filter(p => +p.madurez === i + 1).length]);
    const fu = D.fuentes.map(f => [f, proys.filter(p => (p.fuentes || []).includes(f)).length]).sort((a, b) => b[1] - a[1]);
    const ba = [...count(R.flatMap(r => (r.barreras || []).map(n => n === "__otro" ? "Otra" : n)))].sort((a, b) => b[1] - a[1]);
    const aj = D.ajustesGobernanza.map(([k, a]) => {
      const v = R.map(r => +(r.ajustes || {})[k]).filter(Boolean);
      return [a, v.length ? v.reduce((x, y) => x + y, 0) / v.length : 0, v.length];
    }).sort((a, b) => b[1] - a[1]);
    const roles = D.roles.map(([k, t]) => [t, R.filter(r => (r.anclas || []).some(a => (a.roles || []).includes(k))).length]);
    const anclaL = [...count(R.flatMap(r => (r.anclas || []).map(a => a.linea).filter(Boolean)).map(k => k === "nueva" ? "Línea nueva" : (D.lineas.find(l => l.k === k) || {}).lbl))].sort((a, b) => b[1] - a[1]);
    const p5b = [...count(R.flatMap(r => (r.p5b || []).map(n => n === "__otro" ? "Otro" : n)))].sort((a, b) => b[1] - a[1]);
    const p5c = D.p5c.map(s => [s, R.filter(r => r.p5c === s).length]);
    const p5d = D.p5d.map(s => [s, R.filter(r => r.p5d === s).length]);
    const conoc = D.conocia.map(s => [s, R.filter(r => r.conocia === s).length]);

    bodyEl.innerHTML = `
      <div class="grid2" style="gap:22px">
        <div class="chart">
          <h3>¿Quién respondió?</h3>
          <p class="sub">Distribución por tipo de actor del SNCTeI</p>
          ${hbars(actores, { total: N })}
        </div>
        <div class="chart">
          <h3>¿Dónde actúan?</h3>
          <p class="sub">Presencia territorial por subregiones</p>
          ${hbars(subA, { total: N, color: "var(--sky)" })}
          <h3 style="margin-top:14px;font-size:16px">¿Conocían la Ordenanza 952 y su Plan?</h3>
          ${hbars(conoc, { total: N, color: "var(--navy)" })}
        </div>
      </div>
      <div class="chart">
        <span class="eyebrow">Pregunta 1 · Líneas estratégicas</span>
        <h3>Consenso sobre qué hacer con cada línea</h3>
        <p class="sub">Decisiones de mantener, reformular, fusionar o eliminar y prioridad promedio asignada.</p>
        ${stack}
      </div>
      <div class="grid2" style="gap:22px">
        <div class="chart">
          <span class="eyebrow">1B · Líneas nuevas propuestas</span>
          <h3>Nuevas temáticas prioritarias</h3>
          ${nuevas.length ? hbars(nuevas, { total: N, color: "var(--lime)" }) : '<p class="muted">Sin propuestas aún.</p>'}
        </div>
        <div class="chart">
          <span class="eyebrow">Pregunta 2 · Metas territoriales</span>
          <h3>Dónde y para quién enfocar las metas</h3>
          <p class="sub">Subregiones donde concentrar el esfuerzo</p>
          ${hbars(p2s, { total: N, color: "var(--teal)" })}
          <h3 style="font-size:16px;margin-top:14px">Poblaciones a priorizar (enfoque diferencial)</h3>
          ${p2p.length ? hbars(p2p, { total: N, color: "var(--sky)" }) : '<p class="muted">Sin respuestas aún.</p>'}
        </div>
      </div>
      <div class="grid3">
        <div class="chart">
          <span class="eyebrow">Pregunta 3 · Proyectos</span>
          <h3>Madurez de los ${proys.length} proyectos</h3>
          ${hbars(mad, { color: "var(--navy)", wide: false })}
        </div>
        <div class="chart">
          <span class="eyebrow">Fuentes de financiación</span>
          <h3>Instrumentos identificados</h3>
          ${hbars(fu, { color: "var(--lime)" })}
        </div>
        <div class="chart">
          <span class="eyebrow">3B · Barreras de formulación</span>
          <h3>Qué impide avanzar a desembolso</h3>
          ${ba.length ? hbars(ba, { color: "var(--ochre)" }) : '<p class="muted">Sin respuestas aún.</p>'}
        </div>
      </div>
      <div class="grid2" style="gap:22px">
        <div class="chart">
          <span class="eyebrow">Pregunta 4 · Gobernanza</span>
          <h3>Ajustes institucionales más urgentes</h3>
          <p class="sub">Prioridad promedio de 1 (poco) a 3 (indispensable)</p>
          <div class="hb">
            ${aj.map(([a, v, n]) => `
              <div class="r wide">
                <span title="${esc(a)}">${esc(a)}</span>
                <div class="bar">
                  <i style="width:calc(${v/3} * (100% - 90px));min-width:${v ? 4 : 0}px;background:var(--navy)"></i>
                  <span><strong>${v ? v.toFixed(1) : "–"}</strong> · ${n} resp.</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="chart">
          <span class="eyebrow">4A · Compromisos institucionales</span>
          <h3>Qué roles ofrecen las organizaciones</h3>
          ${hbars(roles, { total: N, color: "var(--teal)" })}
          <h3 style="font-size:16px;margin-top:14px">Líneas con actor ancla propuesto</h3>
          ${anclaL.length ? hbars(anclaL, { color: "var(--lime)", wide: false }) : '<p class="muted">Sin propuestas aún.</p>'}
        </div>
      </div>
      <div class="grid3">
        <div class="chart">
          <span class="eyebrow">Pregunta 5 · Seguimiento</span>
          <h3>Canales de rendición de cuentas</h3>
          ${p5b.length ? hbars(p5b, { total: N, color: "var(--sky)" }) : '<p class="muted">Sin respuestas aún.</p>'}
        </div>
        <div class="chart">
          <span class="eyebrow">5C · Frecuencia</span>
          <h3>Periodicidad de reporte</h3>
          ${hbars(p5c, { total: N, color: "var(--teal)", wide: false })}
        </div>
        <div class="chart">
          <span class="eyebrow">5D · Intercambio de datos</span>
          <h3>Disposición a firmar acuerdo</h3>
          ${hbars(p5d, { total: N, color: "var(--lime)", wide: false })}
        </div>
      </div>`;

    if (window.CC_ADMIN) window.CC_ADMIN.render(records, mode);
  }

  return {
    init: function() {
      load();
    },
    load,
    saveRecord,
    deleteRecord,
    renderResults,
    getRecords: () => records,
    getAdminKey: () => adminKey,
    setAdminKey: k => { adminKey = k; ssSet(AKEY, k); },
    getMode: () => mode
  };
})();

