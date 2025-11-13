
// POKEDEX FETCH FUNCTION

async function fetchData() {
    const name = document.getElementById("pokemonName")?.value.trim().toLowerCase();
    if (!name) return;

    try {
        // Fetch data from PokeAPI
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) { 
            alert("Pokemon not found"); 
            return; 
        }

        const data = await res.json(); 
        const src = data?.sprites?.front_default;
        if (!src) { 
            alert("No sprite available"); 
            return; 
        }

        const apiName = data.name || "";
        const apiId = data.id || "";

        // Create or update Pokemon sprite 
        let img = document.getElementById("pokemonSprite");
        if (!img) {
            img = document.createElement("img");
            img.id = "pokemonSprite";
            document.getElementById("pokedexResult").appendChild(img);
        }

        // image 
        img.src = src;
        img.alt = apiName;

        const input = document.getElementById("pokemonName");
        if (input) input.value = apiName;
        
        // Create or update Pokemon name 
        let label = document.getElementById("pokemonNameLabel");
        if (!label) {
            label = document.createElement("div");
            label.id = "pokemonNameLabel";
            img.insertAdjacentElement("afterend", label);
        }
        label.textContent = apiName.toUpperCase();

        // Create or update Pokemon ID 
        let idDiv = document.getElementById("pokemonId");
        if (!idDiv) {
            idDiv = document.createElement("div");
            idDiv.id = "pokemonId";
            label.insertAdjacentElement("afterend", idDiv);
        }
        idDiv.textContent = `ID: ${apiId}`;

        // Create or update base stats 
        let statsDiv = document.getElementById("pokemonStats");
        if (!statsDiv) {
            statsDiv = document.createElement("div");
            statsDiv.id = "pokemonStats";
            idDiv.insertAdjacentElement("afterend", statsDiv);
        }
        statsDiv.innerHTML = "";
        data.stats.forEach(stat => {
            const statP = document.createElement("p");
            statP.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
            statsDiv.appendChild(statP);
        });
    } catch (error) {
        alert("Error fetching Pokemon data");
        console.error(error);
    }
}

// Make fetchData global
window.fetchData = fetchData;


// HEART FIREWORK EFFECT

