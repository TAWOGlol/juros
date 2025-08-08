/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Soluções

function wronggen(aray) {
    let temp = fonc.slice();
    for (let i = 1; i < 4; i++) {
        function iteration(icount = 0) {
            if (icount < 10) {
                const randomindex = rng(temp.length - 1, 1);
                const rando = temp[randomindex]();
                if (Math.round(rando*100) == Math.round(aray[0]*100)) {
                    iteration(icount + 1);
                } else {
                    aray[i] = rando;
                    temp.splice(randomindex, 1);
                }
            }
        }
        iteration();
    }
    return aray;
}

const qmontante = [
    (obj) => {
        capital = dineirorng(obj.classesocial);
        jurospc = rng(200, 20)/100;
        juros = jurospc/100;
        tempo = rng(12, 4);
        let text = obj.text.replaceAll("%valor%", capital);
        text = text.replaceAll("%juros%", jurospc);
        text = text.replaceAll("%tempo%", tempo);
        obj.text = text;
        obj.opt = wronggen([capital * (1 + juros * tempo)]);
        const rite = obj.opt[0];
        shuffle(obj.opt);
        obj.opt.forEach((v, i) => {
            if (v == rite)
                obj.resp = i;
        });
    }, () => {
        return capital * juros * tempo;
    }, () => {
        return capital * (1 + juros * (tempo + 1));
    }, () => {
        return juros * (1 + capital * tempo);
    }, () => {
        return tempo * (1 + capital * juros);
    }, () => {
        return capital * (1 + jurospc * tempo);
    }, () => {
        return capital * 1.42;
    }, () => {
        return capital * 1.69;
    }
]


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Pergunta Related Functions

function dineirorng(classesocial) {
    let val = rng(costprefix[classesocial], 10**classesocial) * 10**(2*classesocial);
    return val;
}

function perguntaobj(text, func, classesocial) {
    let qnomes = usablenames[classesocial];
    const qobjs = objetos[classesocial];
    const randomname = rng(qnomes.length - 1);
    text = text.replaceAll("%nome%", qnomes[randomname]);
    text = text.replaceAll("%objeto%", qobjs[rng(qobjs.length - 1)]);
    qnomes.splice(randomname, 1);
    if (qnomes.length == 0)
        usablenames[classesocial] = nomes[classesocial].slice();
    this.text = text;
    this.classesocial = classesocial;
    this.func = func;
    fonc = func;
    fonc[0](this);
    return this;
}

function pergen(val) {
    usablenames = [nomes[0].slice(), nomes[1].slice(), nomes[2].slice()];
    let pergclas = [0, 0, 0];
    for (let i = 0; i < val; i++) {
        classesocial = 1;
        if (rng(20, 1) == 1)
            classesocial = 2 * rng(1);
        pergclas[classesocial]++;
        const upt = uniqueperguntas[classesocial];
        const upe = upt[pergclas[classesocial] % upt.length];
        perguntas[i] = new perguntaobj(upe[0], upe[1], classesocial);
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Enviroment

const uniqueperguntas = [
    [
        [
            "%nome% comprou %objeto% fiado com um preço de R$ %valor%,00 a uma taxa de juros de %juros%% por dia e pagou %tempo% dias depois. Quanto %nome% teve que pagar?",
            qmontante
        ]
    ], [
        [
            "%nome% comprou %objeto% de R$ %valor%,00 parcelado %tempo%x com uma taxa de %juros%% de juros. Quanto %nome% teve que pagar no final desse período?",
            qmontante
        ], [
            "%nome% quer saber quanto é %valor% - %juros%.",
            qmontante
        ], [
            "%nome% quer saber quanto é %valor% * %juros%.",
            qmontante
        ]
    ], [
        [
            "barriga",
            qmontante
        ]
    ]
];

const nomes = [
    [
        "Madruginha", "Jaiminho"
    ], [
        "Alan", "Bruna", "Clara", "Davi"
    ], [
        "Seu Barriga", "Neymar"
    ]
];

const objetos = [
    [
        "um ovo",
        "um picolé",
        "um refrigerante de 250 ml",
        "um recheado"
    ], [
        "uma geladeira",
        "uma bicicleta",
        "um notebook",
        "uma televisão",
        "um celular"
    ], [
        "um iate",
        "uma lamborghini"
    ]
]

const costprefix = [
    4, 120, 4800
];

let usablenames = null;

let perguntas = [];

let capital, juros, jurospc, tempo, fonc;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Init

pergen(20);