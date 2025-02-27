import typeFetcher from "./service/type.js";

const type = {
  init() {
    type.display();
  },

  async display() {
    const allType = await typeFetcher.allType();

    function create(type) {
      const typeFrag = document
        .querySelector("#type_template")
        .content.cloneNode(true);
      const btnElem = typeFrag.querySelector(".type_btn");
      btnElem.textContent = `${type.name}`;
      btnElem.dataset.id = type.id;
      btnElem.style.backgroundColor = `#${type.color}`;
      return typeFrag;
    }
    const main = document.querySelector("#app");
    const divElm = document.createElement("div");
    divElm.classList.add("grid");
    divElm.style.width = "100%";
    main.appendChild(divElm);

    allType.forEach((type) => {
      divElm.appendChild(create(type));
    });

    function detail() {
      const types = document.querySelectorAll(".type_btn");
      types.forEach((type) => {
        type.addEventListener("click", detailAppear);
      });
      async function detailAppear(event) {
        const btn = event.currentTarget;
        const id = btn.dataset.id;
        const typeById = await typeFetcher.byIdType(id);
        console.log(typeById);
        const modale = document.querySelector('[slot="type_detail"]');
        const title = modale.querySelector(".type_name");
        const imgElm = modale.querySelector(".poke_img");
        title.textContent = `${typeById.name}`;

        const list = modale.querySelector(".list_poke_type");
        const pokemon = typeById.pokemon;
        pokemon.forEach((pok) => {
          const figureElm = document.createElement("figure");
          const imgElm = document.createElement("img");
          figureElm.classList.add("image", "is-64x64", "mx-2");
          imgElm.classList.add("image", "is-64x64", "mx-2", "poke_img");
          imgElm.src = `./assets/img/${pok.id}.webp`;
          figureElm.appendChild(imgElm);

          const liElm = document.createElement("li");
          liElm.textContent = `  ${pok.name}`;

          liElm.prepend(figureElm);
          liElm.classList.add("is-flex", "is-size-3", "ml-3");
          list.appendChild(liElm);
        });
        modale.classList.add("is-active");
      }

      const closeElm = document.querySelectorAll(".close");
      closeElm.forEach((c) => {
        c.addEventListener("click", () => {
          document
            .querySelector('[slot="type_detail"]')
            .classList.remove("is-active");
        });
      });
    }
    detail();
  },
};
export default type;
