import pokeFetcher from "./service/pokemon.js";
import teamFetcher from "./service/team.js";
import teamPoke from "./service/teamPoke.js";

const pokeHandler = {
  init() {
    pokeHandler.displayAll();
    pokeHandler.postTeamPoke();
  },

  async displayAll() {
    const allPokemon = await pokeFetcher.allPoke();

    const pokeContainerElm = document.querySelector("#app");

    function createPoke(poke) {
      // * toutes les cartes
      const pokeTemplate = document.querySelector("#pokemon_template");
      const pokeTemplateFrag = pokeTemplate.content.cloneNode(true);

      const titleElm = pokeTemplateFrag.querySelector(".pokemon_name");
      const imgElm = pokeTemplateFrag.querySelector(".pkm_img");
      titleElm.textContent = `${poke.name}`;
      imgElm.src = `./assets/img/${poke.id}.webp`;
      const containerElm = pokeTemplateFrag.querySelector(".pokemon");
      containerElm.dataset.id = poke.id;

      return pokeTemplateFrag;
    }

    allPokemon.forEach((poke) => {
      pokeContainerElm.appendChild(createPoke(poke));
    });

    const allPokeCard = document.querySelectorAll(".pokemon");
    allPokeCard.forEach((poke) => {
      poke.addEventListener("click", modalDisplay);
    });
    async function modalDisplay(event) {
      const detailContainer = document.querySelector('[slot="pkm_detail"]');
      const nameDetail = detailContainer.querySelector(".pkm_name");
      const id = event.currentTarget.dataset.id;
      const poke = await pokeFetcher.byIdPoke(id);

      nameDetail.textContent = `${poke.name}`;
      detailContainer.querySelector(
        ".pkm_img_modal"
      ).src = `./assets/img/${poke.id}.webp`;

      const spanTypeElm = detailContainer.querySelector(".modal_poke_type");
      spanTypeElm.textContent = "";
      const types = poke.type;
      types.forEach((t) => {
        const typeBtnElm = document.createElement("button");
        typeBtnElm.classList.add("button");
        typeBtnElm.style.backgroundColor = `#${t.color}`;
        typeBtnElm.textContent = `${t.name}`;
        spanTypeElm.appendChild(typeBtnElm);
      });

      console.log(types);
      // les statistiques
      detailContainer.querySelector(".pv_progress").value = poke.hp;
      detailContainer.querySelector(".atk_progress").value = poke.atk;
      detailContainer.querySelector(".def_progress").value = poke.def;
      detailContainer.querySelector(".atk-spe_progress").value = poke.atk_spe;
      detailContainer.querySelector(".def-spe_progress").value = poke.def_spe;
      detailContainer.querySelector(".spd_progress").value = poke.speed;
      detailContainer.classList.add("is-active");
      const idPoke = detailContainer.querySelector("#pokemon_id");
      idPoke.value = `${poke.id}`;
    }

    const detailContainer = document.querySelector('[slot="pkm_detail"]');

    // les options
    const selectElm = detailContainer.querySelector(".select");
    const allTeams = await teamFetcher.allteam();

    //
    const optionElm = document.createElement("option");

    optionElm.textContent = "Choisissez une équipe";
    selectElm.appendChild(optionElm);
    allTeams.forEach((t) => {
      const optionElm = document.createElement("option");
      optionElm.textContent = `${t.name}`;
      optionElm.value = `${t.id}`;
      selectElm.appendChild(optionElm);
    });

    const closeElm = document.querySelectorAll(".close");
    closeElm.forEach((c) => {
      c.addEventListener("click", () => {
        detailContainer.classList.remove("is-active");
      });
    });
  },

  async postTeamPoke() {
    const form = document.querySelector("#form_add_pkm_team");
    form.addEventListener("submit", newTeam);
    async function newTeam(event) {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const formData = Object.fromEntries(data);

      if (formData.team_id === "Choisissez une équipe") {
        return;
      }

      const numbData = {
        pokemon_id: Number.parseInt(formData.pokemon_id),
        team_id: Number.parseInt(formData.team_id),
      };
      const detail = document.querySelector('[slot="pkm_detail"]');
      detail.classList.remove("is-active");
      console.log(numbData);
      await teamPoke.addPokeTeam(numbData);

      event.currentTarget.reset();
    }
  },
};
export default pokeHandler;
