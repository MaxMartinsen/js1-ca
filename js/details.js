const detailsContainer = document.querySelector(".details");
const loader = document.querySelector(".loader");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = `https://rickandmortyapi.com/api/character/${id}`;

async function fetchCharacters() {
  try {
    loader.style.display = "block";

    setTimeout(async function() {
      const response = await fetch(url);
      const detail = await response.json();

      console.log(detail);
      createHtml(detail);

      loader.style.display = "none";
    }, 1000);
  } catch (error) {
    console.log(error);
    detailsContainer.innerHTML = `<p class="message error">${error}</p>`;
    loader.style.display = "none";
  }
}

fetchCharacters();

function createHtml(character) {
  detailsContainer.innerHTML = `<h1>${character.name}</h1>
    <div class="details-image" style="background-image: url('${character.image}')"></div>
    <div class="details-description">Gender: ${character.gender}</div>
    <time class="details-date">Species: ${character.species}</time>`;
}
