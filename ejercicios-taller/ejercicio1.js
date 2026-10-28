const BASE_URL = "http://localhost:3000/api";
const PENALTY_RATE = 0.15; // penalización del 15% para entregas tardías

// Pide las entregas al servidor. Es async porque fetch devuelve una Promise.
const getSubmissions = async () => {
  const response = await fetch(`${BASE_URL}/submissions`);
  if (!response.ok) throw new Error(`Error ${response.status} al consultar /submissions`);
  return response.json();
};

// Promedio de un arreglo de números, redondeado a 2 decimales, calculado con reduce.
// Suma todo y divide solo en la última vuelta (index + array); si el arreglo está vacío devuelve 0.
const average = (numbers) =>
  numbers.reduce(
    (acum, current, index, array) =>
      index === array.length - 1
        ? Math.round(((acum + current) / array.length) * 100) / 100
        : acum + current,
    0
  );

// Deja el objeto solo con los tres campos que pide el enunciado
const toSummary = ({ studentName, course, score }) => ({ studentName, course, score });

const main = async () => {
  // Datos base: todas las entregas con la penalización ya aplicada.
  // map devuelve objetos NUEVOS (spread), así no se modifican los datos originales.
  // Entrega tardía -> score * (1 - 0.15) redondeado a 2 decimales; las demás quedan igual.
  // penaltyApplied indica si a esa entrega se le aplicó la penalización.
  const submissions = (await getSubmissions()).map((submission) => ({
    ...submission,
    score: submission.isLate
      ? Math.round(submission.score * (1 - PENALTY_RATE) * 100) / 100
      : submission.score,
    penaltyApplied: submission.isLate,
  }));

  // BULLET 1: promedio de notas de los estudiantes penalizados
  // filter (solo penalizados) -> map (solo la nota) -> average (promedio con 2 decimales)
  const penalizedAverage = average(
    submissions
      .filter((submission) => submission.penaltyApplied)
      .map((submission) => submission.score)
  );

  // BULLET 2: nombres de los aprobados (score >= 10 ya penalizado) de WEB o TÓPICOS
  // filter (aprobados) -> filter (materias pedidas) -> map (solo el nombre)
  const approvedStudentNames = submissions
    .filter((submission) => submission.score >= 10)
    .filter(
      (submission) =>
        submission.course === "PROGRAMACION_WEB" || submission.course === "TOPICOS_PROGRAMACION"
    )
    .map((submission) => submission.studentName);

  // BULLET 3: objeto { materia: promedio } con un solo reduce.
  // En cada vuelta se calcula el promedio de TODAS las entregas de esa materia
  // (filter + map sobre el arreglo completo) y se guarda con la materia como llave.
  const averageByCourse = submissions.reduce((acum, current, index, array) => {
    acum[current.course] = average(
      array
        .filter((submission) => submission.course === current.course)
        .map((submission) => submission.score)
    );
    return acum;
  }, {});

  // BULLET 4: objeto con dos arreglos, cada uno con filter (condición) + map (solo 3 campos)
  const gradeReport = {
    honorRoll: submissions
      .filter((submission) => submission.isLate === false && submission.score >= 18)
      .map(toSummary),
    needsReview: submissions
      .filter((submission) => submission.score < 12)
      .map(toSummary),
  };

  // RESULTADOS (cada log muestra únicamente el resultado del bullet)
  console.log("1) Promedio de notas de los penalizados:", penalizedAverage);
  console.log("2) Aprobados de PROGRAMACION_WEB o TOPICOS_PROGRAMACION:", approvedStudentNames);
  console.log("3) Promedio general por materia:", averageByCourse);
  console.log("4) honorRoll y needsReview:", gradeReport);
};

main();
