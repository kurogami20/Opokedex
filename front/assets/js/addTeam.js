import team from "./service/team.js";

const addTeam = {
  init() {
    addTeam.display(), addTeam.add();
  },
  display() {
    const main = document.querySelector("#app");
    function form() {
      const formTemplate = document.querySelector("#team_add_template");
      const formFrag = formTemplate.content.cloneNode(true);
      formFrag.querySelector("form").style.width = "100%";
      return formFrag;
    }
    main.appendChild(form());
  },
  add() {
    const formElm = document.querySelector(".form_add_team");

    formElm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formContent = new FormData(event.currentTarget);
      const dataContent = Object.fromEntries(
        [...formContent.entries()].filter(([_, value]) => value.trim() !== "")
      );
      console.log(dataContent);
      if (!dataContent.name) {
        const error = "Une équipe doit avoir un nom";
        const message = document.querySelector(".errorAddTeam");
        message.classList.remove("is-hidden");

        setTimeout(() => {
          message.classList.add("is-hidden");
        }, 3000);
        throw new Error(error);
      }
      await team.addTeam(dataContent);

      event.currentTarget.reset();
    });
  },
};
export default addTeam;
