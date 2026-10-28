const BASE_URL = "http://localhost:3000/api";

// Pide un recurso cualquiera al servidor (teams, matches...). Es async porque fetch devuelve una Promise.
const getResource = async (resource) => {
  const response = await fetch(`${BASE_URL}/${resource}`);
  if (!response.ok) throw new Error(`Error ${response.status} al consultar /${resource}`);
  return response.json();
};

// Promedio de un arreglo de números, calculado con reduce (sin redondear, para que la
// comparación "estrictamente mayor a 45" use el valor exacto).
// Suma todo y divide solo en la última vuelta (index + array); si el arreglo está vacío devuelve 0.
const average = (numbers) =>
  numbers.reduce(
    (acum, current, index, array) =>
      index === array.length - 1 ? (acum + current) / array.length : acum + current,
    0
  );

const main = async () => {
  // Las dos peticiones son independientes entre sí, así que se lanzan a la vez con Promise.all.
  // await espera a que ambas terminen y entrega los resultados en el mismo orden.
  const [teams, matches] = await Promise.all([getResource("teams"), getResource("matches")]);

  // BULLET 1: cada partida enriquecida con los datos de su equipo.
  // El "puente" entre los arreglos es match.teamId === team.id.
  // map conserva una fila por partida; dentro, filter encuentra el equipo de esa partida,
  // map arma la fila con los campos pedidos y [0] toma esa única fila.
  const enrichedMatches = matches.map(
    (match) =>
      teams
        .filter((team) => team.id === match.teamId)
        .map((team) => ({
          matchId: match.matchId,
          teamName: team.teamName,
          game: team.game,
          opponent: match.opponent,
          viewPeak: match.viewPeak,
          durationMin: match.durationMin,
          won: match.won,
        }))[0]
  );

  // BULLET 2: suma de viewPeak de todas las partidas de los equipos asociados de VALORANT o LOL.
  // filter (equipos que cumplen) -> reduce sobre equipos; dentro, filter de las partidas del equipo
  // y un reduce interno que suma sus viewPeak. El reduce externo acumula el total.
  const partnerViewPeakTotal = teams
    .filter((team) => team.isPartner === true && (team.game === "VALORANT" || team.game === "LOL"))
    .reduce(
      (acum, team, index, array) =>
        acum +
        matches
          .filter((match) => match.teamId === team.id)
          .reduce((subtotal, match, i, teamMatches) => subtotal + match.viewPeak, 0),
      0
    );

  // BULLET 3: nombres de equipos con duración promedio de partida estrictamente mayor a 45 min.
  // Para cada equipo: filter de sus partidas -> map a sus duraciones -> average -> comparar con 45.
  const longMatchTeamNames = teams
    .filter(
      (team) =>
        average(
          matches
            .filter((match) => match.teamId === team.id)
            .map((match) => match.durationMin)
        ) > 45
    )
    .map((team) => team.teamName);

  // BULLET 4: contador de mapas jugados { mapa: veces } usando el arreglo de partidas original.
  // El reduce externo recorre las partidas; el reduce interno recorre los mapas de cada partida
  // y arranca con el mismo acumulador del externo (acum), por eso el conteo se mantiene entre partidas.
  const mapCounter = matches.reduce(
    (acum, current, index, array) =>
      current.mapsPlayed.reduce((counter, mapName, i, maps) => {
        counter[mapName] = (counter[mapName] ?? 0) + 1;
        return counter;
      }, acum),
    {}
  );

  /*const mapCounter = matches.reduce((acum, current, index, array) => {
  const hojaActualizada = current.mapsPlayed.reduce((counter, mapName, i, maps) => {
    counter[mapName] = (counter[mapName] ?? 0) + 1;
    return counter;
  }, acum);                    // ← empieza con la hoja que ya traía el externo
  return hojaActualizada;      // ← esto se convierte en el acum de la siguiente partida
}, {});*/

  // RESULTADOS (cada log muestra únicamente el resultado del bullet)
  console.log("1) Partidas enriquecidas:", enrichedMatches);
  console.log("2) Espectadores pico acumulados (partners de VALORANT/LOL):", partnerViewPeakTotal);
  console.log("3) Equipos con duración promedio > 45 min:", longMatchTeamNames);
  console.log("4) Veces que se disputó cada mapa:", mapCounter);
};

main();
