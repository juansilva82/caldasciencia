/**
 * Module: Admin Panel & CSV Export
 * Control de acceso administrador, descarga de CSV y gestión de registros individuales.
 */
"use strict";

window.CC_ADMIN = (function() {
  const D = window.CC_DATA;
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function refresh() {
    const res = window.CC_RESULTS;
    const isAdm = !!(res && res.getAdminKey());
    const toggleEl = document.getElementById("adminToggle");
    const toolsEl = document.getElementById("adminTools");
    const boxEl = document.getElementById("adminBox");

    if (toggleEl && toggleEl.parentElement) {
      toggleEl.parentElement.hidden = isAdm;
    }
    if (toolsEl) {
      toolsEl.classList.toggle("open", isAdm);
    }
    if (boxEl && isAdm) {
      boxEl.classList.remove("open");
    }
  }

  function render(records, mode) {
    const P = document.getElementById("adminPanel");
    if (!P) return;

    const res = window.CC_RESULTS;
    const isAdm = !!(res && res.getAdminKey());

    if (!isAdm && mode !== "local") {
      P.hidden = true;
      return;
    }
    if (mode === "local" && !isAdm) {
      P.hidden = true;
      return;
    }

    P.hidden = false;
    P.innerHTML = `
      <div class="chart">
        <span class="eyebrow">Solo Administrador</span>
        <h3>Respuestas individuales registradas (${records.length})</h3>
        <div class="scroll">
          <table class="admin-list">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Organización</th>
                <th>Tipo de actor</th>
                <th>Contacto</th>
                <th>Correo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              ${records.map(r => `
                <tr>
                  <td>${esc((r.creado || "").slice(0, 10))}</td>
                  <td><strong>${esc(r.org)}</strong><br><span class="muted">${esc(r.municipio)}</span></td>
                  <td>${esc(r.actor === "__otro" ? r.actorOtro || "Otro" : r.actor)}</td>
                  <td>${esc(r.nombre)}<br><span class="muted">${esc(r.cargo === "Otro cargo" ? r.cargoOtro || "Otro" : r.cargo)}</span></td>
                  <td>${esc(r.correo)}</td>
                  <td><button type="button" class="btn danger small" data-del="${esc(r.id)}">Eliminar</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>`;

    P.querySelectorAll("[data-del]").forEach(b => {
      b.addEventListener("click", async () => {
        if (b.dataset.confirm !== "1") {
          b.dataset.confirm = "1";
          b.textContent = "¿Confirmar?";
          setTimeout(() => {
            if (b.isConnected) {
              b.dataset.confirm = "";
              b.textContent = "Eliminar";
            }
          }, 4000);
          return;
        }
        b.disabled = true;
        try {
          if (res) await res.deleteRecord(b.dataset.del);
        } catch(e) {
          b.textContent = "Error";
          b.disabled = false;
        }
      });
    });
  }

  function adminMsg(t) {
    const el = document.getElementById("adminMsg");
    if (el) el.textContent = t || "";
  }

  function flat(r) {
    const o = {
      id: r.id,
      creado: r.creado,
      organizacion: r.org,
      municipio: r.municipio,
      nombre: r.nombre,
      cargo: r.cargo === "Otro cargo" ? (r.cargoOtro || "Otro") : r.cargo,
      correo: r.correo,
      telefono: r.telefono,
      tipo_actor: r.actor === "__otro" ? "Otro: " + (r.actorOtro || "") : r.actor,
      subregiones: (r.subregiones || []).join(" | "),
      codecti: r.codecti,
      conocia_ordenanza: r.conocia,
      misiones: (r.misiones || []).join(" | ")
    };

    D.lineas.forEach(l => {
      const v = (r.lineas || {})[l.k] || {};
      o[l.lbl + "_decision"] = v.d || "";
      o[l.lbl + "_prioridad"] = v.p || "";
      o[l.lbl + "_accion_sugerida"] = v.s || "";
    });

    o.lineas_nuevas = (r.nuevas || []).map(n => n === "__otro" ? "Otra: " + (r.nuevaOtra || "") : n).join(" | ");
    o.como_reformular = r.p1c;

    [0, 1, 2].forEach(i => {
      const m = (r.metas || [])[i] || {};
      o[`meta${i + 1}`] = m.meta || m.indicador ? [
        m.linea || "",
        m.tipoMeta || "",
        m.indicador || "",
        m.meta || "",
        "Base: " + (m.base || ""),
        "2027: " + (m.m2027 || ""),
        "2030: " + (m.m2030 || ""),
        "2033: " + (m.m2033 || ""),
        "Subregión: " + (m.subregion || "")
      ].filter(Boolean).join(" · ") : "";
    });

    o.subregion_esfuerzo = (r.p2sub || []).join(" | ");
    o.poblaciones = (r.p2pob || []).map(n => n === "__otro" ? "Otra: " + (r.p2pobOtra || "") : n).join(" | ");
    o.tiene_proyectos = r.tieneProyectos || "no_especifica";

    [0, 1].forEach(i => {
      const p = (r.proyectos || [])[i] || {};
      o[`proyecto${"AB"[i]}_nombre`] = p.nombre || "";
      o[`proyecto${"AB"[i]}_tipo`] = p.tipoIniciativa || "";
      o[`proyecto${"AB"[i]}_lineas`] = p.lineas || "";
      o[`proyecto${"AB"[i]}_subregion`] = p.subregion || "";
      o[`proyecto${"AB"[i]}_presupuesto`] = p.rangoPresupuesto || p.valor || "";
      o[`proyecto${"AB"[i]}_contrapartida`] = p.contrapartida || "";
      o[`proyecto${"AB"[i]}_aliado`] = p.aliadoPrincipal || p.aliados || "";
      o[`proyecto${"AB"[i]}_madurez`] = p.madurez ? D.madurez[p.madurez - 1][0] : "";
      o[`proyecto${"AB"[i]}_barrera`] = p.barreraPrincipal || "";
      o[`proyecto${"AB"[i]}_fuentes`] = (p.fuentes || []).join(" | ");
    });

    o.barreras = (r.barreras || []).map(n => n === "__otro" ? "Otra: " + (r.barreraOtra || "") : n).join(" | ");

    [0, 1, 2].forEach(i => {
      const a = (r.anclas || [])[i] || {};
      o[`ancla${i + 1}`] = a.linea || a.actor ? [a.linea, a.actor, (a.roles || []).join("+")].join(" · ") : "";
    });

    D.ajustesGobernanza.forEach(([k]) => {
      o["ajuste_" + k] = (r.ajustes || {})[k] || "";
    });
    o.condicion_compromiso = r.p4c;

    [0, 1, 2].forEach(i => {
      const d = (r.datos || [])[i] || {};
      o[`dato${i + 1}`] = d.dato ? [d.dato, d.lineas, d.frecuencia, d.desag].join(" · ") : "";
    });

    o.como_conocer_avance = (r.p5b || []).map(n => n === "__otro" ? "Otro: " + (r.p5bOtro || "") : n).join(" | ");
    o.frecuencia = r.p5c;
    o.acuerdo_datos = r.p5d;
    o.comentarios = r.comentarios;

    return o;
  }

  function exportCsv() {
    const records = (window.CC_RESULTS && window.CC_RESULTS.getRecords()) || [];
    const rows = records.map(flat);
    const cols = Object.keys(flat({}));
    const cell = v => {
      v = v == null ? "" : String(v);
      return /[",;\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
    };
    const csv = "\uFEFF" + [cols.join(","), ...rows.map(o => cols.map(c => cell(o[c])).join(","))].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = "consulta-ctei-caldas-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function initListeners() {
    const toggle = document.getElementById("adminToggle");
    const box = document.getElementById("adminBox");
    const keyInp = document.getElementById("adminKey");
    const inBtn = document.getElementById("adminIn");
    const outBtn = document.getElementById("adminOut");
    const csvBtn = document.getElementById("csvBtn");

    if (toggle && box) {
      toggle.addEventListener("click", () => {
        box.classList.toggle("open");
        if (box.classList.contains("open") && keyInp) keyInp.focus();
      });
    }

    async function login() {
      const k = (keyInp?.value || "").trim();
      if (!k) return;
      const CFG = window.CC_CONFIG || {};
      const API = (CFG.apiUrl || "").trim();
      if (!API) {
        adminMsg("Primero conecte la base de datos en config.js.");
        return;
      }
      adminMsg("Verificando credenciales…");
      try {
        const r = await fetch(API, {
          method: "POST",
          body: JSON.stringify({ action: "check", key: k })
        });
        const j = await r.json();
        if (!j.ok) throw new Error();
        if (window.CC_RESULTS) window.CC_RESULTS.setAdminKey(k);
        if (keyInp) keyInp.value = "";
        adminMsg("");
        refresh();
        if (window.CC_RESULTS) await window.CC_RESULTS.load();
        location.hash = "#resultados";
      } catch(e) {
        adminMsg("Clave incorrecta.");
      }
    }

    if (inBtn) inBtn.addEventListener("click", login);
    if (keyInp) keyInp.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        login();
      }
    });

    if (outBtn) {
      outBtn.addEventListener("click", () => {
        if (window.CC_RESULTS) window.CC_RESULTS.setAdminKey("");
        refresh();
        adminMsg("");
        if (window.CC_RESULTS) window.CC_RESULTS.load();
      });
    }

    if (csvBtn) {
      csvBtn.addEventListener("click", exportCsv);
    }
  }

  return {
    init: function() {
      initListeners();
      refresh();
    },
    refresh,
    render,
    exportCsv
  };
})();
