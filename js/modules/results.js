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

  /* ================= CUÁDRUPLE HÉLICE ================= */
  const lineaLbl = k => k === "nueva" ? "Línea nueva" : ((D.lineas.find(l => l.k === k) || {}).lbl || k);
  const lineaTit = k => k === "nueva" ? "Propuesta de línea nueva" : ((D.lineas.find(l => l.k === k) || {}).t || "");
  const rolLbl = k => ((D.roles || []).find(x => x[0] === k) || [k, k])[1];

  function helixOf(r) {
    const H = D.helices || [];
    const tipo = r.actor === "__otro" ? "" : r.actor;
    let h = H.find(x => x.tipos.includes(tipo));
    if (!h && r.actor === "__otro") h = H.find(x => x.clave.test(r.actorOtro || ""));
    return h ? h.k : null;
  }

  function top(list, n) {
    return [...count(list)].sort((a, b) => b[1] - a[1]).slice(0, n);
  }

  function helixCards(R) {
    const H = D.helices || [];
    const por = {};
    H.forEach(h => por[h.k] = R.filter(r => helixOf(r) === h.k));
    const nClas = H.reduce((a, h) => a + por[h.k].length, 0);
    const repr = H.filter(h => por[h.k].length).length;

    const cards = H.map(h => {
      const rs = por[h.k], n = rs.length;
      const lin = top(rs.flatMap(r => r.priorizadas || Object.keys(r.lineas || {})), 3);
      const nue = top(rs.flatMap(r => (r.nuevas || []).filter(x => x !== "__otro")), 2);
      const rol = top(rs.flatMap(r => (r.anclas || []).flatMap(a => a.roles || [])), 3);
      const consulta = n ? `
          <div class="hx-live">
            <span class="hx-lab">Prioriza en la consulta</span>
            <div class="hx-chips">${lin.map(([k]) => `<span class="hx-chip" title="${esc(lineaTit(k))}"><b>${esc(lineaLbl(k))}</b> ${esc(lineaTit(k))}</span>`).join("")}</div>
            ${nue.length ? `<span class="hx-lab">Pide líneas nuevas en</span><div class="hx-chips">${nue.map(([t]) => `<span class="hx-chip soft">${esc(t)}</span>`).join("")}</div>` : ""}
            ${rol.length ? `<span class="hx-lab">Se compromete a</span><div class="hx-chips">${rol.map(([k]) => `<span class="hx-chip soft">${esc(rolLbl(k))}</span>`).join("")}</div>` : ""}
          </div>` : `
          <div class="hx-live hx-empty">
            <span>Aún no hay respuestas de esta hélice en la consulta.</span>
            <a class="btn small" href="#consulta">Responder la consulta</a>
          </div>`;
      return `
        <article class="hx" style="--hx:${h.color};--hx-soft:${h.soft}">
          <header>
            <span class="hx-ico" aria-hidden="true">${h.icono}</span>
            <div><h3>${esc(h.nombre)}</h3><p>${esc(h.rol)}</p></div>
            <span class="hx-n" title="Respuestas en la consulta">${n}<small>${n === 1 ? "respuesta" : "respuestas"}</small></span>
          </header>
          <div class="hx-nums">${(h.cifras || []).map(([v, l]) => `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join("")}</div>
          <p class="hx-fuerza"><b>Fortaleza.</b> ${esc(h.fuerza)}</p>
          <div>
            <span class="hx-lab">Lo que dice</span>
            <ul class="hx-dice">${h.dice.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
          </div>
          <blockquote class="hx-cita"><p>«${esc(h.cita.t)}»</p><cite>${esc(h.cita.f)}</cite></blockquote>
          ${h.notas ? `<div class="hx-notas"><span class="hx-lab">Así califican el ecosistema (de 0 a 10)</span>${h.notas.map(([t, v]) => `<div class="hx-nota"><span>${esc(t)}</span><i><em style="width:${v * 10}%"></em></i><b>${v.toFixed(1).replace(".", ",")}</b></div>`).join("")}</div>` : ""}
          ${consulta}
          <p class="hx-reto"><b>El reto.</b> ${esc(h.reto)}</p>
        </article>`;
    }).join("");

    // Coincidencias entre las hélices representadas en la consulta
    let coinc = "";
    if (R.length) {
      const N = R.length;
      const pct = x => Math.round(x / N * 100) + " %";
      const nueAll = top(R.flatMap(r => (r.nuevas || []).filter(x => x !== "__otro")), 1)[0];
      const noCod = R.filter(r => /no participa/i.test(r.codecti || "")).length;
      const noCon = R.filter(r => /no la conoc/i.test(r.conocia || "")).length;
      const tab = R.filter(r => (r.p5b || []).includes("Tablero público en línea")).length;
      const helNue = nueAll ? H.filter(h => por[h.k].some(r => (r.nuevas || []).includes(nueAll[0]))).length : 0;
      coinc = `
        <div class="hx-coinc">
          <h3>En qué coinciden las hélices</h3>
          <div class="hx-coinc-g">
            ${nueAll ? `<div><b>${pct(nueAll[1])}</b><span>pide una línea nueva de <strong>${esc(nueAll[0])}</strong>${helNue > 1 ? ` (${helNue} de ${repr} hélices)` : ""}.</span></div>` : ""}
            <div><b>${pct(noCod)}</b><span>no participa hoy en el CODECTI: el consejo no está llegando a los actores.</span></div>
            <div><b>${pct(noCon)}</b><span>no conocía la Ordenanza 952 ni su Plan de Acción.</span></div>
            <div><b>${pct(tab)}</b><span>quiere seguir el avance en un tablero público en línea.</span></div>
          </div>
        </div>`;
    }

    return `
      <section class="hx-wrap" aria-labelledby="h-hx">
        <div class="hx-head">
          <span class="eyebrow">Cuádruple Hélice</span>
          <h2 id="h-hx">Lo que dicen la academia, las empresas, el Estado y la sociedad civil</h2>
          <p>Síntesis de las entrevistas y la mesa focal de validación del diagnóstico, combinada con las respuestas que llegan a esta consulta. ${R.length ? `${nClas} de ${R.length} respuestas se clasifican en ${repr} de las 4 hélices.` : ""}</p>
          <div class="hx-bar" role="img" aria-label="Respuestas por hélice: ${H.map(h => `${h.nombre} ${por[h.k].length}`).join(", ")}">
            ${H.map(h => `<span style="--hx:${h.color};flex:${Math.max(por[h.k].length, 0.35)}"><i></i>${esc(h.nombre)} · ${por[h.k].length}</span>`).join("")}
          </div>
        </div>
        <div class="hx-grid">${cards}</div>
        ${coinc}
        <p class="hx-src">Fuentes: mesa focal de validación con empresarios TIC y mapeo del CODECTI (Producto P-01), diagnóstico de capacidades y brechas (Producto P-02) y respuestas de la consulta en línea. Las citas son textuales y anónimas, conforme a la Ley 1581 de 2012. Cada respuesta se ubica en una hélice según el tipo de actor que declaró.</p>
      </section>`;
  }

  /* ================= ACTORES ENTREVISTADOS ================= */
  const iniciales = n => n.split(/\s+/).filter(w => /^[A-ZÁÉÍÓÚÑ]/.test(w)).slice(0, 2).map(w => w[0]).join("");

  function actoresHTML() {
    const H = D.helices || [], A = D.actores || [], X = D.entrevistasAdicionales || [], T = D.temasActores || {};
    if (!A.length) return "";
    const hx = k => H.find(h => h.k === k) || { nombre: "Sin clasificar", color: "#8a96a8", soft: "#eef1f5", icono: "•" };
    const nH = k => A.filter(a => a.h === k).length + X.filter(a => a.h === k).length;
    const total = A.length + X.length;
    const temas = Object.keys(T).map(k => [k, A.filter(a => (a.t || []).includes(k)).length]).sort((a, b) => b[1] - a[1]);
    const maxT = Math.max(1, ...temas.map(t => t[1]));
    const acad = nH("academia");

    const card = a => {
      const h = hx(a.h);
      return `
        <article class="ac" data-h="${a.h}" style="--hx:${h.color};--hx-soft:${h.soft}">
          <header>
            <span class="ac-av" aria-hidden="true">${esc(iniciales(a.nombre))}</span>
            <div>
              <h4>${esc(a.nombre)}</h4>
              <p class="ac-cargo">${esc(a.cargo)}</p>
              <p class="ac-ent">${esc(a.entidad)}</p>
            </div>
          </header>
          <span class="ac-tag">${h.icono} ${esc(h.nombre)}</span>
          <p class="ac-sin">${esc(a.sintesis)}</p>
          <div>
            <span class="hx-lab">Qué aporta al Plan</span>
            <ul class="ac-ap">${a.aporta.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
          </div>
          <p class="ac-hito"><b>Hito.</b> ${esc(a.hito)}</p>
          <div class="hx-chips">${(a.t || []).map(k => `<span class="hx-chip soft">${esc(T[k] || k)}</span>`).join("")}</div>
        </article>`;
    };

    return `
      <section class="ac-wrap" id="actores" aria-labelledby="h-ac">
        <div class="hx-head">
          <span class="eyebrow">Voces del ecosistema</span>
          <h2 id="h-ac">${total} entrevistas con actores del ecosistema</h2>
          <p>Perfiles de los actores clave consultados en entrevistas semiestructuradas: quiénes son, desde dónde hablan y qué aportan a la reformulación del Plan de Acción.</p>
        </div>
        <div class="ac-sum">
          ${H.map(h => `<div style="--hx:${h.color}"><b>${nH(h.k)}</b><span>${h.icono} ${esc(h.nombre)}</span></div>`).join("")}
          <p class="ac-alerta"><b>Lectura:</b> ${acad} de ${total} entrevistas son de la academia y solo ${nH("estado")} del Estado y ${nH("sociedad")} de la sociedad civil. Para equilibrar la cuádruple hélice faltan voces de alcaldías, secretarías departamentales, gremios agropecuarios y organizaciones comunitarias.</p>
        </div>
        <div class="ac-filtros" role="group" aria-label="Filtrar por hélice">
          <button type="button" class="ac-f on" data-f="">Todas · ${A.length}</button>
          ${H.map(h => { const n = A.filter(a => a.h === h.k).length; return n ? `<button type="button" class="ac-f" data-f="${h.k}" style="--hx:${h.color}">${h.icono} ${esc(h.nombre)} · ${n}</button>` : ""; }).join("")}
        </div>
        <div class="ac-grid">${A.map(card).join("")}</div>
        <div class="grid2" style="gap:22px">
          <div class="chart">
            <span class="eyebrow">Agenda de las entrevistas</span>
            <h3>Temas que atraviesan las conversaciones</h3>
            <p class="sub">Número de perfiles en los que aparece cada tema</p>
            <div class="hb">${temas.map(([k, v]) => `
              <div class="r wide"><span title="${esc(T[k])}">${esc(T[k])}</span>
                <div class="bar"><i style="width:calc(${v / maxT} * (100% - 70px));min-width:${v ? 4 : 0}px;background:var(--teal)"></i><span><strong>${v}</strong> de ${A.length}</span></div>
              </div>`).join("")}</div>
          </div>
          <div class="chart">
            <span class="eyebrow">Otras entrevistas registradas</span>
            <h3>Con transcripción, perfil en preparación</h3>
            <ul class="ac-otras">${X.map(x => { const h = hx(x.h); return `<li style="--hx:${h.color}"><i></i><span><b>${esc(x.nombre)}</b>${x.entidad ? `<small>${esc(x.entidad)}</small>` : ""}</span></li>`; }).join("")}</ul>
          </div>
        </div>
        <p class="hx-src">Fuente: dossier de perfiles de actores clave y registro de entrevistas del convenio CDTER–Gobernación de Caldas (noviembre de 2026). Los perfiles describen la trayectoria y el rol de cada persona; la síntesis de lo dicho en cada entrevista se incorporará cuando se cierre la sistematización de las transcripciones.</p>
      </section>`;
  }

  function bindActores(root) {
    if (!root || root.dataset.acb) return;
    root.dataset.acb = "1";
    root.addEventListener("click", e => {
      const b = e.target.closest(".ac-f");
      if (!b) return;
      const f = b.dataset.f;
      root.querySelectorAll(".ac-f").forEach(x => x.classList.toggle("on", x === b));
      root.querySelectorAll(".ac").forEach(c => { c.hidden = !!f && c.dataset.h !== f; });
    });
  }

  function renderResults() {
    const kpisEl = document.getElementById("kpis");
    const bodyEl = document.getElementById("resBody");
    if (!kpisEl || !bodyEl) return;
    bindActores(bodyEl);

    const N = records.length;
    const R = records;
    const subs = new Set(R.flatMap(r => r.subregiones || []));
    const nProj = R.reduce((a, r) => a + (r.proyectos || []).length, 0);
    const nMet = R.reduce((a, r) => a + (r.metas || []).length, 0);
    const nRoles = R.filter(r => (r.anclas || []).some(a => (a.roles || []).length)).length;

    kpisEl.innerHTML = [
      [N, "respuestas recibidas", ""],
      [[...subs].some(x => /^Todo el departamento/.test(x)) ? 6 : [...subs].filter(x => D.subregiones.includes(x)).length, "de 6 subregiones representadas", "t"],
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
      bodyEl.innerHTML = helixCards(R) + actoresHTML() + `
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

    bodyEl.innerHTML = helixCards(R) + actoresHTML() + `
      <details class="detalle">
      <summary><span><b>Detalle de la consulta, pregunta por pregunta</b><small>Líneas, metas, proyectos, gobernanza y seguimiento</small></span></summary>
      <div class="detalle-body">
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
      </div>
      </div>
      </details>`;

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

