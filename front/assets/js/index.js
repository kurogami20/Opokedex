import pokeHandler from "./home.js";
import type from "./types.js";

const menu = {
  init() {
    type.init(), menu.home(), menu.type();
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
};
menu.init();
