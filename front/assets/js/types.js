import typeFetcher from "./service/type.js";

const type = {
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

    allType.forEach((type) => {
      main.appendChild(create(type));
    });
  },
};
export default type;
