const Filter = document.querySelector("#port");
const Data = document.getElementById("name");
const searchInput = document.querySelector("#search"); 

let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
let typesUrl = "https://pokeapi.co/api/v2/type/?limit=21";
let types = null;

let offset = 0;
let limit = 20;
let pokemonsData = [];
window.addEventListener("load", async () => {
    const mainurl = await loadpokaimon(url);
    types = await fetchTypes(typesUrl);
    populateFilterSelectList();
    pokemonsData = mainurl; 
    displayPokemons(pokemonsData); 
    
console.log(mainurl);

});


async function fetchTypes(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result.results;
    
}

async function loadpokaimon(pokemon) {
    const response = await fetch(pokemon);
    const dataResult = await response.json();

    const dataPromise = dataResult.results.map(async (Object) => {
        const pokemon = await fetch(Object.url);
        return pokemon.json();
    });

    return await Promise.all(dataPromise);
}


function displayPokemons(pokemons3) {
    Data.innerHTML = "  "; 

    for (let i = 0; i < pokemons3.length; i++) {
        const pokemon = pokemons3[i];
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
        pokemontype.innerText = pokemon.types.map(typess => typess.type.name).join(", ");
        pokemontype.classList = "open";

        dote.append(pokemonName, pokemontype);
        Data.appendChild(dote);
    }
}


function populateFilterSelectList() {
    types.forEach((type) => {
        let pokemonsData = [];
        const option = document.createElement("option");
        option.value = type.name;
        option.innerHTML = type.name;
        Filter.appendChild(option);
    });
}


Filter.addEventListener("change", (e) => {
    const selectedType = e.target.value;
    if (selectedType) {
        const filteredPokemons = pokemonsData.filter((pokemon) =>
            pokemon.types.some((type) => type.type.name === selectedType)
        );
        displayPokemons(filteredPokemons);
    } else {
        
        displayPokemons(pokemonsData);
    }
});


searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredPokemons = pokemonsData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
    );
    displayPokemons(filteredPokemons);
});





/* // // "Load more" functionality
// nextloadpokaimon.addEventListener("click", async () => {
//     nextloadpokaimon.disabled = true; // Disable button to prevent multiple clicks
//     nextloadpokaimon.textContent = 'Loading...';

//     const offset = pokemonsData.length;
//     const newUrl = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
    
//     const newPokemons = await loadpokaimon(newUrl);
//     if (newPokemons) {
//         pokemonsData = [...pokemonsData, ...newPokemons];
//         displayPokemons(pokemonsData);
//     }

//     nextloadpokaimon.disabled = false;
//     nextloadpokaimon.textContent = 'Load More  ';
//     const click = document.createElement("button")
//     nextloadpokaimon.append(click)
//     click.innerHTML="click  me add new pokaimon"
//     nextloadpokaimon.classList="more"
// }); */



const nextloadpokaimon = document.querySelector("#nextloadpokaimon");

nextloadpokaimon.addEventListener("click", loadMorePokemons);

async function loadMorePokemons() {
    nextloadpokaimon.textContent = "Loading..."; 
    offset = limit + offset;  

    let newUrl = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;


    const newPokemonData = await loadpokaimon(newUrl);

    pokemonsData = pokemonsData.concat(newPokemonData);

  
    displayPokemons(pokemonsData);


    nextloadpokaimon.textContent = 'Load More';

    const click = document.createElement("button")
         nextloadpokaimon.append(click)
    click.innerHTML="click  me add new pokaimon"
}









