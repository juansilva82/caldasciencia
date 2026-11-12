/**
 * Module: Survey / Consulta CTeI
 * Manejo interactivo del instrumento de consulta:
 * - Paso 1: "De las 14 líneas priorice 3 como meta y señálelas a continuación" con despliegue dinámico de menús.
 * - Paso 2: Metas territoriales vinculadas a las líneas priorizadas.
 * - Paso 3: Selector para postular o saltar la sección de proyectos.
 * - Menús desplegables en todas las casillas.
 */
"use strict";

window.CC_SURVEY = (function() {
  const D = window.CC_DATA;
  const DKEY = "caldasciencia.borrador";
  const LKEY = "caldasciencia.respuestas.local";
  const CFG = window.CC_CONFIG || {};
  const API = (CFG.apiUrl || "").trim();

  function blank() {
    return {
      org: "", municipio: "", nombre: "", correo: "", cargo: "", cargoOtro: "", telefono: "",
      actor: "", actorOtro: "", subregiones: [], codecti: "", conocia: "", misiones: [],
      priorizadas: ["", "", ""], // Las 3 líneas seleccionadas
      lineas: {}, nuevas: [], nuevaOtra: "", p1c: "",
      metas: [{}, {}, {}],
      tieneProyectos: null, // "si" | "no" | null
      proyectos: [{ fuentes: [] }, { fuentes: [] }],
      barreras: [], barreraOtra: "",
      anclas: [{ roles: [] }, { roles: [] }, { roles: [] }],
      ajustes: {}, p4c: "",
      datos: [{}, {}, {}], p5b: [], p5bOtro: "", p5c: "", p5d: "",
      comentarios: "", autorizacion: false
    };
  }

  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch(e) { return null; } }
  function lsSet(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} }
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  let F = Object.assign(blank(), lsGet(DKEY) || {});
  if (!Array.isArray(F.priorizadas)) F.priorizadas = ["", "", ""];
  let step = 0;

  function save() {
    lsSet(DKEY, F);
    const s = document.getElementById("saveState");
    if (s) {
      s.textContent = "Avance guardado en este navegador";
      clearTimeout(save.t);
      save.t = setTimeout(() => s.textContent = "", 2500);
    }
  }

  /* HTML Builders */
  const ck = (name, val, checked, type = "checkbox") => `
    <label class="ck">
      <input type="${type}" name="${name}" value="${esc(val)}"${checked ? " checked" : ""}>
      <span>${esc(val)}</span>
    </label>`;

  const ckOther = (name, val, checked, txtName, txt) => `
    <label class="ck other">
      <input type="checkbox" name="${name}" value="__otro"${checked ? " checked" : ""}>
      <span>Otro:</span>
      <input type="text" data-k="${txtName}" value="${esc(txt)}" aria-label="Especifique">
    </label>`;

  const inp = (k, label, v, type = "text", req = false, ph = "") => `
    <label class="f">
      <span>${label}${req ? ' <span class="req">*</span>' : ""}</span>
      <input type="${type}" data-k="${k}" value="${esc(v)}"${ph ? ` placeholder="${esc(ph)}"` : ""}${req ? " required" : ""}>
    </label>`;

  const know = (a, b) => `
    <div class="know">
      <div><b class="eyebrow">Diagnóstico</b>${a}</div>
      <div><b class="eyebrow">Cómo Diligenciar</b>${b}</div>
    </div>`;

  const qhead = (n, ey, t) => `
    <div class="qhead">
      <i class="hex">${n}</i>
      <div>
        <span class="eyebrow">${ey}</span>
        <h2>${t}</h2>
      </div>
    </div>`;

  const lineOpts = (sel) => `<option value="">— Seleccione una línea —</option>` +
    D.lineas.map(l => `<option value="${l.k}"${sel === l.k ? " selected" : ""}>${l.lbl} · ${esc(l.t)} (${l.m})</option>`).join("") +
    `<option value="nueva"${sel === "nueva" ? " selected" : ""}>+ Otra temática nueva</option>`;

  // Render principal por paso
  function renderStep() {
    const sBody = document.getElementById("stepBody");
    const sNav = document.getElementById("stepNav");
    const pBar = document.getElementById("progBar");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (!sBody) return;

    let h = "";

    // ================= PASO A: CARACTERIZACIÓN =================
    if (step === 0) {
      h = `
        <div class="qhead">
          <i class="hex">A</i>
          <div>
            <span class="eyebrow">Caracterización Institucional</span>
            <h2>¿Quién responde la consulta?</h2>
            <p style="color:#c8d6e6;font-size:15px;margin-top:4px">Permite consolidar la participación por subregión y sector del ecosistema de CTeI.</p>
          </div>
        </div>

        <div class="block">
          <h3>Datos Institucionales</h3>
          <div class="fields">
            ${inp("org", "Nombre de la Organización, Universidad o Empresa", F.org, "text", true, "Ej.: Universidad de Caldas / Empresa X")}
            
            <label class="f">
              <span>Municipio sede en Caldas <span class="req">*</span></span>
              <select data-k="municipio" required>
                <option value="">— Seleccione el municipio sede —</option>
                ${D.municipios.map(grp => `
                  <optgroup label="${esc(grp.sub)}">
                    ${grp.muns.map(m => `<option value="${esc(m)}"${F.municipio === m ? " selected" : ""}>${esc(m)}</option>`).join("")}
                  </optgroup>
                `).join("")}
              </select>
            </label>

            ${inp("nombre", "Nombre de quien diligencia", F.nombre, "text", true)}
            ${inp("correo", "Correo electrónico de contacto", F.correo, "email", true)}
            
            <label class="f">
              <span>Cargo o rol en la entidad <span class="req">*</span></span>
              <select data-k="cargo">
                <option value="">— Seleccione su cargo —</option>
                ${D.cargos.map(c => `<option value="${esc(c)}"${F.cargo === c ? " selected" : ""}>${esc(c)}</option>`).join("")}
              </select>
            </label>

            ${inp("telefono", "Teléfono o celular de contacto", F.telefono, "tel")}
          </div>

          ${F.cargo === "Otro cargo" ? `
            <div style="margin-top:10px">
              ${inp("cargoOtro", "Especifique el cargo", F.cargoOtro, "text", false, "Escriba su cargo")}
            </div>
          ` : ""}
        </div>

        <div class="block">
          <h3>A1 · Tipo de actor del ecosistema <span style="color:#b6452c">*</span></h3>
          <div class="checks">
            ${D.actores.map(a => ck("actor", a, F.actor === a, "radio")).join("")}
            <label class="ck other">
              <input type="radio" name="actor" value="__otro"${F.actor === "__otro" ? " checked" : ""}>
              <span>Otro tipo:</span>
              <input type="text" data-k="actorOtro" value="${esc(F.actorOtro)}" aria-label="Otro tipo de actor">
            </label>
          </div>
        </div>

        <div class="grid2" style="gap:22px">
          <div class="block">
            <h3>A2 · Subregiones donde tiene presencia o actividades <span style="color:#b6452c">*</span></h3>
            <p class="hint">Seleccione todas las que apliquen:</p>
            <div class="checks c2">
              ${D.subregiones.map(s => ck("subregiones", s, F.subregiones.includes(s))).join("")}
              ${ck("subregiones", "Todo el departamento de Caldas", F.subregiones.includes("Todo el departamento de Caldas"))}
            </div>
          </div>

          <div class="block">
            <h3>A3 · Relación con el CODECTI</h3>
            <div class="checks c2">${D.codecti.map(s => ck("codecti", s, F.codecti === s, "radio")).join("")}</div>
            
            <h3 style="margin-top:14px">A4 · ¿Conocía la Política Pública (Ordenanza 952)?</h3>
            <div class="checks c2">${D.conocia.map(s => ck("conocia", s, F.conocia === s, "radio")).join("")}</div>
          </div>
        </div>

        <div class="block">
          <h3>A5 · ¿En qué misión tiene mayor interés o capacidad su organización?</h3>
          <div class="checks">
            ${Object.entries(D.misiones).map(([k, m]) => `
              <label class="ck">
                <input type="checkbox" name="misiones" value="${k}"${F.misiones.includes(k) ? " checked" : ""}>
                <span><strong>${k}</strong> · ${esc(m.t)}</span>
              </label>
            `).join("")}
          </div>
        </div>`;
    }

    // ================= PASO 1: LÍNEAS ESTRATÉGICAS (PRIORIZAR 3) =================
    else if (step === 1) {
      const p1 = F.priorizadas[0] || "";
      const p2 = F.priorizadas[1] || "";
      const p3 = F.priorizadas[2] || "";

      // Filtramos cuáles de las 3 líneas han sido efectivamente seleccionadas
      const seleccionadas = [
        { idx: 0, k: p1, orden: "1. Primera Línea Prioritaria" },
        { idx: 1, k: p2, orden: "2. Segunda Línea Prioritaria" },
        { idx: 2, k: p3, orden: "3. Tercera Línea Prioritaria" }
      ].filter(item => Boolean(item.k));

      // Generar el HTML de las tarjetas desplegadas para las líneas seleccionadas
      let cardsDesplegadasHtml = "";
      if (seleccionadas.length === 0) {
        cardsDesplegadasHtml = `
          <div class="empty" style="padding:32px 20px;border:2px dashed var(--line);border-radius:12px;background:#fff;text-align:center">
            <strong style="color:var(--navy);font-size:16px;display:block;margin-bottom:6px">👆 Ninguna línea señalada todavía</strong>
            <span style="color:var(--muted);max-width:54ch;display:inline-block">Haga clic sobre cualquiera de las 14 líneas de arriba para señalarla como meta prioritaria y desplegar inmediatamente sus opciones de decisión, nivel de prioridad y acciones recomendadas.</span>
          </div>
        `;
      } else {
        cardsDesplegadasHtml = seleccionadas.map(item => {
          const l = D.lineas.find(x => x.k === item.k) || { k: item.k, lbl: item.k, t: "Línea nueva seleccionada", m: "Misión especial", p: 1, sugerencia: "Propuesta de innovación territorial" };
          const v = F.lineas[item.k] || {};

          return `
            <div class="linea-card" style="border-left: 5px solid var(--teal); background: #fbfdff; animation: fadeIn 0.3s ease">
              <div class="linea-card-header">
                <div style="display:flex;align-items:center;gap:12px">
                  <span style="background:var(--navy);color:#fff;font:800 13px var(--head);width:30px;height:30px;border-radius:50%;display:grid;place-items:center">
                    ${item.idx + 1}
                  </span>
                  <div>
                    <span style="font-size:11.5px;color:var(--teal);font-weight:700;text-transform:uppercase">${item.orden}</span>
                    <b style="display:block;font-size:16px;color:var(--navy)">${l.lbl} · ${esc(l.t)}</b>
                  </div>
                </div>
                <span class="mision-tag">${l.m ? esc(D.misiones[l.m]?.t || l.m) : "Línea priorizada"}</span>
              </div>

              <div class="linea-card-grid" style="margin-top:8px">
                <label class="f">
                  <span style="font-size:12.5px;color:var(--navy);font-weight:600">¿Qué decisión propone para esta línea?</span>
                  <select data-role="decision" data-line="${l.k}">
                    <option value="">— Seleccionar decisión —</option>
                    ${D.decisiones.map(([val, label]) => `
                      <option value="${val}"${v.d === val ? " selected" : ""}>${label}</option>
                    `).join("")}
                  </select>
                </label>

                <label class="f">
                  <span style="font-size:12.5px;color:var(--navy);font-weight:600">Nivel de Prioridad en la Inversión</span>
                  <select data-role="prioridad" data-line="${l.k}">
                    <option value="3"${+v.p === 3 || !v.p ? " selected" : ""}>Alta Prioridad (Inmediata 2026-2027)</option>
                    <option value="2"${+v.p === 2 ? " selected" : ""}>Media Prioridad (Mediano plazo 2028-2030)</option>
                    <option value="1"${+v.p === 1 ? " selected" : ""}>Baja Prioridad (Maduración posterior)</option>
                  </select>
                </label>

                <label class="f">
                  <span style="font-size:12.5px;color:var(--navy);font-weight:600">Acción o enfoque estratégico sugerido</span>
                  <select data-role="accion" data-line="${l.k}">
                    <option value="">— Seleccionar enfoque recomendado —</option>
                    ${l.sugerencia ? `<option value="${esc(l.sugerencia)}"${v.s === l.sugerencia ? " selected" : ""}>${esc(l.sugerencia)}</option>` : ""}
                    <option value="Descentralizar y llevar a subregiones fuera de Manizales"${v.s === "Descentralizar y llevar a subregiones fuera de Manizales" ? " selected" : ""}>Descentralizar y llevar a subregiones fuera de Manizales</option>
                    <option value="Articular fuertemente con universidades y pymes locales"${v.s === "Articular fuertemente con universidades y pymes locales" ? " selected" : ""}>Articular fuertemente con universidades y pymes locales</option>
                    <option value="Asignar instrumento claro de financiación (SGR/Obras por Impuestos)"${v.s === "Asignar instrumento claro de financiación (SGR/Obras por Impuestos)" ? " selected" : ""}>Asignar instrumento claro de financiación (SGR/Obras por Impuestos)</option>
                    <option value="Crear observatorio o sistema de información territorial"${v.s === "Crear observatorio o sistema de información territorial" ? " selected" : ""}>Crear observatorio o sistema de información territorial</option>
                    <option value="Fortalecer infraestructura de laboratorios y equipamiento"${v.s === "Fortalecer infraestructura de laboratorios y equipamiento" ? " selected" : ""}>Fortalecer infraestructura de laboratorios y equipamiento</option>
                    <option value="Mantener sin cambios significativos"${v.s === "Mantener sin cambios significativos" ? " selected" : ""}>Mantener sin cambios significativos</option>
                  </select>
                </label>

                <label class="f">
                  <span style="font-size:12.5px;color:var(--navy);font-weight:600">Subregión prioritaria para el impacto</span>
                  <select data-role="subregion-linea" data-line="${l.k}">
                    <option value="">— Seleccionar subregión de impacto —</option>
                    <option value="Todo el departamento de Caldas"${v.sub === "Todo el departamento de Caldas" || !v.sub ? " selected" : ""}>Todo el departamento de Caldas</option>
                    ${D.subregiones.map(sr => `<option value="${esc(sr)}"${v.sub === sr ? " selected" : ""}>${esc(sr)}</option>`).join("")}
                  </select>
                </label>
              </div>
            </div>
          `;
        }).join("");
      }

      h = qhead("1", "Paso 1 de 5 · Priorización de Líneas", "De las 14 líneas priorice 3 como meta y señálelas a continuación.") +
        know(
          "El plan anterior tenía 14 líneas dispersas y solo 3 avanzaron. La estrategia actual es <strong>concentrar los esfuerzos en las tres líneas de mayor impacto</strong> para su organización o municipio.",
          "Haga clic directamente sobre las tarjetas de abajo para <strong>señalar sus 3 líneas prioritarias</strong> (1, 2 y 3). Inmediatamente se desplegarán abajo sus menús de diligenciamiento con opciones de selección rápida."
        ) +
        `
        <!-- RESUMEN DE LAS 3 LÍNEAS SEÑALADAS (SLOTS) -->
        <div class="block" style="border-top:4px solid var(--teal)">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
            <div>
              <h3 style="font-size:16px;color:var(--navy);margin:0">De las 14 líneas priorice 3 como meta y señálelas a continuación:</h3>
              <p class="hint" style="margin-top:4px">Haga clic sobre cualquiera de las 14 tarjetas para señalarla o desmarcarla. Se marcarán con orden de prioridad 1, 2 y 3:</p>
            </div>
            <span style="font:800 13px var(--head);background:${seleccionadas.length === 3 ? 'var(--lime)' : 'var(--soft)'};color:var(--navy);padding:6px 14px;border-radius:var(--radius-full);border:1px solid var(--line)">
              ${seleccionadas.length} de 3 señaladas ${seleccionadas.length === 3 ? '✓' : ''}
            </span>
          </div>

          <div class="slots-container">
            ${[0, 1, 2].map(i => {
              const val = F.priorizadas[i] || "";
              const lObj = D.lineas.find(x => x.k === val);
              const isFilled = Boolean(val && lObj);

              return `
                <div class="slot-card ${isFilled ? 'filled' : ''}">
                  <div class="slot-card-header">
                    <b style="font:700 13px var(--head);color:var(--navy);display:flex;align-items:center;gap:8px">
                      <span class="slot-num-badge">${i + 1}</span>
                      ${i === 0 ? 'Primera Prioridad' : i === 1 ? 'Segunda Prioridad' : 'Tercera Prioridad'}
                    </b>
                    ${isFilled ? `
                      <button type="button" class="btn ghost small" data-role="remove-priorizada" data-idx="${i}" style="padding:2px 8px;font-size:11.5px;color:#b6452c" title="Quitar selección">
                        ✕ Quitar
                      </button>
                    ` : ''}
                  </div>

                  ${isFilled ? `
                    <div style="font-size:13.5px;color:var(--navy);font-weight:700;line-height:1.3">
                      ${lObj.lbl} · ${esc(lObj.t)}
                    </div>
                    <span style="font-size:11.5px;color:var(--teal)">${lObj.m ? esc(D.misiones[lObj.m]?.t || lObj.m) : ""}</span>
                  ` : `
                    <select data-role="pick-priorizada" data-idx="${i}" style="font-size:13px;padding:8px 10px;background:#fff">
                      <option value="">— Señale abajo o elija aquí —</option>
                      ${lineOpts(val)}
                    </select>
                  `}
                </div>
              `;
            }).join("")}
          </div>

          <!-- CATÁLOGO INTERACTIVO DE LAS 14 LÍNEAS -->
          <div style="margin-top:16px">
            <b style="font:700 13px var(--head);color:var(--teal);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px">
              Catálogo de las 14 Líneas de la Ordenanza 952 (Haga clic para señalar):
            </b>
            <div class="lineas-pick-grid">
              ${D.lineas.map(l => {
                const sIdx = F.priorizadas.indexOf(l.k);
                const isSel = sIdx !== -1;
                return `
                  <button type="button" class="linea-pick-btn ${isSel ? 'selected' : ''}" data-role="toggle-linea" data-k="${l.k}">
                    <div class="linea-pick-btn-top">
                      <span class="linea-pick-badge">${l.lbl}</span>
                      <span class="linea-pick-state" style="${isSel ? (sIdx === 0 ? 'background:var(--teal);border-color:var(--teal)' : sIdx === 1 ? 'background:var(--sky);border-color:var(--sky)' : 'background:var(--lime);border-color:var(--lime);color:var(--navy)') : ''}">
                        ${isSel ? (sIdx + 1) : '+'}
                      </span>
                    </div>
                    <strong class="linea-pick-title">${esc(l.t)}</strong>
                    <span class="linea-pick-sub">${l.m ? esc(D.misiones[l.m]?.t || l.m) : ""}</span>
                  </button>
                `;
              }).join("")}
            </div>
          </div>
        </div>

        <!-- CONTENEDOR DONDE SE DESPLIEGAN LOS MENÚS DE LAS LÍNEAS SELECCIONADAS -->
        <div class="block" id="unfoldedLineasSection" style="border-top:4px solid var(--teal)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
            <h3 style="font-size:17px;color:var(--navy);margin:0">Menús de Diligenciamiento para las Líneas Señaladas:</h3>
            <span style="font-size:12.5px;color:var(--muted)">${seleccionadas.length} de 3 desplegadas</span>
          </div>
          <p class="hint">A continuación se despliegan los menús para definir decisión, prioridad y recomendaciones de cada línea señalada:</p>
          <div class="lineas-container" style="margin-top:12px">${cardsDesplegadasHtml}</div>
        </div>

        <div class="grid2" style="gap:22px">
          <div class="block">
            <h3>1B · ¿Qué temática o línea nueva debería incorporarse?</h3>
            <p class="hint">Seleccione las que considere indispensables:</p>
            <div class="checks" style="grid-template-columns:1fr">
              ${D.lineasNuevas.map(n => ck("nuevas", n, F.nuevas.includes(n))).join("")}
              ${ckOther("nuevas", "", F.nuevas.includes("__otro"), "nuevaOtra", F.nuevaOtra)}
            </div>
          </div>

          <div class="block">
            <h3>1C · Comentarios u observaciones adicionales sobre las líneas</h3>
            <p class="hint">Detalle cómo le gustaría fusionar o enfocar alguna línea en particular:</p>
            <textarea data-k="p1c" rows="6" placeholder="Ej.: Fusionar L-3 y L-4 en un nodo de desarrollo territorial inteligente...">${esc(F.p1c)}</textarea>
          </div>
        </div>`;
    }

    // ================= PASO 2: METAS E INDICADORES =================
    else if (step === 2) {
      // Sincronizar automáticamente las líneas priorizadas en el paso 1 con las metas
      if (F.priorizadas && F.priorizadas.length) {
        if (!F.metas[0].linea && F.priorizadas[0]) F.metas[0].linea = F.priorizadas[0];
        if (!F.metas[1].linea && F.priorizadas[1]) F.metas[1].linea = F.priorizadas[1];
        if (!F.metas[2].linea && F.priorizadas[2]) F.metas[2].linea = F.priorizadas[2];
      }

      h = qhead("2", "Paso 2 de 5 · Metas e Indicadores de Impacto", "¿Qué metas e indicadores medibles propone para el departamento?") +
        know(
          "El plan anterior tenía <strong>metas genéricas sin línea base</strong>. El nuevo Plan requiere metas escalonadas con cortes en 2027, 2030 y 2033 asociadas al catálogo del DNP.",
          "Estructure hasta tres metas claras vinculadas preferiblemente a las líneas que priorizó en el paso anterior. Seleccione las opciones desplegables para cada casilla."
        ) +
        F.metas.map((m, i) => {
          const lk = m.linea || F.priorizadas[i] || "";
          const lObj = D.lineas.find(x => x.k === lk);
          const lineaTitulo = lObj ? `${lObj.lbl} · ${lObj.t}` : (lk ? lk : "Seleccione línea");

          return `
            <div class="rowcard">
              <header>
                <b>Meta Territorial ${i + 1} ${lk ? `· ${esc(lineaTitulo)}` : ""}</b>
                <span style="font-size:12px;color:var(--muted)">Despliegue las casillas para configurar la meta</span>
              </header>

              <div class="fields">
                <label class="f">
                  <span>Línea Estratégica vinculada</span>
                  <select data-k="metas.${i}.linea">${lineOpts(m.linea || F.priorizadas[i])}</select>
                </label>

                <label class="f">
                  <span>Ámbito / Tipo de resultado esperado</span>
                  <select data-k="metas.${i}.tipoMeta">
                    <option value="">— Seleccione el ámbito de impacto —</option>
                    ${D.ambitosMetas.map(a => `<option value="${esc(a)}"${m.tipoMeta === a ? " selected" : ""}>${esc(a)}</option>`).join("")}
                  </select>
                </label>
              </div>

              <div class="fields">
                <label class="f">
                  <span>Indicador oficial sugerido (Catálogo DNP/KPT)</span>
                  <select data-k="metas.${i}.indicador">
                    <option value="">— Seleccione un indicador sugerido —</option>
                    ${D.indicadoresKpt.map(k => `<option value="${esc(k)}"${m.indicador === k ? " selected" : ""}>${esc(k)}</option>`).join("")}
                  </select>
                </label>

                <label class="f">
                  <span>Subregión donde concentrar el esfuerzo</span>
                  <select data-k="metas.${i}.subregion">
                    <option value="">— Seleccione la subregión —</option>
                    ${D.subregiones.concat(["Todo el departamento"]).map(s => `<option value="${esc(s)}"${m.subregion === s ? " selected" : ""}>${esc(s)}</option>`).join("")}
                  </select>
                </label>
              </div>

              <label class="f">
                <span>Descripción o meta propuesta</span>
                <input type="text" data-k="metas.${i}.meta" value="${esc(m.meta)}" placeholder="Ej.: Conectar 50 sedes rurales con fibra óptica y dotar 5 aulas de ciencia...">
              </label>

              <div class="fields g4">
                <label class="f">
                  <span>Línea base actual</span>
                  <input type="text" data-k="metas.${i}.base" value="${esc(m.base)}" placeholder="Ej.: 15%">
                </label>
                <label class="f">
                  <span>Meta a 2027</span>
                  <input type="text" data-k="metas.${i}.m2027" value="${esc(m.m2027)}" placeholder="Ej.: 40%">
                </label>
                <label class="f">
                  <span>Meta a 2030</span>
                  <input type="text" data-k="metas.${i}.m2030" value="${esc(m.m2030)}" placeholder="Ej.: 75%">
                </label>
                <label class="f">
                  <span>Meta a 2033</span>
                  <input type="text" data-k="metas.${i}.m2033" value="${esc(m.m2033)}" placeholder="Ej.: 100%">
                </label>
              </div>
            </div>
          `;
        }).join("") +
        `<div class="grid2" style="gap:22px">
          <div class="block">
            <h3>2B · ¿En qué subregiones se debe focalizar prioritariamente la inversión?</h3>
            <div class="checks c2">${D.subregiones.map(s => ck("p2sub", s, F.p2sub.includes(s))).join("")}</div>
          </div>

          <div class="block">
            <h3>2C · ¿Qué grupos poblacionales requieren mayor atención?</h3>
            <div class="checks c2">
              ${D.poblaciones.map(s => ck("p2pob", s, F.p2pob.includes(s))).join("")}
              ${ckOther("p2pob", "", F.p2pob.includes("__otro"), "p2pobOtra", F.p2pobOtra)}
            </div>
          </div>
        </div>`;
    }

    // ================= PASO 3: PROYECTOS Y FINANCIACIÓN =================
    else if (step === 3) {
      h = qhead("3", "Paso 3 de 5 · Banco de Proyectos de CTeI", "¿Tiene proyectos o iniciativas para postular al portafolio departamental?") +
        know(
          "Existen <strong>$23.400 M de regalías congelados</strong> porque solo 11 de cada 100 ideas logran formularse con viabilidad técnica en MGA.",
          "Si tiene iniciativas, regístrelas con casillas desplegables. <strong>Si no tiene proyectos en este momento, use el botón para saltar esta parte</strong> y continuar al siguiente paso."
        );

      h += `
        <div class="project-toggle-card">
          <span class="eyebrow" style="color:var(--sky)">Registro de Iniciativas de CTeI</span>
          <h3>¿Desea registrar proyectos o ideas en este momento?</h3>
          <p>Puede postular iniciativas para incluirlas en el banco de proyectos departamentales y buscar fuentes de cofinanciación (SGR, Obras por Impuestos o convocatorias nacionales). Si no cuenta con proyectos ahora, puede omitir esta sección con un solo clic.</p>
          
          <div class="project-toggle-btns">
            <button type="button" class="btn ${F.tieneProyectos === 'si' ? 'lime' : 'ghost'}" id="btnTieneProySi">
              ✓ Sí, tengo proyectos para registrar
            </button>
            <button type="button" class="btn ${F.tieneProyectos === 'no' ? 'lime' : 'ghost'}" id="btnTieneProyNo" style="${F.tieneProyectos === 'no' ? 'background:var(--lime);color:var(--navy)' : 'color:#fff'}">
              ✕ No tengo proyectos (Saltar esta sección)
            </button>
          </div>
        </div>
      `;

      if (F.tieneProyectos === "no") {
        h += `
          <div class="project-skip-notice">
            <h4>Sección de proyectos omitida</h4>
            <p>Comprendido. No es obligatorio postular proyectos individuales. Su aporte en líneas estratégicas, gobernanza y seguimiento es de gran valor para la actualización del Plan de Acción.</p>
            <div style="margin-top:14px">
              <button type="button" class="btn small lime" id="btnSaltarPaso4">Continuar al Paso 4: Gobernanza →</button>
            </div>
          </div>
        `;
      } else {
        h += `
          <div style="display:grid;gap:22px;margin-top:10px">
            <div class="block">
              <h3>Escalera de Madurez Técnica de Proyectos</h3>
              <div class="ladder">
                ${D.madurez.map(([a, b], i) => `
                  <div style="background:${["#dfe6ee", "var(--sky)", "var(--teal)", "var(--navy)"][i]};color:${i ? "#fff" : "var(--navy)"}">
                    <b>${i + 1} · ${a}</b>${b}
                  </div>
                `).join("")}
              </div>
            </div>

            <div class="grid2" style="gap:22px">` +
            F.proyectos.map((p, i) => `
              <div class="rowcard" style="border-top:4px solid ${i ? "var(--lime)" : "var(--teal)"}">
                <header>
                  <b>Iniciativa ${"AB"[i]}</b>
                  <span style="font-size:12px;color:var(--muted)">Despliegue las opciones</span>
                </header>

                ${inp(`proyectos.${i}.nombre`, "Nombre del proyecto o iniciativa", p.nombre, "text", false, "Ej.: Centro de procesamiento de bioinsumos...")}

                <div class="fields">
                  <label class="f">
                    <span>Tipo de iniciativa</span>
                    <select data-k="proyectos.${i}.tipoIniciativa">
                      <option value="">— Seleccionar tipo —</option>
                      ${D.tiposIniciativa.map(t => `<option value="${esc(t)}"${p.tipoIniciativa === t ? " selected" : ""}>${esc(t)}</option>`).join("")}
                    </select>
                  </label>

                  <label class="f">
                    <span>Línea estratégica afín</span>
                    <select data-k="proyectos.${i}.lineas">${lineOpts(p.lineas)}</select>
                  </label>
                </div>

                <div class="fields">
                  <label class="f">
                    <span>Subregión sede</span>
                    <select data-k="proyectos.${i}.subregion">
                      <option value="">— Seleccionar subregión —</option>
                      ${D.subregiones.concat(["Todo el departamento"]).map(s => `<option value="${esc(s)}"${p.subregion === s ? " selected" : ""}>${esc(s)}</option>`).join("")}
                    </select>
                  </label>

                  <label class="f">
                    <span>Presupuesto estimado</span>
                    <select data-k="proyectos.${i}.rangoPresupuesto">
                      <option value="">— Rango presupuestal —</option>
                      ${D.rangosPresupuesto.map(r => `<option value="${esc(r)}"${p.rangoPresupuesto === r ? " selected" : ""}>${esc(r)}</option>`).join("")}
                    </select>
                  </label>
                </div>

                <div class="fields">
                  <label class="f">
                    <span>Contrapartida estimada disponible</span>
                    <select data-k="proyectos.${i}.contrapartida">
                      <option value="">— Nivel de contrapartida —</option>
                      ${D.rangosContrapartida.map(c => `<option value="${esc(c)}"${p.contrapartida === c ? " selected" : ""}>${esc(c)}</option>`).join("")}
                    </select>
                  </label>

                  <label class="f">
                    <span>Nivel de madurez actual</span>
                    <select data-k="proyectos.${i}.madurez">
                      <option value="">— Seleccionar madurez —</option>
                      ${D.madurez.map(([mLabel, mDesc], j) => `<option value="${j + 1}"${+p.madurez === j + 1 ? " selected" : ""}>${j + 1} · ${mLabel} (${mDesc})</option>`).join("")}
                    </select>
                  </label>
                </div>

                <div class="fields">
                  <label class="f">
                    <span>Aliado estratégico principal</span>
                    <select data-k="proyectos.${i}.aliadoPrincipal">
                      <option value="">— Seleccionar aliado —</option>
                      ${D.aliadosSugeridos.map(al => `<option value="${esc(al)}"${p.aliadoPrincipal === al ? " selected" : ""}>${esc(al)}</option>`).join("")}
                    </select>
                  </label>

                  <label class="f">
                    <span>Principal barrera para ejecutar</span>
                    <select data-k="proyectos.${i}.barreraPrincipal">
                      <option value="">— Seleccionar cuello de botella —</option>
                      ${D.barreras.map(ba => `<option value="${esc(ba)}"${p.barreraPrincipal === ba ? " selected" : ""}>${esc(ba)}</option>`).join("")}
                    </select>
                  </label>
                </div>

                <div>
                  <b style="font:700 13.5px var(--body);color:var(--navy);display:block;margin-bottom:6px">Fuentes de financiación posibles:</b>
                  <div class="checks" style="grid-template-columns:1fr">
                    ${D.fuentes.map(f => `
                      <label class="ck">
                        <input type="checkbox" name="fuentes${i}" value="${esc(f)}"${(p.fuentes || []).includes(f) ? " checked" : ""}>
                        <span>${esc(f)}</span>
                      </label>
                    `).join("")}
                  </div>
                </div>
              </div>
            `).join("") +
            `</div>
          </div>
        `;
      }
    }

    // ================= PASO 4: GOBERNANZA =================
    else if (step === 4) {
      h = qhead("4", "Paso 4 de 5 · Gobernanza y Corresponsabilidad", "¿Quién debería liderar cada línea y qué rol asume su entidad?") +
        know(
          "Las metas del plan original <strong>no tuvieron dueño institucional</strong>. La propuesta es asignar una <strong>Entidad Ancla</strong> por línea con capacidad técnica instalada.",
          "Seleccione las entidades líderes recomendadas y los roles que su propia institución estaría en capacidad de asumir."
        ) +
        `<div class="block">
          <h3>4A · Entidad Ancla y Compromiso Institucional</h3>
          <p class="hint">Seleccione las opciones desplegables para hasta tres líneas estratégicas:</p>` +
        F.anclas.map((a, i) => `
          <div class="rowcard">
            <header><b>Línea Estratégica ${i + 1}</b></header>
            <div class="fields">
              <label class="f">
                <span>Línea a liderar</span>
                <select data-k="anclas.${i}.linea">${lineOpts(a.linea)}</select>
              </label>

              <label class="f">
                <span>Entidad Ancla sugerida para liderar</span>
                <select data-k="anclas.${i}.actor">
                  <option value="">— Seleccione la institución líder —</option>
                  ${D.actoresAnclaSugeridos.map(act => `<option value="${esc(act)}"${(a.actor === act || (act.includes("FUTURA") && (a.actor === "Parque Tecnológico de Caldas" || (a.actor || "").includes("FUTURA")))) ? " selected" : ""}>${esc(act)}</option>`).join("")}
                </select>
              </label>
            </div>

            ${a.actor === "Otra institución" ? `
              <div style="margin-top:4px">
                ${inp(`anclas.${i}.actorOtro`, "Especifique el nombre de la institución", a.actorOtro, "text", false, "Escriba la entidad propuesta")}
              </div>
            ` : ""}

            <div>
              <b style="font:700 14px var(--body);color:var(--navy);display:block;margin-bottom:6px">Rol que su propia organización estaría dispuesta a asumir:</b>
              <div class="checks c2" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">
                ${D.roles.map(([k, t]) => `
                  <label class="ck">
                    <input type="checkbox" name="roles${i}" value="${k}"${(a.roles || []).includes(k) ? " checked" : ""}>
                    <span>${t}</span>
                  </label>
                `).join("")}
              </div>
            </div>
          </div>
        `).join("") +
        `</div>

        <div class="block">
          <h3>4B · Ajustes Institucionales más Urgentes</h3>
          <p class="hint">Seleccione la prioridad de cada propuesta para el funcionamiento del CODECTI:</p>
          <div class="scroll">
            <table class="ltable" style="min-width:600px">
              <thead><tr><th>Ajuste Propuesto</th><th>Para qué sirve</th><th>Nivel de Prioridad</th></tr></thead>
              <tbody>
                ${D.ajustesGobernanza.map(([k, a, b]) => `
                  <tr>
                    <td style="text-align:left"><strong>${esc(a)}</strong></td>
                    <td style="text-align:left;font-size:13.5px">${esc(b)}</td>
                    <td>
                      <select name="aj-${k}" style="padding:6px 10px;font-size:13.5px">
                        <option value="1"${+F.ajustes[k] === 1 ? " selected" : ""}>1 · Menor prioridad</option>
                        <option value="2"${+F.ajustes[k] === 2 ? " selected" : ""}>2 · Prioridad media</option>
                        <option value="3"${+F.ajustes[k] === 3 ? " selected" : ""}>3 · Indispensable</option>
                      </select>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <div class="block">
          <h3>4C · ¿Qué condición facilitaría el compromiso de su entidad?</h3>
          <input type="text" data-k="p4c" value="${esc(F.p4c)}" placeholder="Ej.: Acuerdos de cooperación claros, contrapartida asegurada del SGR o delegación formal...">
        </div>`;
    }

    // ================= PASO 5: SEGUIMIENTO Y DATOS =================
    else if (step === 5) {
      h = qhead("5", "Paso 5 de 5 · Seguimiento y Rendición de Cuentas", "¿Qué información puede aportar su entidad para el tablero público?") +
        know(
          "Sin datos periódicos, los compromisos vencieron sin alertas. La Ordenanza exige <strong>dos sesiones de control al año en el CODECTI</strong> y rendición de cuentas a la Asamblea.",
          "Seleccione qué tipo de indicadores o datos produce su entidad y con qué periodicidad podrían compartirse."
        ) +
        `<div class="block">
          <h3>5A · Datos e Indicadores que su Entidad Puede Reportar</h3>
          <p class="hint">Despliegue las opciones para registrar hasta tres flujos de información:</p>` +
        F.datos.map((d, i) => `
          <div class="fields g4">
            <label class="f">
              <span>Tipo de dato ${i + 1}</span>
              <select data-k="datos.${i}.dato">
                <option value="">— Seleccionar tipo de información —</option>
                ${D.tiposDatosSeguimiento.map(td => `<option value="${esc(td)}"${d.dato === td ? " selected" : ""}>${esc(td)}</option>`).join("")}
              </select>
            </label>

            <label class="f">
              <span>Línea afín</span>
              <select data-k="datos.${i}.lineas">${lineOpts(d.lineas)}</select>
            </label>

            <label class="f">
              <span>Periodicidad</span>
              <select data-k="datos.${i}.frecuencia">
                <option value="">— Frecuencia —</option>
                <option value="Trimestral"${d.frecuencia === "Trimestral" ? " selected" : ""}>Trimestral</option>
                <option value="Semestral"${d.frecuencia === "Semestral" ? " selected" : ""}>Semestral</option>
                <option value="Anual"${d.frecuencia === "Anual" ? " selected" : ""}>Anual</option>
              </select>
            </label>

            <label class="f">
              <span>Desagregación</span>
              <select data-k="datos.${i}.desag">
                <option value="">— Desagregación —</option>
                <option value="Por municipio"${d.desag === "Por municipio" ? " selected" : ""}>Por municipio</option>
                <option value="Por sexo/género"${d.desag === "Por sexo/género" ? " selected" : ""}>Por sexo/género</option>
                <option value="Por subregión"${d.desag === "Por subregión" ? " selected" : ""}>Por subregión</option>
                <option value="Nivel departamental"${d.desag === "Nivel departamental" ? " selected" : ""}>Departamental</option>
              </select>
            </label>
          </div>
        `).join("") +
        `</div>

        <div class="grid2" style="gap:22px">
          <div class="block">
            <h3>5B · ¿Cómo prefiere conocer los avances del Plan de Acción?</h3>
            <div class="checks" style="grid-template-columns:1fr">
              ${D.p5b.map(s => ck("p5b", s, F.p5b.includes(s))).join("")}
              ${ckOther("p5b", "", F.p5b.includes("__otro"), "p5bOtro", F.p5bOtro)}
            </div>
          </div>

          <div class="block">
            <h3>5C · ¿Con qué periodicidad deben publicarse los resultados?</h3>
            <div class="checks c2">${D.p5c.map(s => ck("p5c", s, F.p5c === s, "radio")).join("")}</div>

            <h3 style="margin-top:14px">5D · ¿Disposición para firmar un acuerdo de intercambio de datos?</h3>
            <div class="checks c2">${D.p5d.map(s => ck("p5d", s, F.p5d === s, "radio")).join("")}</div>
          </div>
        </div>`;
    }

    // ================= PASO 6: CIERRE Y ENVÍO =================
    else if (step === 6) {
      const R = reviewItems();
      h = `
        <div class="qhead">
          <i class="hex">✓</i>
          <div>
            <span class="eyebrow">Cierre y Envío de la Consulta</span>
            <h2>Revisión final de su aporte técnico</h2>
          </div>
        </div>

        <div class="block">
          <h3>Comentarios u observaciones generales</h3>
          <p class="hint">¿Algún aspecto adicional que deba tenerse en cuenta para la actualización del Plan de Acción?</p>
          <textarea data-k="comentarios" rows="4" placeholder="Escriba aquí sus comentarios...">${esc(F.comentarios)}</textarea>
        </div>

        <div class="block">
          <h3>Verificación de secciones diligenciadas</h3>
          <ul class="review">
            ${R.map(r => `
              <li class="${r.ok ? "ok" : ""}">
                <i aria-hidden="true">${r.ok ? "✓" : ""}</i>
                <span>${r.t}</span>
                <span class="sr">${r.ok ? "completo" : "pendiente"}</span>
              </li>
            `).join("")}
          </ul>
          <p class="hint" style="margin-top:4px">Solo la caracterización (Paso A) y la autorización legal son obligatorias para el envío; los demás pasos fortalecen la evidencia territorial.</p>
        </div>

        <label class="consent" id="consentBox">
          <input type="checkbox" data-k="autorizacion"${F.autorizacion ? " checked" : ""}>
          <span>Autorizo el tratamiento de los datos suministrados con fines exclusivos de la actualización del Plan de Acción de CTeI de Caldas (Ordenanza 952 de 2023), conforme a la Ley 1581 de 2012. Los resultados se procesarán de forma agregada. <span style="color:#b6452c">*</span></span>
        </label>

        <input type="text" id="hpField" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div id="sendMsg" class="notice" hidden></div>`;
    }

    sBody.innerHTML = h;

    // Actualizar stepper
    if (sNav) {
      sNav.innerHTML = D.steps.map((s, i) => `
        <li>
          <button type="button" data-step="${i}"${i === step ? ' aria-current="step"' : ""} class="${stepDone(i) && i !== step ? "done" : ""}">
            <i class="hex">${s.k}</i>
            ${esc(s.t)}
          </button>
        </li>
      `).join("");
    }

    if (pBar) {
      pBar.style.width = (step / (D.steps.length - 1) * 100) + "%";
    }

    if (prevBtn) {
      prevBtn.style.visibility = step ? "visible" : "hidden";
    }

    if (nextBtn) {
      nextBtn.textContent = step === D.steps.length - 1 ? "Enviar respuesta final" : "Siguiente paso →";
      nextBtn.disabled = false;
    }

    // Bindings de listeners dinámicos para paso 3 (botones Sí / No)
    if (step === 3) {
      const btnSi = document.getElementById("btnTieneProySi");
      const btnNo = document.getElementById("btnTieneProyNo");
      const btnSaltar = document.getElementById("btnSaltarPaso4");

      if (btnSi) {
        btnSi.addEventListener("click", () => {
          F.tieneProyectos = "si";
          save();
          renderStep();
        });
      }
      if (btnNo) {
        btnNo.addEventListener("click", () => {
          F.tieneProyectos = "no";
          save();
          renderStep();
        });
      }
      if (btnSaltar) {
        btnSaltar.addEventListener("click", () => {
          goStep(4);
        });
      }
    }
  }

  function stepDone(i) {
    if (i === 0) return !!(F.org && F.nombre && F.correo && F.actor && F.subregiones.length);
    if (i === 1) {
      const sel = (F.priorizadas || []).filter(Boolean);
      return sel.length > 0 && sel.some(k => F.lineas[k] && F.lineas[k].d);
    }
    if (i === 2) return F.metas.some(m => m.meta || m.linea || m.tipoMeta);
    if (i === 3) return F.tieneProyectos === "no" || (F.tieneProyectos === "si" && F.proyectos.some(p => p.nombre || p.tipoIniciativa));
    if (i === 4) return F.anclas.some(a => a.linea || a.actor || (a.roles || []).length) || Object.keys(F.ajustes).length > 0;
    if (i === 5) return F.datos.some(d => d.dato) || F.p5b.length > 0 || !!F.p5c;
    return false;
  }

  function reviewItems() {
    return [
      { t: "Completé la caracterización (Paso A)", ok: stepDone(0) },
      { t: "Prioricé y configuré las líneas de acción", ok: stepDone(1) },
      { t: "Configuré metas territoriales", ok: stepDone(2) },
      { t: F.tieneProyectos === "no" ? "Sección de proyectos omitida (opcional)" : "Registré iniciativas de proyectos", ok: stepDone(3) },
      { t: "Indiqué liderazgo o ajustes de gobernanza", ok: stepDone(4) },
      { t: "Autoricé el tratamiento de datos", ok: !!F.autorizacion }
    ];
  }

  function setPath(obj, path, val) {
    const ks = path.split(".");
    let o = obj;
    for (let i = 0; i < ks.length - 1; i++) {
      if (!o[ks[i]]) o[ks[i]] = {};
      o = o[ks[i]];
    }
    o[ks[ks.length - 1]] = val;
  }

  function initListeners() {
    const qForm = document.getElementById("qForm");
    const sNav = document.getElementById("stepNav");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (qForm) {
      qForm.addEventListener("click", e => {
        const t = e.target;

        // Clic para alternar (seleccionar/deseleccionar) una de las 14 líneas interactivas
        const toggleBtn = t.closest('[data-role="toggle-linea"]');
        if (toggleBtn) {
          const lk = toggleBtn.dataset.k;
          if (!Array.isArray(F.priorizadas)) F.priorizadas = ["", "", ""];

          const currentIdx = F.priorizadas.indexOf(lk);
          if (currentIdx !== -1) {
            // Ya estaba seleccionada: quitarla del slot
            F.priorizadas[currentIdx] = "";
          } else {
            // Buscar el primer slot vacío entre 0, 1 y 2
            let emptyIdx = F.priorizadas.findIndex(x => !x);
            if (emptyIdx === -1) {
              if (F.priorizadas.length < 3) {
                emptyIdx = F.priorizadas.length;
              }
            }

            if (emptyIdx !== -1 && emptyIdx < 3) {
              F.priorizadas[emptyIdx] = lk;
              if (!F.metas[emptyIdx]) F.metas[emptyIdx] = {};
              F.metas[emptyIdx].linea = lk;
            } else {
              alert("Ya ha señalado 3 líneas prioritarias. Para señalar una diferente, primero desmarque una de las seleccionadas haciendo clic sobre ella o usando el botón Quitar.");
              return;
            }
          }

          save();
          renderStepKeep();
          return;
        }

        // Clic para quitar una línea de los slots
        const removeBtn = t.closest('[data-role="remove-priorizada"]');
        if (removeBtn) {
          const idx = +removeBtn.dataset.idx;
          if (Array.isArray(F.priorizadas)) {
            F.priorizadas[idx] = "";
            save();
            renderStepKeep();
          }
          return;
        }
      });

      qForm.addEventListener("input", e => {
        const t = e.target;
        if (t.dataset.k) {
          setPath(F, t.dataset.k, t.type === "checkbox" ? t.checked : t.value.slice(0, 2000));
          if (t.dataset.k === "autorizacion") {
            document.getElementById("consentBox")?.classList.remove("missing");
          }
          const box = t.closest(".ck.other")?.querySelector("input[type=checkbox],input[type=radio]");
          if (box && t.value && !box.checked) {
            box.checked = true;
            box.dispatchEvent(new Event("change", { bubbles: true }));
          }
          save();
        }
      });

      qForm.addEventListener("change", e => {
        const t = e.target;
        const n = t.name;

        // Selección de una de las 3 líneas prioritarias en Paso 1
        if (t.dataset.role === "pick-priorizada") {
          const idx = +t.dataset.idx;
          if (!Array.isArray(F.priorizadas)) F.priorizadas = ["", "", ""];
          F.priorizadas[idx] = t.value;

          // Pre-llenar automáticamente la meta respectiva en el paso 2
          if (!F.metas[idx]) F.metas[idx] = {};
          if (t.value) {
            F.metas[idx].linea = t.value;
          }

          save();
          renderStepKeep();
          return;
        }

        // Si es un <select> con data-k
        if (t.dataset.k) {
          setPath(F, t.dataset.k, t.value);
          save();
          if (t.dataset.k === "cargo" || t.dataset.k.includes(".actor")) {
            renderStepKeep();
          }
          return;
        }

        // Si es un selector de las 14 líneas
        if (t.dataset.role && t.dataset.line) {
          const lk = t.dataset.line;
          const role = t.dataset.role; // decision, prioridad, accion, subregion-linea
          if (!F.lineas[lk]) F.lineas[lk] = {};
          if (role === "decision") F.lineas[lk].d = t.value;
          if (role === "prioridad") F.lineas[lk].p = +t.value;
          if (role === "accion") F.lineas[lk].s = t.value;
          if (role === "subregion-linea") F.lineas[lk].sub = t.value;
          save();
          return;
        }

        // Si es un select de ajuste de gobernanza
        if (n && n.startsWith("aj-")) {
          const k = n.slice(3);
          F.ajustes[k] = +t.value;
          save();
          return;
        }

        // Si es un input radio o checkbox
        if (!n) return;
        const multi = (arr, v, on) => {
          const s = new Set(arr);
          on ? s.add(v) : s.delete(v);
          return [...s];
        };

        if (["subregiones", "misiones", "nuevas", "p2sub", "p2pob", "barreras", "p5b"].includes(n)) {
          F[n] = multi(F[n], t.value, t.checked);
        } else if (["actor", "codecti", "conocia", "p5c", "p5d"].includes(n)) {
          F[n] = t.value;
        } else if (n.startsWith("fuentes")) {
          const idx = +n.slice(7);
          if (F.proyectos[idx]) {
            F.proyectos[idx].fuentes = multi(F.proyectos[idx].fuentes || [], t.value, t.checked);
          }
        } else if (n.startsWith("roles")) {
          const idx = +n.slice(5);
          if (F.anclas[idx]) {
            F.anclas[idx].roles = multi(F.anclas[idx].roles || [], t.value, t.checked);
          }
        }
        save();
      });
    }

    if (sNav) {
      sNav.addEventListener("click", e => {
        const b = e.target.closest("[data-step]");
        if (b) goStep(+b.dataset.step);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => goStep(step - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", async () => {
        // Validar Paso 0
        if (step === 0 && !stepDone(0)) {
          renderStep();
          const miss = [];
          if (!F.org) miss.push("nombre de la organización");
          if (!F.municipio) miss.push("municipio sede");
          if (!F.nombre) miss.push("su nombre");
          if (!F.correo) miss.push("correo electrónico");
          if (!F.actor) miss.push("tipo de actor");
          if (!F.subregiones.length) miss.push("subregiones donde actúa");
          document.getElementById("stepBody")?.insertAdjacentHTML("afterbegin", `
            <div class="notice warn" role="alert">Para avanzar, complete: ${miss.join(", ")}.</div>
          `);
          window.scrollTo({ top: document.getElementById("v-consulta").offsetTop, behavior: "smooth" });
          return;
        }

        if (step === 0 && F.correo && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(F.correo)) {
          renderStep();
          document.getElementById("stepBody")?.insertAdjacentHTML("afterbegin", `
            <div class="notice warn" role="alert">Por favor ingrese un correo electrónico válido.</div>
          `);
          return;
        }

        // Si estamos en pasos intermedios, avanzar
        if (step < D.steps.length - 1) {
          goStep(step + 1);
          return;
        }

        // Paso Final: Envío
        const msg = document.getElementById("sendMsg");
        if (!stepDone(0)) {
          if (msg) {
            msg.hidden = false;
            msg.className = "notice warn";
            msg.textContent = "Falta completar la caracterización institucional (Paso A).";
          }
          return;
        }
        if (!F.autorizacion) {
          document.getElementById("consentBox")?.classList.add("missing");
          if (msg) {
            msg.hidden = false;
            msg.className = "notice warn";
            msg.textContent = "Debe autorizar el tratamiento de datos para finalizar.";
          }
          return;
        }

        nextBtn.disabled = true;
        if (msg) {
          msg.hidden = false;
          msg.className = "notice";
          msg.textContent = "Enviando respuesta…";
        }

        const rec = clean(JSON.parse(JSON.stringify(F)));
        rec.hp = document.getElementById("hpField")?.value || "";

        try {
          if (window.CC_RESULTS) {
            await window.CC_RESULTS.saveRecord(rec);
          }
          lsSet(DKEY, null);
          F = blank();
          step = 0;
          document.getElementById("stepBody").innerHTML = `
            <div class="card thanks">
              <i class="hex">✓</i>
              <h2>¡Aporte Registrado con Éxito!</h2>
              <p class="muted" style="max-width:58ch">Sus respuestas y propuestas han quedado guardadas. Servirán como insumo directo para la concertación del Plan de Acción en la próxima sesión plenaria del CODECTI.</p>
              <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:10px">
                <a class="btn lime" href="#resultados">Ver Resultados Agregados en Vivo</a>
                <button type="button" class="btn ghost small" style="color:var(--navy)" id="anotherBtn">Diligenciar para otra entidad</button>
              </div>
            </div>`;
          document.getElementById("anotherBtn")?.addEventListener("click", () => goStep(0));
          if (prevBtn) prevBtn.style.visibility = "hidden";
          if (nextBtn) nextBtn.style.visibility = "hidden";
          if (document.getElementById("progBar")) document.getElementById("progBar").style.width = "100%";
          window.scrollTo({ top: document.getElementById("v-consulta").offsetTop, behavior: "smooth" });
        } catch(err) {
          nextBtn.disabled = false;
          if (msg) {
            msg.className = "notice err";
            msg.textContent = "No se pudo conectar con el servidor. Sus respuestas siguen guardadas en este navegador para que intente nuevamente.";
          }
        }
      });
    }
  }

  function renderStepKeep() {
    const y = window.scrollY;
    renderStep();
    window.scrollTo(0, y);
  }

  function goStep(i) {
    step = Math.max(0, Math.min(D.steps.length - 1, i));
    renderStep();
    const vConsulta = document.getElementById("v-consulta");
    if (vConsulta) {
      window.scrollTo({ top: vConsulta.offsetTop, behavior: "smooth" });
    }
    const h = document.querySelector("#stepBody h2");
    if (h) {
      h.setAttribute("tabindex", "-1");
      setTimeout(() => h.focus({ preventScroll: true }), 50);
    }
  }

  function clean(r) {
    r.metas = (r.metas || []).filter(m => m.meta || m.indicador || m.linea || m.tipoMeta);
    if (r.tieneProyectos === "no") {
      r.proyectos = [];
    } else {
      r.proyectos = (r.proyectos || []).filter(p => p.nombre || p.tipoIniciativa || p.madurez || (p.fuentes || []).length);
    }
    r.anclas = (r.anclas || []).filter(a => a.linea || a.actor || (a.roles || []).length);
    r.datos = (r.datos || []).filter(d => d.dato);
    Object.keys(r.lineas || {}).forEach(k => {
      if (!r.lineas[k].d && !r.lineas[k].p && !r.lineas[k].s) delete r.lineas[k];
    });
    return r;
  }

  return {
    init: function() {
      initListeners();
      renderStep();
    },
    renderStep,
    goStep
  };
})();
