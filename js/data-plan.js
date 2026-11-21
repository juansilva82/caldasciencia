/* =====================================================================
   EL PLAN DE ACCIÓN 2026-2033 · P-04, P-05 y P-06
   Fuente: productos del Convenio de Asociación 28102026-2039 CDTER – Gobierno de Caldas (noviembre de 2026).
   P-04 Líneas, metas e indicadores · P-05 Portafolio de proyectos · P-06 Plan reformulado para validación del CODECTI.
   Los nombres, cargos y citas de los entrevistados se publican con su autorización (P-06, cap. 2).
   ===================================================================== */
window.CC_PLAN = {
  fuentes: {
    p04: "P-04 · Líneas estratégicas, metas e indicadores del Plan de Acción de CTeI (noviembre de 2026)",
    p05: "P-05 · Portafolio de proyectos e iniciativas prioritarias de CTeI (noviembre de 2026)",
    p06: "P-06 · Plan de Acción de CTeI reformulado para validación del CODECTI (noviembre de 2026)"
  },
  estado: "Para validación del CODECTI · la sesión está por programar con la Secretaría Técnica",

  misiones: {
    ME1: { t: "Caldas biointeligente y sustentable", c: "#17839f" },
    ME2: { t: "Nuevo modelo productivo, circular y equitativo", c: "#c8892e" },
    ME3: { t: "Caldas educada, saludable, científica e innovadora", c: "#41b6e0" }
  },

  cortes: [
    { a: 2027, t: "Alistamiento", d: "Cierre del Plan de Desarrollo «Caldas 2024-2027»: normas, líneas base certificadas y primeros pilotos (vouchers, telesalud rural, Open Lab)." },
    { a: 2030, t: "Aceleración", d: "Corte del nuevo Plan Nacional de Desarrollo y del CONPES 4069: cobertura en las 6 subregiones y escalamiento de las empresas de base tecnológica." },
    { a: 2033, t: "Consolidación", d: "Cierre decenal de la Ordenanza 952: Caldas entre los cinco primeros departamentos del IDIC." }
  ],

  /* ---------- P-04: las 14 líneas reformuladas (orden y misión según P-04) ---------- */
  lineas: [
    { c: "L-1", m: "ME1", n: "Sistemas productivos ecoeficientes",
      o: "Tecnificar las unidades productivas agropecuarias y mineras de pequeña escala con paquetes tecnológicos maduros, bioinsumos y trazabilidad digital, para producir más con menos agua, energía y agroquímicos.",
      ind: [
        ["P", "Unidades productivas y asociaciones agropecuarias tecnificadas mediante extensión tecnológica", "120 (2022)", "350", "750", "1.200", "cert"],
        ["R", "Incremento del rendimiento por hectárea en unidades asistidas", "0 % (2023)", "+8,5 %", "+16 %", "+25 %", "cert"]],
      r: "Sec. de Agricultura, SENA, U. de Caldas", a: "Gobernación (Agricultura)", f: "SGR CTeI · MinAgricultura · SENA · Finagro", rep: "Semestral" },
    { c: "L-2", m: "ME1", n: "Bioeconomía para el desarrollo sostenible",
      o: "Convertir la biomasa residual de las cadenas de café, plátano, caña, cítricos y aguacate en bioproductos de alto valor (ingredientes funcionales, biopolímeros, biofertilizantes) mediante I+D y escalamiento piloto.",
      ind: [
        ["P", "Proyectos de I+D implementados en biotecnología y bioeconomía (acumulado)", "8 (2023)", "15", "28", "42", "cert"],
        ["R", "Tasa de aprovechamiento de biomasa agroindustrial en cadenas priorizadas", "12,4 % (2022)", "18 %", "28 %", "40 %", "cert"]],
      r: "U. de Caldas, Cenicafé, BIOS", a: "Gobernación (SDEI, Agricultura)", f: "SGR CTeI · FFJC · contrapartida privada", rep: "Semestral" },
    { c: "L-5", m: "ME1", n: "Desarrollo de servicios ecosistémicos",
      o: "Conocer, monitorear y valorar la biodiversidad y el agua de Caldas con herramientas genómicas, sensórica e IoT y ciencia ciudadana, como base del pago por servicios ambientales y del biocomercio.",
      ind: [
        ["P", "Estudios e inventarios de biodiversidad y servicios ecosistémicos con métodos genómicos o tecnológicos (acumulado)", "5 (2022)", "12", "22", "32", "cert"],
        ["R", "Microcuencas prioritarias con monitoreo en tiempo real de caudal y calidad", "15 % (2022)", "30 %", "55 %", "80 %", "cert"]],
      r: "Corpocaldas, U. de Caldas", a: "Gobernación (Medio Ambiente)", f: "Corpocaldas · SGR Inversión Regional · cooperación internacional", rep: "Anual" },
    { c: "L-6", m: "ME1", n: "Gestión del riesgo y adaptación al cambio climático",
      o: "Dotar al departamento de monitoreo multiamenaza, alerta temprana y modelación (gemelos digitales) que reduzcan los tiempos de alerta y protejan vidas, vías e infraestructura crítica.",
      ind: [
        ["P", "Sistemas y herramientas tecnológicas para monitoreo de amenazas y gestión del riesgo", "4 (2022)", "10", "18", "27", "cert"],
        ["R", "Tiempo promedio de alerta ante remoción en masa y sismo", "45 min (2022)", "< 15 min", "< 5 min", "< 1 min", "cert"]],
      r: "UDEGERD, UNAL (IDEA)", a: "Gobernador · UNGRD", f: "Fondo de Reconstrucción (Decreto 1414) · SGR · UNGRD", rep: "Semestral" },
    { c: "L-7", m: "ME1", n: "Tenencia y gestión de la tierra",
      o: "Poner la analítica de suelos y la información geoespacial al servicio del pequeño productor y de los municipios, articulada con el catastro multipropósito y el ordenamiento productivo.",
      ind: [
        ["P", "Municipios con visor geoespacial y analítica de suelos integrados al catastro", "Por levantar", "6", "15", "27", "lev"],
        ["P", "Gestores digitales del suelo formados (acumulado)", "0 (2026)", "100", "400", "800", "propia"],
        ["R", "Pequeños productores con análisis de suelos georreferenciado", "Por levantar", "2.000", "8.000", "15.000", "lev"]],
      r: "Sec. de Planeación, U. de Caldas, BIOS", a: "Gobernación (Planeación)", f: "SGR CTeI · catastro multipropósito · cooperación", rep: "Anual" },
    { c: "L-3", m: "ME2", n: "Gestión de información para la economía creativa",
      o: "Medir y dinamizar la economía creativa caldense —software de contenidos, animación, videojuegos, diseño y oficios con denominación de origen— con datos abiertos y cofinanciación de prototipos creativos de base tecnológica.",
      ind: [
        ["P", "Sistema de información de economía creativa operando (cuenta satélite y tablero)", "0 (2026)", "1", "1 (actualizado)", "1 (actualizado)", "propia"],
        ["P", "Proyectos creativos de base tecnológica cofinanciados (acumulado)", "0 (2026)", "10", "35", "70", "propia"],
        ["R", "Variación del número de empresas creativas y de contenidos digitales activas", "Por levantar", "+10 %", "+25 %", "+40 %", "lev"]],
      r: "Sec. de Cultura, SDEI", a: "Gobernación (Cultura)", f: "SGR CTeI · Ley de Espectáculos · estímulos MinCulturas", rep: "Anual" },
    { c: "L-4", m: "ME2", n: "Plataformas para la especialización inteligente municipal",
      o: "Descentralizar la CTeI mediante nodos subregionales de servicios compartidos y una red de laboratorios en uso común que atienda las vocaciones productivas de cada subregión.",
      ind: [
        ["P", "Laboratorios acreditados, modernizados o en red de uso compartido", "5 (2022)", "12", "22", "32", "cert"],
        ["P", "Subregiones con nodo o programa de CTeI activo", "1 (Centro Sur)", "3", "5", "6", "propia"],
        ["R", "Ensayos y servicios tecnológicos prestados al año", "450 (2022)", "1.200", "2.800", "5.000", "cert"]],
      r: "U. de Caldas, UNAL, Cenicafé", a: "Gobernación (SDEI)", f: "SGR CTeI · MinCiencias · IES de SUMA", rep: "Anual" },
    { c: "L-8", m: "ME2", n: "Manufactura inteligente caldense (Industria 4.0)",
      o: "Masificar la adopción de inteligencia artificial, analítica y automatización en las pymes manufactureras, agroindustriales y de servicios del departamento.",
      ind: [
        ["P", "Empresas con soluciones de IA y tecnologías 4.0 implementadas (acumulado)", "15 (2022)", "45", "110", "190", "cert"],
        ["R", "Pymes con nivel alto de digitalización (encuesta de innovación)", "14,2 % (2022)", "25 %", "42 %", "60 %", "cert"]],
      r: "BIOS, Mantix, UAM", a: "Gobernación (Unidad TIC)", f: "SGR CTeI · CNBT (crédito fiscal) · contrapartida privada", rep: "Anual" },
    { c: "L-9", m: "ME2", n: "Apropiación y transferencia para sofisticar modelos productivos",
      o: "Llevar el conocimiento de las universidades al mercado: cerrar el «valle de la muerte» entre TRL 4 y TRL 7, crear spin-offs y empresas de base tecnológica, y estandarizar la contratación universidad-empresa.",
      ind: [
        ["P", "Tecnologías escaladas de TRL 4 a TRL 7 con prueba de concepto (acumulado)", "Por levantar", "5", "15", "30", "lev"],
        ["P", "Spin-offs universitarias y empresas de base científico-tecnológica creadas (acumulado)", "Por levantar", "1", "5", "10", "lev"],
        ["R", "Facturación anual de las empresas de base tecnológica apoyadas", "$1.850 M (2022)", "$6.500 M", "$22.000 M", "$50.000 M", "cert"]],
      r: "OTRI de SUMA, comité de spin-offs", a: "Gobernación (SDEI)", f: "Fondo Semilla de Co-Inversión · SGR CTeI · iNNpulsa · ángeles", rep: "Anual" },
    { c: "L-10", m: "ME2", n: "Pactos por la economía circular y la gestión energética",
      o: "Validar y transferir tecnologías de energía limpia, microrredes y simbiosis industrial que reduzcan costos y emisiones en comunidades rurales y empresas.",
      ind: [
        ["P", "Tecnologías de energía renovable y eficiencia validadas y transferidas (acumulado)", "3 (2022)", "8", "16", "25", "cert"],
        ["P", "Empresas del Pacto de Economía Circular con proyecto de reconversión o simbiosis", "Por levantar", "20", "60", "120", "lev"],
        ["R", "Capacidad de generación distribuida limpia en microrredes", "1,2 MW (2023)", "3,5 MW", "8 MW", "15 MW", "cert"]],
      r: "UNAL, CHEC", a: "Gobernación (SDEI, Medio Ambiente)", f: "SGR · Ley 1715 · CNBT · CHEC", rep: "Anual" },
    { c: "L-11", m: "ME3", n: "Acceso y uso de las TIC para reducir brechas digitales",
      o: "Garantizar conectividad funcional y redundante y formar a la población en competencias digitales para que la CTeI llegue a las 6 subregiones.",
      ind: [
        ["P", "Personas formadas en competencias digitales y CTeI (acumulado)", "Por levantar", "500", "3.000", "6.000", "lev"],
        ["R", "Sedes educativas rurales con conectividad efectiva (más de 20 Mbps)", "60 % (2025)", "75 %", "90 %", "100 %", "cert"]],
      r: "Unidad TIC, SENA", a: "Gobernación (Unidad TIC)", f: "MinTIC · SGR · Obras por Impuestos (ZOMAC)", rep: "Semestral" },
    { c: "L-12", m: "ME3", n: "Hacia un modelo de salud basado en CTeI",
      o: "Llevar atención especializada a la ruralidad mediante telesalud, interoperabilidad clínica, inteligencia artificial en atención primaria y biomarcadores diagnósticos.",
      ind: [
        ["P", "Proyectos de investigación e innovación en salud y telemedicina implementados (acumulado)", "4 (2022)", "12", "25", "40", "cert"],
        ["P", "ESE con historia clínica electrónica interoperable (HL7-FHIR)", "Por levantar", "9", "20", "27", "lev"],
        ["R", "Pacientes de municipios de categorías 4 a 6 atendidos por telemedicina especializada (al año)", "2.400 (2022)", "15.000", "45.000", "90.000", "cert"]],
      r: "DTSC, Telesalud U. de Caldas", a: "Gobernador · DTSC", f: "DTSC · SGR CTeI · MinSalud", rep: "Semestral" },
    { c: "L-13", m: "ME3", n: "Condiciones del entorno para la transformación social y productiva",
      o: "Fortalecer el entorno habilitante de la CTeI: gobernanza subregional del CODECTI, infraestructura y servicios de apoyo (parques, incubadoras y centros de ciencia), cooperación internacional y CTeI para la paz.",
      ind: [
        ["P", "Estrategias de apropiación social y ciencia ciudadana co-diseñadas (acumulado)", "6 (2022)", "18", "40", "70", "cert"],
        ["P", "Recursos de cooperación internacional no reembolsable para CTeI (al año)", "$1.200 M (2021-22)", "$4.500 M", "$12.000 M", "$25.000 M", "cert"],
        ["R", "Personas participantes en procesos de co-creación y cultura científica (al año)", "12.000 (2022)", "35.000", "80.000", "150.000", "cert"]],
      r: "SDEI (Secretaría Técnica del CODECTI), ORI de SUMA", a: "Gobernación (SDEI)", f: "SGR CTeI · cooperación internacional · MinCiencias", rep: "Anual" },
    { c: "L-14", m: "ME3", n: "Pacto por la educación para la transformación social y productiva",
      o: "Formar vocaciones científicas desde la escuela rural y talento de alto nivel que se quede en Caldas, articulando la educación media, técnica y superior con la demanda productiva.",
      ind: [
        ["P", "Estudiantes en programas de vocaciones científicas y clubes STEAM+ (al año)", "3.500 (2022)", "8.500", "18.000", "30.000", "cert"],
        ["P", "Doctores y magísteres de investigación apoyados (acumulado)", "45 (2022)", "90", "180", "300", "cert"],
        ["R", "Instituciones educativas rurales con grupo de investigación activo", "18,5 % (2022)", "35 %", "60 %", "85 %", "cert"],
        ["R", "Doctores formados con SGR vinculados a empresas o IES de Caldas", "48 % (2022)", "65 %", "80 %", "90 %", "cert"]],
      r: "Sec. de Educación, Ondas, posgrados de SUMA", a: "Gobernación (Educación)", f: "Sec. de Educación · Ondas · SGR CTeI", rep: "Semestral" }
  ],

  /* ---------- P-04, tabla 1: macro-metas ---------- */
  macro: [
    ["Razón de eficiencia del IDIC (resultados ÷ insumos)", "0,629", "0,700", "0,750", "0,750 o más"],
    ["Posición de Caldas en el IDIC", "7.º (2021)", "7.º o mejor", "6.º o mejor", "5.º o mejor"],
    ["Posición de Caldas en el IDC", "7.º (2022)", "7.º o mejor", "6.º o mejor", "5.º o mejor"],
    ["Posición de Manizales AM en el ICC", "5.º (2025)", "5.º o mejor", "4.º o mejor", "3.º o mejor"],
    ["Inversión en I+D (% del total nacional)", "0,6 % (2019)", "Actualizar (OCyT)", "1,0 %", "1,5 %"],
    ["Inversión en ACTI (% del total nacional)", "1,3 % (2019)", "Actualizar (OCyT)", "1,8 %", "2,5 %"],
    ["Proyectos de CTeI aprobados en el SGR (acumulado)", "3 (2019)", "2", "8", "15"],
    ["Recursos de CTeI gestionados por los actores del sistema (acumulado)", "Por levantar", "$5.000 M o más", "$60.000 M o más", "$100.000 M o más"],
    ["Subregiones con nodo o programa de CTeI activo", "1 (Centro Sur)", "3", "5", "6 (todas)"],
    ["Empresas ancladas en la infraestructura CTeI departamental (FUTURA)", "0 (2026)", "26", "91", "127 o más"]
  ],

  /* ---------- P-05: 9 iniciativas prioritarias (costos en millones de pesos) ---------- */
  iniciativas: [
    { c: "M1-01", m: "ME1", n: "Biointeligencia y Open Lab Caldas", d: "Centro de Biointeligencia, red de biorrefinerías piloto y consorcio de laboratorios compartidos acreditados.",
      costo: 14500, dur: "36 meses · 2027-2029", trl: [3, 8], l: ["L-2", "L-4", "L-1"],
      lider: "Universidad de Caldas (Ciencias Exactas y Naturales) y BIOS",
      fu: [["sgr", 9000], ["nacion", 3500], ["contra", 2000]],
      ent: ["12 laboratorios rehabilitados y acreditados", "3 biorrefinerías piloto", "15 bioproductos a TRL 7", "25 jóvenes investigadores y 8 doctores"],
      terr: "Nodo central Manizales–Villamaría y biorrefinerías en Chinchiná, Anserma y La Dorada",
      vida: "Hoy la cáscara, la pulpa y el mucílago se botan o contaminan las quebradas, y las muestras de un emprendedor viajan a Bogotá o Medellín. Los laboratorios se rehabilitan y se abren en red, y tres pequeñas fábricas piloto convierten esos desechos en abonos y productos naturales certificados.",
      q: ["Con el reciente terremoto perdimos muchísimas capacidades de investigación que eran nuestro corazón.", "María Alejandra Cuervo Cardona · Gobernación de Caldas"] },
    { c: "M1-02", m: "ME1", n: "SISEC 2.0 y tecnologías del agua", d: "Red telemétrica, inteligencia artificial hídrica y purificación avanzada.",
      costo: 8200, dur: "24 a 30 meses · 2027-2029", trl: [4, 8], l: ["L-5", "L-6"],
      lider: "Corpocaldas, UAM (CDT Investiga) y UNAL Manizales (IDEA)",
      fu: [["reco", 5500], ["cnbt", 1700], ["nacion", 1000]],
      ent: ["60 estaciones telemétricas en 12 cuencas", "15 sistemas de potabilización a TRL 8", "24 acueductos comunitarios fortalecidos"],
      terr: "12 municipios de las 6 subregiones, de Manizales a Samaná",
      vida: "Cuando hay un sismo o un aguacero, las quebradas se represan o se enlodan y dejan sin agua a miles de familias. Sesenta sensores avisan por celular si sube el caudal o si el agua viene contaminada, y filtros desarrollados en Caldas potabilizan el agua de los acueductos veredales.",
      q: ["Caldas tiene una ventaja comparativa única que no tiene cualquier otro territorio y es el agua.", "Kenny Mauricio Gómez · Universidad Autónoma de Manizales"] },
    { c: "M1-03", m: "ME1", n: "Ingeniería de montaña y patrimonio resiliente", d: "Tecnologías sismorresistentes, estabilización de taludes y vulcanografía con IA.",
      costo: 9800, dur: "36 meses · 2027-2029", trl: [4, 8], l: ["L-6", "L-7"],
      lider: "UNAL Manizales (Ingeniería y Arquitectura, IDEA) y U. de Caldas (Geología y Facultad de IA)",
      fu: [["reco", 6000], ["nacion", 2500], ["contra", 1300]],
      ent: ["10 mapas municipales de microzonificación", "1 sistema de IA vulcanológica y geotécnica", "150 edificaciones intervenidas", "300 maestros de obra certificados"],
      terr: "Norte, Centro Sur, Alto Occidente y vías de ladera del Alto Oriente",
      vida: "Vivimos entre montañas, fallas y a los pies del volcán. El proyecto vigila el volcán y las laderas con inteligencia artificial, actualiza los mapas de riesgo y enseña a los maestros de obra a reforzar las casas de bahareque con guadua.",
      q: ["Estamos utilizando la inteligencia artificial para potenciar otras líneas estratégicas del territorio como la salud, el estudio de suelos y la vulcanografía.", "Alejandro Múnera · Universidad de Caldas"] },
    { c: "M2-01", m: "ME2", n: "Infraestructura CTeI y nodos subregionales", d: "Operación del Parque Tecnológico, retos tecnológicos con empresas y nodos subregionales.",
      costo: 26393, dur: "2026-2032", trl: [4, 9], l: ["L-4", "L-13"],
      lider: "Gobernación de Caldas (SDEI, Secretaría Técnica del CODECTI) con el Parque Tecnológico FUTURA y las IES de SUMA",
      fu: [["registro", 14393], ["sgr", 10000], ["contra", 2000]],
      ent: ["Infraestructura CTeI operando", "Observatorio de datos en línea", "24 retos empresariales al año", "5 nodos subregionales activos"],
      terr: "Nodo central en Villamaría y nodos en La Dorada, Riosucio, Anserma, Pensilvania y Salamina",
      vida: "Un edificio vacío no genera empleo. La infraestructura de CTeI funciona como casa común de universidades y empresas, abre retos semanales donde los jóvenes resuelven problemas de las empresas y lleva sedes a cinco subregiones.",
      q: ["Nosotros vemos a FUTURA como un dinamizador, un articulador y una plataforma neutra, jamás como un competidor de las capacidades que ya existen afuera en el ecosistema.", "María Alejandra Cuervo Cardona · Gobernación de Caldas"] },
    { c: "M2-02", m: "ME2", n: "Caldas Productivo 4.0", d: "Hub de inteligencia artificial aplicada, NeuroCity, vouchers de innovación y clúster Mantix.",
      costo: 6500, dur: "24 a 36 meses · 2027-2029", trl: [5, 9], l: ["L-8", "L-11", "L-9"],
      lider: "Cámara de Comercio de Manizales por Caldas (NeuroCity, Clúster TIC Mantix) y Facultad de IA de la U. de Caldas",
      fu: [["cnbt", 3000], ["nacion", 2500], ["contra", 1000]],
      ent: ["150 mipymes digitalizadas con vouchers", "30 soluciones de IA en empresas", "12 retos de innovación abierta en municipios"],
      terr: "Los 27 municipios, con brigadas móviles de las cámaras de comercio",
      vida: "Para un comerciante o cafetero de un municipio, la tecnología suena lejana y costosa, y después del terremoto lo urgente es vender. El proyecto entrega bonos a 150 pequeñas empresas para modernizar ventas e inventarios y conecta a los jóvenes de la Facultad de IA con las empresas.",
      q: ["Cuando un empresario accede a los servicios y encuentra una forma ágil apoyada en tecnología, pierde el miedo a formalizarse e innovar.", "Asesor de Transformación Empresarial · Cámara de Comercio de Manizales por Caldas"] },
    { c: "M2-03", m: "ME2", n: "Simbiosis agroindustrial y compras públicas", d: "Economía circular en café, plátano, yuca, papa y frutales, corredor logístico y compras públicas locales.",
      costo: 7400, dur: "36 meses · 2027-2029", trl: [5, 9], l: ["L-10", "L-1"],
      lider: "Secretaría de Agricultura, Comité Departamental de Cafeteros, UAM y U. Católica Luis Amigó",
      fu: [["nacion", 3000], ["sgr", 2500], ["contra", 1000], ["cnbt", 900]],
      ent: ["350 unidades productivas y 50 asociaciones tecnificadas", "30 biofábricas en las 6 subregiones", "Compras públicas abasteciendo al PAE y hospitales"],
      terr: "6 subregiones, con énfasis en Bajo y Alto Occidente, Norte y Alto Oriente",
      vida: "Los campesinos están cansados de encuestas que no dejan nada. El proyecto lleva secadores solares, plantas de bioabonos y empaques a las veredas, organiza el acopio y conecta a las asociaciones con lo que la Gobernación y las alcaldías ya compran para colegios y hospitales.",
      q: ["La gente del campo participa, va a los espacios y conversa, pero está cansada y sobresaturada de diagnósticos sin soluciones.", "Victoria Salazar Gil · Universidad Autónoma de Manizales"] },
    { c: "M3-01", m: "ME3", n: "Telemedicina, simulación clínica y salud mental", d: "Telemedicina departamental, centros de simulación clínica en Manizales y La Dorada y salud mental comunitaria.",
      costo: 7800, dur: "24 a 36 meses · 2027-2029", trl: [5, 9], l: ["L-12", "L-11", "L-14"],
      lider: "U. de Caldas (Ciencias para la Salud), Dirección Territorial de Salud y UAM (Paz y Competitividad)",
      fu: [["sgr", 4500], ["contra", 1800], ["nacion", 1500]],
      ent: ["2 centros de simulación clínica", "12 hospitales con telemedicina e IA", "Redes de salud mental comunitaria en 27 municipios"],
      terr: "Polos de simulación en Manizales y La Dorada conectados con hospitales de los 27 municipios",
      vida: "Una cita con un especialista o un diagnóstico de cáncer puede tardar meses en las veredas. El proyecto forma médicos en simuladores, conecta los hospitales de los pueblos con especialistas e inteligencia artificial y crea redes comunitarias de salud mental.",
      q: ["La tecnología al servicio de la salud ha cambiado muchísimo y no nos podemos quedar atrás.", "Carlos Alberto Villegas Isaza · Universidad de Caldas"] },
    { c: "M3-02", m: "ME3", n: "Aulas STEAM+ y Ondas", d: "Aulas STEAM+ y laboratorios maker rurales, programa Ondas, IA para la formación docente y escuelas de familia.",
      costo: 8600, dur: "36 meses · 2027-2029", trl: null, l: ["L-14", "L-11", "L-13"],
      lider: "Secretaría de Educación, Universidad de Manizales, UAM (Ondas y semilleros) y U. de Caldas",
      fu: [["sgr", 5000], ["nacion", 2000], ["contra", 1600]],
      ent: ["30 aulas STEAM+ a 2027 (100 a 2033)", "4.500 estudiantes en semilleros Ondas", "1.200 docentes formados", "60 escuelas de familia"],
      terr: "6 subregiones, con prioridad en colegios rurales de Pensilvania, Samaná, Riosucio, Supía, Anserma, Salamina, Aguadas y La Dorada",
      vida: "La ciencia no puede ser un privilegio de las universidades de Manizales. El proyecto lleva laboratorios de robótica, programación e impresión 3D y el programa Ondas a los colegios de las veredas, forma a los docentes y acompaña a las familias.",
      q: ["Un indicador que nunca se debe perder es la formación continua en ciencia, tecnología e innovación en toda la cadena vocacional.", "Juana María Toro Galvis · Universidad Autónoma de Manizales"] },
    { c: "M3-03", m: "ME3", n: "Talento en la industria y spin-offs", d: "Jóvenes investigadores, doctores en la industria, fondo de pruebas de concepto y aceleradora de spin-offs.",
      costo: 11200, dur: "48 meses · 2027-2030", trl: [4, 9], l: ["L-14", "L-9"],
      lider: "Sistema Universitario de Manizales (OTRI y unidades de emprendimiento) con Manizales Más",
      fu: [["nacion", 5000], ["sgr", 4000], ["cnbt", 2200]],
      ent: ["150 jóvenes investigadores y 45 doctores en empresas", "30 tecnologías escaladas a TRL 8-9", "5 alianzas público-privadas"],
      terr: "Incubación en la red de infraestructura CTeI y pasantías en empresas de las 6 subregiones",
      vida: "Caldas forma doctores e ingenieros brillantes que se van porque aquí no los contratan, y muchos inventos se quedan guardados. El proyecto paga parte del sueldo inicial para que las empresas los contraten y financia que los prototipos lleguen al mercado.",
      q: ["Que no se queden solo en patentes colgadas en la pared o en diseños teóricos, sino que se conviertan en productos que se vendan en el mercado.", "Paola Alzate · Universidad Católica Luis Amigó"] }
  ],
  fuentesFin: {
    sgr: ["SGR · Asignación para la CTeI", "#12294a"],
    reco: ["SGR · Reconstrucción (Decreto 1414)", "#b8432f"],
    registro: ["Impuesto de Registro (infraestructura CTeI)", "#17839f"],
    nacion: ["Nación y cooperación internacional", "#41b6e0"],
    cnbt: ["Empresas y beneficios tributarios (CNBT)", "#c8892e"],
    contra: ["Contrapartidas de IES, Gobernación y municipios", "#8dc63f"]
  },
  faltan: [
    ["L-3 · Economía creativa", "Ninguna iniciativa la tiene como foco. Se propone un perfil complementario: observatorio de economía creativa y convocatoria de prototipado con Mantix y la Secretaría de Cultura."],
    ["L-7 · Tenencia y gestión de la tierra", "Solo aparece como componente de la iniciativa de ingeniería de montaña (analítica de suelos y mapas de amenaza)."]
  ],


  /* ---------- P-03: cómo se financia ---------- */
  financiacion: {
    fuente: "P-03 · Mapeo de instrumentos y fuentes de financiación de CTeI (noviembre de 2026)",
    lectura: "El problema de la CTeI en Caldas no es la falta de recursos sino la «trampa de la absorción»: de $166.550 millones asignados al departamento en el SGR para CTeI entre 2019 y 2026, solo se ha ejecutado el 46,7 %.",
    bienios: [["2019-2020", 32450, 22100, 68.1], ["2021-2022", 38100, 25800, 67.7], ["2023-2024", 44800, 21400, 47.8], ["2025-2026*", 51200, 8500, 16.6]],
    embudo: [[100, "Ideas radicadas en el banco"], [48, "Formulación MGA completa"], [28, "Requisitos habilitantes del SIGP"], [16, "Aprobación del OCAD o del concurso"], [11, "Desembolso y ejecución real"]],
    causas: [["42 %", "cotizaciones sin firma o vinculadas"], ["35 %", "actividades sin producto en la cadena MGA"], ["28 %", "contrapartidas sin soporte de nómina"], ["22 %", "madurez TRL declarada sin evidencia"]],
    pilares: [
      ["Departamental", "Alta", "Impuesto de Registro para FUTURA ($14.393 M hasta 2032), estampillas y contrapartidas de la Gobernación."],
      ["Sistema General de Regalías", "Media-alta", "Asignación para la CTeI e Inversión Regional: proyectos tractor, laboratorios y extensión agropecuaria."],
      ["Nacionales y tributarios", "Media a alta", "Fondo Francisco José de Caldas, MinTIC, iNNpulsa, SENA, Bancóldex y beneficios del CNBT (deducción y crédito fiscal)."],
      ["Cooperación y privados", "Variable", "Obras por Impuestos (ZOMAC), Horizonte Europa, BID Lab, CAF, Fondo de Reconstrucción y capital ángel."]
    ],
    semilla: { total: 2500, periodo: "bienio 2027-2028 · rotatorio", aportes: [["Gobernación de Caldas", 1000], ["Inversionistas privados de Mantix", 1000], ["Universidades de SUMA", 500]],
      ticket: "$50 a $250 millones por empresa de base tecnológica con TRL 4 o más, con participación minoritaria del 5 % al 15 % y opción de recompra en 5 años a valor nominal más IPC + 3 %." }
  },
  /* ---------- P-06: la voz del ecosistema ---------- */
  escucha: { lideres: 14, entrevistas: 11, segmentos: 341, dimensiones: 12, propuestas: 36 },
  consensos: [
    ["Mucha producción académica, poco impacto económico", 11, "Las metas de publicaciones se complementan con indicadores de absorción en planta, escalamiento TRL y retención de talento (L-9, L-14)."],
    ["Descentralizar hacia los 26 municipios", 10, "Meta de 6 subregiones con nodo o programa activo a 2033 y retos territoriales con presupuesto de prototipado (L-4, L-13)."],
    ["Continuidad más allá del gobierno de turno", 9, "Metas fechadas 2027-2030-2033 adoptadas por el CODECTI y rendición anual ante la Asamblea."]
  ],
  disensos: [
    ["Inteligencia artificial: ¿apuesta propia o herramienta aplicada?", "Se trata como tecnología habilitadora transversal en salud, suelos, riesgo y educación, apoyada en la Facultad de IA y BIOS."],
    ["Relación financiera entre el Estado y la universidad pública", "Cofinanciación paritaria y remuneración de los estudios técnicos especializados."],
    ["El papel de la Industria Licorera de Caldas", "Explorar su vinculación como aportante de innovación sin desatender su cofinanciación en salud mental."],
    ["¿14 líneas abiertas o 2 a 3 focos?", "Se mantienen las 14 líneas por mandato de la Ordenanza, pero la inversión tractora se concentra en pocos proyectos emblemáticos."]
  ],
  /* [n.º, propuesta, autor (entrevista), líneas, esfuerzo, impacto] */
  propuestas: [
    [1, "Alinear la extensión universitaria con las convocatorias de MinCiencias", "J. D. Gallego (T-01)", ["L-13", "L-9"], 35, 78],
    [2, "IA aplicada a salud predictiva y detección temprana", "A. Múnera (T-01)", ["L-12", "L-8"], 60, 92],
    [3, "IA para análisis de suelos y monitoreo volcánico y sísmico", "A. Múnera (T-01)", ["L-7", "L-6"], 58, 90],
    [4, "Puente de inserción de estudiantes investigadores en empresas", "A. Múnera (T-01)", ["L-14", "L-9"], 42, 88],
    [5, "Ventanilla de retos territoriales en la Facultad de IA", "A. Múnera (T-01)", ["L-9", "L-8"], 45, 85],
    [6, "Trámites digitales y CRM propio para reducir fricciones", "Asesor CCMPC (T-02)", ["L-11", "L-8"], 40, 80],
    [7, "Grupos de investigación conectados con NeuroCity", "Asesor CCMPC (T-02)", ["L-9", "L-3"], 38, 82],
    [8, "Ruta gratuita de financiación empresarial después del sismo", "Asesor CCMPC (T-02)", ["L-13", "L-1"], 30, 89],
    [9, "Centros de simulación clínica de alta fidelidad", "C. A. Villegas (T-03)", ["L-12", "L-14"], 65, 91],
    [10, "Educación médica subregional con cofinanciación 50/50", "C. A. Villegas (T-03)", ["L-14", "L-4"], 62, 93],
    [11, "Red de telesalud, cirugía robótica y atención remota", "C. A. Villegas (T-03)", ["L-12", "L-11"], 78, 90],
    [12, "Fondo de cofinanciación público-privada en salud", "C. A. Villegas (T-03)", ["L-12", "L-13"], 45, 84],
    [13, "Convenios remunerados Gobernación-universidad pública", "E. C. Ruiz (T-04)", ["L-13", "L-5"], 35, 94],
    [14, "Ciencias Exactas en biodiversidad, energías y amenazas", "E. C. Ruiz (T-04)", ["L-5", "L-6", "L-10"], 48, 89],
    [15, "Indicadores de escalamiento TRL hacia plantas productivas", "J. Arboleda (T-05)", ["L-9", "L-1"], 44, 87],
    [16, "Gobernanza que una investigadores, beneficios tributarios y empresa", "J. Arboleda (T-05)", ["L-13", "L-9"], 46, 85],
    [17, "Blindar la cadena vocacional: de Ondas a doctorado", "J. M. Toro (T-06)", ["L-14"], 52, 95],
    [18, "Escalar los beneficios tributarios siguiendo el caso UAM-CHEC", "J. M. Toro (T-06)", ["L-9", "L-13"], 40, 93],
    [19, "Visitas técnicas para desmontar sesgos empresa-universidad", "D. F. Ordoñez (T-06)", ["L-9"], 32, 81],
    [20, "Foco en tres apuestas: agroindustria con IA, agua e ingeniería de montaña", "K. Gómez (T-06)", ["L-1", "L-5", "L-6"], 55, 98],
    [21, "Estado socio: joint ventures para comercializar tecnología", "K. Gómez (T-06)", ["L-9", "L-13"], 64, 94],
    [22, "Gimnasio semanal de retos tecnológicos (CyberGym)", "K. Gómez (T-06)", ["L-8", "L-4"], 48, 95],
    [23, "Pacto de continuidad entre gobiernos", "K. Gómez (T-06)", ["L-13"], 40, 96],
    [24, "Retos de innovación abierta en los 26 municipios", "L. M. Flórez (T-07)", ["L-4", "L-13"], 54, 91],
    [25, "Valorar la contrapartida de las IES y la ventana Erasmus+", "L. M. Flórez (T-07)", ["L-13", "L-14"], 35, 84],
    [26, "Plan de choque para laboratorios afectados por el sismo", "M. A. Cuervo (T-08)", ["L-4", "L-6"], 70, 97],
    [27, "Infraestructura CTeI como plataforma neutra con máximo dos verticales", "M. A. Cuervo (T-08)", ["L-13", "L-4"], 50, 96],
    [28, "Integrar la Agenda Común de proyectos y el corredor logístico", "M. A. Cuervo (T-08)", ["L-4", "L-1"], 45, 93],
    [29, "Alianza financiera con la Industria Licorera de Caldas", "M. A. Cuervo (T-08)", ["L-13"], 55, 92],
    [30, "Mesa tripartita agroempresario-investigador y observatorio de datos", "M. A. Cuervo (T-08)", ["L-13", "L-3"], 46, 88],
    [31, "Incentivos a TRL 8-9, logística exportadora e inserción de doctores", "P. Alzate (T-09)", ["L-9", "L-14"], 52, 91],
    [32, "Consorcios mixtos para Horizonte Europa y Erasmus+", "S. Ruiz (T-10)", ["L-13", "L-14"], 48, 92],
    [33, "Laboratorios de innovación social con presupuesto de prototipado", "V. Salazar (T-11)", ["L-13", "L-4"], 50, 95],
    [34, "Salud mental rural con rehabilitación basada en comunidad", "V. Salazar (T-11)", ["L-12"], 58, 96],
    [35, "Compras públicas locales anticipadas conectadas a CTeI", "V. Salazar (T-11)", ["L-1", "L-13"], 56, 94],
    [36, "Experticia no académica y tecnologías blandas", "V. Salazar (T-11)", ["L-13", "L-5", "L-14"], 42, 93]
  ],

  /* ---------- P-06, cap. 8: ruta de validación ---------- */
  pasos: [
    ["Envío previo", "El documento llega a los 19 consejeros con 5 días hábiles de anticipación."],
    ["Mesas por bloque", "Academia, empresa, Estado y sociedad civil revisan las metas."],
    ["Sesión plenaria", "Presentación, deliberación y votación de las 6 decisiones."],
    ["Ajustes", "Matriz de observaciones y versión ajustada del Plan."],
    ["Acta y adopción", "Acta firmada; si no hay quórum, consulta escrita en 5 días hábiles."]
  ],
  decisiones: [
    ["Escucha al ecosistema", "Se da por recibida y se aprueba como sustento participativo de la reformulación."],
    ["Líneas, indicadores y metas", "Se avalan las metas 2027-2030-2033, con los ajustes que acuerde la sesión."],
    ["Criterios del portafolio", "Se aprueban los criterios de priorización del banco de proyectos."],
    ["Complementariedad de la infraestructura CTeI", "Uso compartido de laboratorios, sin duplicar BIOS ni la Facultad de IA; se crea la mesa permanente empresario-investigador."],
    ["Pacto de financiación", "La Secretaría Técnica gestiona con Hacienda los beneficios tributarios, la cofinanciación 50/50 y la cooperación."],
    ["Acta y seguimiento", "Firma del acta, matriz de ajustes y calendario de reporte semestral."]
  ]
};
