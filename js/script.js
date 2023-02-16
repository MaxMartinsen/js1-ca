const resultsContainer = document.querySelector(".results");
const loader = document.querySelector(".loader");

const url = "https://rickandmortyapi.com/api/character/";

async function fetchCharacters() {

  try {
    loader.style.display = "block";

    setTimeout(async function() {
      const response = await fetch(url);
      console.log("Response from the API: ", response);
      const json = await response.json();

      console.log("JSON data from the API: ", json);

      resultsContainer.innerHTML = "";

      const characters = json.results;

      characters.forEach(function(character) {
        resultsContainer.innerHTML += `<a href="details.html?id=${character.id}" class="card">
                                                <div class="image" style="background-image: url(${character.image});"></div>
                                                <div class="details">
                                                <h4 class="name">${character.name}</h4>
                                                <p class="location">${character.location.name}</p></div></a>`;
      });

      loader.style.display = "none";
    }, 1000);
  } catch (error) {
    console.log("Error:", error);
    resultsContainer.innerHTML = message("error", error);
    loader.style.display = "none";
  }
}

fetchCharacters();

