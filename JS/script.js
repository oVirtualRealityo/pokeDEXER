let num = 1;
let pokeNames = [];
let activePokemon = "";
const images = document.getElementById('imgDexSource');
const types = document.getElementById('regionDex');
const infoBox = document.getElementById("infoDex");
const height = document.getElementById('heightInput');
const weight = document.getElementById('weightInput');
const textFielder = document.getElementById('textFielderDex');
const gameList = document.getElementById('gameList');
const pokeNameField = document.getElementById('pokeName');
// deze staat standaard op bulbasaur
getPokemons(1);
getNames();
console.log(pokeNames);



async function getNames() {
    const outputField = document.getElementById('listDex');

    let results = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`);
    let response = await results.json();
    let pokemons = response.results;
    for (let i = 0; i < pokemons.length; i++) 
    {
        pokeNames[i] = pokemons[i].name.toString();
        
    }
    for (let i = 0; i < pokemons.length; i++) {
        let nameField = document.createElement('button');
        nameField.classList.add('pokeButton');
        let name = pokemons[i].name;
        nameField.innerHTML = `${i+1} ${name}`;
        outputField.appendChild(nameField);

        //event listener toevoegen
        nameField.addEventListener('click', function () {
            //De naam opslagen in een andere variabele zodat we deze kunnen meegeven.
            let clickedName = pokemons[i].name;
            console.log(clickedName);
            
            let indexErvan = pokeNames.indexOf(clickedName) +1;
            console.log(clickedName + ': ' + indexErvan);
            getPokemons(indexErvan);
            // Now you can use the 'clickedName' variable as needed
        });
       
     }
     return activePokemon;
     
}

let pokeDex = [];
async function getPokemons(userNum) {
    try {
        let pokeUrl = "https://pokeapi.co/api/v2/pokemon/" + userNum.toString();
        let pokeDescUrl = "https://pokeapi.co/api/v2/pokemon-species/" + userNum.toString() + "/";
        let pokeGames = [];
        let pokeTypes = [];

        let response = await fetch(pokeUrl);
        let results = await response.json();
    
        let responseDesc = await fetch(pokeDescUrl);
        let descResult = await responseDesc.json();

        let pokeID = results.id;
        let pokeText = descResult.flavor_text_entries[1].flavor_text;
        let pokeMonName = results.name;
        let pokeWeight = results.weight;
        let pokeHeight = results.height;
        let pokeImgF = results.sprites.front_default;
        let pokeImgB = results.sprites.back_default;
        for (let i = 0; i < results.types.length; i++) {
            pokeTypes[i] = results.types[i].type.name;
        }
        for (let i = 0; i < results.game_indices.length; i++){
            pokeGames[i] = results.game_indices[i].version.name;
        }
        // kindjes maken: allemaal met een try
        //afbeelding
        try {
        images.src = pokeImgF;

        }
        catch (error) {
            console.error('Iets met de afbeelding: ' + error);
            
        }        
        // de pokenaam 
        try {
            pokeNameField.innerHTML = pokeMonName;
        }
        catch (error) {
            console.error('Iets met de naam: ' + error);
            console.log(pokeMonName);
        }

        // de beschrijvingstekst 
        try {
        textFielder.innerHTML = ""; 
        let textje = document.createElement("p");
        textje.textContent = pokeText;
        textFielder.appendChild(textje);
        }
        catch (error) {
            console.error ('iets met de tekst' + error);
        }
        // gewicht en size
        try {
        weight.innerHTML = "";
        weight.innerHTML = pokeWeight;

        height.innerHTML = "";
        height.innerHTML = pokeHeight;
        }
        catch (error) {
            console.error("Iets met de lengte of gewicht" + error);
        }
        
        // komt voor in welke games? 
        try {
        let games = "";
        gameList.innerHTML = "";
        for (let i = 0; i < pokeGames.length; i++)
        {
            games += pokeGames[i] + " ";
        }
        let pokeGamesList = document.createElement("p");
        pokeGamesList.textContent = games;
        gameList.appendChild(pokeGamesList);
        }
        catch (e) {
            console.error("iets met de gamelist. " + e.message);
        }

        // de pokemonTypes
        try {
        types.innerHTML = "";    
        for (let i = 0; i < pokeTypes.length; i++)
        {
            let type = document.createElement("p");
            type.innerHTML = pokeTypes[i];
            types.appendChild(type);
        }
        }
        catch (e) {
            console.error("errors met de pokeTypes. " + e.message);
        
        }
    }
    catch (error) 
    {
        console.error("Error bij het ophalen van de data. " + error);
    }

}




















