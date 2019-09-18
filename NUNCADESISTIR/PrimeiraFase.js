function Fase1(params) {
    var exemplo = {
        Coisinhas: [],
        toRemove: [],
        ctx: null,
        w: 300,
        h: 300,
    }
    Object.assign(this, exemplo, params);
}

Fase1.prototype = new Fase1();
Fase1.prototype.contructor = Fase1;

Fase1.prototype.adicionar = function (Coisa) {
    this.Coisinhas.push(Coisa);
    Coisa.Fase1 = this;
}

Fase1.prototype.desenhar = function () {
    for (var i = 0; i < this.Coisinhas.length; i++) {
        this.Coisinhas[i].desenhar(this.ctx);
        if (this.Coisinhas[i].props.tipo === "personagem") {
            this.Coisinhas[i].desenharMira(this.ctx);
            this.Coisinhas[i].desenharPersonagem(this.ctx);
        }
    }
}

Fase1.prototype.desenharMira = function () {
    for (var i = 0; i < this.Coisinhas.length; i++) {
        this.Coisinhas[i].desenharMira(this.ctx);
    }
}

Fase1.prototype.mover = function (dt) {
    for (var i = 0; i < this.Coisinhas.length; i++) {
        this.Coisinhas[i].mover(dt);
    }
}

Fase1.prototype.mirar = function () {
    for (var i = 0; i < this.Coisinhas.length; i++) {
        if (this.Coisinhas[i].mirar) {
            this.Coisinhas[i].mirar();
        }
    }
}

Fase1.prototype.inimigos = function () {
    if (dtinimigos < 0) {
        Fase1.adicionar(new Coisa({ /// Direita
            x: canvas.width + (canvas.width * Math.random()),
            y: (canvas.height * Math.random()),
            h: 15,
            w: 15,
            va: 2,
            vm: 50,
            color: "red",
            vida: 1,
            comportar: persegue2(personagem),
            props: { tipo: "inimigo" }
        }));
        Fase1.adicionar(new Coisa({ ///Cima
            x: (canvas.width * Math.random()),
            y: -(canvas.height * Math.random()),
            h: 15,
            w: 15,
            va: 2,
            vm: 50,
            color: "red",
            vida: 1,
            comportar: persegue2(personagem),
            props: { tipo: "inimigo" }
        }));
        Fase1.adicionar(new Coisa({ // Esquerda
            x: -(canvas.width * Math.random()),
            y: (canvas.height * Math.random()),
            h: 15,
            w: 15,
            va: 2,
            vm: 50,
            color: "red",
            vida: 1,
            comportar: persegue2(personagem),
            props: { tipo: "inimigo" }
        }));
        Fase1.adicionar(new Coisa({  // Baixo
            x: (canvas.width * Math.random()),
            y: canvas.height + (canvas.height * Math.random()),
            h: 15,
            w: 15,
            va: 2,
            vm: 50,
            color: "red",
            vida: 1,
            comportar: persegue2(personagem),
            props: { tipo: "inimigo" }
        }));
        dtinimigos = 4 + addinimigos;
    }
}

Fase1.prototype.limpar = function () {
    this.ctx.clearRect(0, 0, this.w, this.h);
}

Fase1.prototype.comportar = function () {
    for (var i = 0; i < this.Coisinhas.length; i++) {
        if (this.Coisinhas[i].comportar) {
            this.Coisinhas[i].comportar();
        }
    }
}

