//const numholder = document.querySelector(".numholder");

function odometer() {
    const numholder = newdiv("numholder");
    const onomero = newdiv("namba", "0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5");
    const nomeros = [];

    function cronar(val) {
        for (let i = 0; i < val; i++) {
            let crone = onomero.cloneNode(true);
            numholder.appendChild(crone);
            nomeros[nomeros.length] = crone;
        }
    }

    const rs = numholder.appendChild(newdiv("denario", "R$"));
    cronar(2);
    numholder.appendChild(newdiv("ponto", "."));
    cronar(3);
    numholder.append(newdiv("ponto", ","), newdiv("namba", "0"), newdiv("namba", "0"));

    function sign(val) {
        if (val < 0)
            rs.textContent = "- R$";
        else
            rs.textContent = "R$";
    }

    function setnum(value) {
        sign(value);
        value += "";
        while (value.length < 5)
            value = "0" + value;
        for (let i = 0; i < 5; i++)
            setnum2(parseInt(value[i]), i);
    }

    function setnum2(value, id) {
        const coiso = nomeros[id];
        const coisostyle = coiso.style;
        const nna = -(parseFloat(getComputedStyle(coiso).getPropertyValue("--nb"))/1.5) % 10;
        let nn = [nna, value];
        if (Math.abs(nna - value) > 5)
            nn[(value < nna) + 0] += 10;
        coisostyle.setProperty("--na", "-" + (1.5 * nn[0]) + "em");
        coisostyle.setProperty("--nb", "-" + (1.5 * nn[1]) + "em");
        coisostyle.animation = 'none';
        coiso.offsetHeight;
        coisostyle.animation = null;
    }

    this.elem = numholder;
    this.setnum = setnum;
}