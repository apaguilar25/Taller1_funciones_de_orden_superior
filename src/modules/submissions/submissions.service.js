// Almacenamiento en memoria de las entregas de asignaciones
const submissions = [
  { submissionId: 201, studentName: "Carlos Gómez", course: "PROGRAMACION_WEB", score: 18, submittedDate: "2026-10-02", isLate: false },
  { submissionId: 202, studentName: "Ana López", course: "ESTRUCTURAS_DATOS", score: 14, submittedDate: "2026-10-05", isLate: true },
  { submissionId: 203, studentName: "Luis Silva", course: "TOPICOS_PROGRAMACION", score: 20, submittedDate: "2026-10-01", isLate: false },
  { submissionId: 204, studentName: "María Medina", course: "PROGRAMACION_WEB", score: 11, submittedDate: "2026-10-06", isLate: true },
  { submissionId: 205, studentName: "Javier Vargas", course: "TOPICOS_PROGRAMACION", score: 16, submittedDate: "2026-10-03", isLate: false },
  { submissionId: 206, studentName: "Sofía Mendoza", course: "ESTRUCTURAS_DATOS", score: 9, submittedDate: "2026-10-07", isLate: false },
  { submissionId: 207, studentName: "Diego Paredes", course: "TOPICOS_PROGRAMACION", score: 12, submittedDate: "2026-10-08", isLate: true },
  { submissionId: 208, studentName: "Elena Toro", course: "PROGRAMACION_WEB", score: 19, submittedDate: "2026-10-01", isLate: false },
];

export const submissionsService = {
  getAllSubmissions: async () => {
    return submissions;
  },
};

export default submissionsService;