Fase1.prototype.checaColisao = function () {
    for (var i = 0; i < this.Coisinhas.length; i++) {
        for (var j = i + 1; j < this.Coisinhas.length; j++) {
            if (this.Coisinhas[i].colidiuCom(this.Coisinhas[j])) {
                if (this.Coisinhas[i].props.tipo === "personagem" && this.Coisinhas[j].props.tipo === "inimigo" && this.Coisinhas[i].imune <= 0) {
                    //this.toRemove.push(this.Coisinhas[i]);
                    this.Coisinhas[i].vida--;
                    this.Coisinhas[i].imune = 2;
                }
                if (this.Coisinhas[i].props.tipo === "personagem" && this.Coisinhas[j].props.tipo === "inimigo") {
                    this.Coisinhas[j].vm = 0;
                }
                if (this.Coisinhas[i].props.tipo === "inimigo" && this.Coisinhas[j].props.tipo === "tiro") {
                    //this.toRemove.push(this.Coisinhas[i]);
                    this.Coisinhas[i].vida--;
                    this.toRemove.push(this.Coisinhas[j]);
                }
                if (this.Coisinhas[i].props.tipo === "personagem" && this.Coisinhas[j].props.tipo === "CD") {
                    this.toRemove.push(this.Coisinhas[j]);
                    CD = CD - 0.01 ;
                }
                if (this.Coisinhas[i].props.tipo === "personagem" && this.Coisinhas[j].props.tipo === "reload") {
                    this.toRemove.push(this.Coisinhas[j]);
                    treload = treload - 0.05;
                }
                if (this.Coisinhas[i].props.tipo === "personagem" && this.Coisinhas[j].props.tipo === "cartucho") {
                    this.toRemove.push(this.Coisinhas[j]);
                    cartucho++;
                    tantoDeBala++;
                }
            }
            if (!this.Coisinhas[i].colidiuCom(this.Coisinhas[j])) {
                if (this.Coisinhas[i].props.tipo === "personagem" && this.Coisinhas[j].props.tipo === "inimigo" && this.Coisinhas[i].imune <= 0) {
                    this.Coisinhas[j].vm = 50;
                }
            }
        }
    }
};

Fase1.prototype.removeOsTiro = function () {
    for (var i = 0; i < this.Coisinhas.length; i++) {
        if (this.Coisinhas[i].props.tipo === "tiro" && (this.Coisinhas[i].x >= canvas.width || this.Coisinhas[i].x <= 0 || this.Coisinhas[i].y >= canvas.height || this.Coisinhas[i].y <= 0)) {
            this.toRemove.push(this.Coisinhas[i]);
        }
    }
}

Fase1.prototype.removeOsMorto = function () {
    for (var i = 0; i < this.Coisinhas.length; i++) {
        if (this.Coisinhas[i].props.tipo === "personagem" && this.Coisinhas[i].vida === 0) {
            //this.toRemove.push(this.Coisinhas[i]);
        }
        if (this.Coisinhas[i].props.tipo === "inimigo" && this.Coisinhas[i].vida <= 0) {
            this.toRemove.push(this.Coisinhas[i]);
            var item = 10 * Math.random();
            if (item < 1) {
                Fase1.adicionar(new Coisa({ // Esquerda
                    x: this.Coisinhas[i].x,
                    y: this.Coisinhas[i].y,
                    h: 10,
                    w: 10,
                    color: "yellow",
                    props: { tipo: "reload" }
                }));
            }
            if (item > 1 && item < 2) {
                Fase1.adicionar(new Coisa({ // Esquerda
                    x: this.Coisinhas[i].x,
                    y: this.Coisinhas[i].y,
                    h: 10,
                    w: 10,
                    color: "lightblue",
                    props: { tipo: "cartucho" }
                }));
            }
            if (item > 2 && item < 3) {
                Fase1.adicionar(new Coisa({ // Esquerda
                    x: this.Coisinhas[i].x,
                    y: this.Coisinhas[i].y,
                    h: 10,
                    w: 10,
                    color: "pink",
                    props: { tipo: "CD" }
                }));
            }
            addinimigos = addinimigos - 0.02;
        }
    }
}

Fase1.prototype.removeCoisinhas = function () {
    for (var i = 0; i < this.toRemove.length; i++) {
        var idx = this.Coisinhas.indexOf(this.toRemove[i]);
        if (idx >= 0) {
            this.Coisinhas.splice(idx, 1);
        }
    }
    this.toRemove = [];
};

Fase1.prototype.passo = function (dt) {
    this.limpar();
    this.comportar();
    this.mirar();
    this.desenhar();
    this.desenharMira();
    this.inimigos();
    this.mover(dt);
    this.checaColisao();
    this.removeOsMorto();
    this.removeOsTiro();
    this.removeCoisinhas();
}
