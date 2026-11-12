/**
 * Modelo de Datos y Contenidos · Plan de Acción CTeI de Caldas
 * Ordenanza 952 de 2023 · Política Pública Departamental 2023–2033
 */
"use strict";

window.CC_DATA = {
  plan: {
    nombre: "Plan de Acción de Ciencia, Tecnología e Innovación de Caldas",
    periodo: "2023–2033 · Actualización Estratégica",
    marco: "Ordenanza 952 de abril de 2023 · Asamblea Departamental de Caldas",
    gobernanza: "Consejo Departamental de Ciencia, Tecnología e Innovación (CODECTI) y Secretaría de Desarrollo, Empleo e Innovación",
    
    // ¿Qué es el Plan de Acción?
    queEs: "Es la hoja de ruta departamental que traduce la Política Pública de CTeI (Ordenanza 952 de 2023) en metas verificables, proyectos viables, fuentes de financiación aseguradas y responsabilidades institucionales compartidas entre academia, empresa, Estado y sociedad civil.",
    
    // ¿Para qué se hace la actualización?
    paraQue: "Para corregir las desconexiones identificadas en los primeros tres años de vigencia: pasar de metas genéricas sin doliente a una agenda territorial con proyectos formulados, fuentes de financiación habilitadas y seguimiento semestral en el CODECTI, orientada a transformar la realidad de los 27 municipios de Caldas.",

    // Propósito central
    propositoCentral: "Impulsar la revisión, actualización y reformulación del Plan de Acción de la Política Pública de Ciencia, Tecnología e Innovación del departamento de Caldas, en articulación con el CODECTI, mediante el ajuste de líneas de acción, metas e indicadores orientados a fortalecer la capacidad productiva, la resiliencia territorial, la cohesión social y la sostenibilidad ambiental del departamento, a partir de la generación, transferencia y apropiación de conocimiento científico y tecnológico.",

    // 4 Resultados Territoriales
    resultadosTerritoriales: [
      {
        id: "productivo",
        titulo: "Capacidad Productiva",
        color: "var(--teal)",
        tag: "Economía & Innovación",
        descripcion: "Conectar la investigación científica con la transformación del campo y la industria. Sofisticar cadenas de valor de café especial, cacao, biotecnología, metalmecánica, TIC y turismo de naturaleza para generar empleo de calidad.",
        preguntaClave: "¿Cómo generamos riqueza y empleo de calidad desde la ciencia y la tecnología?",
        impactoEsperado: "Mayor inversión privada en I+D+i, escalamiento de patentes, creación de empresas de base tecnológica y diversificación exportadora."
      },
      {
        id: "resiliencia",
        titulo: "Resiliencia Territorial",
        color: "var(--ochre)",
        tag: "Gestión del Riesgo & Infraestructura",
        descripcion: "Anticipar, resistir y recuperarse de amenazas naturales (sismo, vulcanismo, deslizamientos). Garantizar redundancia en telecomunicaciones, monitoreo hidroclimático y planes de reconstrucción con base científica en las subregiones.",
        preguntaClave: "¿Cómo preparamos la infraestructura física, digital e institucional ante emergencias?",
        impactoEsperado: "Redes redundantes de emergencia, conectividad resiliente en nodos críticos y reconstrucción territorial sostenible."
      },
      {
        id: "cohesion",
        titulo: "Cohesión Social",
        color: "var(--sky)",
        tag: "Equidad & Enfoque Diferencial",
        descripcion: "Cerrar la brecha entre Manizales y los municipios rurales. Garantizar que mujeres, jóvenes, comunidades campesinas e indígenas accedan a la tecnología, con vocaciones científicas desde la escuela y apropiación social del conocimiento.",
        preguntaClave: "¿Cómo logramos que los beneficios de la ciencia lleguen a los 27 municipios?",
        impactoEsperado: "Descentralización de capacidades científicas, programas Talento 4.0 en subregiones y participación de comunidades étnicas y rurales."
      },
      {
        id: "ambiental",
        titulo: "Sostenibilidad Ambiental",
        color: "var(--lime)",
        tag: "Biointeligencia & Economía Circular",
        descripcion: "Consolidar a Caldas como territorio biointeligente. Proteger las cuencas abastecedoras, transitar hacia energías limpias, valorizar la biomasa agroindustrial y fomentar modelos de economía circular certificados.",
        preguntaClave: "¿Cómo producimos conocimiento protegiendo el capital natural y la riqueza ecosistémica?",
        impactoEsperado: "Proyectos activos de economía circular, protección de fuentes hídricas y transición energética en el aparato productivo."
      }
    ],

    // Diagnóstico en cifras: Las 4 Desconexiones que debemos resolver
    diagnostico: [
      {
        id: "ejecucion",
        numero: "01",
        titulo: "Plan vs. Ejecución",
        datoPrincipal: "3 de 14",
        datoSubtitulo: "líneas estratégicas avanzaron",
        notaCritica: "El plan original cayó en metas genéricas sin dolientes institucionales. Los 22 compromisos previstos vencieron sin haberse ejecutado.",
        solucion: "Asignar un 'Actor Ancla' líder con capacidad instalada para cada línea reformulada."
      },
      {
        id: "territorio",
        numero: "02",
        titulo: "Manizales vs. Periferia",
        datoPrincipal: "92,3 %",
        datoSubtitulo: "de grupos de investigación en Centro-Sur",
        notaCritica: "La ciencia de Caldas está altamente concentrada en la capital. En las subregiones, 6 de 8 municipios tienen menos de 15% de conectividad efectiva.",
        solucion: "Crear una Red de Nodos Subregionales de CTeI conectados al núcleo de innovación."
      },
      {
        id: "financiacion",
        numero: "03",
        titulo: "Recursos vs. Proyectos",
        datoPrincipal: "$23.400 M",
        datoSubtitulo: "de regalías CTeI congelados",
        notaCritica: "Solo 11 de cada 100 ideas logran desembolso. El cuello de botella no es la falta de dinero: es la falta de proyectos estructurados en metodología MGA.",
        solucion: "Poner en marcha una PMO Departamental de estructuración ágil de proyectos viables."
      },
      {
        id: "seguimiento",
        numero: "04",
        titulo: "Seguimiento Institucional",
        datoPrincipal: "0",
        datoSubtitulo: "sesiones semestrales de control registradas",
        notaCritica: "El Art. 11 de la Ordenanza 952 exige mínimo dos sesiones de control al año en el CODECTI, pero los compromisos vencieron sin alertas preventivas.",
        solucion: "Diseñar un tablero público de indicadores con rendición de cuentas semestral y reporte a la Asamblea."
      }
    ],

    // 5 Fases de Construcción del Plan de Acción
    fasesPlan: [
      {
        num: 1,
        clave: "diagnosticar",
        titulo: "Diagnosticar con Evidencia",
        subtitulo: "¿Qué hay hoy en Caldas y dónde están las brechas?",
        descripcion: "Evaluación rigurosa de la línea base del Plan original, mapeo del CODECTI, identificación de capacidades y brechas en las 6 subregiones (enfoque diferencial y sismo), e inventario de fuentes de financiación (SGR, Obras por Impuestos, CNBT y cooperación).",
        entregableClave: "Línea base consolidada, mapa de brechas territoriales y catálogo de fuentes de financiación."
      },
      {
        num: 2,
        clave: "reformular",
        titulo: "Reformular con Metas Reales",
        subtitulo: "¿Hacia dónde vamos y qué metas nos trazamos?",
        descripcion: "Ajuste de las 14 líneas estratégicas con metas escalonadas a 2027, 2030 y 2033 vinculadas al catálogo oficial del DNP, y priorización de un portafolio de proyectos e iniciativas de alto impacto con fuentes de financiación identificadas.",
        entregableClave: "14 líneas reformuladas con metas escalonadas y banco de proyectos prioritarios viables."
      },
      {
        num: 3,
        clave: "validar",
        titulo: "Validar Colectivamente",
        subtitulo: "¿Cómo concertamos las decisiones con el territorio?",
        descripcion: "Socialización y validación formal de las líneas, metas y proyectos con los integrantes del CODECTI, universidades, gremios empresariales, alcaldías y sociedad civil, asegurando la memoria de todos los aportes ciudadanos.",
        entregableClave: "Sesión plenaria del CODECTI con aval institucional y memoria de aportes del ecosistema."
      },
      {
        num: 4,
        clave: "gobernar",
        titulo: "Asegurar la Gobernanza",
        subtitulo: "¿Quién responde por cada meta y cómo medimos el avance?",
        descripcion: "Definición del modelo de gobernanza con entidades ancla responsables, matriz de roles institucionales (RACI) y puesta en funcionamiento de un tablero público de seguimiento para rendir cuentas ante la Asamblea Departamental.",
        entregableClave: "Modelo de gobernanza institucional y tablero de seguimiento y evaluación en línea."
      },
      {
        num: 5,
        clave: "transferir",
        titulo: "Proyectar el Futuro",
        subtitulo: "¿Cómo dejamos capacidad instalada para los próximos 10 años?",
        descripcion: "Articulación con fuentes de cooperación nacional e internacional, estrategias de apropiación social del conocimiento (ASC) y consolidación de la hoja de ruta final de implementación territorial 2027–2033.",
        entregableClave: "Hoja de ruta final de implementación departamental y paquete de transferencia técnica."
      }
    ]
  },

  // 3 Misiones de la Política Pública (Ordenanza 952)
  misiones: {
    M1: { t: "Biodiversidad, bioeconomía y territorio", c: "var(--teal)" },
    M2: { t: "Campo, producción y manufactura inteligentes", c: "var(--lime)" },
    M3: { t: "Sociedad digital, salud y educación", c: "var(--sky)" }
  },

  // 14 Líneas Estratégicas de la Ordenanza 952
  lineas: [
    { k: "L1", m: "M1", t: "Sistemas productivos ecoeficientes", p: 3, lbl: "L-1", sugerencia: "Enfocar en bioeconomía circular y agroindustria de café y cacao" },
    { k: "L2", m: "M1", t: "Bioeconomía para el desarrollo sostenible", p: 4, lbl: "L-2", sugerencia: "Articular centros de investigación (BIOS, universidades) con pymes" },
    { k: "L3", m: "M1", t: "Gestión de información para la economía creativa", p: 3, lbl: "L-3", sugerencia: "Fusionar con L-4 en desarrollo territorial inteligente con observatorio único" },
    { k: "L4", m: "M1", t: "Especialización inteligente municipal", p: 3, lbl: "L-4", sugerencia: "Descentralizar programas a municipios fuera del área metropolitana" },
    { k: "L5", m: "M1", t: "Servicios ecosistémicos", p: 2, lbl: "L-5", sugerencia: "Focalizar en gobernanza hídrica y pago por servicios ambientales" },
    { k: "L6", m: "M1", t: "Gestión del riesgo y cambio climático", p: 3, lbl: "L-6", sugerencia: "Priorizar resiliencia territorial, reconstrucción post-sismo y monitoreo" },
    { k: "L7", m: "M2", t: "Tenencia y gestión de la tierra", p: 4, lbl: "L-7", sugerencia: "Asignar fuente financiera clara e integrar tecnologías de catastro multipropósito" },
    { k: "L8", m: "M2", t: "Manufactura inteligente", p: 4, lbl: "L-8", sugerencia: "Vouchers de innovación para pymes metalmecánicas y de transformación" },
    { k: "L9", m: "M2", t: "Apropiación de conocimiento para sofisticar modelos productivos", p: 2, lbl: "L-9", sugerencia: "Vincular a gremios (Comité de Cafeteros, ANDI, ACOPI, Cámara de Comercio)" },
    { k: "L10", m: "M2", t: "Pacto por la economía circular y la gestión energética", p: 2, lbl: "L-10", sugerencia: "Vincular con transición energética en distritos agroindustriales" },
    { k: "L11", m: "M3", t: "Acceso y uso de las TIC para reducir brechas digitales", p: 3, lbl: "L-11", sugerencia: "Priorizar conectividad de sedes educativas rurales y red dorsal de emergencia" },
    { k: "L12", m: "M3", t: "Modelo de salud basado en CTeI", p: 3, lbl: "L-12", sugerencia: "Fortalecer telemedicina e inteligencia artificial en hospitales subregionales" },
    { k: "L13", m: "M3", t: "Condiciones del entorno para la transformación social y productiva", p: 4, lbl: "L-13", sugerencia: "Fondo semilla para spin-offs y empresas de base tecnológica" },
    { k: "L14", m: "M3", t: "Pacto por una educación para la transformación", p: 3, lbl: "L-14", sugerencia: "Bootcamps de Talento 4.0 (IA, nube, programación) en colegios y jóvenes" }
  ],

  // 27 Municipios de Caldas agrupados por Subregión
  municipios: [
    { sub: "Centro-Sur", muns: ["Manizales", "Villamaría", "Chinchiná", "Palestina", "Neira"] },
    { sub: "Norte", muns: ["Salamina", "Pácora", "Aguadas", "Aranzazu"] },
    { sub: "Alto Occidente", muns: ["Riosucio", "Supía", "Marmato", "Filadelfia", "La Merced"] },
    { sub: "Bajo Occidente", muns: ["Anserma", "Risaralda", "Belalcázar", "San José", "Viterbo"] },
    { sub: "Alto Oriente", muns: ["Pensilvania", "Manzanares", "Marquetalia", "Marulanda"] },
    { sub: "Magdalena Caldense", muns: ["La Dorada", "Victoria", "Norcasia", "Samaná"] },
    { sub: "Otro", muns: ["Fuera de Caldas / Ámbito Nacional"] }
  ],

  // Cargos en el ecosistema
  cargos: [
    "Rector(a) / Vicerrector(a)",
    "Director(a) de Investigación / I+D+i",
    "Decano(a) / Director(a) de Programa Académico",
    "Investigador(a) / Docente",
    "Gerente / Director(a) Ejecutivo(a) de Empresa",
    "Líder de Innovación / Proyectos",
    "Presidente(a) / Director(a) de Gremio o Cámara",
    "Alcalde(sa) / Secretario(a) de Despacho",
    "Funcionario(a) Público(a) Departamental / Nacional",
    "Líder Comunitario(a) / Social / Campesino(a)",
    "Otro cargo"
  ],

  // Tipos de resultado / ámbito de metas (Paso 2)
  ambitosMetas: [
    "Conectividad digital e internet en sedes educativas rurales",
    "Transferencia tecnológica y vouchers de innovación para pymes",
    "Formación de talento humano en habilidades 4.0 (IA, software, nube)",
    "Investigación aplicada y proyectos de bioeconomía",
    "Gestión del riesgo, alertas tempranas y monitoreo ambiental",
    "Apropiación social del conocimiento y vocaciones científicas tempranas",
    "Creación y aceleración de spin-offs y patentes",
    "Salud digital, telemedicina e interoperabilidad",
    "Economía circular y valorización de biomasa agroindustrial"
  ],

  // Catálogo de Indicadores Oficiales DNP/KPT sugeridos (Paso 2)
  indicadoresKpt: [
    "% de sedes educativas rurales con conectividad a internet de alta velocidad",
    "Número de micro, pequeñas y medianas empresas beneficiadas con asistencia técnica e innovación",
    "Número de jóvenes formados y certificados en bootcamps de Talento 4.0",
    "Número de proyectos de investigación aplicada y desarrollo experimental financiados",
    "Número de patentes o modelos de utilidad solicitados o concedidos",
    "Número de spin-offs o empresas de base tecnológica creadas",
    "Número de hectáreas con implementación de agricultura climáticamente inteligente",
    "Número de municipios con nodos o laboratorios satélites de CTeI activos",
    "Número de comunidades beneficiadas con proyectos de apropiación social (ASC)",
    "Otro indicador propuesto"
  ],

  // Tipos de iniciativas de proyectos (Paso 3)
  tiposIniciativa: [
    "Investigación aplicada y desarrollo experimental (I+D)",
    "Innovación empresarial, prototipado y vouchers para pymes",
    "Infraestructura científica, laboratorios y nodos de CTeI",
    "Formación de talento humano de alto nivel y bootcamps 4.0",
    "Apropiación social de la ciencia y cultura de innovación",
    "Resiliencia territorial, conectividad y gestión del riesgo",
    "Bioeconomía, economía circular y energías limpias"
  ],

  // Rangos de presupuesto estimado (Paso 3)
  rangosPresupuesto: [
    "Menos de $500 millones",
    "$500 millones a $1.500 millones",
    "$1.500 millones a $3.000 millones",
    "$3.000 millones a $6.000 millones",
    "Más de $6.000 millones"
  ],

  // Rangos de contrapartida estimada (Paso 3)
  rangosContrapartida: [
    "Sin contrapartida disponible",
    "Hasta el 10% (en especie o efectivo)",
    "Entre el 10% y el 20%",
    "Más del 20%"
  ],

  // Aliados institucionales típicos (Paso 3)
  aliadosSugeridos: [
    "Universidades públicas (U. de Caldas, U. Nacional)",
    "Universidades privadas (UAM, U. de Manizales, UCM, UNIMINUTO)",
    "Centros de desarrollo tecnológico / innovación (BIOS, Cenicafé)",
    "Corporación FUTURA · Parque Tecnológico de Caldas (en construcción)",
    "Gremios de la producción (Comité de Cafeteros, ANDI, ACOPI)",
    "Cámaras de Comercio (Manizales, La Dorada)",
    "SENA Regional Caldas",
    "Gobernación de Caldas / Secretarías de Despacho",
    "Alcaldías municipales",
    "Comunidades y asociaciones campesinas o étnicas"
  ],

  // Actores Ancla propuestos para liderar líneas (Paso 4)
  actoresAnclaSugeridos: [
    "Universidad de Caldas",
    "Universidad Nacional de Colombia · Sede Manizales",
    "Universidad Autónoma de Manizales (UAM)",
    "Universidad de Manizales",
    "Universidad Católica de Manizales (UCM)",
    "UNIMINUTO · Rectoría Eje Cafetero",
    "SENA · Regional Caldas",
    "BIOS · Centro de Bioinformática y Biología Computacional",
    "Cenicafé · Centro Nacional de Investigaciones de Café",
    "Corporación FUTURA · Parque Tecnológico de Caldas (en construcción)",
    "Comité Departamental de Cafeteros de Caldas",
    "Cámara de Comercio de Manizales por Caldas",
    "Cámara de Comercio de La Dorada",
    "ANDI · Seccional Caldas",
    "ACOPI · Seccional Caldas",
    "Gobernación de Caldas (SDEI / Medio Ambiente / Agricultura)",
    "Alcaldías de los 27 municipios",
    "Otra institución"
  ],

  // Tipos de datos que la organización puede aportar (Paso 5)
  tiposDatosSeguimiento: [
    "Graduados de pregrado y posgrado en áreas STEM y CTeI",
    "Grupos de investigación, investigadores y publicaciones ScienTI",
    "Inversión privada en actividades de ciencia, tecnología e innovación (ACTI)",
    "Patentes solicitadas, modelos de utilidad y registros de software",
    "Proyectos financiados y estado de avance presupuestal y físico",
    "Datos de monitoreo agroclimático, cuencas hídricas y biodiversidad",
    "Empleo generado en sectores de tecnología y valor agregado",
    "Beneficiarios de programas de apropiación social y talleres comunitarios"
  ],

  lidera: [
    ["Desarrollo, Empleo e Innov.", 28],
    ["Medio Ambiente", 8],
    ["Agricultura", 6],
    ["Educación", 6],
    ["Cultura", 5],
    ["Salud", 4],
    ["CODECTI", 4],
    ["Planeación", 1],
    ["Vivienda (PDA)", 1]
  ],

  recomendaciones: [
    ["PMO departamental de estructuración.", "Crear una oficina técnica para pasar de ideas a proyectos viables en MGA y movilizar los $23.400 M congelados.", "Proyectos y Gobernanza", "Preguntas 3 y 4"],
    ["Reformular las 14 líneas con anclaje territorial.", "Metas concretas por subregión y con enfoque diferencial, con cortes en 2027, 2030 y 2033.", "Líneas y Metas", "Preguntas 1 y 2"],
    ["Red Dorsal de Emergencia y Resiliencia.", "Conectividad redundante en nodos críticos para evitar el aislamiento de municipios ante sismos o emergencias.", "Proyectos Prioritarios", "Pregunta 3"],
    ["Red de 5 Nodos Subregionales de CTeI.", "Conectar las capacidades de investigación del núcleo Manizales–Villamaría con el resto del departamento.", "Gobernanza Territorial", "Preguntas 3 y 4"],
    ["Fondo semilla de co-inversión para innovación.", "Apoyo a spin-offs, patentes y empresas de base tecnológica nacidas en las universidades y gremios de Caldas.", "Portafolio de Proyectos", "Pregunta 3"],
    ["CODECTI operativo y rendición periódica.", "Reuniones semestrales de seguimiento y tablero público de control ante la Asamblea Departamental.", "Seguimiento Institucional", "Preguntas 4 y 5"],
    ["Ventanilla de incentivos tributarios y vouchers.", "Mecanismos para que las micro, pequeñas y medianas empresas de Caldas apliquen beneficios tributarios de MinCiencias.", "Financiación Privada", "Pregunta 3"],
    ["Bootcamps de Talento 4.0 en subregiones.", "Formación acelerada en inteligencia artificial, desarrollo de software, nube e inglés técnico para jóvenes caldenses.", "Talento Humano", "Preguntas 1 y 3"],
    ["Asignar fuentes financieras a líneas huérfanas.", "Garantizar instrumentos de financiación para economía creativa (L-3), gestión de tierras (L-7) y pacto circular (L-10).", "Sostenibilidad Financiera", "Preguntas 2 y 3"]
  ],

  actores: [
    "Institución de educación superior",
    "Centro de investigación o desarrollo tecnológico",
    "Empresa",
    "Gremio o cámara de comercio",
    "Entidad pública departamental",
    "Alcaldía o entidad municipal",
    "Entidad pública nacional",
    "Organización social o comunitaria"
  ],

  subregiones: [
    "Centro-Sur",
    "Norte",
    "Alto Occidente",
    "Bajo Occidente",
    "Alto Oriente",
    "Magdalena Caldense"
  ],

  codecti: [
    "Integrante con voto",
    "Invitado permanente",
    "Participa ocasionalmente",
    "No participa actualmente"
  ],

  conocia: [
    "Sí, y participé en su construcción o ejecución",
    "Sí, la conozco",
    "No la conocía"
  ],

  decisiones: [
    ["mantener", "Mantener tal como está", "var(--d-mantener)"],
    ["reformular", "Reformular alcance o metas", "var(--d-reformular)"],
    ["fusionar", "Fusionar con otra línea afín", "var(--d-fusionar)"],
    ["eliminar", "Eliminar del plan de acción", "var(--d-eliminar)"],
    ["sin_posicion", "No conozco / Sin opinión", "var(--muted)"]
  ],

  lineasNuevas: [
    "Reconstrucción y resiliencia territorial tras el sismo",
    "Inteligencia artificial y transformación digital",
    "Conectividad resiliente en las subregiones",
    "Talento 4.0 y formación para el trabajo",
    "Transferencia de conocimiento y emprendimiento de base tecnológica"
  ],

  poblaciones: [
    "Mujeres",
    "Jóvenes",
    "Personas mayores",
    "Comunidades étnicas (indígenas, afrodescendientes)",
    "Personas con discapacidad",
    "Población rural y campesina",
    "Víctimas del conflicto y población afectada por desastres"
  ],

  madurez: [
    ["Idea", "Problema identificado y propuesta inicial"],
    ["Perfil", "Alcance, costos estimados y aliados preliminares"],
    ["Formulado", "Estructurado en metodología MGA con estudios técnicos"],
    ["Viabilizado", "Con concepto favorable, listo para resolución y desembolso"]
  ],

  fuentes: [
    "SGR · Asignación CTeI",
    "Obras por Impuestos (ZOMAC)",
    "Beneficios tributarios CTeI (CNBT)",
    "Fondo de reconstrucción «Caldas, Reconstruir es Avanzar»",
    "Cooperación internacional",
    "Recursos privados o contrapartida institucional"
  ],

  barreras: [
    "Falta de formuladores o expertos en metodología MGA",
    "Estudios técnicos o diseños de detalle pendientes",
    "Sin recursos disponibles para contrapartida",
    "Búsqueda de socio o entidad ejecutora idónea",
    "Trámites de viabilización ante MinCiencias o DNP"
  ],

  roles: [
    ["liderar", "Liderar como Entidad Ancla"],
    ["coliderar", "Co-liderar línea temática"],
    ["cofinanciar", "Cofinanciar con recursos propios"],
    ["datos", "Aportar datos para seguimiento"],
    ["infraestructura", "Facilitar laboratorios / infraestructura"],
    ["talento", "Aportar investigadores / talento humano"]
  ],

  ajustesGobernanza: [
    ["secretaria", "Secretaría técnica fortalecida en la SDEI", "Dar continuidad y memoria técnica al CODECTI"],
    ["sillas", "Sillas rotativas para alcaldes subregionales", "Llevar la voz de las subregiones no capitales"],
    ["mesas", "Mesas técnicas por misión (M1, M2, M3)", "Hacer seguimiento temático con expertos y gremios"],
    ["pmo", "PMO departamental de estructuración de proyectos", "Pasar de ideas dispersas a proyectos viables en MGA"],
    ["nodos", "Nodos subregionales de CTeI", "Descentralizar laboratorios y capacidades fuera de Manizales"],
    ["parque", "Parque Tecnológico como articulador (Art. 10)", "Operar programas y conectar academia con empresa"]
  ],

  p5b: [
    "Tablero público en línea",
    "Informe semestral en el CODECTI",
    "Sesiones de rendición en las subregiones",
    "Boletín digital periódico"
  ],
  p5c: ["Trimestral", "Semestral", "Anual"],
  p5d: ["Sí, estamos en disposición de firmarlo", "No por el momento", "Depende del tipo de datos"],

  steps: [
    { k: "A", t: "¿Quién responde?", s: "Caracterización de la entidad" },
    { k: "1", t: "Líneas", s: "Decisiones sobre las 14 líneas de acción" },
    { k: "2", t: "Metas", s: "Metas e indicadores con impacto territorial" },
    { k: "3", t: "Proyectos", s: "Portafolio prioritario y financiación" },
    { k: "4", t: "Gobernanza", s: "Actores ancla y funcionamiento del CODECTI" },
    { k: "5", t: "Seguimiento", s: "Indicadores, datos y rendición de cuentas" },
    { k: "✓", t: "Cierre", s: "Revisar y enviar respuesta" }
  ]
};
