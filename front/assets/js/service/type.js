const typeFetcher = {
  async allType() {
    const data = await fetch("http://localhost:3000/api/v1/type");
    const TypeData = await data.json();
    return TypeData;
  },
  async byIdType(id) {
    const data = await fetch(`http://localhost:3000/api/v1/type/${id}`);
    const typeData = await data.json();
    return typeData;
  },
};
export default typeFetcher;
