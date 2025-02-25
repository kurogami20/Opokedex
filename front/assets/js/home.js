import pokeFetcher from "./service/pokemon.js";
import teamFetcher from "./service/team.js";

const pokeHandler = {
  init() {
    pokeHandler.displayAll();
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
      const containerElm = pokeTemplateFrag.querySelector(".card");
      containerElm.dataset.id = poke.id;

      return pokeTemplateFrag;
    }

    allPokemon.forEach((poke) => {
      pokeContainerElm.appendChild(createPoke(poke));
    });

    const allPokeCard = document.querySelectorAll(".card");
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

      // les statistiques
      detailContainer.querySelector(".pv_progress").value = poke.hp;
      detailContainer.querySelector(".atk_progress").value = poke.atk;
      detailContainer.querySelector(".def_progress").value = poke.def;
      detailContainer.querySelector(".atk-spe_progress").value = poke.atk_spe;
      detailContainer.querySelector(".def-spe_progress").value = poke.def_spe;
      detailContainer.querySelector(".spd_progress").value = poke.speed;
      detailContainer.classList.add("is-active");
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
};
export default pokeHandler;
