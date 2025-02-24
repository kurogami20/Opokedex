const pokeFetcher = {
  async allPoke() {
    const data = await fetch("http://localhost:3000/api/v1/pokemon");
    const pokeData = await data.json();
    return pokeData;
  },
  async byIdPoke(id) {
    const data = await fetch(`http://localhost:3000/api/v1/pokemon/${id}`);
    const pokeData = await data.json();
    return pokeData;
  },
};
export default pokeFetcher;
