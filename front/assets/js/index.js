import pokeFetcher from "./service/pokemon.js";

const pokeHandler = {
  init() {
    pokeHandler.displayAll();
    pokeHandler.displayModale();
  },
  async displayAll() {
    const allPokemon = await pokeFetcher.allPoke();

    const pokeContainerElm = document.querySelector("#app");

    function createPoke(poke) {
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
  },
  displayModale() {
    const pokemonCards = document.querySelectorAll(".card");
    const pkmDetail = document.getElementById("pkm_detail");
    const pkmDetailClose = pkmDetail.querySelector(".close");

    pokemonCards.forEach((card) => {
      card.addEventListener("click", () => {
        pkmDetail.classList.add("is-active");
      });
    });

    pkmDetailClose.addEventListener("click", () => {
      pkmDetail.classList.remove("is-active");
    });
  },
};

pokeHandler.init();
