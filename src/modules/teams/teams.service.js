// Almacenamiento en memoria de los equipos profesionales de Esports
const teams = [
  { id: "T1", tag: "FNC", teamName: "Fnatic", game: "LOL", isPartner: true },
  { id: "T2", tag: "SEN", teamName: "Sentinels", game: "VALORANT", isPartner: true },
  { id: "T3", tag: "NAV", teamName: "Natus Vincere", game: "CS2", isPartner: false },
  { id: "T4", tag: "G2E", teamName: "G2 Esports", game: "LOL", isPartner: true },
  { id: "T5", tag: "KRU", teamName: "KRÜ Esports", game: "VALORANT", isPartner: false },
];

export const teamsService = {
  getAllTeams: async () => {
    return teams;
  },
};

export default teamsService;
