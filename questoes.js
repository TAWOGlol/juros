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

function ansshuffle(obj) {
    const rite = obj.opt[0];
    shuffle(obj.opt);
    obj.opt.forEach((v, i) => {
        if (v == rite)
            obj.resp = i;
    });
}

const qmontante = [
    (obj) => {
        capital = dineirorng(obj.classesocial);
        jurospc = rng(200, 20)/100;
        juros = jurospc/100;
        tempo = rng(12, 4);
        let text = obj.text.replaceAll("%valor%", monetary(capital));
        text = text.replaceAll("%juros%", jurospc);
        text = text.replaceAll("%tempo%", tempo);
        obj.text = text;
        obj.opt = wronggen([capital * (1 + juros * tempo)]);
        ansshuffle(obj);
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
    }, () => {
        return dineirorng(gclassesocial);
    }, () => {
        return dineirorng(gclassesocial);
    }
];

const qjuros2 = [
    (obj) => {
        val1 = dineirorng(obj.classesocial);
        val2 = dineirorng(obj.classesocial);
        montante = val1 + val2;
        jurospc = rng(200, 20)/100;
        juros = jurospc/100;
        capital = montante/juros;
        let text = obj.text.replaceAll("%valor%", monetary(capital));
        text = text.replaceAll("%juros%", jurospc);
        text = text.replaceAll("%valor1%", monetary(val1));
        text = text.replaceAll("%valor2%", monetary(val2));
        obj.text = text;
        obj.opt = wronggen([100 * val2/(capital - val1)]);
        ansshuffle(obj);
    }, () => {
        return 1.9;
    }, () => {
        return 1.69;
    }, () => {
        return 1.42;
    }, () => {
        return 1.12;
    }, () => {
        return rng(200, 20)/100;
    }, () => {
        return rng(200, 20)/100;
    }, () => {
        return rng(200, 20)/100;
    }
];

const qjuros = [
    (obj) => {
        capital = dineirorng(obj.classesocial);
        tempo = rng(12, 4);
        jurospc = rng(200, 20)/100;
        juros = jurospc/100;
        montante = capital * (1 + tempo * juros);
        let text = obj.text.replaceAll("%valor%", monetary(capital));
        text = text.replaceAll("%montante%", monetary(montante));
        text = text.replaceAll("%tempo%", tempo);
        obj.text = text;
        obj.opt = wronggen([jurospc]);
        ansshuffle(obj);
    }, () => {
        return 1.9;
    }, () => {
        return 1.69;
    }, () => {
        return 1.42;
    }, () => {
        return 1.12;
    }, () => {
        return rng(200, 20)/100;
    }, () => {
        return rng(200, 20)/100;
    }, () => {
        return rng(200, 20)/100;
    }
];

