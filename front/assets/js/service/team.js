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
};
export default teamFetcher;
