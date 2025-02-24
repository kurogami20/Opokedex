import pokeFetcher from "./service/pokemon.js";

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
      // * les details du pokémone

      const detailContainer = pokeTemplateFrag.querySelector(
        '[slot="pkm_detail"]'
      );
      const nameDetail = detailContainer.querySelector(".pkm_name");
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

      return pokeTemplateFrag;
    }

    allPokemon.forEach((poke) => {
      pokeContainerElm.appendChild(createPoke(poke));
    });

    const allPoke = document.querySelectorAll(".card");
    allPoke.forEach((poke) => {
      poke.addEventListener("click", pokeModale);
      const detailCard = poke.querySelector('div[slot="pkm_detail"]');

      const closeElms = detailCard.querySelectorAll(".close");

      closeElms.forEach((p) => {
        p.addEventListener("click", () => {
          console.log("hello");
          detailCard.classList.remove("is-active");
        });
      });
    });

    function pokeModale(event) {
      const detail = event.currentTarget.querySelector('[slot="pkm_detail"]');
      detail.classList.add("is-active");
      return;
    }

    // document.addEventListener("click", (event) => {
    //   // Vérifier si on clique sur une carte
    //   if (event.target.closest(".card")) {
    //     const poke = event.target.closest(".card");
    //     const detail = poke.querySelector('[slot="pkm_detail"]');
    //     detail.classList.add("is-active");
    //   }
    //   if (event.target.classList.contains("close")) {
    //     console.log("Fermeture demandée !");
    //     const detailCard = event.target.closest('[slot="pkm_detail"]');
    //     if (detailCard) {
    //       detailCard.classList.remove("is-active");
    //     }
    //   }
    // });
  },

  // function displayModale() {
  //   const pokemonCards = document.querySelectorAll(".card");
  //   const pkmDetail = document.querySelector('[slot="pkm_detail"]');
  //   const pkmDetailClose = pkmDetail.querySelectorAll(".close");

  //   pokemonCards.forEach((card) => {
  //     card.addEventListener("click", () => {
  //       pkmDetail.classList.add("is-active");
  //     });
  //   });

  //   pkmDetailClose.forEach((p) => {
  //     p.addEventListener("click", () => {
  //       pkmDetail.classList.remove("is-active");
  //     });
  //   });
  // }
  // displayModale();
};
pokeHandler.init();
