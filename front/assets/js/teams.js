import teamFetcher from "./service/team.js";
import teamPoke from "./service/teamPoke.js";

const teamHandler = {
  init() {
    teamHandler.display(),
      teamHandler.displayModTeame(),
      teamHandler.modTeamName();
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
        figElm.dataset.id = `${pok.id}${team.id}`;
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
        modale.dataset.id = id;
        const teamData = await teamFetcher.byIdteam(id);
        modale.querySelector(".team_name").textContent = `${teamData.name}`;

        const formNameElm = modale.querySelector('[slot="change_name_team"]');
        const input = formNameElm.querySelector(".input");
        input.value = `${teamData.name}`;
        modale.querySelector(
          '[slot="description"]'
        ).textContent = `${teamData.description}`;
        displayModalContent();
        modale.classList.add("is-active");
      }

      const modal = document.querySelector('[slot="team_mod"]');
      const closeElm = modal.querySelectorAll(".close");
      closeElm.forEach((c) => {
        c.addEventListener("click", () => {
          modal.classList.remove("is-active");
          const titleElm = document.querySelector(".title_zone");
          const formElm = document.querySelector('[slot="change_name_team"]');
          titleElm.classList.remove("is-hidden");
          formElm.classList.add("is-hidden");
        });
      });
      async function displayModalContent() {
        function createFormPoke(poke, team) {
          const formTemplt = document.querySelector("#modTeam_pok");
          const formFrag = formTemplt.content.cloneNode(true);
          const img = formFrag.querySelector(".poke_img");
          img.src = `./assets/img/${poke.id}.webp`;
          formFrag.querySelector(".poke_name").textContent = `${poke.name} `;
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

        const team = document.querySelectorAll(".team_container");
        console.log(team);
        const id = Number.parseInt(
          document.querySelector('[slot="team_mod"]').dataset.id
        );

        const modale = document.querySelector('[slot="team_mod"]');
        const main = modale.querySelector('[slot="poke_section"]');
        console.log(main);
        main.innerHTML = "";
        console.log(id);
        const teamData = await teamFetcher.byIdteam(id);
        const pokemons = teamData.pokemon;
        console.log(pokemons);

        pokemons.forEach((p) => {
          main.append(createFormPoke(p, teamData));
        });

        teamHandler.handleModTeam();
      }
    }, 1000);
  },
  async handleModTeam() {
    const formsPokeTeam = document.querySelectorAll('[slot="poke_team_form"]');
    console.log(formsPokeTeam);
    formsPokeTeam.forEach((f) => {
      f.addEventListener("submit", sendData);
    });
    async function sendData(event) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const { pokemon_id, team_id } = Object.fromEntries(formData);
      const data = {
        pokemon_id: Number.parseInt(pokemon_id),
        team_id: Number.parseInt(team_id),
      };
      console.log(data);
      event.currentTarget.remove();
      document.querySelector(`[data-id="${pokemon_id}${team_id}"]`).remove();

      await teamPoke.deletePokeTeam(data);
    }
  },

  async modTeamName() {
    const penElms = document.querySelector(".pen");

    penElms.addEventListener("click", displayForm);

    function displayForm() {
      console.log("click");
      const titleElm = document.querySelector(".title_zone");
      const formElm = document.querySelector('[slot="change_name_team"]');
      titleElm.classList.add("is-hidden");
      formElm.classList.remove("is-hidden");
    }
  },
};

export default teamHandler;
