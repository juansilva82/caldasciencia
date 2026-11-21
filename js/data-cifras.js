/* =====================================================================
   CALDAS EN CIFRAS DE CTeI · Línea base (P-01) y capacidades y brechas (P-02)
   Fuente: productos del Convenio CDTER – Gobernación de Caldas.
   P-01 v1.0 consolidada (nov. 2026) · P-02 v0.1 borrador técnico (sep. 2026).
   Para actualizar: cambie los valores aquí; la vista se dibuja sola.
   ===================================================================== */
window.CC_CIFRAS = {
  fuentes: {
    p01: { cod: "P-01", nombre: "Línea base de la Política Pública de CTeI y mapeo del CODECTI", version: "v1.0 consolidada", fecha: "noviembre de 2026" },
    p02: { cod: "P-02", nombre: "Diagnóstico de capacidades y brechas territoriales de CTeI", version: "v0.1 borrador técnico", fecha: "septiembre de 2026" }
  },

  /* ---------- La paradoja caldense: puesto nacional (1 = mejor) ---------- */
  paradoja: {
    capacidades: [
      { k: "Pilar institucional del IDIC", p: 1 },
      { k: "Investigadores por habitante", p: 2 },
      { k: "Calidad de la educación superior", p: 2 },
      { k: "Solicitudes de patentes por habitante", p: 2 }
    ],
    resultados: [
      { k: "Posición general en el IDIC (2021)", p: 7 },
      { k: "Posición en el IDC (2022)", p: 7 },
      { k: "Eficiencia de la innovación (resultados ÷ insumos)", p: 18, nota: "razón de 0,629" }
    ],
    lectura: "Caldas está entre los primeros del país formando investigadores, acreditando universidades y patentando, pero cae al puesto 18 cuando se mide cuánto de ese conocimiento se convierte en empresas, exportaciones y productividad."
  },

  /* ---------- Estado de las 14 líneas de la Ordenanza 952 (P-01, hallazgo 1) ---------- */
  lineas: [
    { c: "L-1",  n: "Sistemas productivos ecoeficientes",            e: "parcial", d: "Censo preliminar de minería artesanal y buenas prácticas en café y plátano; no se diseñó la plataforma interoperable ni la cartografía 4.0 de suelos." },
    { c: "L-2",  n: "Bioeconomía para el desarrollo sostenible",     e: "parcial", d: "El Observatorio de Bioeconomía no se ejecutó; la genómica y los bionegocios apenas arrancan con Caldas Bio." },
    { c: "L-3",  n: "Información para la economía creativa",         e: "sin",     d: "No existe observatorio cultural ni cuenta satélite; solo estímulos artísticos sin componente de I+D+i." },
    { c: "L-4",  n: "Especialización inteligente municipal",         e: "parcial", d: "Hay marcas locales (Origen Caldas), pero no se crearon los nodos subregionales de La Dorada, Anserma y Salamina." },
    { c: "L-5",  n: "Servicios ecosistémicos",                       e: "sin",     d: "Solo esquemas convencionales de pago por servicios ambientales; sin monitoreo hidroclimático en tiempo real." },
    { c: "L-6",  n: "Gestión del riesgo y cambio climático",         e: "parcial", d: "Estaciones en la cuenca del Chinchiná; el sismo de 2026 mostró fallas de monitoreo y comunicaciones y obligó a formular SISEC 2.0." },
    { c: "L-7",  n: "Tenencia y gestión de la tierra",               e: "sin",     d: "Solo avanza el catastro multipropósito nacional en Centro Sur; sin analítica de suelos para pequeños productores." },
    { c: "L-8",  n: "Manufactura inteligente (Industria 4.0)",       e: "parcial", d: "Fábricas de Productividad y SENA atienden pymes; no se creó el Observatorio de Productividad ni el centro de manufactura avanzada." },
    { c: "L-9",  n: "Apropiación y transferencia tecnológica",       e: "avanzo",  d: "Caldas es 2.º en el país en solicitudes de patentes por habitante gracias a las oficinas de transferencia de SUMA." },
    { c: "L-10", n: "Economía circular y gestión energética",        e: "parcial", d: "Pacto firmado en 2023 e inversiones de la CHEC; faltan los fondos de reconversión y el plan de energías renovables para pymes." },
    { c: "L-11", n: "TIC para reducir brechas digitales",            e: "parcial", d: "Centros Digitales a medias: 40 % de las sedes rurales sin servicio continuo y redes sin redundancia tras el sismo." },
    { c: "L-12", n: "Modelo de salud basado en CTeI",                e: "avanzo",  d: "Liderazgo nacional de Telesalud (U. de Caldas); falta la historia clínica interoperable en las 27 ESE." },
    { c: "L-13", n: "Condiciones del entorno",                       e: "avanzo",  d: "La Asamblea aprobó en segundo debate la ordenanza que crea la Corporación FUTURA." },
    { c: "L-14", n: "Pacto por la educación STEAM",                  e: "sin",     d: "Ondas operó con intermitencias; no se firmó el Pacto Educativo STEM ni se ajustaron los PEI." }
  ],

  /* ---------- Plan de Acción vigente (Anexo 1 CINDE): 22 productos de corto plazo ---------- */
  plan: { productos: 22, vencidos: 100, cumplidos: 0, parcialPct: 40.9, sinPct: 59.1, eficacia: 20.4 },

  /* ---------- Calificación de los empresarios TIC (mesa focal, escala 0-10) ---------- */
  notas: [
    { k: "Talento humano", v: 8.2 },
    { k: "Conectividad urbana", v: 7.0 },
    { k: "Ecosistema en general", v: 5.5 },
    { k: "Tracción real del clúster Mantix", v: 3.8 },
    { k: "Redundancia de comunicaciones", v: 2.5 },
    { k: "Acceso a capital de riesgo", v: 1.5 }
  ],
  citaEmpresarial: "Si uno toma el Plan de Acción de Caldas, le borra la palabra Caldas y le pone Quindío, Boyacá o Arauca, el texto se lee igual.",

  /* ---------- Metas oficiales (CONPES Departamental CTeI 2026-2033) ---------- */
  metas: [
    { k: "Posición de Caldas en el IDIC", base: "7.º (2021)", m27: "7.º o mejor", m30: "6.º o mejor", m33: "5.º o mejor" },
    { k: "Posición de Caldas en el IDC", base: "7.º (2022)", m27: "7.º o mejor", m30: "6.º o mejor", m33: "5.º o mejor" },
    { k: "Posición de Manizales AM en el ICC", base: "5.º (2025)", m27: "5.º o mejor", m30: "4.º o mejor", m33: "3.º o mejor" },
    { k: "Inversión en I+D (% del país)", base: "0,6 % (2019)", m27: "Por actualizar", m30: "1,0 %", m33: "1,5 %" },
    { k: "Inversión en ACTI (% del país)", base: "1,3 % (2019)", m27: "Por actualizar", m30: "1,8 %", m33: "2,5 %" },
    { k: "Subregiones con nodo o programa activo", base: "1 (Centro Sur)", m27: "3", m30: "5", m33: "6 (todas)" },
    { k: "Empresas ancladas en FUTURA", base: "0 (2026)", m27: "26", m30: "91", m33: "127 o más" },
    { k: "Mipymes con transferencia tecnológica", base: "Por levantar", m27: "30", m30: "200", m33: "400" },
    { k: "Startups incubadas o aceleradas", base: "Por levantar", m27: "20", m30: "100", m33: "200" },
    { k: "Personas formadas en competencias digitales y CTeI", base: "Por levantar", m27: "500", m30: "3.000", m33: "6.000" }
  ],

  /* ---------- CODECTI: 19 miembros (Art. 10, Ordenanza 952) ---------- */
  codecti: {
    total: 19, asistencia: "55 % a 65 %",
    helices: [
      { h: "estado",   k: "Gobierno", n: 3, d: "Convoca, pero la Unidad de CTeI depende de contratos temporales sin continuidad." },
      { h: "academia", k: "Academia y formación", n: 5, d: "El estamento más fuerte, articulado en SUMA; formula la mayoría de proyectos de regalías." },
      { h: "academia", k: "Centros de I+D+i", n: 3, d: "Alta capacidad científica (Cenicafé, BIOS, CRECE), poco vinculada al seguimiento de la política." },
      { h: "empresa",  k: "Sector productivo", n: 4, d: "Participación intermitente; ven el consejo como un trámite lejano de regalías." },
      { h: "sociedad", k: "Sociedad civil", n: 4, d: "Baja incidencia en la priorización y poca conexión con las subregiones." }
    ],
    problemas: [
      "Sesionó casi solo para priorizar regalías; omitió las evaluaciones semestrales del Plan que exige el artículo 11.",
      "Los titulares asisten entre el 55 % y el 65 % de las veces y delegan en niveles medios.",
      "Sus recomendaciones no son vinculantes ante el CONFIS ni Hacienda.",
      "La Corporación FUTURA asumiría la secretaría técnica operativa permanente."
    ]
  },

  /* =================== P-02: CAPACIDADES Y BRECHAS =================== */
  oferta: {
    grupos: 142, corte: "agosto de 2026", fuente: "ScienTI – MinCiencias (GrupLAC, InstituLAC, CvLAC)",
    categorias: [ { k: "A1", v: 28 }, { k: "A", v: 34 }, { k: "B", v: 42 }, { k: "C", v: 38 } ],
    instituciones: [
      { k: "Universidad de Caldas", v: 54, a: 25, areas: "Agrícolas, médicas, naturales" },
      { k: "Universidad Nacional, sede Manizales", v: 48, a: 23, areas: "Ingeniería, tecnología, físicas" },
      { k: "Universidad de Manizales", v: 18, a: 7, areas: "Sociales, TIC, salud pública" },
      { k: "Universidad Autónoma de Manizales", v: 12, a: 4, areas: "Biomedicina, odontología, ingeniería" },
      { k: "Universidad Católica de Manizales", v: 7, a: 2, areas: "Bacteriología, educación, ambiente" },
      { k: "SENA Regional Caldas", v: 2, a: 0, areas: "Innovación aplicada y agro" },
      { k: "Centros autónomos (Cenicafé, BIOS, CRECE)", v: 1, a: 1, areas: "Biotecnología y supercómputo" }
    ],
    centroSur: 136
  },

  demanda: {
    empresas: 452, ventas: "$319.325 millones", empleos: 2423, fuente: "Censo del Clúster TIC Mantix, Cámara de Comercio de Manizales por Caldas (corte 1-ene-2025)",
    datos: [
      { b: "91,6 %", t: "son microempresas (414), muchas unipersonales, con poca capacidad propia de I+D" },
      { b: "42", t: "empresas (9,3 %) concentran el 80,2 % de las ventas del clúster" },
      { b: "141", t: "empresas (31,2 %) reportaron ventas en cero el último año" },
      { b: "~15", t: "empresas participan siempre en las iniciativas del clúster, según la mesa empresarial (P-01)" }
    ]
  },

  desajustes: [
    { t: "El valle de la muerte tecnológico", d: "Las universidades producen en niveles de madurez de laboratorio (TRL 1 a 4); las pymes necesitan prototipos validados y listos para el mercado (TRL 6 a 8). Nadie cubre ese tramo." },
    { t: "Sin capital de riesgo local", d: "Bogotá concentra cerca del 89 % del capital de riesgo del país y en Caldas no opera ningún fondo semilla estructurado. Solo hay subsidios y convocatorias." },
    { t: "La presión de la inteligencia artificial", d: "La IA generativa y los agentes de software empujan a reconvertir empleos de desarrollo básico y BPO. Sin adopción masiva en las pymes, Caldas pierde terreno frente a Medellín y Bogotá." }
  ],

  ejes: [
    { k: "Resiliencia territorial (post-sismo)", v: 9.4, nivel: "Crítica", c: "var(--eje-resiliencia)", d: "Daño severo en patrimonio de bahareque y equipamientos públicos; alerta temprana y monitoreo estructural discontinuos." },
    { k: "Cohesión social y territorial", v: 8.5, nivel: "Alta", c: "var(--eje-cohesion)", d: "Brecha digital rural agravada por cortes de fibra tras el sismo; salud mental comunitaria desatendida; educación media STEM débil en la periferia." },
    { k: "Capacidad productiva", v: 8.0, nivel: "Media-alta", c: "var(--eje-productivo)", d: "Baja absorción de tecnologías 4.0; las empresas TIC no se conectan con los sectores tradicionales; no hay capital de riesgo." },
    { k: "Sostenibilidad ambiental", v: 7.0, nivel: "Media-alta", c: "var(--eje-ambiental)", d: "Deslizamientos en cuencas abastecedoras; biomasa del café subutilizada; poca bioeconomía circular estructurada." }
  ],

  /* Matriz de priorización: impacto territorial (i) y urgencia post-sismo (u), escala 0-10 */
  brechas: [
    { l: "L-13", n: "Condiciones del entorno",       b: "Falta un operador técnico autónomo del sistema de CTeI reconocido por MinCiencias.", ini: "FUTURA PCTI", i: 9.8, u: 9.5, p: 1 },
    { l: "L-6",  n: "Gestión del riesgo",             b: "No existe una plataforma interoperable de alerta temprana y monitoreo sísmico en tiempo real.", ini: "SISEC 2.0", i: 9.5, u: 9.8, p: 1 },
    { l: "L-8",  n: "Manufactura y construcción",     b: "Edificaciones patrimoniales vulnerables y baja tecnificación sismorresistente.", ini: "Patrimonio Resiliente", i: 9.0, u: 9.2, p: 1 },
    { l: "L-11", n: "Brechas digitales",              b: "Zonas rurales aisladas y redes afectadas tras el sismo.", ini: "Conectividad Crítica", i: 8.4, u: 8.5, p: 1 },
    { l: "L-9",  n: "Transferencia tecnológica",      b: "Poca articulación entre grupos universitarios y pymes; no hay oficina de transferencia compartida.", ini: "OTT FUTURA", i: 8.8, u: 7.8, p: 2 },
    { l: "L-2",  n: "Bioeconomía",                    b: "Patentes bio sin transferir y sin plantas piloto certificadas.", ini: "Bio-Caldas", i: 8.5, u: 6.5, p: 2 },
    { l: "L-4",  n: "Especialización subregional",    b: "El 95,8 % de los grupos está en Centro Sur; los centros de La Dorada y Anserma no operan.", ini: "Nodos Subregionales", i: 8.2, u: 7.5, p: 2 },
    { l: "L-12", n: "Salud basada en CTeI",           b: "Sin telemedicina integrada ni seguimiento psicosocial después de la emergencia.", ini: "Telemedicina DTSC", i: 8.0, u: 7.0, p: 2 },
    { l: "L-1",  n: "Sistemas ecoeficientes",         b: "Poca economía circular y biomasa desperdiciada en las cadenas agropecuarias.", ini: "Agrocircular", i: 7.8, u: 6.2, p: 2 },
    { l: "L-14", n: "Educación STEM",                 b: "La media técnica de los colegios oficiales afectados está desconectada del entorno productivo.", ini: "Colegios STEM", i: 7.5, u: 6.0, p: 2 },
    { l: "L-10", n: "Economía circular y energía",    b: "Dependencia energética y poco uso de fuentes no convencionales en pymes.", ini: "Transición Pyme", i: 7.0, u: 5.8, p: 3 },
    { l: "L-5",  n: "Servicios ecosistémicos",        b: "Cuencas degradadas y sin valoración económica de servicios ambientales.", ini: "Monitoreo Cuencas", i: 6.8, u: 5.5, p: 3 },
    { l: "L-7",  n: "Ordenamiento de tierras",        b: "Analítica geoespacial y catastro multipropósito subutilizados en el agro.", ini: "Agrología Digital", i: 5.8, u: 4.8, p: 3 },
    { l: "L-3",  n: "Economía creativa",              b: "No hay métricas económicas consolidadas de las industrias creativas.", ini: "Cuenta Creativa", i: 5.2, u: 4.0, p: 3 }
  ]
};
