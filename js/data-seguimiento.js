/* =====================================================================
   TABLERO DE SEGUIMIENTO DEL PLAN DE ACCIÓN DE CTeI
   Los 37 indicadores, sus líneas base y metas se leen de js/data-plan.js (P-04).
   Aquí solo se registran las MEDICIONES de cada corte semestral y las líneas base certificadas.

   CÓMO REPORTAR UN CORTE (Secretaría Técnica del CODECTI · SDEI)
   1. Agregue el corte en `cortes` con su fecha (30 de junio o 31 de diciembre).
   2. En `mediciones`, use la clave "L-x|n" (línea y posición del indicador en esa línea, desde 0)
      y agregue { fecha, valor, fuente, nota } con el valor numérico medido.
   3. Si la fuente oficial certifica una línea base, regístrela en `certificadas` con el valor y la fuente.
   El semáforo se recalcula solo.
   ===================================================================== */
window.CC_SEG = {
  calendario: [
    { mes: "30 de junio", t: "Corte semestral", d: "Avance físico y cofinanciación" },
    { mes: "Julio", t: "Plenaria del CODECTI", d: "Revisión del avance con los 19 consejeros" },
    { mes: "31 de diciembre", t: "Corte anual", d: "Auditoría de productos" },
    { mes: "Diciembre", t: "Informe a la Asamblea", d: "Rendición de cuentas departamental" }
  ],
  proximoCorte: "2027-06-30",
  cortes: [],          // p. ej. [{ fecha: "2027-06-30", acta: "Acta CODECTI n.º …" }]
  mediciones: {},      // p. ej. { "L-1|0": [{ fecha: "2027-06-30", valor: 180, fuente: "Sec. de Agricultura", nota: "" }] }
  certificadas: {},    // p. ej. { "L-4|0": { valor: 5, fuente: "ONAC", fecha: "2027-03-15" } }
  umbrales: { critico: 70, senda: 85 },
  riesgos: [
    ["R1", "Rigidez y demora en la aprobación de proyectos en el SGR", 20, "Banco de proyectos preestructurados en MGA y unidad de estructuración en la SDEI"],
    ["R2", "Discontinuidad por cambio de gobierno departamental o municipal", 16, "Metas adoptadas por ordenanza y comités técnicos del CODECTI con IES y gremios"],
    ["R3", "Bajo aporte de contrapartidas del sector privado", 16, "Vouchers de innovación, beneficios tributarios (CNBT) y contratos marco estandarizados"],
    ["R4", "Líneas base sin soporte certificable", 12, "Protocolo de certificación de la fuente primaria antes de adoptar cada meta"],
    ["R5", "Fuga de doctores formados con regalías", 9, "Subsidio salarial decreciente de 24 meses en empresas"],
    ["R6", "Desconfianza comunitaria hacia la ciencia ciudadana", 9, "Diálogo de saberes con JAC y resguardos y co-investigadores comunitarios remunerados"]
  ]
};
