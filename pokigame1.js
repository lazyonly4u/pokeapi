
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

    const input = document.getElementById("pokemonName");
    if (input) input.value = apiName;
    
    // Create or update label for Pokemon name
    let label = document.getElementById("pokemonNameLabel");
    if (!label) {
        label = document.createElement("div");
        label.id = "pokemonNameLabel";
        label.style.marginTop = "5px";
        label.style.fontWeight = "600";
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
  
}

window.fetchData = fetchData;

document.addEventListener('DOMContentLoaded', () => {
    const pokedexFetchBtn = document.getElementById('pokedexFetchBtn');
    pokedexFetchBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        // call the already-defined fetch function
        fetchData();
    });
});

// Toggle intro -> menu
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const intro = document.querySelector('.intro');
    const menu = document.querySelector('.menu');

    // immediate start on click
        startBtn?.addEventListener('click', () => {
        intro?.classList.add('hidden');
        menu?.classList.remove('hidden');

    });
});

// Handle menu buttons (updated to show loading screen for 5s before pokedex)
document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-btn') || document.getElementById('playBtn');
    const openPokedexBtn = document.getElementById('pokedex-btn') || document.getElementById('openPokedex');
    const exitBtn = document.getElementById('exit-btn') || document.getElementById('exitBtn');
    const backbtn = document.getElementById('backbtn');

    const menu = document.querySelector('.menu');
    const gameArea = document.querySelector('.game-area');
    const pokedexArea = document.querySelector('.pokedex');
    const loadScreen = document.querySelector('.load');

    // Play button
    playBtn?.addEventListener('click', () => {
        menu?.classList.add('hidden');
        gameArea?.classList.remove('hidden');
    });

    // Exit button
    exitBtn?.addEventListener('click', () => {
        window.close();
    });

    // Pokedex button with loading screen
    openPokedexBtn?.addEventListener('click', () => {
        menu?.classList.add('hidden');
        loadScreen?.classList.remove('hidden');
        openPokedexBtn.disabled = true;

        // After 5 seconds, show pokedex and hide loading screen
        setTimeout(() => {
            loadScreen?.classList.add('hidden');
            pokedexArea?.classList.remove('hidden');
            openPokedexBtn.disabled = false;
        }, 5000);

        // Close Pokedex button
        const closePokedexBtn = document.getElementById('closePokedexBtn');
        closePokedexBtn?.addEventListener('click', () => {
        // hide pokedex panel and show menu
        pokedexArea?.classList.add('hidden');
        menu?.classList.remove('hidden');

        // remove any pokedex result content created by fetchData
        const content = pokedexArea?.querySelector('.pokedex-content');
        if (content) {
            content.remove();
            return;
        }        
            // fallback removal of individual elements if content wrapper not found
            document.getElementById('pokemonSprite')?.remove();
            document.getElementById('pokemonNameLabel')?.remove();
            document.getElementById('pokemonId')?.remove();
            document.getElementById('pokemonStats')?.remove();
        
            // optionally clear the search input
            const input = document.getElementById('pokemonName');
            if (input) input.value = '';
        });

    });

    // backbtn in game area
    backbtn?.addEventListener('click', () => {
        gameArea?.classList.add('hidden');
        menu?.classList.remove('hidden');
    });
});

// Handle storymode and randomised buttons
document.addEventListener('DOMContentLoaded', () => {
    const storymodeBtn = document.getElementById('storymodebtn');
    const randomisedBtn = document.getElementById('randomisedbtn');
    const backBtn = document.getElementById('backbtn');

    const gameArea = document.querySelector('.game-area');
    const storymodemenu = document.querySelector('.storymodemenu');
    const randomisedArea = document.querySelector('.randomisedArea');

    // Storymode menu button 
    storymodeBtn?.addEventListener('click', () => {
        gameArea?.classList.add('hidden');
        storymodemenu?.classList.remove('hidden');   
    });

    // Randomised button
    randomisedBtn?.addEventListener('click', () => {
        gameArea?.classList.add('hidden');
        randomisedArea?.classList.remove('hidden');
    });

    // Back button
    backBtn?.addEventListener('click', () => {
        storymodemenu?.classList.add('hidden');
        randomisedArea?.classList.add('hidden');
        menu?.classList.remove('hidden');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Buttons
    const introbtn = document.getElementById('introbtn');
    const skipbtn = document.getElementById('skipbtn');
    const backstorymenu = document.getElementById('backstorymenu');
    const backskipmenu = document.getElementById('backskipmenu');
    const backbtnstorymode = document.getElementById('backbtnstorymode');
    const backrandommenu = document.getElementById('backrandommenu');
    const nextbtnstorymode = document.getElementById('nextbtnstorymode');

    // Areas
    const gameArea = document.querySelector('.game-area');
    const storymodemenu = document.querySelector('.storymodemenu');
    const storymodeArea = document.querySelector('.storymodeArea');
    const lvlarea = document.getElementById('lvlarea');
    const randomisedArea = document.querySelector('.randomisedArea');
    const storymodeText = document.querySelector('.storymodeText');
    const storyintrobattletext = document.querySelector('.storyintrobattletext');

    // Level buttons & content
    const levelNames = ['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
    const lvlBtns = levelNames.map((_, i) => document.getElementById(`lvl${i+1}btn`));
    const lvlContents = levelNames.map(name => document.getElementById(`level${name}`));

    const hideAllLevels = () => lvlContents.forEach(c => c?.classList.add('hidden'));
    const hideAllBtns = () => lvlBtns.forEach(b => b?.classList.add('hidden'));
    const showAllBtns = () => lvlBtns.forEach(b => b?.classList.remove('hidden'));

    // Intro button
    introbtn?.addEventListener('click', () => {
        storymodemenu?.classList.add('hidden');
        storymodeArea?.classList.remove('hidden');
    });

    // Skip button
    skipbtn?.addEventListener('click', () => {
        storymodemenu?.classList.add('hidden');
        lvlarea?.classList.remove('hidden');
        hideAllLevels();
        showAllBtns();
    });

    // Back from skip
    backskipmenu?.addEventListener('click', () => {
        lvlarea?.classList.add('hidden');
        hideAllLevels();
        hideAllBtns();
        storymodemenu?.classList.remove('hidden');
    });

    // Back from storymode area
    backbtnstorymode?.addEventListener('click', () => {
        storymodeArea?.classList.add('hidden');
        storymodemenu?.classList.remove('hidden');
    });

    // Back from story menu
    backstorymenu?.addEventListener('click', () => {
        storymodemenu?.classList.add('hidden');
        storymodeArea?.classList.add('hidden');
        lvlarea?.classList.add('hidden');
        hideAllLevels();
        hideAllBtns();
        gameArea?.classList.remove('hidden');
    });

    // Back from randomised area
    backrandommenu?.addEventListener('click', () => {
        randomisedArea?.classList.add('hidden');
        gameArea?.classList.remove('hidden');
    });

    // Next storymode
    nextbtnstorymode?.addEventListener('click', () => {
        storymodeText?.classList.add('hidden');
        storyintrobattletext?.classList.remove('hidden');
    });

    // Level buttons -> show content
    lvlBtns.forEach((btn, i) => {
        btn?.addEventListener('click', () => {
            lvlarea?.classList.add('hidden');
            hideAllBtns();
            hideAllLevels();
            lvlContents[i]?.classList.remove('hidden');
        });
    });
});



