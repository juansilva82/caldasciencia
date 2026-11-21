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

  /* ===== Cuádruple Hélice: síntesis de entrevistas, mesas y consulta =====
     tipos: tipos de actor de la consulta que se agrupan en cada hélice (el «Otro» se clasifica con palabras clave).
     Las citas son textuales y anónimas (Ley 1581 de 2012). Fuentes: mesa focal de validación con empresarios TIC
     (Producto P-01), mapeo del CODECTI (P-01, tabla 4), diagnóstico de capacidades y brechas (P-02)
     y respuestas abiertas de la consulta. */
  helices: [
    {
      k: "academia", nombre: "Academia e I+D", icono: "🎓", color: "#17839f", soft: "#e3f2f6",
      tipos: ["Institución de educación superior", "Centro de investigación o desarrollo tecnológico"],
      clave: /universidad|instituci[oó]n educativa|centro de investigaci|laboratorio|sena/i,
      rol: "Genera conocimiento y forma el talento del ecosistema.",
      fuerza: "Es el estamento más fuerte y articulado del CODECTI (SUMA, CUEES) y el principal formulador de proyectos de regalías.",
      dice: [
        "Ofrece liderar líneas de innovación empresarial y manufactura, y aportar cada trimestre datos de graduados STEM y grupos de investigación.",
        "Quiere laboratorios y equipamiento fuera de Manizales y un observatorio o sistema de información territorial.",
        "Tiene proyectos en idea o perfil, pero la contrapartida y los estudios técnicos frenan su paso a financiación."
      ],
      cita: { t: "Se requiere ordenar y volver simétricos los objetos laborales, educacionales y organizacionales. Formación para el trabajo en prospectiva.", f: "Docente investigador · consulta" },
      cifras: [["142", "grupos de investigación reconocidos (62 en A1 y A)"], ["95,8 %", "de los grupos está en Centro-Sur"], ["TRL 1–4", "nivel de madurez de lo que produce, frente al TRL 6–8 que piden las pymes"]],
      reto: "La Paradoja Caldense: 2.º lugar nacional en investigadores por habitante, pero bajos resultados en mercado y absorción empresarial."
    },
    {
      k: "empresa", nombre: "Sector productivo", icono: "🏭", color: "#c8892e", soft: "#fbf0e1",
      tipos: ["Empresa", "Gremio o cámara de comercio"],
      clave: /empresa|cl[uú]ster|gremio|c[aá]mara|industria|software|startup/i,
      rol: "Convierte el conocimiento en empleo, ventas y exportaciones.",
      fuerza: "452 empresas TIC matriculadas en Caldas; el talento humano es su variable mejor calificada (8,2 / 10).",
      dice: [
        "Califica el ecosistema con 5,5 / 10 y el acceso a capital de riesgo con 1,5 / 10, la nota más baja del estudio.",
        "Pide un fondo de capital semilla y riesgo (modelo Yozma), consorcios para exportar y bootcamps de talento de un año.",
        "Exige que la política ponga a los empresarios en el centro y no a las instituciones."
      ],
      cita: { t: "Todo es muy romántico, pero nadie habla de plata.", f: "Empresario TIC · mesa focal de validación" },
      cita2: { t: "Roles claros, pero que el centro sean los empresarios y no las instituciones.", f: "Gestor de clúster · consulta" },
      cifras: [["452", "empresas TIC con $319.325 millones en ventas y 2.423 empleos"], ["91,6 %", "son microempresas"], ["141", "empresas reportaron ventas en cero"]],
      reto: "Siempre participan las mismas ~15 empresas: el 3,3 % del clúster. Los apoyos de $1 a $2 millones para ferias son «pañitos de agua tibia».",
      notas: [["Ecosistema", 5.5], ["Talento humano", 8.2], ["Conectividad urbana", 7.0], ["Tracción del clúster", 3.8], ["Redundancia de telecomunicaciones", 2.5], ["Capital de riesgo", 1.5]]
    },
    {
      k: "estado", nombre: "Estado", icono: "🏛️", color: "#12294a", soft: "#e6ebf2",
      tipos: ["Entidad pública departamental", "Alcaldía o entidad municipal", "Entidad pública nacional"],
      clave: /alcald|gobernaci|secretar|ministerio|entidad p[uú]blica|municipio|corpocaldas/i,
      rol: "Fija las reglas, financia y convoca: preside el CODECTI.",
      fuerza: "Ordenanza 952 vigente, CONPES departamental 2026–2033 y la Corporación FUTURA aprobada como brazo operador del CODECTI.",
      dice: [
        "El CODECTI sesionó casi solo para aprobar regalías y omitió el seguimiento semestral que ordena la Ordenanza.",
        "La asistencia de los titulares ronda el 55–65 % y sus recomendaciones no son vinculantes ante Hacienda.",
        "La Unidad de CTeI depende de contratos temporales sin continuidad anual."
      ],
      cita: { t: "Si uno toma el Plan de Acción, le borra la palabra Caldas y le coloca Quindío, Boyacá o Arauca, el texto se lee exactamente igual.", f: "Crítica al plan vigente · mesa focal de validación" },
      cifras: [["55–65 %", "asistencia de titulares al CODECTI"], ["9,4 / 10", "severidad de la brecha de resiliencia territorial tras el sismo"], ["$14.393 M", "senda financiera 2026–2032 para FUTURA"]],
      reto: "Pasar de un plan «plantilla» a metas con dueño, fuente de financiación y tablero público de seguimiento."
    },
    {
      k: "sociedad", nombre: "Sociedad civil", icono: "🤝", color: "#8dc63f", soft: "#eef6e4",
      tipos: ["Organización social o comunitaria"],
      clave: /comunal|comunitari|social|fundaci|asociaci[oó]n de|colectiv|campesin|ind[ií]gena|jóvenes|mujeres/i,
      rol: "Apropia, valida y vigila que la CTeI llegue a los territorios.",
      fuerza: "Las Juntas de Acción Comunal están en el área urbana y rural: pueden validar y monitorear los pilotos en campo.",
      dice: [
        "Ofrece a las Juntas de Acción Comunal como nodos validadores y de monitoreo de los pilotos en campo.",
        "Prioriza economía circular, bioeconomía y gestión del riesgo, con datos por municipio cada trimestre.",
        "Pide rendir cuentas en las subregiones, con tablero público y boletín, no solo en Manizales."
      ],
      cita: { t: "El monitoreo en las comunidades y su participación en los pilotos resultan importantes para el ajuste y desempeño de los indicadores.", f: "Líder comunal · consulta" },
      cifras: [["8,5 / 10", "severidad de la brecha de cohesión social y territorial"], ["Trimestral", "frecuencia con la que ofrece reportar datos, por municipio"], ["5", "subregiones fuera de Manizales con poca articulación"]],
      reto: "Baja incidencia real en la priorización de recursos y poca articulación con las cinco subregiones fuera de Manizales."
    }
  ],

  /* ===== Actores entrevistados =====
     Fuente: dossier «Perfiles de actores clave» del convenio CDTER–Gobernación (carpeta Entrevistas/Perfiles)
     y carpetas de transcripción. h = hélice (academia | empresa | estado | sociedad). t = temas de la agenda. */
  temasActores: {
    futura: "Parque FUTURA", ia: "Inteligencia artificial", transferencia: "Transferencia tecnológica",
    financiacion: "Financiación y regalías", talento: "Talento y posgrados", territorio: "Descentralización subregional",
    gobernanza: "Gobernanza del CODECTI", bio: "Bioeconomía y clima", social: "Innovación social y apropiación",
    emprende: "Emprendimiento de base tecnológica", pymes: "Digitalización de mipymes"
  },
  actores: [
    { nombre: "Felipe Sandoval Ramírez", cargo: "Líder de proyectos de innovación y propiedad intelectual", entidad: "DIMA · Universidad Nacional, sede Manizales", h: "academia",
      sintesis: "Acompaña a investigadores en la formulación, protección y blindaje contractual de los proyectos de extensión que conectan la universidad con empresas y municipios.",
      aporta: ["Estado real de la I+D aplicada y su madurez tecnológica", "Por qué las patentes universitarias no se licencian a empresas caldenses", "Apertura de laboratorios a pymes de los 27 municipios"],
      hito: "Diseñó el plan de manejo de riesgos de la función de extensión de la sede.", t: ["transferencia", "futura", "financiacion"] },
    { nombre: "Elisabeth Restrepo Parra", cargo: "Directora del CDT Innterfaz · profesora titular", entidad: "Universidad Nacional, sede Manizales", h: "academia",
      sintesis: "Investigadora sénior de MinCiencias que lleva la física y la ciencia de materiales hasta tecnología patentada y aplicada al mercado.",
      aporta: ["Transferencia tecnológica de laboratorio a mercado (TRL 3–4 a 7–8)", "Valorización de biomasa agroindustrial", "Liderazgo de mujeres en ciencia y tecnología"],
      hito: "Premio Nacional al Inventor Colombiano por baterías orgánicas hechas con residuos agroindustriales.", t: ["transferencia", "bio", "futura", "social"] },
    { nombre: "Juan Nicolás Montoya Restrepo", cargo: "Director del Parque de Innovación Empresarial (PIE)", entidad: "Universidad Nacional, sede Manizales", h: "academia",
      sintesis: "Articula la investigación universitaria con la creación de empresas de base tecnológica y spin-offs en Caldas, y es uno de los impulsores de Manizales Más.",
      aporta: ["Embudo regional de incubación de empresas de base tecnológica", "Fondo departamental de capital semilla", "Complementariedad entre el PIE y FUTURA"],
      hito: "Protocolos para que docentes participen en spin-offs bajo la Ley 1838 de 2017.", t: ["emprende", "financiacion", "futura", "territorio"] },
    { nombre: "Johnny Alexander Tamayo Arias", cargo: "Vicerrector de sede · miembro del CODECTI", entidad: "Universidad Nacional, sede Manizales", h: "academia",
      sintesis: "Máxima autoridad de la UNAL en Caldas, con voz y voto en el CODECTI y un enfoque de «universidad en y con la región».",
      aporta: ["Aval institucional al modelo de gobernanza del Plan", "Vinculación de la UNAL al Parque FUTURA", "Becas doctorales de regalías alineadas con el territorio"],
      hito: "Gobernanza de contrapartidas institucionales para proyectos de regalías.", t: ["gobernanza", "futura", "talento", "territorio"] },
    { nombre: "Carlos Andrés Urrego Zuluaga", cargo: "Director de «Eureka: Ciencia para la Gente»", entidad: "Universidad de Manizales", h: "sociedad",
      sintesis: "Periodista científico que traduce la investigación para comunidades campesinas, colegios y tomadores de decisión.",
      aporta: ["Estrategia departamental de apropiación social del conocimiento", "Enfoque diferencial: etnias, mujeres, jóvenes y personas con discapacidad", "Veeduría ciudadana sobre la inversión en ciencia"],
      hito: "Fundó en 2018 la plataforma transmedia Eureka de divulgación científica.", t: ["social", "gobernanza", "territorio"] },
    { nombre: "Héctor Mauricio Serna Gómez", cargo: "Director de Investigaciones y Posgrados", entidad: "Universidad de Manizales", h: "academia",
      sintesis: "Investigador sénior que lidera la investigación, la innovación (UM-Lab) y los posgrados de una universidad privada acreditada.",
      aporta: ["Metas de formación de magísteres y doctores", "Contrapartidas de las universidades privadas en regalías", "Ciencias sociales y económicas al servicio de la CTeI"],
      hito: "Premio TOYP 2024 de la Cámara Junior Internacional en liderazgo académico.", t: ["talento", "financiacion", "emprende", "gobernanza"] },
    { nombre: "Olga Lucía Ocampo López", cargo: "Coordinadora del Doctorado en Sostenibilidad", entidad: "Universidad Autónoma de Manizales", h: "academia",
      sintesis: "Investigadora sénior en bioeconomía circular, huella hídrica y adaptación al cambio climático; fue comisionada de la Misión de Sabios por Caldas.",
      aporta: ["Metas de bioeconomía en café, plátano y cítricos", "Resiliencia climática y gestión del riesgo", "Becas doctorales orientadas a la transición ecológica"],
      hito: "Valorización de pseudotallos de plátano y mucílago de café en fibras y empaques.", t: ["bio", "talento", "territorio"] },
    { nombre: "Darío Arenas Villegas", cargo: "Exvicerrector de Proyección Universitaria", entidad: "Universidad de Caldas · Centro Transmedia", h: "academia",
      sintesis: "Sociólogo y becario Chevening que lideró la extensión, la innovación social y la presencia de la Universidad de Caldas en las subregiones.",
      aporta: ["Innovación social y pública con indicadores propios", "Nodos de CTeI en las sedes de La Dorada y Anserma", "Voz de la ciudadanía en el CODECTI"],
      hito: "Creó la Universidad Intergeneracional, que une a personas mayores y jóvenes.", t: ["social", "territorio", "gobernanza"] },
    { nombre: "Mateo Acosta Castaño", cargo: "Líder de la Oficina de Innovación y Gestión de Proyectos", entidad: "Universidad de Caldas", h: "academia",
      sintesis: "Estructurador de proyectos de CTeI bajo metodología MGA y requisitos del Sistema General de Regalías.",
      aporta: ["Proyectos del portafolio sin causales de rechazo", "Transferencia agroindustrial a TRL 5–7", "Valorización de contrapartidas ante auditorías"],
      hito: "Coordinó el programa Nexo Global con Purdue University.", t: ["financiacion", "transferencia", "bio", "futura"] },
    { nombre: "Sebastián Ruiz", cargo: "Coordinador de financiación internacional", entidad: "Universidad de Caldas · Oficina de Innovación y Proyectos", h: "academia",
      sintesis: "Busca recursos no reembolsables y alianzas globales para que la ciencia de Caldas no dependa solo de las regalías.",
      aporta: ["Mapa de fuentes internacionales (Horizonte Europa, Erasmus+, BID, CAF)", "Cofinanciación mixta: regalías + cooperación + recursos propios", "Cooperación para equipar el Parque FUTURA"],
      hito: "Propuestas en consorcios con socios de España, Francia, Alemania, México y Chile.", t: ["financiacion", "futura"], l: ["L13", "L14"] },
    { nombre: "Camilo Hincapié", cargo: "Fundador y CEO", entidad: "Nativo · agencia y academia digital", h: "empresa",
      sintesis: "Empresario de marketing de rendimiento y analítica, Google Partner, que forma talento digital en Manizales.",
      aporta: ["Adopción de comercio electrónico y analítica en mipymes", "Condiciones para que las empresas tech se instalen en FUTURA", "Bootcamps cortos de alta empleabilidad"],
      hito: "Ha formado a cientos de jóvenes en habilidades digitales de alta demanda.", t: ["pymes", "futura", "talento", "emprende"] },
    { nombre: "Sebastián Díaz Restrepo", cargo: "Fundador y CEO", entidad: "Codyd · ecosistemas digitales e IA", h: "empresa",
      sintesis: "Emprendedor que lleva la inteligencia artificial y la automatización a la operación diaria de las empresas.",
      aporta: ["IA como habilitador transversal de las 14 líneas", "Programa de adopción de IA en pequeñas empresas", "Hub de software e IA en FUTURA"],
      hito: "Construyó una firma tecnológica en Manizales sin depender de subsidios.", t: ["ia", "pymes", "futura", "talento"] },
    { nombre: "Juan Manuel Pérez Saldías", cargo: "Vicepresidente de junta (presidente en 2024) · CEO de Quántica Digital", entidad: "Cámara de Comercio de Manizales por Caldas", h: "empresa",
      sintesis: "Empresario pionero del software en Manizales y vocero gremial del sector tecnológico.",
      aporta: ["Instrumentos de innovación que sí funcionen para mipymes", "Ocupación privada del Parque FUTURA y el Clúster Mantix", "Peso del sector productivo en el CODECTI"],
      hito: "Quántica Digital opera desde 1998 y se graduó de Manizales Más.", t: ["pymes", "futura", "gobernanza", "emprende"] },
    { nombre: "Mauricio Arbeláez Rendón", cargo: "Decano de la Facultad de Inteligencia Artificial e Ingenierías", entidad: "Universidad de Caldas", h: "academia",
      sintesis: "Lidera la primera facultad de inteligencia artificial del país, con una inversión cercana a $54.000 millones de MinTIC y la universidad.",
      aporta: ["Complementariedad entre la Facultad de IA y FUTURA", "Metas de graduados en IA a 2027 y 2030", "IA aplicada a café, agro y gestión del riesgo"],
      hito: "Puesta en marcha de la Facultad de IA en el edificio El Parque.", t: ["ia", "futura", "talento", "territorio"] },
    { nombre: "Luis Fernando Castillo Ossa", cargo: "Director del Grupo de Investigación en IA (GIA)", entidad: "Universidad de Caldas", h: "academia",
      sintesis: "Investigador sénior en inteligencia artificial y bioinformática; fue decano de Ingenierías entre 2014 y 2018.",
      aporta: ["Ruta para llevar algoritmos de TRL 4 a TRL 7", "Uso compartido de supercómputo: BIOS, Facultad de IA y FUTURA", "IA para salud, bioeconomía y riesgo sísmico"],
      hito: "Modelos de analítica predictiva para la salud pública durante la pandemia.", t: ["ia", "transferencia", "futura", "bio"] },
    { nombre: "Lina Marcela Flórez Loaiza", cargo: "Directora del Centro de Innovación INNEO", entidad: "Universidad Católica de Manizales", h: "academia",
      sintesis: "Líder de innovación social, emprendimiento inclusivo y turismo sostenible; representa a la UCM en Manizales Más.",
      aporta: ["Emprendimiento de mujeres y jóvenes rurales", "Innovación en turismo y el Paisaje Cultural Cafetero", "Espacios ciudadanos dentro de FUTURA"],
      hito: "Premio Cóndor como líder regional de apoyo al emprendimiento.", t: ["social", "emprende", "territorio", "futura"], l: ["L4", "L13", "L9"] },
    { nombre: "Carlos Eduardo Jaramillo Sanint", cargo: "Rector · miembro del CODECTI", entidad: "Universidad Autónoma de Manizales", h: "academia",
      sintesis: "Rector desde 2019 y expresidente de SUMA, con trayectoria previa en la alta dirección de la industria de alimentos.",
      aporta: ["Compromisos de las universidades de SUMA con el Plan", "Puente entre academia y gran empresa para invertir en I+D", "Gobernanza del CODECTI que no dependa del gobierno de turno"],
      hito: "Acuerdos entre rectores para presentar proyectos conjuntos de regalías.", t: ["gobernanza", "transferencia", "futura", "financiacion"] },
    { nombre: "María Alejandra Cuervo Cardona", cargo: "Líder del Parque FUTURA · enlace de la secretaría técnica del CODECTI", entidad: "Gobernación de Caldas · SDEI", h: "estado",
      sintesis: "Interlocutora técnica de la Gobernación para la puesta en marcha de FUTURA y el funcionamiento del CODECTI.",
      aporta: ["Estado de obras, dotación y modelo de operación de FUTURA", "Integrantes, actas y sesiones del CODECTI", "Ruta para aprobar el Plan de Acción en el CODECTI"],
      hito: "Coordinó la convocatoria TerritorioLAB de innovación abierta con municipios.", t: ["futura", "gobernanza", "territorio"], l: ["L13", "L4", "L8"] }
  ],
  // Entrevistas con transcripción registrada cuyo perfil aún no está en el dossier
  entrevistasAdicionales: [
    { nombre: "Carlos Alberto Villegas Isaza", entidad: "Decano de la Facultad de Ciencias para la Salud · Universidad de Caldas", h: "academia", l: ["L12", "L14", "L4"] },
    { nombre: "Alejandro Múnera y Jesús David Gallego Zuluaga", entidad: "Oficina de Innovación y Formulación de Proyectos · Universidad de Caldas", h: "academia", l: ["L12", "L6", "L7", "L14"] },
    { nombre: "Victoria Salazar Gil", entidad: "Directora del Programa Paz y Competitividad · Universidad Autónoma de Manizales", h: "academia", l: ["L13", "L12", "L1"] },
    { nombre: "Juana María Toro, David Felipe Ordoñez y Kenny Mauricio Gómez", entidad: "Semilleros, CDT Investiga y Unidad de Emprendimiento · Universidad Autónoma de Manizales", h: "academia", l: ["L14", "L9", "L5", "L8"] },
    { nombre: "Jorge Arboleda", entidad: "Docente investigador · Universidad de Manizales", h: "academia", l: ["L9", "L1", "L13"] },
    { nombre: "Paola Alzate", entidad: "Investigadora en logística y gestión empresarial · Universidad Católica Luis Amigó", h: "academia", l: ["L9", "L14", "L1"] },
    { nombre: "Elvira Cristina Ruiz Jiménez", entidad: "Decana de la Facultad de Ciencias Exactas y Naturales · Universidad de Caldas", h: "academia", l: ["L5", "L6", "L10", "L13"] },
    { nombre: "Cámara de Comercio de Manizales por Caldas", entidad: "Asesor de Transformación Empresarial", h: "empresa", l: ["L8", "L11", "L13"] },
    { nombre: "Valentín Vargas", entidad: "Universidad de Manizales", h: "academia", pendiente: true },
    { nombre: "Jeny Aguirre", entidad: "Gestión de proyectos", h: "", pendiente: true }
  ],

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
