const teamFetcher = {
  async allteam() {
    const data = await fetch("http://localhost:3000/api/v1/team");
    const teamData = await data.json();
    return teamData;
  },
  async byIdteam(id) {
    const data = await fetch(`http://localhost:3000/api/v1/team/${id}`);
    const teamData = await data.json();
    return teamData;
  },
  async addTeam(data) {
    const httpResponse = await fetch(`http://localhost:3000/api/v1/team`, {
      method: "POST", // je cible la route `POST`
      headers: { "Content-Type": "application/json" }, // je préviens que j'envoie du JSON
      body: JSON.stringify(data), // j'envoie mes données en JSON
    });
    const dataAdded = await httpResponse.json();
    console.log(dataAdded); // Les données JSON renvoyées par l'API récupérées en objet JS
    return dataAdded;
  },
  async modTeam(data) {
    const httpResponse = await fetch(
      `http://localhost:3000/api/v1/team/${data.id}`,
      {
        method: "PATCH", // je cible la route `POST`
        headers: { "Content-Type": "application/json" }, // je préviens que j'envoie du JSON
        body: JSON.stringify(data), // j'envoie mes données en JSON
      }
    );
    const dataAdded = await httpResponse.json();
    console.log(dataAdded); // Les données JSON renvoyées par l'API récupérées en objet JS
    return dataAdded;
  },
  async deleteTeam(id) {
    const data = await fetch(`http://localhost:3000/api/v1/team/${id}`, {
      method: "DELETE",
    });
    const teamData = await data.json();
    return teamData;
  },
};
export default teamFetcher;
