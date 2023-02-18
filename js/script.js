const resultsContainer = document.querySelector(".results");
const loader = document.querySelector(".loader");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

//let currentPage = 1;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const page = params.get("page");

let currentPage = page ? parseInt(page) : 1;

async function fetchCharacters() {
  try {
    loader.style.display = "block";
    const url = `https://rickandmortyapi.com/api/character/?page=${currentPage}`;
    setTimeout(async function() {
      const response = await fetch(url);
      console.log("Response: ", response);
      const json = await response.json();
      const jsonInfo = json.info;
      console.log("Info: ", jsonInfo);
      resultsContainer.innerHTML = "";
      const characters = json.results;
      console.log("Array: ", characters);
      characters.forEach(function(character) {
        let status = "";
        if (character.status !== "unknown") {
          status = `<p class="status">Status: ${character.status}</p>`;
        }
        if (character.status === "Alive") {
          status = `<p class="status">Status: <span class="status-alive">${character.status}</span></p>`;
        }
        if (character.status === "Dead") {
          status = `<p class="status">Status: <span class="status-dead">${character.status}</span></p>`;
        }
        resultsContainer.innerHTML += `<a href="details.html?id=${character.id}" class="card">
          <div class="image" style="background-image: url(${character.image});"></div>
          <div class="details">
            <h4 class="name">${character.name}</h4>
            ${status}
          </div>
        </a>`;
      });
      loader.style.display = "none";
      if (currentPage === 1) {
        prevBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
      }
      if (currentPage === 42) {
        nextBtn.style.display = "none";
      } else {
        nextBtn.style.display = "block";
      }
    }, 900);
  } catch (error) {
    console.log("Error:", error);
    resultsContainer.innerHTML = message("error", error);
    loader.style.display = "none";
  }
}

prevBtn.addEventListener("click", function() {
  if (currentPage > 1) {
    currentPage--;
    try {
      window.scrollTo(0, 0);
      loader.style.display = "block";
      resultsContainer.innerHTML = "";
      setTimeout(async function() {
        await fetchCharacters();
        loader.style.display = "none";
        const url = `?page=${currentPage}`;
        history.pushState({ page: currentPage }, "", url);
      }, 900); 
    } catch (error) {
      console.log("Error:", error);
      resultsContainer.innerHTML = message("error", error);
      loader.style.display = "none";
    }
  }
});

nextBtn.addEventListener("click", function() {
  currentPage++;
  try {
    window.scrollTo(0, 0);
    loader.style.display = "block";
    resultsContainer.innerHTML = "";
    setTimeout(async function() {
      await fetchCharacters();
      loader.style.display = "none";
      const url = `?page=${currentPage}`;
      history.pushState({ page: currentPage }, "", url);
    }, 900);
  } catch (error) {
    console.log("Error:", error);
    resultsContainer.innerHTML = message("error", error);
    loader.style.display = "none";
  }
});


fetchCharacters();
