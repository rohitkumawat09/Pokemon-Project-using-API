const Filter = document.querySelector("#port");
const Data = document.getElementById("name");
const searchInput = document.querySelector(".main");
let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
let allPokemons = [];  // Store all fetched Pokémon

window.addEventListener("load", async () => {
    const mainurl = await loadpokaimon(url);
    console.log(mainurl);
    allPokemons = mainurl;  // Store the Pokémon data
    populateTypeFilter(allPokemons); // Populate type filter options
    displayPokemons(allPokemons);  // Display all Pokémon initially

    // Event listener for type filter
    Filter.addEventListener('change', () => {
        const selectedType = Filter.value;
        filterPokemonsByType(selectedType);
    });

    // Event listener for search input
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        searchPokemons(query);
    });
});

async function loadpokaimon(pokemonUrl) {
    const response = await fetch(pokemonUrl);
    const dataResult = await response.json();
    const dataPromise = dataResult.results.map(async (pokemonData) => {
        const pokemon = await fetch(pokemonData.url);
        return pokemon.json();
    });

    return await Promise.all(dataPromise);
}

function displayPokemons(pokemons) {
    Data.innerHTML = '';  // Clear the existing list

    if (pokemons.length === 0) {
        Data.innerHTML = '<p>No Pokémon found</p>';
    }

    pokemons.forEach((pokemon) => {
        const dote = document.createElement("div");
        dote.classList.add("pokeBox");

        const image = document.createElement("img");
        image.classList = "good";
        image.src = pokemon.sprites.other.dream_world.front_default;
        dote.appendChild(image);

        const pokemonName = document.createElement("h2");
        pokemonName.textContent = pokemon.name;
        pokemonName.classList = "Apple";

        const pokemontype = document.createElement("h3");
        pokemontype.innerText = pokemon.types[0].type.name;
        pokemontype.classList = "open";

        dote.append(pokemonName, pokemontype);
        Data.appendChild(dote);
    });
}

// Populate the type filter dropdown
function populateTypeFilter(pokemons) {
    const types = new Set();
    pokemons.forEach((pokemon) => {
        pokemon.types.forEach((type) => {
            types.add(type.type.name);
        });
    });

    types.forEach((type) => {
        const option = document.createElement("option");
        option.value = type;
        option.innerHTML = type;
        Filter.appendChild(option);
    });
}

function filterPokemonsByType(type) {
    if (type === "  ") {
        displayPokemons(allPokemons);  // Show all if no type is selected
    } else {
        const filtered = allPokemons.filter((pokemon) =>
            pokemon.types.some((t) => t.type.name === type)
        );
        displayPokemons(filtered);
    }
}

function searchPokemons(query) {
    const filtered = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query)
    );
    displayPokemons(filtered);
}
