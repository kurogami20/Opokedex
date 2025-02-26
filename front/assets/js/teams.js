import teamFetcher from "./service/team.js";
import teamPoke from "./service/teamPoke.js";

const team = {
  init() {
    team.display(), team.displayModTeame(), team.handleModTeam();
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
  async displayModTeame() {
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

        function createFormPoke(poke, team) {
          const formTemplt = modale.querySelector("#modTeam_pok");
          const formFrag = formTemplt.content.cloneNode(true);
          const img = formFrag.querySelector(".poke_img");
          img.src = `./assets/img/${poke.id}.webp`;
          formFrag.querySelector(".poke_name").textContent = `${poke.name}`;
          formFrag.querySelector('[slot="pokemon_id"]').value = `${poke.id}`;
          formFrag.querySelector('[slot="team_id"]').value = `${team.id}`;
          // les statistiques
          formFrag.querySelector(".pv_progress").value = poke.hp;
          formFrag.querySelector(".atk_progress").value = poke.atk;
          formFrag.querySelector(".def_progress").value = poke.def;
          formFrag.querySelector(".atk-spe_progress").value = poke.atk_spe;
          formFrag.querySelector(".def-spe_progress").value = poke.def_spe;
          formFrag.querySelector(".spd_progress").value = poke.speed;
          return formFrag;
        }

        const main = modale.querySelector(".modal-card-body");
        const pokemons = teamData.pokemon;

        pokemons.forEach((p) => {
          main.appendChild(createFormPoke(p, teamData));
        });

        modale.classList.add("is-active");
      }

      const modal = document.querySelector('[slot="team_mod"]');
      const closeElm = modal.querySelectorAll(".close");
      closeElm.forEach((c) => {
        c.addEventListener("click", () => {
          modal.classList.remove("is-active");
        });
      });
    }, 1000);
  },
  async handleModTeam() {
    setTimeout(() => {
      const formsPokeTeam = document.querySelector('[slot="poke_team_form"]');
      console.log(formsPokeTeam);

      async function sendData() {}
    }, 1000);
  },
};

export default team;
