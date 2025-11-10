
async function fetchData() {
    const name = document.getElementById("pokemonName")?.value.trim().toLowerCase();
    if (!name) return;

    // Fetch data from PokeAPI
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) { alert("Pokemon not found"); return; }

    // Parse JSON response
    const data = await res.json(); 
    const src = data?.sprites?.front_default;
    if (!src) { alert("No sprite available"); return; }

    // Get Pokemon name
    const apiName = data.name || "";
    const apiId = data.id || "";

    // Create or update image element
    let img = document.getElementById("pokemonSprite");
    if (!img) {
        img = document.createElement("img");
        img.id = "pokemonSprite";
        document.body.appendChild(img);
    }

    // Set image attributes
    
    img.src = src;
    img.style.display = "block";
    img.width = 200;         
    img.style.height = "auto";
    img.alt = apiName;
    img.style.objectFit = "contain";
    img.style.maxWidth = "100%";


    /*const input = document.getElementById("pokemonName");
    if (input) input.value = apiName;*/

    
    // Create or update label for Pokemon name
    let label = document.getElementById("pokemonNameLabel");
    if (!label) {
        label = document.createElement("div");
        label.id = "pokemonNameLabel";
        label.style.marginTop = "5px";
        label.style.fontWeight = "600";
        label.style.zIndex = "5";
        img.insertAdjacentElement("afterend", label);
    }
    label.textContent = apiName.toUpperCase();

    // api id display (insert after label)
    let idDiv = document.getElementById("pokemonId");
    if (!idDiv) {
        idDiv = document.createElement("div");
        idDiv.id = "pokemonId";
        idDiv.style.marginTop = "5px";
        idDiv.style.fontWeight = "600";
        label.insertAdjacentElement("afterend", idDiv);
    }
    idDiv.textContent = `ID: ${apiId}`;

    // base stats display (insert after idDiv so ID appears before stats)
    let statsDiv = document.getElementById("pokemonStats");
    if (!statsDiv) {
        statsDiv = document.createElement("div");
        statsDiv.id = "pokemonStats";
        statsDiv.style.marginTop = "10px";
        idDiv.insertAdjacentElement("afterend", statsDiv);
    }
    statsDiv.innerHTML = "";
    data.stats.forEach(stat => {
        const statP = document.createElement("p");
        statP.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
        statsDiv.appendChild(statP);
    });

   
    //list of attacks display
    /*
    let movesDiv = document.getElementById("pokemonMoves");
    if (!movesDiv) {
        movesDiv = document.createElement("div");
        movesDiv.id = "pokemonMoves";
        movesDiv.style.marginTop = "10px";
        statsDiv.insertAdjacentElement("afterend", movesDiv);
    }
    movesDiv.innerHTML = "<strong>Moves:</strong>";
    data.moves.forEach(move => {
        const moveP = document.createElement("p");
        moveP.textContent = move.move.name;
        movesDiv.appendChild(moveP);
    }); */

}

window.fetchData = fetchData;