const qcapital = [
    (obj) => {
        montante = dineirorng(obj.classesocial);
        jurospc = rng(200, 20)/100;
        juros = jurospc/100;
        tempo = rng(12, 4);
        let text = obj.text.replaceAll("%valor%", monetary(montante));
        text = text.replaceAll("%juros%", jurospc);
        text = text.replaceAll("%tempo%", tempo);

        obj.text = text;
        obj.opt = wronggen([montante / (1 + juros * tempo)]);
        ansshuffle(obj);
    }, () => {
        return 1.55 * montante / (1 + juros * tempo);
    }, () => {
        return montante ^ 1.02 / (1 + juros * tempo);
    }, () => {
        return dineirorng(classesocial);
    }, () => {
        return dineirorng(classesocial);
    }, () => {
        return dineirorng(classesocial);
    }
];


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
    gclassesocial = classesocial;
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
            "%nome% comprou %objeto% fiado com um preço de %valor% a uma taxa de juros de %juros%% por dia, em juros simples, e pagou %tempo% dias depois. Quanto %nome% teve que pagar?",
            qmontante
        ]
    ], [
        [
            "%nome% comprou %objeto% de %valor% parcelado %tempo%x, no regime de juros simples, com uma taxa de %juros%% de juros. Quanto %nome% teve que pagar no final desse período?",
            qmontante
        ], [
            "Em uma loja, %objeto% é vendido com as seguintes condições:\n%valor% à vista\nou\nEntrada de %valor1% e 2ª parcela, 1 mês após a compra, de %valor2%\nQual a taxa de juros cobrada neste financiamento?",
            qjuros2
        ], [
            "Determinado capital gerou, após %tempo% meses, um montante de %valor%. Sabendo que a taxa de juros é de %juros%% ao mês, determine o valor desse capital no regime simples.",
            qcapital
        ], [
        //    "Qual o tempo necessário para que um capital, aplicado a uma taxa efetiva de %juros%%a.m no regime composto, duplique seu valor?",
        //    qmontante//
        //], [
            "Um capital de %valor%, aplicado durante %tempo% meses, produziu um montante de %montante%. Determine a taxa de juros dessa aplicação no regime simples.",
            qjuros
        ]
    ], [
        [
            "%nome% investiu %valor% em imóveis, prometendo receber uma taxa de %juros%% ao mês a juros composto. Qual o valor recebido por %nome% após %tempo% meses?",
            qmontante
        ], [
            "%nome% vendeu %objeto% no valor de %valor% parcelado em %tempo%x a juros simples com uma taxa de %juros% por mês. Quanto %nome% recebeu no final desse periodo?",
            qmontante
        ]
    ]
];

const nomes = [
    [
        "Madruguinha", "Jaiminho", "Chaves"
    ], [
        "Adriano", "Alan", "Alessandra", "Alessandro", "Alex", "Alexia", "Alice", "Aline", "Ancelmo",
        "Anna", "Anne", "Anthony", "Antonia", "Antonio", "Arthur", "Azambuja", "Beatriz",
        "Bia", "Bruna", "Bruno", "Carlos", "Caroline", "Cassandra", "Catarina", "Chico", "Chiquinha",
        "Cirilo", "Clara", "Daniel", "Davi", "Diego", "Diex", "Diogo", "Dora",
        "Dorinha", "Eduardo", "Elizete", "Elizângela", "Emanuel", "Enzo", "Expedito", "Ezequiel",
        "Felipe", "Fernando", "Flor", "Flora", "Florinda", "Francisco", "Gabi", "Gabriel", "Gabriela",
        "Gabriele", "Guga", "Gustavo", "Helena", "Isabella", "Isadora", "Jaime", "Jhonatan", "Joaozinho",
        "Joaquim", "Joaquina", "José", "João", "Julia", "Kawe", "Kokimoto", "Kyra", "Lara",
        "Laura", "Letícia", "Liliane", "Liliel", "Liz", "Liza", "Lorriana", "Luan",
        "Luana", "Lucas", "Luiz", "Luiza", "Luna", "Manuela", "Manuela", "Marcos",
        "Maria", "Mariazinha", "Mateus", "Mavie", "Mayara", "Maísa", "Mel", "Miguel",
        "Milena", "Márcia", "Márcio", "Mário", "Nhonho", "Olívia", "Paloma", "Paola",
        "Paula", "Paulina", "Paulo", "Paulo", "Pedrinho", "Pedro", "Priscila", "Quico",
        "Rafael", "Renata", "Renato", "Renzo", "René", "Rikka", "Roberta",
        "Ruth", "Sara", "Silvia", "Suzana", "Sylphie", "Tarantino", "Tatiana", "Thainá",
        "Thales", "Valentina", "Valquíria", "Valéria", "Virginia", "Vitor", "Vitória", "Viviane", "Yamada",
        "Yudi", "Yuri"
    ], [
        "Seu Barriga", "Neymar", "Rudy"
    ],
    
]

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
        "um celular",
        "um console"
    ], [
        "um iate",
        "uma lamborghini"
    ]
]

const costprefix = [
    4, 120, 4800 // 4, 12.000, 48.000.000
];

let usablenames = null;

let perguntas = [];

let montante, capital, juros, jurospc, tempo, val1, val2, gclassesocial, fonc;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Init

pergen(15);