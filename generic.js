/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Generic Functions

function rng(max, min = 0) {
    return parseInt(min + Math.random() * (1 + max - min));
}

function newdiv(clase, text = null) {
    const elem = document.createElement("div");
    elem.classList.add(clase);
    elem.textContent = text;
    return elem;
}

function playsound(a) {
    a.currentTime = 0;
    a.play();
}

function shuffle(aray, val = aray.length) {
    const maxindex = val - 1;
    for (let i = 0; i < val; i++) {
        randomindex = rng(maxindex - i);
        const temp = aray[randomindex];
        aray[randomindex] = aray[maxindex];
        aray[maxindex] = temp;
    }
}

function monetary(val, moeda = "R$") {
    const temp = ((Math.round(val*100)/100 + "").split("."));
    let temp2 = "";
    let valint = parseInt(temp[0]);
    while (valint > 1000) {
        valint /= 1000;
        const splinter = (valint + "").split(".");
        let temp3 = splinter[1] || "";
        while (temp3.length < 3)
            temp3 += "0";
        temp2 = "." + temp3 + temp2;
        valint = parseInt(splinter[0]);
    }
    valint += temp2;
    let valdec = temp[1] || "00";
    while (valdec.length < 2)
        valdec += "0";
    return moeda + " " + valint + "," + valdec;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
/////////////////////////////////////////////////////////////////////////////////////////////////////////////