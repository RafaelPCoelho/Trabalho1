function personagem(exemplo= {}) {
    var {
        x = 100,
        y = 100,
        w = 30,
        vx = 0,
        vy = 0,
        color = "blue",
        atirando = 0,
        imune = 0,
    } = exemplo;

    this.x = x;
    this.y = y;
    this.w = w;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.atirando = atirando;
    this.imune = imune;
}
personagem.prototype.desenhar = function (ctx) {
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.w);
    //ctx.fillText(personagem.vy,10,50);
    if(this.imune > 0){
        ctx.globalAlpha = 0.5*Math.cos(60*this.imune);
      }
    ctx.fillRect(this.x, this.y, this.w, this.w);
    ctx.globalAlpha = 1.0;
}

personagem.prototype.mover = function (dt, gravidade) {
    personagem.x = personagem.x + personagem.vx * dt;
    if(this.atirando > 0) {
        this.atirando = this.atirando - 1*dt;
    }

    if(this.imune > 0) {
        this.imune = this.imune - 1*dt;
    }

    //personagem.y = personagem.y + personagem.vy * dt;
    personagem.y += personagem.vy * dt;
    if(personagem.y+personagem.w<canvas.height)
        personagem.vy += gravidade*dt;
}

personagem.prototype.paredes = function (canvas) {
    if (personagem.x + personagem.w > canvas.width) //parede direita 
        personagem.x = canvas.width - personagem.w;
    if (personagem.x < 0) //parede esquerda
        personagem.x = 0;
    if (personagem.y + personagem.w > canvas.height){ //parede de baixo
        personagem.y = canvas.height - personagem.w;
        personagem.vy = 0;
    }
    if (personagem.y < 0) //parede de cima
        personagem.y = 0;
}

personagem.prototype.colidiuCom = function (alvo) {
    if (alvo.x + alvo.w < this.x) return false;
    if (alvo.x > this.x + this.w) return false;
    if (alvo.y + alvo.w < this.y) return false;
    if (alvo.y > this.y + this.w) return false;

    return true;

}

personagem.prototype.controlePorTeclas = function (opcoes) {
    if (opcoes.teclas.esquerda) { this.vx = -500; }
    if (opcoes.teclas.direita) { this.vx = 500; }
    if (!opcoes.teclas.esquerda && !opcoes.teclas.direita) {
        this.vx = 0;
    }
    if (opcoes.teclas.cima && this.y + this.w == canvas.height) { this.vy = -800; }
    if (opcoes.teclas.baixo && this.y + this.w != canvas.height) { this.vy = 800; }
    //if (!opcoes.teclas.cima && !opcoes.teclas.baixo) {
        //this.vy = 0;
    //}
}