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
    for (var i = 0; i < this.Coisinhas.length && endgame == 0; i++) {
        this.Coisinhas[i].desenhar(this.ctx);
        this.Coisinhas[i].desenharItens(this.ctx);
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

Fase1.prototype.paroDeCarregar = function () {
    for (var i = 0; i < this.Coisinhas.length; i++){
        if (this.Coisinhas[i].props.tipo === "personagem" && reload <= 0){
            this.Coisinhas[i].carregando = 0;
        }
    }
}

Fase1.prototype.inimigos = function () {
    if (dtinimigos < 0 && !endgame && startgame) {
        Fase1.adicionar(new Coisa({ /// Direita
            x: canvas.width + (canvas.width * Math.random()),
            y: (canvas.height * Math.random()),
            h: 15,
            w: 15,
            va: 2,
            vm: 10,
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
            vm: 10,
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
            vm: 10,
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
            vm: 10,
            color: "red",
            vida: 1,
            comportar: persegue2(personagem),
            props: { tipo: "inimigo" }
        }));
        dtinimigos = 2 + addinimigos;
    }
}

Fase1.prototype.limpar = function () {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.fillStyle = "lightgreen";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < this.Coisinhas.length; i++) {
        if (this.Coisinhas[i].props.tipo === "personagem") {
            for (var j = 0; j < this.Coisinhas[i].vida; j++) {
                ctx.fillStyle = "red"
                ctx.fillRect(180+(j * 40), 15, 30, 30);
            }
            ctx.fillStyle = "black"
            ctx.font = "bold 30px Arial";
            ctx.fillText("Life Points:",10,40);

            ctx.font = "bold 30px Arial";
            ctx.fillText("Score:",10,80);
            ctx.fillText(pontuação,110,82);
            
            if (this.Coisinhas[i].vida <= 0){
                this.ctx.fillStyle = "red";
                this.ctx.fillRect(0, 0, canvas.width, canvas.height);
                endgame = 1;
            }
        }
    }
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
                    pontuação = pontuação + 10;
                }
                if (this.Coisinhas[i].props.tipo === "inicializador" && this.Coisinhas[j].props.tipo === "tiro") {
                    this.toRemove.push(this.Coisinhas[j]);
                    this.Coisinhas[i].vida--;
                }
                if (this.Coisinhas[i].props.tipo === "personagem" && this.Coisinhas[j].props.tipo === "CD") {
                    this.toRemove.push(this.Coisinhas[j]);
                    CD = CD - 0.01;
                    pontuação = pontuação + 5;
                }
                if (this.Coisinhas[i].props.tipo === "personagem" && this.Coisinhas[j].props.tipo === "reload") {
                    this.toRemove.push(this.Coisinhas[j]);
                    treload = treload - 0.05;
                    pontuação = pontuação + 5;
                }
                if (this.Coisinhas[i].props.tipo === "personagem" && this.Coisinhas[j].props.tipo === "cartucho") {
                    this.toRemove.push(this.Coisinhas[j]);
                    cartucho++;
                    tantoDeBala++;
                    pontuação = pontuação + 5;
                }
                if (this.Coisinhas[i].props.tipo === "personagem" && this.Coisinhas[j].props.tipo === "life") {
                    this.toRemove.push(this.Coisinhas[j]);
                    this.Coisinhas[i].vida++;
                    pontuação = pontuação + 20;
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
                Fase1.adicionar(new Coisa({ // diminui o tempo de carregamento
                    x: this.Coisinhas[i].x,
                    y: this.Coisinhas[i].y,
                    h: 10,
                    w: 10,
                    item: 1,
                    color: "yellow",
                    props: { tipo: "reload" }
                }));
            }
            if (item > 1 && item < 2) {
                Fase1.adicionar(new Coisa({ // aumenta o cartucho de balas
                    x: this.Coisinhas[i].x,
                    y: this.Coisinhas[i].y,
                    h: 10,
                    w: 10,
                    item: 1,
                    color: "lightblue",
                    props: { tipo: "cartucho" }
                }));
            }
            if (item > 2 && item < 3) {
                Fase1.adicionar(new Coisa({ // aumenta a taxa de tiros
                    x: this.Coisinhas[i].x,
                    y: this.Coisinhas[i].y,
                    h: 10,
                    w: 10,
                    item: 1,
                    color: "pink",
                    props: { tipo: "CD" }
                }));
            }
            if (item > 3 && item < 4) {
                Fase1.adicionar(new Coisa({ // life healing
                    x: this.Coisinhas[i].x,
                    y: this.Coisinhas[i].y,
                    h: 10,
                    w: 10,
                    item: 1,
                    color: "brown",
                    props: { tipo: "life" }
                }));
            }
            addinimigos = addinimigos - pontuação/1000;
        }
        if (this.Coisinhas[i].props.tipo === "inicializador" && this.Coisinhas[i].vida <= 0) {
            this.toRemove.push(this.Coisinhas[i]);
            startgame = 1;
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
    this.paroDeCarregar();
    this.inimigos();
    this.mover(dt);
    this.checaColisao();
    this.removeOsMorto();
    this.removeOsTiro();
    this.removeCoisinhas();
}
