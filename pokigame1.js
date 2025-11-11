
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
    //buttons
    const playBtn = document.getElementById('play-btn') || document.getElementById('playBtn');
    const openPokedexBtn = document.getElementById('pokedex-btn') || document.getElementById('openPokedex');
    const exitBtn = document.getElementById('exit-btn') || document.getElementById('exitBtn');
    const backbtn = document.getElementById('backbtn');

    //Area
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
    //buttons
    const storymodeBtn = document.getElementById('storymodebtn');
    const randomisedBtn = document.getElementById('randomisedbtn');
    const backBtn = document.getElementById('backbtn');

    //Areas
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

//randomised
document.addEventListener('DOMContentLoaded', () => {
    const backrandommenu = document.getElementById('backrandommenu');
    const randomisedArea = document.querySelector('.randomisedArea');
    const gameArea = document.querySelector('.game-area');

    /*battle logic
    - infoBox still also be there narating what happening during fight
    - info box tellls what spawned(spawn comes in random) and a button saying next
    - After pressing next you get a small pokedex pop up in the infobox with a search bar
    - when you search a pokemon by either name or number their name typr lvl and stats shuld show
    - there should be a button for add you choose up to 5 pokemons has to be different cannot be same pokemon chossen twice
    - there also shousl be a deletebtn for deleting pokemon from your team 
    - once the required amount(5) there should be a ready? btn that should aprea in info box
    - pokemonbtn should make so you can change the pokemon from the ones youve choosen
    - turn by trun the opponent pokemon attack should be randomised using battle formula
    - fightbtn should show all the attacks able to do in info btn
    - the attacks should bt in btn form 
    - run btn means youve forfit and you lose
    - once you win or lose a button should show up in infobox : another round?
    */

    // Back from randomised area
    backrandommenu?.addEventListener('click', () => {
        randomisedArea?.classList.add('hidden');
        gameArea?.classList.remove('hidden');
    });
});


