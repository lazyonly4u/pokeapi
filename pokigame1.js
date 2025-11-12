async function fetchData() {
    const name = document.getElementById("pokemonName")?.value.trim().toLowerCase();
    if (!name) return;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) { alert("Pokemon not found"); return; }

    const data = await res.json(); 
    const src = data?.sprites?.front_default;
    if (!src) { alert("No sprite available"); return; }

    const apiName = data.name || "";
    const apiId = data.id || "";

    let img = document.getElementById("pokemonSprite");
    if (!img) {
        img = document.createElement("img");
        img.id = "pokemonSprite";
        document.body.appendChild(img);
    }

    img.src = src;
    img.style.display = "block";
    img.width = 200;         
    img.style.height = "auto";
    img.alt = apiName;
    img.style.objectFit = "contain";
    img.style.maxWidth = "100%";

    const input = document.getElementById("pokemonName");
    if (input) input.value = apiName;
    
    let label = document.getElementById("pokemonNameLabel");
    if (!label) {
        label = document.createElement("div");
        label.id = "pokemonNameLabel";
        label.style.marginTop = "5px";
        label.style.fontWeight = "600";
        img.insertAdjacentElement("afterend", label);
    }
    label.textContent = apiName.toUpperCase();

    let idDiv = document.getElementById("pokemonId");
    if (!idDiv) {
        idDiv = document.createElement("div");
        idDiv.id = "pokemonId";
        idDiv.style.marginTop = "5px";
        idDiv.style.fontWeight = "600";
        label.insertAdjacentElement("afterend", idDiv);
    }
    idDiv.textContent = `ID: ${apiId}`;

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
        fetchData();
    });

    // Toggle intro -> menu
    const startBtn = document.getElementById('startBtn');
    const intro = document.querySelector('.intro');
    const menu = document.querySelector('.menu');

    startBtn?.addEventListener('click', () => {
        intro?.classList.add('hidden');
        menu?.classList.remove('hidden');
    });

    // Menu buttons
    const playBtn = document.getElementById('play-btn') || document.getElementById('playBtn');
    const openPokedexBtn = document.getElementById('pokedex-btn') || document.getElementById('openPokedex');
    const exitBtn = document.getElementById('exit-btn') || document.getElementById('exitBtn');
    const backbtn = document.getElementById('backbtn');

    const gameArea = document.querySelector('.game-area');
    const pokedexArea = document.querySelector('.pokedex');
    const loadScreen = document.querySelector('.load');

    // FIX #3: Move closePokedexBtn listener OUTSIDE to prevent multiple listeners
    const closePokedexBtn = document.getElementById('closePokedexBtn');
    closePokedexBtn?.addEventListener('click', () => {
        pokedexArea?.classList.add('hidden');
        menu?.classList.remove('hidden');

        const content = pokedexArea?.querySelector('.pokedex-content');
        if (content) {
            content.remove();
            return;
        }        
        document.getElementById('pokemonSprite')?.remove();
        document.getElementById('pokemonNameLabel')?.remove();
        document.getElementById('pokemonId')?.remove();
        document.getElementById('pokemonStats')?.remove();
    
        const input = document.getElementById('pokemonName');
        if (input) input.value = '';
    });

    playBtn?.addEventListener('click', () => {
        menu?.classList.add('hidden');
        gameArea?.classList.remove('hidden');
    });

    exitBtn?.addEventListener('click', () => {
        window.close();
    });

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

    backbtn?.addEventListener('click', () => {
        gameArea?.classList.add('hidden');
        menu?.classList.remove('hidden');
    });

    // Storymode and randomised buttons
    const storymodeBtn = document.getElementById('storymodebtn');
    const randomisedBtn = document.getElementById('randomisedbtn');
    const backBtn = document.getElementById('backbtn');

    const storymodemenu = document.querySelector('.storymodemenu');
    const randomisedArea = document.querySelector('.randomisedArea');

    storymodeBtn?.addEventListener('click', () => {
        gameArea?.classList.add('hidden');
        storymodemenu?.classList.remove('hidden');   
    });

    randomisedBtn?.addEventListener('click', () => {
        gameArea?.classList.add('hidden');
        randomisedArea?.classList.remove('hidden');
    });

    backBtn?.addEventListener('click', () => {
        storymodemenu?.classList.add('hidden');
        randomisedArea?.classList.add('hidden');
        menu?.classList.remove('hidden');
    });

    // Randomised mode
    const backrandommenu = document.getElementById('backrandommenu');

    backrandommenu?.addEventListener('click', () => {
        randomisedArea?.classList.add('hidden');
        gameArea?.classList.remove('hidden');
    });

    // Storymode
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

    const levelNames = ['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
    const lvlBtns = levelNames.map((_, i) => document.getElementById(`lvl${i+1}btn`));
    const lvlContents = levelNames.map(name => document.getElementById(`level${name}`));

    const hideAllLevels = () => lvlContents.forEach(c => c?.classList.add('hidden'));
    const hideAllBtns = () => lvlBtns.forEach(b => b?.classList.add('hidden'));
    const showAllBtns = () => lvlBtns.forEach(b => b?.classList.remove('hidden'));

    function restartTyping(el) {
        if (!el) return;
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = null;
    }

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

    introbtn?.addEventListener('click', () => {
        storymodemenu?.classList.add('hidden');
        storymodeArea?.classList.remove('hidden');
    });

    skipbtn?.addEventListener('click', () => {
        storymodemenu?.classList.add('hidden');
        lvlarea?.classList.remove('hidden');
        hideAllLevels();
        showAllBtns();
    });

    backskipmenu?.addEventListener('click', () => {
        lvlarea?.classList.add('hidden');
        hideAllLevels();
        hideAllBtns();
        storymodemenu?.classList.remove('hidden');
    });

    backbtnstorymode?.addEventListener('click', () => {
        storymodeArea?.classList.add('hidden');
        storymodemenu?.classList.remove('hidden');
    });

    backstorymenu?.addEventListener('click', () => {
        storymodemenu?.classList.add('hidden');
        storymodeArea?.classList.add('hidden');
        lvlarea?.classList.add('hidden');
        hideAllLevels();
        hideAllBtns();
        gameArea?.classList.remove('hidden');
    });

    nextbtnstorymode?.addEventListener('click', () => {
        storymodeText?.classList.add('hidden');
        storyintrobattletext?.classList.remove('hidden');
        restartTyping(storyintrobattletext);
    });

    // Level buttons
    lvlBtns.forEach((btn, i) => {
        btn?.addEventListener('click', () => {
            lvlarea?.classList.add('hidden');
            hideAllBtns();
            hideAllLevels();

            const currentLevel = levelsConfig[i];
            const targetDiv = lvlContents[i];
            targetDiv?.classList.remove('hidden');

            let oldBox = targetDiv.querySelector('.infobox');
            if (oldBox) oldBox.remove();

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

            infoBox.querySelector('.infonext-btn')?.addEventListener('click', () => {
                infoBox.remove();
            
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
                        <h3>Your Team:</h3>
                        <ul id="teamList"></ul>
                    </div>
                    <button id="readyBtn" class="hidden">Ready?</button>
                `;
                targetDiv.appendChild(selectBox);
            
                const searchInput = selectBox.querySelector('#searchInput');
                const searchBtn = selectBox.querySelector('#searchBtn');
                const searchResult = selectBox.querySelector('#searchResult');
                const teamList = selectBox.querySelector('#teamList');
                const readyBtn = selectBox.querySelector('#readyBtn');
            
                const team = [];
                const maxTeamSize = currentLevel.choose;
            
                async function searchPokemon() {
                    const name = searchInput.value.trim().toLowerCase();
                    if (!name) return;
                    try {
                        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                        if (!res.ok) throw new Error('Not found');
                        const data = await res.json();
                        
                        const types = data.types.map(t => t.type.name).join(', ');
                        const stats = data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join('<br>');
                        
                        searchResult.innerHTML = `
                            <img src="${data.sprites.front_default}" alt="${data.name}">
                            <p><strong>${data.name.toUpperCase()}</strong> (Lv. 5)</p>
                            <p>Type: ${types}</p>
                            <p>${stats}</p>
                            <button id="addBtn">Add to Team</button>
                        `;
            
                        const addBtn = searchResult.querySelector('#addBtn');
                        addBtn.onclick = () => {
                            if (team.length >= maxTeamSize) {
                                alert(`You can only choose ${maxTeamSize} Pokémon for this level!`);
                                return;
                            }
                            if (team.find(p => p.id === data.id)) {
                                alert('You already added this Pokémon!');
                                return;
                            }
                            team.push({ id: data.id, name: data.name, sprite: data.sprites.front_default });
                            renderTeam();
                        };
                    } catch (err) {
                        searchResult.innerHTML = `<p style="color:red;">Pokémon not found!</p>`;
                    }
                }
            
                function renderTeam() {
                    teamList.innerHTML = team.map(p => `
                        <li>
                            <img src="${p.sprite}" alt="${p.name}" width="50">
                            ${p.name.toUpperCase()}
                            <button class="deleteBtn" data-id="${p.id}">❌</button>
                        </li>
                    `).join('');
            
                    teamList.querySelectorAll('.deleteBtn').forEach(btn => {
                        btn.addEventListener('click', () => {
                            const id = parseInt(btn.dataset.id);
                            const idx = team.findIndex(p => p.id === id);
                            if (idx > -1) team.splice(idx, 1);
                            renderTeam();
                        });
                    });
            
                    if (team.length === maxTeamSize) {
                        readyBtn.classList.remove('hidden');
                    } else {
                        readyBtn.classList.add('hidden');
                    }
                }
            
                searchBtn.addEventListener('click', searchPokemon);
                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') searchPokemon();
                });
            
                // FIX #2: Remove nested listener and alert
                readyBtn.addEventListener('click', async () => {
                    if (team.length !== maxTeamSize) {
                        alert(`Please choose ${maxTeamSize} Pokémon first.`);
                        return;
                    }
  
                    selectBox.remove();
                    const battleBox = document.createElement('div');
                    battleBox.classList.add('infobox');
                    // FIX #1: Added missing < before div
                    battleBox.innerHTML = `
                        <h2>Battle: ${currentLevel.title}</h2>
                        <div id="battle-area">
                            <div id="opponents-area"><h3>Opponents</h3></div>
                            <div id="player-area"><h3>Your Team</h3></div>
                            <div id="battle-log" style="height:120px; overflow:auto; text-align:left; padding:8px; background:rgba(0,0,0,0.6); border-radius:8px; margin-top:8px;"></div>
                            <div id="battle-controls" style="margin-top:8px;">
                                <button id="fightBtn">Fight</button>
                                <button id="switchBtn">Pokémon</button>
                                <button id="runBtn">Run</button>
                            </div>
                        </div>
                    `;
                    targetDiv.appendChild(battleBox);
  
                    const log = (txt) => {
                        const el = battleBox.querySelector('#battle-log');
                        const p = document.createElement('div');
                        p.innerHTML = txt;
                        el.appendChild(p);
                        el.scrollTop = el.scrollHeight;
                    };
  
                    async function fetchFullPokemon(nameOrId) {
                        const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
                        if (!r.ok) throw new Error('fetch failed');
                        return r.json();
                    }
  
                    const playerTeam = [];
                    for (const p of team) {
                        try {
                            const data = await fetchFullPokemon(p.name || p.id);
                            playerTeam.push({
                                id: data.id,
                                name: data.name,
                                sprite: data.sprites.front_default,
                                stats: Object.fromEntries(data.stats.map(s => [s.stat.name, s.base_stat])),
                                types: data.types.map(t => t.type.name),
                                moves: data.moves.slice(0, 6).map(m => m.move.url)
                            });
                        } catch (e) {
                            playerTeam.push({ id: p.id, name: p.name, sprite: p.sprite, stats: { hp: 20, attack: 10, defense: 10, 'special-attack':10, 'special-defense':10, speed:10 }, types: [], moves: [] });
                        }
                    }
  
                    const opponentsData = [];
                    for (const name of currentLevel.opponents) {
                        try {
                            const d = await fetchFullPokemon(name.toLowerCase());
                            opponentsData.push({
                                id: d.id,
                                name: d.name,
                                sprite: d.sprites.front_default,
                                stats: Object.fromEntries(d.stats.map(s => [s.stat.name, s.base_stat])),
                                types: d.types.map(t => t.type.name),
                                moves: d.moves.slice(0,6).map(m => m.move.url)
                            });
                        } catch (e) {
                            opponentsData.push({ id: null, name, sprite: '', stats: { hp: 20, attack: 10, defense: 10, 'special-attack':10, 'special-defense':10, speed:10 }, types: [], moves: [] });
                        }
                    }
  
                    const makeCombatant = (obj) => {
                        const hpBase = (obj.stats.hp || 20);
                        return {
                            ...obj,
                            hpMax: Math.max(10, Math.round(hpBase * 2)),
                            hp: Math.max(10, Math.round(hpBase * 2)),
                            atk: obj.stats.attack || 10,
                            def: obj.stats.defense || 10,
                            spa: obj.stats['special-attack'] || 10,
                            spd: obj.stats['special-defense'] || 10,
                            spdSpeed: obj.stats.speed || 10,
                            moveUrls: obj.moves || []
                        };
                    };
  
                    const playerCombatants = playerTeam.map(makeCombatant);
                    const opponentCombatants = opponentsData.map(makeCombatant);
  
                    const oppArea = battleBox.querySelector('#opponents-area');
                    const playerArea = battleBox.querySelector('#player-area');
  
                    function renderPanels() {
                        oppArea.innerHTML = '<h3>Opponents</h3>' + opponentCombatants.map((o, idx) => `
                            <div style="display:flex;align-items:center;gap:8px">
                                <img src="${o.sprite||''}" width="48">
                                <strong>${o.name.toUpperCase()}</strong> - HP: <span id="opp-hp-${idx}">${o.hp}</span>/<span>${o.hpMax}</span>
                            </div>
                        `).join('');
                        playerArea.innerHTML = '<h3>Your Team</h3>' + playerCombatants.map((p, idx) => `
                            <div style="display:flex;align-items:center;gap:8px">
                                <img src="${p.sprite||''}" width="48">
                                <strong>${p.name.toUpperCase()}</strong> - HP: <span id="ply-hp-${idx}">${p.hp}</span>/<span>${p.hpMax}</span>
                            </div>
                        `).join('');
                    }
  
                    renderPanels();
  
                    let currentPlayerIndex = 0;
                    let currentOpponentIndex = 0;
                    let playerTurn = true;
  
                    const moveCache = new Map();
                    async function getMove(url) {
                        if (!url) return { name: 'Tackle', power: 40, type: 'normal', damage_class: {name:'physical'} };
                        if (moveCache.has(url)) return moveCache.get(url);
                        try {
                            const r = await fetch(url);
                            const j = await r.json();
                            const mv = { name: j.name, power: j.power || 40, type: j.type.name, damage_class: j.damage_class };
                            moveCache.set(url, mv);
                            return mv;
                        } catch {
                            return { name: 'Tackle', power: 40, type: 'normal', damage_class: {name:'physical'} };
                        }
                    }
  
                    function calcDamage(attacker, defender, move) {
                        const level = 5;
                        const power = move.power || 40;
                        const attackStat = (move.damage_class?.name === 'special') ? attacker.spa : attacker.atk;
                        const defenseStat = (move.damage_class?.name === 'special') ? defender.spd : defender.def;
                        const base = (((2 * level) / 5 + 2) * power * (attackStat / Math.max(1, defenseStat))) / 50 + 2;
                        const stab = attacker.types.includes(move.type) ? 1.5 : 1;
                        const randomFactor = (Math.random() * 0.15) + 0.85;
                        return Math.max(1, Math.round(base * stab * randomFactor));
                    }
  
                    function updateHPDisplays() {
                        playerCombatants.forEach((p, idx) => {
                            const e = battleBox.querySelector(`#ply-hp-${idx}`);
                            if (e) e.textContent = p.hp;
                        });
                        opponentCombatants.forEach((o, idx) => {
                            const e = battleBox.querySelector(`#opp-hp-${idx}`);
                            if (e) e.textContent = o.hp;
                        });
                    }
  
                    function checkBattleEnd() {
                        const allOppDefeated = opponentCombatants.every(o => o.hp <= 0);
                        const allPlayersFainted = playerCombatants.every(p => p.hp <= 0);
                        if (allOppDefeated) {
                            log(`<strong>You won the battle!</strong>`);
                            onBattleEnd(true);
                            return true;
                        }
                        if (allPlayersFainted) {
                            log(`<strong>Your team fainted. You lost.</strong>`);
                            onBattleEnd(false);
                            return true;
                        }
                        return false;
                    }
  
                    async function opponentAct() {
                        const opp = opponentCombatants[currentOpponentIndex];
                        if (!opp || opp.hp <= 0) return;
                        const moveUrl = opp.moveUrls[Math.floor(Math.random() * Math.max(1, opp.moveUrls.length))] || null;
                        const move = await getMove(moveUrl);
                        const target = playerCombatants[currentPlayerIndex];
                        const damage = calcDamage(opp, target, move);
                        target.hp = Math.max(0, target.hp - damage);
                        log(`${opp.name.toUpperCase()} used <strong>${move.name}</strong> and dealt ${damage} damage to ${target.name.toUpperCase()}!`);
                        updateHPDisplays();
                        if (target.hp <= 0) {
                            log(`${target.name.toUpperCase()} fainted!`);
                            const nextAlive = playerCombatants.findIndex(p => p.hp > 0);
                            if (nextAlive !== -1) currentPlayerIndex = nextAlive;
                        }
                    }
  
                    async function showFightOptions() {
                        let movesPanel = battleBox.querySelector('.moves-panel');
                        if (movesPanel) movesPanel.remove();
  
                        movesPanel = document.createElement('div');
                        movesPanel.classList.add('moves-panel');
                        movesPanel.style.marginTop = '8px';
                        movesPanel.innerHTML = '<strong>Choose a move:</strong><br>';
                        battleBox.appendChild(movesPanel);
  
                        const player = playerCombatants[currentPlayerIndex];
                        const moveUrls = player.moveUrls.slice(0,4);
                        const moveDetails = await Promise.all(moveUrls.map(getMove));
                        
                        moveDetails.forEach((mv) => {
                            const b = document.createElement('button');
                            b.textContent = `${mv.name} (${mv.power || '?'})`;
                            b.style.margin = '4px';
                            b.addEventListener('click', async () => {
                                const opp = opponentCombatants[currentOpponentIndex];
                                if (!opp || opp.hp <= 0) {
                                    log('No opponent to attack.');
                                    movesPanel.remove();
                                    return;
                                }
                                const damage = calcDamage(player, opp, mv);
                                opp.hp = Math.max(0, opp.hp - damage);
                                log(`${player.name.toUpperCase()} used <strong>${mv.name}</strong> and did ${damage} damage to ${opp.name.toUpperCase()}!`);
                                updateHPDisplays();
                                movesPanel.remove();
  
                                if (opp.hp <= 0) {
                                    log(`${opp.name.toUpperCase()} fainted!`);
                                    const nextOpp = opponentCombatants.findIndex(o => o.hp > 0);
                                    if (nextOpp !== -1) {
                                        currentOpponentIndex = nextOpp;
                                        log(`Next opponent: ${opponentCombatants[currentOpponentIndex].name.toUpperCase()}`);
                                    }
                                }
  
                                if (!checkBattleEnd()) {
                                    await opponentAct();
                                    if (!checkBattleEnd()) {
                                        playerTurn = true;
                                    }
                                }
                            });
                            movesPanel.appendChild(b);
                        });
  
                        if (moveDetails.length === 0) {
                            const b = document.createElement('button');
                            b.textContent = 'Tackle';
                            b.addEventListener('click', async () => {
                                const opp = opponentCombatants[currentOpponentIndex];
                                const mv = { name: 'tackle', power: 40, type: 'normal', damage_class: {name:'physical'} };
                                const damage = calcDamage(player, opp, mv);
                                opp.hp = Math.max(0, opp.hp - damage);
                                log(`${player.name.toUpperCase()} used Tackle and did ${damage} damage to ${opp.name.toUpperCase()}!`);
                                updateHPDisplays();
                                movesPanel.remove();
                                if (!checkBattleEnd()) {
                                    await opponentAct();
                                    checkBattleEnd();
                                }
                            });
                            movesPanel.appendChild(b);
                        }
                    }
  
                    function showSwitchOptions() {
                        const movesPanel = battleBox.querySelector('.moves-panel');
                        if (movesPanel) movesPanel.remove();
  
                        const panel = document.createElement('div');
                        panel.classList.add('switch-panel');
                        panel.style.marginTop = '8px';
                        panel.innerHTML = '<strong>Switch Pokémon:</strong><br>';
                        playerCombatants.forEach((p, idx) => {
                            const b = document.createElement('button');
                            b.textContent = `${p.name.toUpperCase()} (HP: ${p.hp}/${p.hpMax})`;
                            b.style.margin = '4px';
                            b.disabled = p.hp <= 0 || idx === currentPlayerIndex;
                            b.addEventListener('click', () => {
                                currentPlayerIndex = idx;
                                log(`You switched to ${playerCombatants[currentPlayerIndex].name.toUpperCase()}.`);
                                panel.remove();
                            });
                            panel.appendChild(b);
                        });
                        battleBox.appendChild(panel);
                    }
  
                    function doRun() {
                        log('You fled the battle. You forfeit this battle.');
                        onBattleEnd(false, { ran: true });
                    }
  
                    function onBattleEnd(victory, opts = {}) {
                        const controls = battleBox.querySelector('#battle-controls');
                        if (controls) controls.remove();
                        
                        const summaryPanel = document.createElement('div');
                        summaryPanel.style.marginTop = '10px';
                        summaryPanel.innerHTML = `
                            <div style="text-align:center;">
                                <h3>${victory ? 'Victory!' : (opts.ran ? 'Ran Away' : 'Defeat')}</h3>
                                <button id="showSummaryBtn">Show Level Summary</button>
                                <button id="leaveBtn">Back to Levels</button>
                            </div>
                        `;
                        battleBox.appendChild(summaryPanel);
  
                        summaryPanel.querySelector('#leaveBtn')?.addEventListener('click', () => {
                            battleBox.remove();
                            lvlarea?.classList.remove('hidden');
                            showAllBtns();
                        });
  
                        summaryPanel.querySelector('#showSummaryBtn')?.addEventListener('click', () => {
                            const summaryEl = document.getElementById(`${currentLevel.id}.BattleSummary`) || document.getElementById(currentLevel.summaryId);
                            const aftermathEl = document.getElementById(`${currentLevel.id}.Aftermath`) || document.getElementById(currentLevel.aftermathId);
  
                            const showBox = document.createElement('div');
                            showBox.classList.add('infobox');
                            showBox.style.height = 'auto';
                            showBox.innerHTML = `<h3>Level Summary</h3>`;
                            if (summaryEl) showBox.innerHTML += `<div>${summaryEl.innerHTML}</div>`;
                            if (aftermathEl) showBox.innerHTML += `<div style="margin-top:8px;">${aftermathEl.innerHTML}</div>`;
                            if (!summaryEl && !aftermathEl) showBox.innerHTML += `<p>No summary available for this level.</p>`;
                            battleBox.appendChild(showBox);
                        });
                    }
  
                    battleBox.querySelector('#fightBtn')?.addEventListener('click', () => {
                        if (!playerTurn) return;
                        showFightOptions();
                        playerTurn = false;
                    });
                    battleBox.querySelector('#switchBtn')?.addEventListener('click', showSwitchOptions);
                    battleBox.querySelector('#runBtn')?.addEventListener('click', doRun);
  
                    log(`Battle started vs ${currentLevel.opponents.join(', ')}. Choose your actions.`);
                    log(`You have ${playerCombatants.length} Pokémon. First up: ${playerCombatants[currentPlayerIndex].name.toUpperCase()}`);
                    log(`Opponent: ${opponentCombatants[currentOpponentIndex].name.toUpperCase()}`);
                });
            });

            const backlvlareabtn = targetDiv.querySelector('.backlvlareabtn');
            backlvlareabtn?.addEventListener('click', () => {
                targetDiv.classList.add('hidden');
                lvlarea?.classList.remove('hidden');
                showAllBtns();
            });
        });
    });
});