function createHeartFirework() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    //  20 hearts fly outward
    const heartCount = 20;
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'absolute';
        heart.style.fontSize = `${Math.random() * 30 + 20}px`;
        heart.style.left = '0';
        heart.style.top = '0';
        heart.style.opacity = '1';
        heart.style.transition = 'all 1.5s ease-out';
        container.appendChild(heart);

        // random angle n distance explosion effect
        const angle = (Math.PI * 2 * i) / heartCount;
        const distance = Math.random() * 300 + 150;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;

        // Animate heart 
        setTimeout(() => {
            heart.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`;
            heart.style.opacity = '0';
        }, 10);
    }

    // Clean up 
    setTimeout(() => {
        container.remove();
    }, 1600);
}

//  heart firework global
window.createHeartFirework = createHeartFirework;


// MAIN LOGIC

document.addEventListener('DOMContentLoaded', () => {
    

    // POKEDEX SEARCH FUNCTIONALITY

    const pokedexFetchBtn = document.getElementById('pokedexFetchBtn');
    pokedexFetchBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        fetchData();
    });

    // Enter key search in Pokedex
    const pokemonNameInput = document.getElementById('pokemonName');
    pokemonNameInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            fetchData();
        }
    });

    // INTRO SCREEN -> MENU 

    const startBtn = document.getElementById('startBtn');
    const intro = document.querySelector('.intro');
    const menu = document.querySelector('.menu');

    startBtn?.addEventListener('click', () => {
        intro?.classList.add('hidden');
        menu?.classList.remove('hidden');
    });

    // MENU BUTTONS & AREAS

    const playBtn = document.getElementById('play-btn');
    const openPokedexBtn = document.getElementById('pokedex-btn');
    const exitBtn = document.getElementById('exit-btn');

    const gameArea = document.querySelector('.game-area');
    const pokedexArea = document.querySelector('.pokedex');
    const loadScreen = document.querySelector('.load');

    // Close Pokedex button 
    const closePokedexBtn = document.getElementById('closePokedexBtn');
    closePokedexBtn?.addEventListener('click', () => {
        pokedexArea?.classList.add('hidden');
        menu?.classList.remove('hidden');

        // Clear Pokedex results
        document.getElementById('pokemonSprite')?.remove();
        document.getElementById('pokemonNameLabel')?.remove();
        document.getElementById('pokemonId')?.remove();
        document.getElementById('pokemonStats')?.remove();
    
        // Clear search 
        const input = document.getElementById('pokemonName');
        if (input) input.value = '';
    });

    // Play button 
    playBtn?.addEventListener('click', () => {
        menu?.classList.add('hidden');
        gameArea?.classList.remove('hidden');
    });

    // Exit button
    exitBtn?.addEventListener('click', () => {
        window.close();
    });

    // Open Pokedex button 
    openPokedexBtn?.addEventListener('click', () => {
        menu?.classList.add('hidden');
        loadScreen?.classList.remove('hidden');
        openPokedexBtn.disabled = true;

        setTimeout(() => {
            loadScreen?.classList.add('hidden');
            pokedexArea?.classList.remove('hidden');
            openPokedexBtn.disabled = false;
        }, 5000);
    });


    // STORYMODE & RANDOMISED

    const storymodeBtn = document.getElementById('storymodebtn');
    const randomisedBtn = document.getElementById('randomisedbtn');
    const backBtn = document.getElementById('backbtn');

    const storymodemenu = document.querySelector('.storymodemenu');
    const randomisedArea = document.querySelector('.randomisedArea');

    // storymode button
    storymodeBtn?.addEventListener('click', () => {
        gameArea?.classList.add('hidden');
        storymodemenu?.classList.remove('hidden');   
    });

    // randomised button
    randomisedBtn?.addEventListener('click', () => {
        gameArea?.classList.add('hidden');
        randomisedArea?.classList.remove('hidden');
    });

    // Back button
    backBtn?.addEventListener('click', () => {
        gameArea?.classList.add('hidden');
        menu?.classList.remove('hidden');
    });

    // RANDOMISED MODE NAVIGATION
    const backrandommenu = document.getElementById('backrandommenu');

    backrandommenu?.addEventListener('click', () => {
        randomisedArea?.classList.add('hidden');
        gameArea?.classList.remove('hidden');
    });


    // HEART BUTTON 

    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('heartbtn')) {
            createHeartFirework();
        }
    });

    // STORYMODE SETUP & NAVIGATION

    const introbtn = document.getElementById('introbtn');
    const skipbtn = document.getElementById('skipbtn');
    const backstorymenu = document.getElementById('backstorymenu');
    const backskipmenu = document.getElementById('backskipmenu');
    const backbtnstorymode = document.getElementById('backbtnstorymode');
    const nextbtnstorymode = document.getElementById('nextbtnstorymode');

    const storymodeArea = document.querySelector('.storymodeArea');
    const lvlarea = document.getElementById('lvlarea');
    const storymodeText = document.querySelector('.storymodeText');
    const storyintrobattletext = document.querySelector('.storyintrobattletext');

    // Level button 
    const levelNames = ['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
    const lvlBtns = levelNames.map((_, i) => document.getElementById(`lvl${i+1}btn`));
    const lvlContents = levelNames.map(name => document.getElementById(`level${name}`));

    //showing/hiding levels
    const hideAllLevels = () => lvlContents.forEach(c => c?.classList.add('hidden'));
    const hideAllBtns = () => lvlBtns.forEach(b => b?.classList.add('hidden'));
    const showAllBtns = () => lvlBtns.forEach(b => b?.classList.remove('hidden'));


    //Restart typing animation

    function restartTyping(el) {
        if (!el) return;
        el.style.animation = 'none';
        void el.offsetWidth; // restart animation pls workkkk
        el.style.animation = null;
    }

    // LEVEL CONFIGURATION

    const levelsConfig = [
        { id: 1, title: 'Pewter Gym', opponents: ['geodude','onix'], choose: 2, summaryId: '1.BattleSummary', aftermathId: '1.Aftermath' },
        { id: 2, title: 'Violet Gym', opponents: ['pidgey','hoothoot','pidgeot'], choose: 3, summaryId: '2.BattleSummary', aftermathId: '2.Aftermath' },
        { id: 3, title: 'Rustboro Gym', opponents: ['geodude','nosepass'], choose: 2, summaryId: '3.BattleSummary', aftermathId: '3.Aftermath' },
        { id: 4, title: 'Mossdeep Gym', opponents: ['solrock','lunatone'], choose: 2, summaryId: '4.BattleSummary', aftermathId: '4.Aftermath' },
        { id: 5, title: 'Veilstone Gym', opponents: ['meditite','machoke','lucario'], choose: 3, summaryId: '5.BattleSummary', aftermathId: '5.Aftermath' },
        { id: 6, title: 'Lumiose Gym', opponents: ['magneton','heliolisk','luxray'], choose: 3, summaryId: '6.BattleSummary', aftermathId: '6.Aftermath' },
        { id: 7, title: 'Grand Trial (Akala)', opponents: ['crabrawler','hariyama'], choose: 2, summaryId: '7.BattleSummary', aftermathId: '7.Aftermath' },
        { id: 8, title: 'Grand Trial (Ula\'ula)', opponents: ['sableye','krookodile'], choose: 2, summaryId: '8.BattleSummary', aftermathId: '8.Aftermath' },
        { id: 9, title: 'Alola League Finals', opponents: ['decidueye','incineroar'], choose: 2, summaryId: '9.BattleSummary', aftermathId: '9.Aftermath' },
        { id: 10, title: 'World Coronation Series Debut', opponents: ['charizard','dragapult','rillaboom','cinderace','inteleon'], choose: 5, summaryId: '10.BattleSummary', aftermathId: '10.Aftermath' },
        { id: 11, title: 'Masters 8 Finals', opponents: ['charizard','dragapult','rillaboom','cinderace','inteleon'], choose: 5, summaryId: '11.BattleSummary', aftermathId: '11.Aftermath' },
        { id: 12, title: 'Final Encounter', opponents: ['meowth','wobbuffet','inkay','woobat','seviper','mimikyu','koffing','chimecho','murkrow','wailmer','frillish','yamask','amoonguss','carnivine'], choose: 10, summaryId: '12.BattleSummary', aftermathId: '12.Aftermath' }
    ];

    // STORYMODE BUTTONS
    
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

    // Backskipmenu
    backskipmenu?.addEventListener('click', () => {
        lvlarea?.classList.add('hidden');
        hideAllLevels();
        hideAllBtns();
        storymodemenu?.classList.remove('hidden');
    });

    // Backstorymode
    backbtnstorymode?.addEventListener('click', () => {
        storymodeArea?.classList.add('hidden');
        storymodemenu?.classList.remove('hidden');
    });

    // Backstorymenu 
    backstorymenu?.addEventListener('click', () => {
        storymodemenu?.classList.add('hidden');
        storymodeArea?.classList.add('hidden');
        lvlarea?.classList.add('hidden');
        hideAllLevels();
        hideAllBtns();
        gameArea?.classList.remove('hidden');
    });

    // Next button 
    nextbtnstorymode?.addEventListener('click', () => {
        // current visible text next
        if (!storymodeText?.classList.contains('hidden')) {
            storymodeText?.classList.add('hidden');
            storyintrobattletext?.classList.remove('hidden');
            restartTyping(storyintrobattletext);
        } else if (!storyintrobattletext?.classList.contains('hidden')) {
            // Move to level selection after intro
            storymodeArea?.classList.add('hidden');
            lvlarea?.classList.remove('hidden');
            showAllBtns();
        }
    });

    // LEVEL SELECTION & BATTLE SYSTEM

    
    lvlBtns.forEach((btn, i) => {
        btn?.addEventListener('click', () => {

            lvlarea?.classList.add('hidden');
            hideAllBtns();
            hideAllLevels();

            const currentLevel = levelsConfig[i];
            const targetDiv = lvlContents[i];
            targetDiv?.classList.remove('hidden');

            let oldBox = targetDiv?.querySelector('.infobox');
            if (oldBox) oldBox.remove();


            // LEVEL INTRO INFO BOX


            const infoBox = document.createElement('div');
            infoBox.classList.add('infobox');
            
            // level 
            const summaryEl = document.getElementById(currentLevel.summaryId);
            const summaryHTML = summaryEl ? summaryEl.innerHTML : 'Get ready for battle!';
            
            infoBox.innerHTML = `
                <h2>${currentLevel.title}</h2>
                <div style="text-align:left;padding:10px;background:rgba(255,203,5,0.1);border-radius:8px;margin:10px 0;">
                    ${summaryHTML}
                </div>
                <p><strong>Opponents:</strong> ${currentLevel.opponents.join(', ').toUpperCase()}</p>
                <p><strong>Choose:</strong> ${currentLevel.choose} Pokémon for your team</p>
                <div class="info-buttons">
                    <button class="infonext-btn">Next</button>               
                </div>
            `;
            targetDiv?.appendChild(infoBox);


            // POKEMON SELECTION SCREEN

            infoBox.querySelector('.infonext-btn')?.addEventListener('click', () => {
                infoBox.remove();
            
                //  Pokemon selection 
                const selectBox = document.createElement('div');
                selectBox.classList.add('infobox');
                selectBox.innerHTML = `
                    <h2>Select Your Pokémon</h2>
                    <div class="pokedex-search">
                        <input type="text" id="searchInput" placeholder="Search Pokémon by name or ID">
                        <button id="searchBtn">Search</button>
                    </div>
                    <div id="searchResult"></div>
                    <div id="teamContainer">
                        <h3>Your Team (${currentLevel.choose} needed):</h3>
                        <ul id="teamList"></ul>
                    </div>
                    <button id="readyBtn" class="hidden">Start Battle</button>
                `;
                targetDiv?.appendChild(selectBox);
            
                const searchInput = selectBox.querySelector('#searchInput');
                const searchBtn = selectBox.querySelector('#searchBtn');
                const searchResult = selectBox.querySelector('#searchResult');
                const teamList = selectBox.querySelector('#teamList');
                const readyBtn = selectBox.querySelector('#readyBtn');
            
                const team = []; //  selected Pokemon
                const maxTeamSize = currentLevel.choose;
            

                // POKEMON SEARCH FUNCTION

                async function searchPokemon() {
                    const name = searchInput?.value.trim().toLowerCase();
                    if (!name) return;
                    
                    searchResult.innerHTML = '<p>Searching...</p>';
                    
                    try {
                        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                        if (!res.ok) throw new Error('Not found');
                        const data = await res.json();
                        
                        // search result display
                        const types = data.types.map(t => t.type.name).join(', ');
                        const stats = data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join('<br>');
                        
                        searchResult.innerHTML = `
                            <img src="${data.sprites.front_default}" alt="${data.name}">
                            <p><strong>${data.name.toUpperCase()}</strong> (Lv. 5)</p>
                            <p><strong>Type:</strong> ${types}</p>
                            <p>${stats}</p>
                            <button id="addBtn">Add to Team</button>
                        `;
            
                        // Add Pokemon to team button
                        const addBtn = searchResult.querySelector('#addBtn');
                        addBtn.onclick = () => {
                            // Check team limit
                            if (team.length >= maxTeamSize) {
                                alert(`You can only choose ${maxTeamSize} Pokémon for this level!`);
                                return;
                            }
                            // Check duplicates
                            if (team.find(p => p.id === data.id)) {
                                alert('You already added this Pokémon!');
                                return;
                            }
                            // Add to team n update display
                            team.push({ 
                                id: data.id, 
                                name: data.name, 
                                sprite: data.sprites.front_default,
                                stats: Object.fromEntries(data.stats.map(s => [s.stat.name, s.base_stat])),
                                types: data.types.map(t => t.type.name),
                                moves: data.moves.slice(0, 6).map(m => m.move.url)
                            });
                            renderTeam();
                            searchResult.innerHTML = '<p style="color: #4CAF50;">Pokémon added to team!</p>';
                        };
                    } catch (err) {
                        searchResult.innerHTML = `<p style="color:#ff4444;">Pokémon not found! Try another name or ID.</p>`;
                    }
                }
            
                // RENDER TEAM FUNCTION

                function renderTeam() {
                    teamList.innerHTML = team.map(p => `
                        <li>
                            <img src="${p.sprite}" alt="${p.name}">
                            <strong>${p.name.toUpperCase()}</strong>
                            <button class="deleteBtn" data-id="${p.id}">Remove</button>
                        </li>
                    `).join('');
            
                    // delete to each Pokemon
                    teamList.querySelectorAll('.deleteBtn').forEach(btn => {
                        btn.addEventListener('click', () => {
                            const id = parseInt(btn.dataset.id);
                            const idx = team.findIndex(p => p.id === id);
                            if (idx > -1) team.splice(idx, 1);
                            renderTeam();
                        });
                    });
            
                    // Show Ready button when team full
                    if (team.length === maxTeamSize) {
                        readyBtn?.classList.remove('hidden');
                    } else {
                        readyBtn?.classList.add('hidden');
                    }
                }
            
                // Search button 
                searchBtn?.addEventListener('click', searchPokemon);
                
                // Enter key press
                searchInput?.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') searchPokemon();
                });

                // START BATTLE

                readyBtn?.addEventListener('click', async () => {
                    // team size
                    if (team.length !== maxTeamSize) {
                        alert(`Please choose exactly ${maxTeamSize} Pokémon to continue.`);
                        return;
                    }


                    selectBox.remove();

                    // Hide info box n prepare battle UI
                    const battleLog = [];

                    const log = (txt) => {
                        battleLog.push(txt);
                        updateBattleDisplay();
                    };
  

                    // FETCH POKEMON DATA

                    async function fetchFullPokemon(nameOrId) {
                        try {
                            const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
                            if (!r.ok) throw new Error('fetch failed');
                            return r.json();
                        } catch {
                            return null;
                        }
                    }

                    // BUILD OPPONENT TEAM

                    const opponentsData = [];
                    for (const name of currentLevel.opponents) {
                        const d = await fetchFullPokemon(name.toLowerCase());
                        if (d) {
                            opponentsData.push({
                                id: d.id,
                                name: d.name,
                                sprite: d.sprites.front_default,
                                stats: Object.fromEntries(d.stats.map(s => [s.stat.name, s.base_stat])),
                                types: d.types.map(t => t.type.name),
                                moves: d.moves.slice(0,6).map(m => m.move.url)
                            });
                        } else {
                            // Fallback default stats (fetch fail)
                            opponentsData.push({ 
                                id: null, 
                                name, 
                                sprite: '', 
                                stats: { hp: 20, attack: 10, defense: 10, 'special-attack':10, 'special-defense':10, speed:10 }, 
                                types: [], 
                                moves: [] 
                            });
                        }
                    }
  
                    // CREATE BATTLE POKEMON

                    const makeCombatant = (obj) => {
                        const hpBase = (obj.stats.hp || 20);
                        return {
                            ...obj,
                            hpMax: Math.max(10, Math.round(hpBase * 2)), // Scale HP 
                            hp: Math.max(10, Math.round(hpBase * 2)),
                            atk: obj.stats.attack || 10,
                            def: obj.stats.defense || 10,
                            spa: obj.stats['special-attack'] || 10,
                            spd: obj.stats['special-defense'] || 10,
                            spdSpeed: obj.stats.speed || 10,
                            moveUrls: obj.moves || []
                        };
                    };
  
                    const playerCombatants = team.map(makeCombatant);
                    const opponentCombatants = opponentsData.map(makeCombatant);
  
                    // BATTLE STATE

                    let currentPlayerIndex = 0;
                    let currentOpponentIndex = 0;
                    let battleEnded = false;
                    let awaitingPlayerAction = true;
  

                    // MOVE CACHE

                    const moveCache = new Map();
                    async function getMove(url) {
                        if (!url) return { name: 'Tackle', power: 40, type: 'normal', damage_class: {name:'physical'} };
                        if (moveCache.has(url)) return moveCache.get(url);
                        try {
                            const r = await fetch(url);
                            const j = await r.json();
                            const mv = { 
                                name: j.name, 
                                power: j.power || 40, 
                                type: j.type.name, 
                                damage_class: j.damage_class 
                            };
                            moveCache.set(url, mv);
                            return mv;
                        } catch {
                            return { name: 'Tackle', power: 40, type: 'normal', damage_class: {name:'physical'} };
                        }
                    }
  
                    // DAMAGE CALCULATOR

                    function calcDamage(attacker, defender, move) {
                        const level = 5;
                        const power = move.power || 40;
                        // special attack/defense 
                        const attackStat = (move.damage_class?.name === 'special') ? attacker.spa : attacker.atk;
                        const defenseStat = (move.damage_class?.name === 'special') ? defender.spd : defender.def;
                        const base = (((2 * level) / 5 + 2) * power * (attackStat / Math.max(1, defenseStat))) / 50 + 2;
                        const stab = attacker.types.includes(move.type) ? 1.5 : 1; // Same Type Attack (Bonus)
                        const randomFactor = (Math.random() * 0.15) + 0.85; // Random variation
                        return Math.max(1, Math.round(base * stab * randomFactor));
                    }
  

                    // UPDATE BATTLE DISPLAY

                    function updateBattleDisplay() {

                        const oldInfo = targetDiv?.querySelector('.battle-info');
                        if (oldInfo) oldInfo.remove();

                        // battle info 
                        const battleInfo = document.createElement('div');
                        battleInfo.classList.add('battle-info', 'infobox');
                        battleInfo.style.bottom = '25%';
                        battleInfo.style.maxHeight = '50vh';
                        
                        // opponent display
                        let opponentsHTML = '<div style="margin-bottom: 15px;"><h3>Opponents</h3>';
                        opponentCombatants.forEach((o, idx) => {
                            const isCurrent = idx === currentOpponentIndex;
                            const hpPercent = (o.hp / o.hpMax) * 100;
                            opponentsHTML += `
                                <div style="display:flex;align-items:center;gap:8px;margin:8px 0;padding:8px;background:${isCurrent ? 'rgba(255,203,5,0.3)' : 'rgba(255,203,5,0.1)'};border-radius:8px;">
                                    <img src="${o.sprite||''}" style="width:48px;">
                                    <div style="flex:1;">
                                        <strong>${o.name.toUpperCase()}</strong> ${isCurrent ? '(Active)' : ''}
                                        <div style="background:#333;height:8px;border-radius:4px;margin-top:4px;overflow:hidden;">
                                            <div style="background:${hpPercent > 50 ? '#4CAF50' : hpPercent > 25 ? '#FFC107' : '#F44336'};width:${hpPercent}%;height:100%;transition:width 0.3s;"></div>
                                        </div>
                                        <small>HP: ${o.hp}/${o.hpMax}</small>
                                    </div>
                                </div>
                            `;
                        });
                        opponentsHTML += '</div>';

                        // player team display
                        let playersHTML = '<div style="margin-bottom: 15px;"><h3>Your Team</h3>';
                        playerCombatants.forEach((p, idx) => {
                            const isCurrent = idx === currentPlayerIndex;
                            const hpPercent = (p.hp / p.hpMax) * 100;
                            playersHTML += `
                                <div style="display:flex;align-items:center;gap:8px;margin:8px 0;padding:8px;background:${isCurrent ? 'rgba(255,203,5,0.3)' : 'rgba(255,203,5,0.1)'};border-radius:8px;">
                                    <img src="${p.sprite||''}" style="width:48px;">
                                    <div style="flex:1;">
                                        <strong>${p.name.toUpperCase()}</strong> ${isCurrent ? '(Active)' : ''}
                                        <div style="background:#333;height:8px;border-radius:4px;margin-top:4px;overflow:hidden;">
                                            <div style="background:${hpPercent > 50 ? '#4CAF50' : hpPercent > 25 ? '#FFC107' : '#F44336'};width:${hpPercent}%;height:100%;transition:width 0.3s;"></div>
                                        </div>
                                        <small>HP: ${p.hp}/${p.hpMax}</small>
                                    </div>
                                </div>
                            `;
                        });
                        playersHTML += '</div>';

                        // log display
                        let logHTML = '<div style="margin-top: 15px;"><h3>Battle Log</h3><div style="max-height:150px;overflow-y:auto;background:rgba(0,0,0,0.5);padding:10px;border-radius:8px;text-align:left;">';
                        battleLog.slice(-10).forEach(msg => {
                            logHTML += `<div style="margin:4px 0;line-height:1.4;">${msg}</div>`;
                        });
                        logHTML += '</div></div>';

                        battleInfo.innerHTML = `
                            <h2>Battle: ${currentLevel.title}</h2>
                            ${opponentsHTML}
                            ${playersHTML}
                            ${logHTML}
                        `;

                        targetDiv?.appendChild(battleInfo);
                    }
  

                    // CHECK BATTLE END

                    function checkBattleEnd() {
                        const allOppDefeated = opponentCombatants.every(o => o.hp <= 0);
                        const allPlayersFainted = playerCombatants.every(p => p.hp <= 0);
                        
                        if (allOppDefeated) {
                            log(`<strong style="color:#4CAF50;"> VICTORY! You won the battle!</strong>`);
                            onBattleEnd(true);
                            return true;
                        }
                        if (allPlayersFainted) {
                            log(`<strong style="color:#F44336;"> DEFEAT! Your team fainted.</strong>`);
                            onBattleEnd(false);
                            return true;
                        }
                        return false;
                    }
  

                    // OPPONENT TURN

                    async function opponentAct() {
                        if (battleEnded) return;
                        
                        const opp = opponentCombatants[currentOpponentIndex];
                        if (!opp || opp.hp <= 0) return;
                        
                        // Small delay 
                        await new Promise(resolve => setTimeout(resolve, 800));
                        
                        // random move opponent's moveset
                        const moveUrl = opp.moveUrls[Math.floor(Math.random() * Math.max(1, opp.moveUrls.length))] || null;
                        const move = await getMove(moveUrl);
                        
                        // Target player Pokemon
                        const target = playerCombatants[currentPlayerIndex];
                        const damage = calcDamage(opp, target, move);
                        target.hp = Math.max(0, target.hp - damage);
                        
                        log(`${opp.name.toUpperCase()} used <strong>${move.name.toUpperCase()}</strong> dealing ${damage} damage to ${target.name.toUpperCase()}!`);
                        updateBattleDisplay();
                        
                        // Auto-switch to next alive Pokemon 
                        if (target.hp <= 0) {
                            log(`${target.name.toUpperCase()} fainted!`);
                            const nextAlive = playerCombatants.findIndex(p => p.hp > 0);
                            if (nextAlive !== -1) {
                                currentPlayerIndex = nextAlive;
                                log(`➡️ Go, ${playerCombatants[currentPlayerIndex].name.toUpperCase()}!`);
                            }
                        }
                        
                        // Check if battle ended otherwise player turn
                        if (!checkBattleEnd()) {
                            awaitingPlayerAction = true;
                        }
                    }
  

                    // PLAYER ATTACK - CHOOSE MOVE

                    async function playerAttack() {
                        if (battleEnded || !awaitingPlayerAction) return;
                        
                        const player = playerCombatants[currentPlayerIndex];
                        const opp = opponentCombatants[currentOpponentIndex];
                        
                        if (!opp || opp.hp <= 0) {
                            log('No opponent to attack.');
                            return;
                        }
                        
                        // Remove old move selection panel
                        const oldPanel = targetDiv?.querySelector('.move-select-panel');
                        if (oldPanel) {
                            oldPanel.remove();
                            return;
                        }
                        
                        // Create move selection panel
                        const movePanel = document.createElement('div');
                        movePanel.classList.add('move-select-panel', 'infobox');
                        movePanel.style.bottom = '5%';
                        movePanel.style.height = 'auto';
                        movePanel.innerHTML = '<h3>Choose Your Move:</h3>';
                        
                        const buttonsDiv = document.createElement('div');
                        buttonsDiv.style.display = 'flex';
                        buttonsDiv.style.flexWrap = 'wrap';
                        buttonsDiv.style.gap = '8px';
                        buttonsDiv.style.justifyContent = 'center';
                        buttonsDiv.style.marginTop = '10px';
                        
                        // 4 moves
                        const moveUrls = player.moveUrls.slice(0, 4);
                        if (moveUrls.length === 0) moveUrls.push(null); // tackle fallback
                        
                        // Fetch n display moves
                        for (const url of moveUrls) {
                            const move = await getMove(url);
                            const btn = document.createElement('button');
                            btn.innerHTML = `<strong>${move.name.toUpperCase()}</strong><br><small>Power: ${move.power || '?'} | Type: ${move.type}</small>`;
                            btn.style.padding = '10px 15px';
                            btn.addEventListener('click', async () => {
                                awaitingPlayerAction = false;
                                movePanel.remove();
                                
                                // do attack
                                const damage = calcDamage(player, opp, move);
                                opp.hp = Math.max(0, opp.hp - damage);
                                log(`${player.name.toUpperCase()} used <strong>${move.name.toUpperCase()}</strong> dealing ${damage} damage to ${opp.name.toUpperCase()}!`);
                                updateBattleDisplay();

                                // Check if opponent faint
                                if (opp.hp <= 0) {
                                    log(`${opp.name.toUpperCase()} fainted!`);
                                    const nextOpp = opponentCombatants.findIndex(o => o.hp > 0);
                                    if (nextOpp !== -1) {
                                        currentOpponentIndex = nextOpp;
                                        log(`Next opponent: ${opponentCombatants[currentOpponentIndex].name.toUpperCase()}`);
                                    }
                                }

                                // Check battle end or opponentturn
                                if (!checkBattleEnd()) {
                                    await opponentAct();
                                }
                            });
                            buttonsDiv.appendChild(btn);
                        }
                        
                        movePanel.appendChild(buttonsDiv);
                        
                        // cancel button
                        const cancelBtn = document.createElement('button');
                        cancelBtn.textContent = 'Cancel';
                        cancelBtn.style.marginTop = '10px';
                        cancelBtn.addEventListener('click', () => movePanel.remove());
                        movePanel.appendChild(cancelBtn);
                        
                        targetDiv?.appendChild(movePanel);
                    }
  

                    // SWITCH POKEMON

                    function showSwitchOptions() {
                        if (battleEnded || !awaitingPlayerAction) return;
                        
                        const oldPanel = targetDiv?.querySelector('.switch-panel');
                        if (oldPanel) {
                            oldPanel.remove();
                            return;
                        }

                        const panel = document.createElement('div');
                        panel.classList.add('switch-panel', 'infobox');
                        panel.style.bottom = '5%';
                        panel.style.height = 'auto';
                        panel.innerHTML = '<h3>Switch Pokémon:</h3>';
                        
                        // button for each Pokemon in playerteam
                        const buttonsDiv = document.createElement('div');
                        buttonsDiv.style.display = 'flex';
                        buttonsDiv.style.flexWrap = 'wrap';
                        buttonsDiv.style.gap = '8px';
                        buttonsDiv.style.justifyContent = 'center';
                        buttonsDiv.style.marginTop = '10px';
                        
                        playerCombatants.forEach((p, idx) => {
                            const b = document.createElement('button');
                            const hpPercent = Math.round((p.hp / p.hpMax) * 100);
                            b.innerHTML = `<img src="${p.sprite}" style="width:32px;vertical-align:middle;"> ${p.name.toUpperCase()}<br><small>HP: ${hpPercent}%</small>`;
                            b.disabled = p.hp <= 0 || idx === currentPlayerIndex; // Can't switch to fainted or current Pokemon
                            b.addEventListener('click', () => {
                                currentPlayerIndex = idx;
                                log(`You switched to ${playerCombatants[currentPlayerIndex].name.toUpperCase()}!`);
                                updateBattleDisplay();
                                panel.remove();
                            });
                            buttonsDiv.appendChild(b);
                        });
                        
                        panel.appendChild(buttonsDiv);
                        
                        // close button
                        const closeBtn = document.createElement('button');
                        closeBtn.textContent = 'Cancel';
                        closeBtn.style.marginTop = '10px';
                        closeBtn.addEventListener('click', () => panel.remove());
                        panel.appendChild(closeBtn);
                        
                        targetDiv?.appendChild(panel);
                    }
  
                    // RUN FROM BATTLE

                    function doRun() {
                        if (battleEnded) return;
                        log('You fled the battle. Battle forfeited.');
                        onBattleEnd(false, { ran: true });
                    }
  
                    // BATTLE END SCREEN

                    function onBattleEnd(victory, opts = {}) {
                        battleEnded = true;
                        awaitingPlayerAction = false;
                        
                        targetDiv?.querySelector('.switch-panel')?.remove();
                        
                        setTimeout(() => {
                            const oldInfo = targetDiv?.querySelector('.battle-info');
                            if (oldInfo) oldInfo.remove();
                            
                            // end-of-battle summary panel
                            const summaryPanel = document.createElement('div');
                            summaryPanel.classList.add('infobox');
                            summaryPanel.style.textAlign = 'center';
                            summaryPanel.innerHTML = `
                                <h2 style="color:${victory ? '#4CAF50' : '#F44336'};">${victory ? 'VICTORY!' : (opts.ran ? 'Fled' : 'DEFEAT')}</h2>
                                <p style="margin: 15px 0;">${victory ? 'Congratulations! You defeated all opponents!' : (opts.ran ? 'You ran from the battle.' : 'Your team was defeated.')}</p>
                                <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px;">
                                    <button id="showSummaryBtn">Show Level Summary</button>
                                    <button id="leaveBtn">Back to Levels</button>
                                </div>
                                <div id="summaryContent" style="margin-top:20px;display:none;"></div>
                            `;
                            targetDiv?.appendChild(summaryPanel);
      
                            // Leave button
                            summaryPanel.querySelector('#leaveBtn')?.addEventListener('click', () => {
                                summaryPanel.remove();
                                lvlarea?.classList.remove('hidden');
                                showAllBtns();
                            });
      
                            // Show Summary button 
                            summaryPanel.querySelector('#showSummaryBtn')?.addEventListener('click', () => {
                                const summaryContent = summaryPanel.querySelector('#summaryContent');
                                if (summaryContent.style.display === 'block') {
                                    summaryContent.style.display = 'none';
                                    return;
                                }
                                
                                // find summary HTML
                                const summaryEl = document.getElementById(currentLevel.summaryId);
                                const aftermathEl = document.getElementById(currentLevel.aftermathId);
      
                                let content = '<div style="text-align:left;padding:15px;background:rgba(255,203,5,0.1);border-radius:8px;">';
                                
                                if (summaryEl) {
                                    content += `<h3 style="color:#ffcb05;">Battle Summary</h3><div style="line-height:1.6;">${summaryEl.innerHTML}</div>`;
                                }
                                
                                if (aftermathEl) {
                                    content += `<h3 style="color:#ffcb05;margin-top:15px;">Aftermath</h3><div style="line-height:1.6;">${aftermathEl.innerHTML}</div>`;
                                }
                                
                                if (!summaryEl && !aftermathEl) {
                                    content += '<p>No summary available for this level.</p>';
                                }
                                
                                content += '</div>';
                                summaryContent.innerHTML = content;
                                summaryContent.style.display = 'block';
                            });
                        }, 1500);
                    }
  

                    // BUTTONS FOR BATTLE                   
                    // Fight button
                    const fightBtn = targetDiv?.querySelector('.fightbtn');
                    const fightHandler = () => {
                        if (awaitingPlayerAction && !battleEnded) {
                            playerAttack();
                        }
                    };
                    fightBtn?.addEventListener('click', fightHandler);
                    
                    // Pokemon button 
                    const pokemonBtn = targetDiv?.querySelector('.pokemonbtn');
                    const pokemonHandler = () => {
                        if (awaitingPlayerAction && !battleEnded) {
                            showSwitchOptions();
                        }
                    };
                    pokemonBtn?.addEventListener('click', pokemonHandler);
                    
                    // Run button 
                    const runBtn = targetDiv?.querySelector('.runbtn');
                    const runHandler = () => {
                        if (!battleEnded) {
                            doRun();
                        }
                    };
                    runBtn?.addEventListener('click', runHandler);
                    
                    // Heart button 
                    const heartBtn = targetDiv?.querySelector('.heartbtn');
                    const heartHandler = () => {
                        if (!battleEnded) {
                            createHeartFirework();
                            log('Heart power activated!');
                        }
                    };
                    heartBtn?.addEventListener('click', heartHandler);
  
                    // INITIAL BATTLE SETUP
                    log(`Battle started: ${currentLevel.title}`);
                    log(`Opponents: ${currentLevel.opponents.join(', ').toUpperCase()}`);
                    log(`Your team: ${team.map(p => p.name.toUpperCase()).join(', ')}`);
                    log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
                    log(`${playerCombatants[currentPlayerIndex].name.toUpperCase()} vs ${opponentCombatants[currentOpponentIndex].name.toUpperCase()}`);
                    log(`Use the battle buttons to Fight, Switch Pokémon, or Run!`);
                    
                    updateBattleDisplay();
                });
            });

            // BACK TO LEVEL AREA BUTTON

            const backlvlareabtn = targetDiv?.querySelector('.backlvlareabtn');
            backlvlareabtn?.addEventListener('click', () => {

                targetDiv?.querySelector('.infobox')?.remove();
                targetDiv?.querySelector('.battle-info')?.remove();
                targetDiv?.querySelector('.switch-panel')?.remove();
                
                // Return 
                targetDiv?.classList.add('hidden');
                lvlarea?.classList.remove('hidden');
                showAllBtns();
            });
        });
    });

    // GAME OVER SCREEN HANDLERS

    const restartBtn = document.getElementById('restartBtn');
    const gameBackBtn = document.getElementById('gameBackBtn');
    const gameOverScreen = document.querySelector('.game-over');

    restartBtn?.addEventListener('click', () => {
        gameOverScreen?.classList.add('hidden');
        // Reset game state and return to menu
        menu?.classList.remove('hidden');
    });

    gameBackBtn?.addEventListener('click', () => {
        gameOverScreen?.classList.add('hidden');
        menu?.classList.remove('hidden');
    });
});