//storymode
document.addEventListener('DOMContentLoaded', () => {
    // Buttons
    const introbtn = document.getElementById('introbtn');
    const skipbtn = document.getElementById('skipbtn');
    const backstorymenu = document.getElementById('backstorymenu');
    const backskipmenu = document.getElementById('backskipmenu');
    const backbtnstorymode = document.getElementById('backbtnstorymode');
    const nextbtnstorymode = document.getElementById('nextbtnstorymode');
    const backlvlareabtn = document.getElementById('backlvlareabtn');

    // Areas
    const gameArea = document.querySelector('.game-area');
    const storymodemenu = document.querySelector('.storymodemenu');
    const storymodeArea = document.querySelector('.storymodeArea');
    const lvlarea = document.getElementById('lvlarea');
    const storymodeText = document.querySelector('.storymodeText');
    const storyintrobattletext = document.querySelector('.storyintrobattletext');

    // Level buttons & content
    const levelNames = ['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
    const lvlBtns = levelNames.map((_, i) => document.getElementById(`lvl${i+1}btn`));
    const lvlContents = levelNames.map(name => document.getElementById(`level${name}`));

    const hideAllLevels = () => lvlContents.forEach(c => c?.classList.add('hidden'));
    const hideAllBtns = () => lvlBtns.forEach(b => b?.classList.add('hidden'));
    const showAllBtns = () => lvlBtns.forEach(b => b?.classList.remove('hidden'));

    function restartTyping(el) {
    if (!el) return;
    el.style.animation = 'none';
    void el.offsetWidth; // trigger reflow
    el.style.animation = null;}

    const levelsConfig = [
    { id: 1, title: 'Pewter Gym', opponents: ['geodude','onix'], choose: 2, summaryId: 'battle1Summary', aftermathId: 'after1' },
    { id: 2, title: 'Violet Gym', opponents: ['pidgey','hoothoot','pidgeot'], choose: 3, summaryId: 'battle2Summary', aftermathId: 'after2' },
    { id: 3, title: 'Rustboro Gym', opponents: ['geodude','nosepass'], choose: 2, summaryId: 'battle3Summary', aftermathId: 'after3' },
    { id: 4, title: 'Mossdeep Gym', opponents: ['solrock','lunatone'], choose: 2, summaryId: 'battle4Summary', aftermathId: 'after4' },
    { id: 5, title: 'Veilstone Gym', opponents: ['meditite','machoke','lucario'], choose: 3, summaryId: 'battle5Summary', aftermathId: 'after5' },
    { id: 6, title: 'Lumiose Gym', opponents: ['magneton','heliolisk','luxray'], choose: 3, summaryId: 'battle6Summary', aftermathId: 'after6' },
    { id: 7, title: 'Grand Trial (Akala)', opponents: ['crabrawler','hariyama'], choose: 2, summaryId: 'battle7Summary', aftermathId: 'after7' },
    { id: 8, title: 'Grand Trial (Ula\'ula)', opponents: ['sableye','krookodile'], choose: 2, summaryId: 'battle8Summary', aftermathId: 'after8' },
    { id: 9, title: 'Alola League Finals', opponents: ['decidueye','incineroar'], choose: 2, summaryId: 'battle9Summary', aftermathId: 'after9' },
    { id: 10, title: 'World Coronation Series Debut', opponents: ['charizard','dragapult','rillaboom','cinderace','inteleon'], choose: 5, summaryId: 'battle10Summary', aftermathId: 'after10' },
    { id: 11, title: 'Masters 8 Finals', opponents: ['charizard','dragapult','rillaboom','cinderace','inteleon'], choose: 5, summaryId: 'battle11Summary', aftermathId: 'after11' },
    { id: 12, title: 'Final Encounter', opponents: ['meowth','wobbuffet','inkay','woobat','seviper','mimikyu','koffing','chimecho','murkrow','wailmer','frillish','yamask','amoonguss','carnivine'], choose: 10, summaryId: 'battle12Summary', aftermathId: 'after12' }
    ];
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


    // Next storymode
    nextbtnstorymode?.addEventListener('click', () => {
        storymodeText?.classList.add('hidden');
        storyintrobattletext?.classList.remove('hidden');
        restartTyping(storyintrobattletext);
    });

    // Level buttons -> show content
    lvlBtns.forEach((btn, i) => {
        btn?.addEventListener('click', () => {
            lvlarea?.classList.add('hidden');
            hideAllBtns();
            hideAllLevels();

            const currentLevel = levelsConfig[i];
            const targetDiv = lvlContents[i];
            targetDiv?.classList.remove('hidden');

            // Removeold overlay
            let oldBox = targetDiv.querySelector('.infobox');
            if (oldBox) oldBox.remove();

            // Create new info box (does not remove background)
            const infoBox = document.createElement('div');
            infoBox.classList.add('infobox');
            infoBox.innerHTML = `
                <h2>${currentLevel.title}</h2>
                <p><strong>Opponents:</strong> ${currentLevel.opponents.join(', ')}</p>
                <p><strong>Choose:</strong> ${currentLevel.choose} Pokémon</p>
                <div class="info-buttons">
                    <button class="infonext-btn">Next</button>               
                </div>
            `;
            targetDiv.appendChild(infoBox);

            // Buttons inside the info box
            infoBox.querySelector('.infonext-btn')?.addEventListener('click', () => {
                infoBox.remove();
                /*battle logic here
                
                -  After pressing next you get a small pokedex pop up in the infobox(it will be where all text for battle appear) with a search bar 
                - when you search a pokemon by either name or number their name typr lvl and stats shuld show(cannot be same pokemon chossen twice)
                - there should be a button for add when you search the certain amount of pokemon the level requires then it is saved in the pokemon btn
                - there also shousl be a deletebtn for deleting pokemon from your team 
                - once the required amount is there a ready? btn should aprea in info box
                -  pokemonbtn should make so you can change the pokemon from the ones youve choosen
                - turn by trun the opponent pokemon attack should be randomised using battle formula
                - fightbtn should show all the attacks able to do in info btn
                - the attacks should bt in btn form 
                - run btn means youve forfit and you lose(stil able to continue)
                - no matter if you lose or win you get to see battle and aftermath summarry and continue to the next level
                - it should tally how many wins and loses you got but only if you go from 1 to 12 without leaving to the levelarea
                */
            });

            //back to levelarea
            const backlvlareabtn = targetDiv.querySelector('.backlvlareabtn');
            backlvlareabtn?.addEventListener('click', () => {
                targetDiv.classList.add('hidden');
                lvlarea?.classList.remove('hidden');
                showAllBtns();
            });
        });
    });
});




//pokefight knowlage
// BeforetheFirst
// battle against: Geodude, Onix. Choose two pokemons 
// after wining(next btn) or losing(if lose choice to try again) show BattleSummary text(with proffecor bg and professor there)
//Aftermath text(with proffecor bg and professor there)

// battle against: Pokemon: Pidgey, Hoothoot, Pidgeot. Choose three pokemons 
// after wining(next btn) or losing(if lose choice to try again) show BattleSummary text(with proffecor bg and professor there)
//Aftermath text(with proffecor bg and professor there)

// battle against:Geodude, Nosepass. Choose two pokemons 
// after wining(next btn) or losing(if lose choice to try again) show BattleSummary text(with proffecor bg and professor there)
//Aftermath text(with proffecor bg and professor there)

// battle against: Solrock, Lunatone. Choose two pokemons 
// after wining(next btn) or losing(if lose choice to try again) show BattleSummary text(with proffecor bg and professor there)
//Aftermath text(with proffecor bg and professor there)

// battle against:Meditite, Machoke, Lucario Choose three pokemons 
// after wining(next btn) or losing(if lose choice to try again) show BattleSummary text(with proffecor bg and professor there)
//Aftermath text(with proffecor bg and professor there)

// battle against:Magneton, Heliolisk, Luxray. Choose three pokemons 
// after wining(next btn) or losing(if lose choice to try again) show BattleSummary text(with proffecor bg and professor there)
//Aftermath text(with proffecor bg and professor there)

// battle against: Crabrawler, Hariyama. Choose two pokemons 
// after wining(next btn) or losing(if lose choice to try again) show BattleSummary text(with proffecor bg and professor there)
//Aftermath text(with proffecor bg and professor there)

// battle against: Sableye, Krookodile. Choose two pokemons 
// after wining(next btn) or losing(if lose choice to try again) show BattleSummary text(with proffecor bg and professor there)
//Aftermath text(with proffecor bg and professor there)

// battle against: Decidueye, Incineroar(input info Lycanroc (Midnight Form) and Tapu Koko could not join us due to other collabs). Choose two pokemons 
// after wining(next btn) or losing(if lose choice to try again) show BattleSummary text(with proffecor bg and professor there)
//Aftermath text(with proffecor bg and professor there)

// battle against: Charizard(input info Gigantamax vers could not join us due to other collabs), Dragapult,Rillaboom, Cinderace, Inteleon. Choose five pokemons 
// after wining(next btn) or losing(if lose choice to try again) show BattleSummary text(with proffecor bg and professor there)
//Aftermath text(with proffecor bg and professor there)

// battle against: Charizard(input info Gigantamax vers could not join us due to other collabs), Dragapult,Rillaboom, Cinderace, Inteleon. Choose five pokemons 
// after wining(next btn) or losing(if lose choice to try again) show BattleSummary text(with proffecor bg and professor there)
//Aftermath text(with proffecor bg and professor there)

// battle against: Meowth,Wobbuffet, Inkay , Woobat, Seviper, Mimikyu-disguised, Koffing, Chimecho, Murkrow, Wailmer, Frillish, Yamask, Amoonguss, Carnivine(input info Gourgeist and Mime Jr could not join us due to other collabs). Choose 10 pokemons
// after wining(next btn) or losing(if lose choice to try again) show BattleSummary text(with proffecor bg and professor there)
//Aftermath text(with proffecor bg and professor there)


//buttons made in html and css(dont got time) placement levelone, leveltwo... btns(btn placement css) 
//damage formula:(((2 x Level / 5 + 2) x Power x (Attack / Defense)) / 50) + 2) x ModifiersDamage ModifiersDamage = STAB × Type advantages × Random factor
//notes all pokemon are lvl 5,  Power: The strength of the attack, retrieved from PokeAPI.co.
// type advantages: use type advantage table

