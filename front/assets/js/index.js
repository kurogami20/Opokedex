import pokeHandler from "./home.js";
import type from "./types.js";
import team from "./teams.js";
import addTeam from "./addTeam.js";

const menu = {
  init() {
    addTeam.init(), menu.home(), menu.type(), menu.team(), menu.addTeam();
  },

  erase() {
    document.querySelector("#app").innerHTML = "";
  },
  home() {
    const homeElm = document.querySelector("#nav-item-home");
    homeElm.addEventListener("click", toHome);
    function toHome() {
      menu.erase();
      return pokeHandler.init();
    }
  },
  type() {
    const homeElm = document.querySelector("#nav-item-type");
    homeElm.addEventListener("click", toType);
    function toType() {
      menu.erase();
      type.init();
    }
  },
  team() {
    const homeElm = document.querySelector("#nav-item-team");
    homeElm.addEventListener("click", toTeam);
    function toTeam() {
      menu.erase();
      team.display();
    }
  },
  addTeam() {
    const homeElm = document.querySelector("#nav-item-add-team");
    homeElm.addEventListener("click", toAddTeam);
    function toAddTeam() {
      menu.erase();
      addTeam.init();
    }
  },
};
menu.init();
