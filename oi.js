/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Element Functions

function toggleelem(elem, val = -1, paret = vanessario) {
    const parent = elem.parentElement;
    paret.appendChild(elem);
    if ((val == -1 && parent != null) || val == 0)
        paret.removeChild(elem);
}

function switchscreen(elem) {
    toggleelem(currentscreen, 0);
    currentscreen = elem;
    toggleelem(currentscreen, 1);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Init Functions

function assigncontracts(val) {
    shuffle(perguntas, val);
    let array = Array(val);
    for (let i = 0; i < val; i++) {
        let num = (i + 1) + "";
        while (num.length < 2)
            num = "0" + num
        const v = newdiv(null, "# " + num);
        array[i] = v;
        toggleelem(v, 1, paret = tabela);
        v.addEventListener("click", () => {
            escolher(i);
        })
    }
    return array;
}

function killonfade(item) {
    function kill() {
        body.removeChild(item);
        scoreobj.forEach((v, i) => {
            v.setnum(pontos[i]);
        });
    }
    item.addEventListener("animationend", kill);
    item.addEventListener("click", kill);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Game Sequence Functions

function changeteam(value = -1) {
    root.classList.remove(teams[team])
    teamdivs[team].classList.remove("select");
    if (value == -1)
        team = !team + 0;
    else
        team = value;
    root.classList.add(teams[team]);
    teamdivs[team].classList.add("select");
    if (teamskip[team] > 0)
        passardiv.classList.remove("disablepassar")
    else
        passardiv.classList.add("disablepassar")
}

function selectgamemode(val) {
    gamemode = val;
    switch (val) {
        case 0:
            switchscreen(lvls);
            toggleelem(soloscoreboard, 1, body);
            break;
        case 1:
            switchscreen(lvls);
            toggleelem(scoreboard, 1, body);
            changeteam(0);
            break;
        default:
            break;
    }
}

function escolher(value) {
    answercount++;
    contracts[value].classList.add("invisible");
    miss = 0;
    value = value % contracts.length;
    let pergunta = perguntas[value];
    if (pergunta == null)
        return bimba();
    switchscreen(jogo);
    value = value + 1 + "";
    while (value.length < 2)
        value = "0" + value;
    cabessdiv.textContent = "Contrato nº " + value;
    perguntadiv.textContent = pergunta.text;
    let alternativas = pergunta.opt;
    let opt = [];
    console.log(pergunta);
    
    switch (pergunta.func) {
        case qcapital:
        case qmontante:
            for (let i = 0; i < 4; i++) {
                opcoesdiv[i].textContent = letras[i] + ") " + monetary(pergunta.opt[i]);
            }
            break;
        case qjuros:
        case qjuros2:
            for (let i = 0; i < 4; i++) {
                opcoesdiv[i].textContent = letras[i] + ") " + Math.round((alternativas[i])*100)/100 + "%";
            }
            break;
        default:
            break;
    }
    resposta = pergunta.resp;
}

function feedback(right, time = 0) {
    if (right) {
        playsound(speechon);
        score(poscore);
        miss = 2;
        flashbang(correct);
    } else {
        playsound(speechoff)
        score(negcore);
        miss++;
        flashbang(wrong);
    }
    if (gamemode == 1) {
        changeteam();
        if (miss > 1)
            home();
    } else
        home();
}

function bimba() {
    playsound(vineboom);
    flashbang(bum);
    score(negcore);
    if (gamemode == 1)
        changeteam();
    home();
}

function flashbang(item) {
    body.appendChild(item);
}

function score(value, tiimu = team) {
    poscore = pos_score;
    pontos[tiimu] += value;
    //teamdivs[tiimu].textContent = scoreprefix[tiimu] + pontos[tiimu];
}

function home() {
    if (answercount == contracts.length) {
        p0 = pontos[0];
        p1 = pontos[1];
        win((p1 >= p0) + (p1 == p0));
    } else
        switchscreen(lvls);
}

function win(value) {
    if (gamemode == 1) {
        changeteam(value);
        if (value == 2){
            windiv.textContent =  "Empate!";
            playsound(convert);
        } else {
            windiv.textContent =  teams[value] + " ganhou!";
            playsound(tada);
        }
    } else {
        playsound(tada);
    }
    switchscreen(windiv);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Enviroment

const root = document.documentElement;
const rootstyle = root.style;
const body = document.body;
const vanessario = document.querySelector(".vanessario");

const convert = new Audio("sfx/convert (5).mp3");
const vineboom = new Audio("sfx/vine boom.mp3");
const speechon = new Audio("sfx/Speech On.wav");
const speechoff = new Audio("sfx/Speech Off.wav");
const tada = new Audio("sfx/tada.wav");

const loadingbg = document.querySelector(".genericbg");
const menu = document.querySelector(".menu");
const lvls = document.querySelector(".lvls");
const tabela = document.querySelector(".tabela");
const jogo = document.querySelector(".jogo");
const cabessdiv = document.querySelector(".cabess");
const perguntadiv = document.querySelector(".pergunta");
const opcoesdiv = document.querySelectorAll(".opcoes div");
const passardiv = document.querySelector(".passar");
const windiv = document.querySelector(".win");
const scoreboard = document.querySelector(".scoreboard");
const soloscoreboard = document.querySelector(".soloscoreboard");
const gamemodes = document.querySelectorAll(".menu .start");

let gamemode = null;
let currentscreen = menu;

const teamdivs = [document.querySelector(".red"), document.querySelector(".blu"), newdiv()]; // o terceiro elemento não faz nada mas o jogo explode se não tiver
const teamtext = [document.querySelector(".red div"), document.querySelector(".blu div")];
const teams = ["RED", "BLU", "DRAW"];

const correct = newdiv("correct", "O");
const wrong = newdiv("wrong", "X");
const bum = newdiv("bum", "💣");

const letras = ['A', 'B', 'C', 'D'];
let resposta = null;

const contracts = assigncontracts(20);

let team = 0;
let teamskip = [2, 2];

const pos_score = 1200;
const neg_score = -500;
let poscore = pos_score;
let negcore = neg_score;
let miss = 0;

const scoreobj = [new odometer(), new odometer(), new odometer()];
let pontos = [0, 0, 0];
let answercount = 0;

//const scoreprefix = ["RED: ", "BLU: "];


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Initialize

[correct, wrong, bum].forEach(killonfade);

changeteam(2);

gamemodes.forEach((v, i) => {
    v.addEventListener("click", () => {
        selectgamemode(i);
    })
});

toggleelem(scoreobj[0].elem, 1, teamdivs[0]);
toggleelem(scoreobj[1].elem, 1, teamdivs[1]);
toggleelem(scoreobj[2].elem, 1, soloscoreboard);

for (let i = 0; i < opcoesdiv.length; i++) {
    opcoesdiv[i].addEventListener("click", () => {
        feedback(i == resposta, 1000);
    })
}

passardiv.addEventListener("click", () => {
    if (teamskip[team] > 0) {
        poscore = 0;
        teamskip[team]--;
        if (gamemode == 1)
            changeteam();
    }
});


[lvls, soloscoreboard, scoreboard, jogo, windiv, loadingbg].forEach(v => {
    toggleelem(v, 0);
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
/////////////////////////////////////////////////////////////////////////////////////////////////////////////