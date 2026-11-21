/* =====================================================================
   LO ESENCIAL · destacados curados de los productos P-01 a P-06
   tipo: "diag" (diagnóstico que preocupa) · "audaz" (propuesta atrevida) · "dato" (dato que sorprende)
   vistas: dónde se muestra además de la portada ("cifras", "plan", "seguimiento", "resultados")
   ===================================================================== */
window.CC_DEST = {
  tipos: {
    diag:  { t: "Diagnóstico clave", tp: "Diagnósticos clave", i: "!" },
    audaz: { t: "Propuesta audaz", tp: "Propuestas audaces", i: "↗" },
    dato:  { t: "Dato que sorprende", tp: "Datos que sorprenden", i: "?" }
  },
  items: [
    { tipo: "diag", big: "18.º", titulo: "Caldas produce conocimiento, pero no lo convierte en riqueza",
      texto: "Es 2.º del país en investigadores por habitante y 1.º en institucionalidad de innovación, pero cae al puesto 18 en eficiencia: lo que se investiga no llega a empresas, empleo ni exportaciones.",
      fuente: "P-01", link: "#cifras", vistas: ["cifras"] },
    { tipo: "diag", big: "46,7 %", titulo: "Hay plata para ciencia, pero no se logra ejecutar",
      texto: "De $166.550 millones de regalías para CTeI asignados a Caldas entre 2019 y 2026, solo se ha ejecutado menos de la mitad. En el bienio 2025-2026 la ejecución va en 16,6 %.",
      fuente: "P-03", link: "#plan", vistas: ["plan"] },
    { tipo: "diag", big: "0 de 22", titulo: "El plan anterior no cumplió ninguno de sus compromisos de corto plazo",
      texto: "Todos los productos de 2022-2025 vencieron y ninguno se cumplió por completo. Los empresarios lo llamaron el «efecto plantilla»: metas tan genéricas que servirían para cualquier departamento.",
      fuente: "P-01", link: "#cifras", vistas: ["cifras"] },
    { tipo: "diag", big: "11 de 100", titulo: "Casi todas las ideas de proyecto mueren en el papeleo",
      texto: "De cada 100 ideas radicadas en el banco de proyectos, solo 11 llegan a desembolso. Las causas: cotizaciones sin firma, actividades sin producto en la MGA y contrapartidas sin soporte.",
      fuente: "P-03", link: "#plan", vistas: ["plan"] },
    { tipo: "diag", big: "95,8 %", titulo: "La ciencia de Caldas vive en Manizales",
      texto: "136 de los 142 grupos de investigación están en Centro Sur. En el Norte, el Occidente, el Alto Oriente y el Magdalena Caldense la presencia de grupos formales es casi nula.",
      fuente: "P-02", link: "#cifras", vistas: ["cifras"] },

    { tipo: "diag", big: "20 de 26", titulo: "El Plan lo ha escuchado sobre todo la academia",
      texto: "Veinte de las 26 entrevistas son de universidades. Faltan voces de empresas, alcaldías, gremios agropecuarios y organizaciones comunitarias.",
      fuente: "Entrevistas del convenio", link: "#resultados", vistas: ["resultados"] },
    { tipo: "diag", big: "R1", titulo: "El mayor riesgo para cumplir: la demora del SGR",
      texto: "La rigidez y lentitud en la aprobación de proyectos de regalías es el riesgo más alto del Plan. La respuesta: un banco de proyectos preestructurados y una unidad de estructuración en la SDEI.",
      fuente: "P-04", link: "#seguimiento", vistas: ["seguimiento"] },

    { tipo: "audaz", big: "Estado socio", titulo: "Que el departamento sea socio de las empresas que nacen de la ciencia",
      texto: "Crear empresas mixtas (joint ventures) entre el Estado, las universidades y privados para comercializar tecnología, en lugar de limitarse a financiar investigación.",
      fuente: "P-06 · Kenny Gómez, UAM", link: "#plan", vistas: ["plan"] },
    { tipo: "audaz", big: "$2.500 M", titulo: "Un fondo de capital semilla al estilo de Israel",
      texto: "Fondo de co-inversión tipo Yozma: la Gobernación, inversionistas de Mantix y las universidades ponen recursos para invertir entre $50 y $250 millones en empresas de base tecnológica, con opción de recompra.",
      fuente: "P-03", link: "#plan", vistas: ["plan"] },
    { tipo: "audaz", big: "Cada semana", titulo: "Un gimnasio de retos tecnológicos para resolver problemas reales",
      texto: "Un «CyberGym» semanal donde estudiantes y jóvenes investigadores resuelven retos planteados por empresas y municipios, con presupuesto para prototipar.",
      fuente: "P-06 · Kenny Gómez, UAM", link: "#plan", vistas: ["plan"] },
    { tipo: "audaz", big: "45 doctores", titulo: "Pagar parte del sueldo para que las empresas contraten doctores",
      texto: "Subsidio salarial decreciente durante 24 meses para que 45 doctores y 150 jóvenes investigadores trabajen en empresas caldenses en vez de emigrar.",
      fuente: "P-05", link: "#plan", vistas: ["plan"] },
    { tipo: "audaz", big: "IA + volcán", titulo: "Vigilar el volcán y las laderas con inteligencia artificial",
      texto: "Un sistema de IA vulcanológica y geotécnica, mapas de microzonificación para 10 municipios y 300 maestros de obra certificados en bahareque sismorresistente.",
      fuente: "P-05", link: "#plan", vistas: ["plan"] },
    { tipo: "audaz", big: "ILC", titulo: "Sumar a la Industria Licorera de Caldas como aliada financiera de la innovación",
      texto: "Una de las propuestas más discutidas: vincular a la Licorera como aportante de CTeI sin desatender su cofinanciación de la salud mental. La decide el CODECTI.",
      fuente: "P-06 · María Alejandra Cuervo, Gobernación", link: "#plan", vistas: [] },

    { tipo: "dato", big: "1,5 / 10", titulo: "Lo peor calificado por los empresarios: el acceso a capital de riesgo",
      texto: "El talento humano sacó 8,2. En el otro extremo, el capital de riesgo sacó 1,5 y la redundancia de comunicaciones 2,5: en la primera hora del sismo colapsaron.",
      fuente: "P-01", link: "#cifras", vistas: ["cifras"] },
    { tipo: "dato", big: "11 de 11", titulo: "Todos los entrevistados dijeron lo mismo",
      texto: "Mucha producción académica y poco impacto económico. Fue el único diagnóstico en el que coincidieron las 11 entrevistas a profundidad.",
      fuente: "P-06", link: "#resultados", vistas: ["resultados"] },
    { tipo: "dato", big: "141 de 452", titulo: "Un tercio de las empresas tecnológicas no vendió nada en un año",
      texto: "En el clúster TIC Mantix, 42 empresas concentran el 80 % de las ventas y 141 reportaron ventas en cero. El 91,6 % son microempresas.",
      fuente: "P-02", link: "#cifras", vistas: [] },
    { tipo: "dato", big: "< 1 min", titulo: "La meta: avisar de un sismo o un deslizamiento en menos de un minuto",
      texto: "Hoy el tiempo promedio de alerta es de 45 minutos. El Plan propone bajarlo a menos de 15 en 2027, menos de 5 en 2030 y menos de 1 en 2033.",
      fuente: "P-04", link: "#seguimiento", vistas: ["seguimiento"] },
    { tipo: "dato", big: "33 de 37", titulo: "Casi ninguna meta tiene todavía una línea base certificada",
      texto: "Antes de adoptar las metas, 25 líneas base deben certificarse con su fuente oficial y otras 8 ni siquiera se han medido.",
      fuente: "P-04", link: "#seguimiento", vistas: ["seguimiento"] }

  ]
};
