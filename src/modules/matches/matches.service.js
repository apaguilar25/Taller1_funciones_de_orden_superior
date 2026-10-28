// Almacenamiento en memoria de las partidas disputadas.
// aqui teamId apunta al id de un equipo del módulo teams

const matches = [
  { matchId: 801, teamId: "T1", opponent: "G2 Esports", viewPeak: 450000, durationMin: 38, mapsPlayed: ["bind", "ascent"], won: true },
  { matchId: 802, teamId: "T1", opponent: "Mad Lions", viewPeak: 280000, durationMin: 44, mapsPlayed: ["haven"], won: true },
  { matchId: 803, teamId: "T2", opponent: "KRÜ Esports", viewPeak: 520000, durationMin: 65, mapsPlayed: ["ascent", "split", "lotus"], won: true },
  { matchId: 804, teamId: "T3", opponent: "FaZe Clan", viewPeak: 310000, durationMin: 52, mapsPlayed: ["mirage", "inferno"], won: false },
  { matchId: 805, teamId: "T4", opponent: "T1", viewPeak: 610000, durationMin: 32, mapsPlayed: ["bind"], won: false },
  { matchId: 806, teamId: "T5", opponent: "Sentinels", viewPeak: 490000, durationMin: 70, mapsPlayed: ["sunset", "split"], won: false },
  { matchId: 807, teamId: "T2", opponent: "Cloud9", viewPeak: 390000, durationMin: 41, mapsPlayed: ["haven", "bind"], won: true },
];

export const matchesService = {
  getAllMatches: async () => {
    return matches;
  },
};

export default matchesService;
