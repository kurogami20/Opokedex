import teamFetcher from "./service/team.js";
import teamPoke from "./service/teamPoke.js";

const teamHandler = {
  init() {
    teamHandler.display(),
      teamHandler.displayModTeame(),
      teamHandler.modTeamName();
    teamHandler.delTeam();
  },

  async display() {
    // * on récupère les team
    const allTeams = await teamFetcher.allteam();
    // *on récupère le main
    const main = document.querySelector("#app");

    // *création du conteneur des teams
    function create(team) {
      const template = document.querySelector("#team_template");
      // création du conteneur
      const teamFrag = template.content.cloneNode(true);
      // sélection des élément à modifier
      const titleElm = teamFrag.querySelector(".team-name");
      const descripElm = teamFrag.querySelector(".team-description");
      const imgContainer = teamFrag.querySelector(".imgContainer");
      const container = teamFrag.querySelector(".container");

      // on ajoute le contenu aux éléments
      container.dataset.id = `${team.id}`;
      titleElm.textContent = `${team.name}`;
      if (team.description === null) {
        descripElm.textContent = "";
      } else {
        descripElm.textContent = `${team.description}`;
      }
      // on récupère les pokémon associé à l'équipe
      const pokemons = team.pokemon;
      // on insert les pokémons dans le conteneur
      pokemons.forEach((pok) => {
        const figElm = document.createElement("figure");
        const imgElm = document.createElement("img");
        figElm.classList.add("image", "is-64x64", "mx-2");
        figElm.dataset.id = `${pok.id}${team.id}`;
        imgElm.classList.add("is-rounded");
        imgElm.src = `./assets/img/${pok.id}.webp`;
        imgContainer.appendChild(figElm);
        figElm.appendChild(imgElm);
      });

      return teamFrag;
    }

    allTeams.forEach((a) => {
      main.appendChild(create(a));
    });
  },
  async displayModTeame() {
    // *on ajoute un setTimeout car les donnée de display() ne sont pas encore chargée
    setTimeout(() => {
      // on récupère les containers de team auxquel on ajoute un ecouteur d'event
      const containers = document.querySelectorAll(".team_container");
      containers.forEach((c) => {
        c.addEventListener("click", modale);
      });
      // affichage et complétion de la modale
      async function modale(event) {
        //* récuperation de la modale
        const modale = document.querySelector('[slot="team_mod"]');
        // on prend l'id de la team sur laquelle on a cliqué
        const id = event.currentTarget.dataset.id;
        // on ajoute cet id a la modale
        modale.dataset.id = id;
        // on récupère la team grace à l'id
        const teamData = await teamFetcher.byIdteam(id);
        //* on ajoute le contenu
        modale.querySelector(".team_name").textContent = `${teamData.name}`;
        // on ajoute l'id de la team dans les input qui en on besoin
        const id_team = modale.querySelectorAll(".id_team");
        id_team.forEach((t) => {
          t.value = `${id}`;
        });

        const formNameElm = modale.querySelector('[slot="change_name_team"]');
        const input = formNameElm.querySelector(".input");
        input.value = `${teamData.name}`;
        modale.querySelector(
          '[slot="description"]'
        ).textContent = `${teamData.description}`;
        // * on ajoute la fonction la fonction d'affichage des pokémon (contenu de la modale)lié à l'équipe
        displayModalContent();
        // on affiche la modale
        modale.classList.add("is-active");
      }
      // *gestion de la fermeture de la modale
      const modal = document.querySelector('[slot="team_mod"]');
      const closeElm = modal.querySelectorAll(".close");
      closeElm.forEach((c) => {
        c.addEventListener("click", () => {
          modal.classList.remove("is-active");
          const titleElm = document.querySelector(".title_zone");
          const formElm = document.querySelector('[slot="change_name_team"]');
          titleElm.classList.remove("is-hidden");
          formElm.classList.add("is-hidden");
        });
      });
      // * fonction de création du contenu de la modale
      async function displayModalContent() {
        function createFormPoke(poke, team) {
          // récuperation du template
          const formTemplt = document.querySelector("#modTeam_pok");
          // création du frag du template
          const formFrag = formTemplt.content.cloneNode(true);
          // * ajout du contenu
          const img = formFrag.querySelector(".poke_img");
          // image
          img.src = `./assets/img/${poke.id}.webp`;
          // nom
          formFrag.querySelector(".poke_name").textContent = `${poke.name} `;
          // id
          formFrag.querySelector('[slot="pokemon_id"]').value = `${poke.id}`;
          //  id de la team
          formFrag.querySelector('[slot="team_id"]').value = `${team.id}`;
          // type du pokemon
          const spanTypeElm = formFrag.querySelector(".modal_poke_type");
          spanTypeElm.textContent = "";
          const types = poke.type;
          types.forEach((t) => {
            const typeBtnElm = document.createElement("button");
            typeBtnElm.classList.add("button");
            typeBtnElm.style.backgroundColor = `#${t.color}`;
            typeBtnElm.textContent = `${t.name}`;
            spanTypeElm.appendChild(typeBtnElm);
          });

          // les statistiques
          formFrag.querySelector(".pv_progress").value = poke.hp;
          formFrag.querySelector(".atk_progress").value = poke.atk;
          formFrag.querySelector(".def_progress").value = poke.def;
          formFrag.querySelector(".atk-spe_progress").value = poke.atk_spe;
          formFrag.querySelector(".def-spe_progress").value = poke.def_spe;
          formFrag.querySelector(".spd_progress").value = poke.speed;
          return formFrag;
        }

        const team = document.querySelectorAll(".team_container");
        console.log(team);
        const id = Number.parseInt(
          document.querySelector('[slot="team_mod"]').dataset.id
        );

        const modale = document.querySelector('[slot="team_mod"]');
        const main = modale.querySelector('[slot="poke_section"]');
        console.log(main);
        main.innerHTML = "";
        console.log(id);
        const teamData = await teamFetcher.byIdteam(id);
        const pokemons = teamData.pokemon;
        console.log(pokemons);

        pokemons.forEach((p) => {
          main.append(createFormPoke(p, teamData));
        });

        teamHandler.handleModTeam();
      }
    }, 1000);
  },
  // * méthode de modif de team (supression de l'association)
  async handleModTeam() {
    // recupération du formulaire
    const formsPokeTeam = document.querySelectorAll('[slot="poke_team_form"]');
    console.log(formsPokeTeam);
    formsPokeTeam.forEach((f) => {
      f.addEventListener("submit", sendData);
    });
    async function sendData(event) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const { pokemon_id, team_id } = Object.fromEntries(formData);
      //  conversion en nombre
      const data = {
        pokemon_id: Number.parseInt(pokemon_id),
        team_id: Number.parseInt(team_id),
      };
      console.log(data);
      event.currentTarget.remove();
      // on retire le pokemon
      document.querySelector(`[data-id="${pokemon_id}${team_id}"]`).remove();

      await teamPoke.deletePokeTeam(data);
    }
  },
  // * méthode de modif du nom de team
  async modTeamName() {
    // recuperation du bouton dédié a la modif
    const penElms = document.querySelector(".pen");
    // ajout d'évenement
    penElms.addEventListener("click", displayForm);
    // fonction d'affichage du formulaire
    function displayForm() {
      console.log("click");
      const titleElm = document.querySelector(".title_zone");
      const formElm = document.querySelector('[slot="change_name_team"]');
      titleElm.classList.add("is-hidden");
      formElm.classList.remove("is-hidden");
    }
    //* sélection du formulaire
    const form = document.querySelector('[slot="change_name_team"]');
    // ajout d'évenement
    form.addEventListener("submit", sendData);
    //* envoi des data
    async function sendData(event) {
      event.preventDefault();
      const form = event.currentTarget;
      const dataSent = new FormData(form);
      const object = Object.fromEntries(dataSent);
      document.querySelector(".team_name").textContent = `${object.name}`;
      const titleElm = document.querySelector(".title_zone");
      const formElm = document.querySelector('[slot="change_name_team"]');
      titleElm.classList.remove("is-hidden");
      formElm.classList.add("is-hidden");
      await teamFetcher.modTeam(object);
    }
    // * gestion de la fermeture
    const closeForm = form.querySelector(".close_title_mod");
    closeForm.addEventListener("click", () => {
      const titleElm = document.querySelector(".title_zone");
      const formElm = document.querySelector('[slot="change_name_team"]');
      titleElm.classList.remove("is-hidden");
      formElm.classList.add("is-hidden");
    });
  },
  // * méthode de suppression du nom de team
  async delTeam() {
    // recuperation du formulaire
    const form = document.querySelector("#del_team_form");
    // ajout de l'évenement à la soumission
    form.addEventListener("submit", deleteTeam);
    async function deleteTeam(event) {
      event.preventDefault();
      const dataSent = new FormData(form);
      const { id } = Object.fromEntries(dataSent);
      document.querySelector('[slot="team_mod"]').classList.remove("is-active");
      document.querySelector(`[data-id="${id}"]`).remove();
      await teamFetcher.deleteTeam(id);
    }
  },
};

export default teamHandler;
