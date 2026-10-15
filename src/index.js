/*import data from "./data.json";
import mifuncion, { HELLO } from "./modules/modulo.js";

console.log(HELLO);
console.log(mifuncion());

const nuevoArreglo = data.users.filter((user) => user.age > 25);


const usersList = document.querySelector("#users");
const taskInput = document.querySelector(".taskInput");
const taskButton = document.querySelector(".taskButton");

taskButton.addEventListener("click", (e) => {
    console.log(taskInput.value);

    // Agregar un nuevo usuario al arreglo de usuarios
    data.users.push({
        name: taskInput.value,
        age: 30
    });

// Mostrar los usuarios actualizados
   mostrarUsuarios();
   // Limpiar el campo de entrada después de agregar el usuario
   taskInput.value = "";
});

mostrarUsuarios();

function mostrarUsuarios(){
    
    // Limpiar la lista antes de mostrar los usuarios
    usersList.innerHTML = "";

    // Mostrar los usuarios en la lista
    data.users.forEach((user) =>{
    
        console.log(user.name);
        usersList.insertAdjacentHTML("beforeend", `<li>${user.name}</li>`); //mejorar esto
    
    });

}*/

const ID = "83";
const PLACEHOLDER_IMAGE = "https://static.tvmaze.com/uploads/images/medium_portrait/637/1594614.jpg";

const getShowData = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}`;
  const data = await fetch(URL).then(res => res.json());

  return {
    name: data.name,
    rating: data.rating,
    image: data.image?.medium ?? PLACEHOLDER_IMAGE
  }
}

const getEpisodeList = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}/episodes`;
  const episodes = await fetch(URL).then(res => res.json());

  const episodesBySeason = {};
  episodes.forEach((episode) => {
    const season = episode.season;
    if (!episodesBySeason[season]) {
      episodesBySeason[season] = [];
    }
    episodesBySeason[season].push({
      number: episode.number,
      name: episode.name,
      season,
      rating: episode.rating.average
    });
  });

  return episodesBySeason;
}

const show = await getShowData(ID);         // { name, rating, image }
const seasons = await getEpisodeList(ID);   // { 1: [ { number, season, rating }, ... ], 2: ... }

// Los datos de la serie
const $header = document.querySelector(".show-header");
$header.querySelector(".poster").src = show.image;
$header.querySelector("h1").textContent = show.name;

// Cada episodio
const createEpisode = (episode) => {
  const rating = Math.min(10, Math.round(episode.rating ?? 0));
  return `<div class="episode episode-${episode.number} rating-${rating}">
    <span class="episode-name">${episode.name}</span>
    <span class="episode-details">Episodio ${episode.number} <span class="episode-rating">★ ${episode.rating ?? "N/A"}</span></span>
  </div>`;
};

// Cada temporada (data = array de episodios, number = temporada)
const createSeason = (episodes, number) => {
  let seasonHTML = `<article class="season">
    <header class="season-header">T${String(number).padStart(2, "0")}</header>`;

  episodes.forEach((episode) => {
    seasonHTML += createEpisode(episode);
  });

  return `${seasonHTML}</article>`;
};

// Recorre cada temporada y llama a createSeason
const $episodes = document.querySelector(".episodes");
Object.entries(seasons).forEach(([number, episodes]) => {
  $episodes.insertAdjacentHTML("beforeend", createSeason(episodes, Number(number)));
});
