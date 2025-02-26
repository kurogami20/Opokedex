const teamPoke = {
  async addPokeTeam(data) {
    const httpResponse = await fetch(`http://localhost:3000/api/v1/teamPoke`, {
      method: "POST", // je cible la route `POST`
      headers: { "Content-Type": "application/json" }, // je préviens que j'envoie du JSON
      body: JSON.stringify(data), // j'envoie mes données en JSON
    });
    const dataAdded = await httpResponse.json();
    console.log(dataAdded); // Les données JSON renvoyées par l'API récupérées en objet JS
    return dataAdded;
  },
  async deletePokeTeam(dets) {
    const data = await fetch(`http://localhost:3000/api/v1/teamPoke`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }, // je préviens que j'envoie du JSON
      body: JSON.stringify(dets), // j'envoie mes données en JSON
    });
    const teamData = await data.json();
    return teamData;
  },
};
export default teamPoke;
