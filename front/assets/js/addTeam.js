import team from "./service/team.js";

const addTeam = {
  init() {
    addTeam.display(), addTeam.add();
  },
  display() {
    const main = document.querySelector("#app");
    // *insertion du formulaire
    function form() {
      const formTemplate = document.querySelector("#team_add_template");
      const formFrag = formTemplate.content.cloneNode(true);
      formFrag.querySelector("form").style.width = "100%";
      return formFrag;
    }
    main.appendChild(form());
  },
  // *méthode d'ajout d'équipe
  add() {
    // *sélection du formulaire
    const formElm = document.querySelector(".form_add_team");
    // *évènement à l'envoi
    formElm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formContent = new FormData(event.currentTarget);
      // *filtre les donnée vide
      const dataContent = Object.fromEntries(
        [...formContent.entries()].filter(([_, value]) => value.trim() !== "")
      );

      // console.log(dataContent);
      // * gestion de l'erreur en cas d'oubli de nom d'équipe
      if (!dataContent.name) {
        const error = "Une équipe doit avoir un nom";
        const message = document.querySelector(".errorAddTeam");
        message.classList.remove("is-hidden");
        // * on ajoute un timer pour faire disparaitre la notif
        setTimeout(() => {
          message.classList.add("is-hidden");
        }, 3000);
        throw new Error(error);
      }

      event.currentTarget.reset();

      await team.addTeam(dataContent);
    });
  },
};
export default addTeam;
