import teamFetcher from "./service/team.js";

const team = {
  init() {
    team.display(), team.modTeame();
  },

  async display() {
    const allTeams = await teamFetcher.allteam();

    const main = document.querySelector("#app");

    function create(team) {
      const template = document.querySelector("#team_template");

      const teamFrag = template.content.cloneNode(true);
      const titleElm = teamFrag.querySelector(".team-name");
      const descripElm = teamFrag.querySelector(".team-description");
      const imgContainer = teamFrag.querySelector(".imgContainer");
      const container = teamFrag.querySelector(".container");

      container.dataset.id = `${team.id}`;
      titleElm.textContent = `${team.name}`;
      descripElm.textContent = `${team.description}`;
      const pokemons = team.pokemon;

      pokemons.forEach((pok) => {
        const figElm = document.createElement("figure");
        const imgElm = document.createElement("img");
        figElm.classList.add("image", "is-64x64", "mx-2");
        imgElm.classList.add("is-rounded");
        imgElm.src = `./assets/img/${pok.id}.webp`;
        imgContainer.appendChild(figElm);
        figElm.appendChild(imgElm);
      });
      return teamFrag;
    }

    allTeams.forEach((a) => {
      main.appendChild(create(a));
    });
  },
  async modTeame() {
    setTimeout(() => {
      const containers = document.querySelectorAll(".team_container");
      containers.forEach((c) => {
        c.addEventListener("click", modale);
      });
      async function modale(event) {
        const modale = document.querySelector('[slot="team_mod"]');
        const id = event.currentTarget.dataset.id;
        const teamData = await teamFetcher.byIdteam(id);
        modale.querySelector(".team_name").textContent = `${teamData.name}`;
        modale.querySelector(
          '[slot="description"]'
        ).textContent = `${teamData.description}`;
        modale.classList.add("is-active");
      }
    }, 1000);
  },
};

export default team;
