function inimigos(exemplo = {}) {
    var {
        x = 10,
        y = 100,
        w = 10,
        vx = 0,
        vy = 0,
        color = "blue",
        imune = 0,
        atirando = 0,
        vy = 0
    } = exemplo;
    this.x = x;
    this.y = y;

    this.w = w;

    this.vx = vx;
    this.vy = vy;
    this.color = color;
    
    this.imune = imune;
    this.atirando = atirando;
 
}

inimigos.prototype = new inimigos();
inimigos.prototype.constructor = inimigos;

inimigos.prototype.desenhar = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    if(this.imune > 0){
      ctx.globalAlpha = 0.5*Math.cos(60*this.imune);
    }
    ctx.fillRect(this.x, this.y, this.w, this.w);
    ctx.globalAlpha = 1.0;
}

inimigos.prototype.mover = function (dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
    if(this.imune > 0) {
        this.imune = this.imune - 1*dt;
    }
    if(this.atirando > 0) {
        this.atirando = this.atirando - 1*dt;
    }
}

inimigos.prototype.colidiuCom = function (alvo) {
    if (alvo.x + alvo.w < this.x) return false;
    if (alvo.x > this.x + this.w) return false;
    if (alvo.y + alvo.w < this.y) return false;
    if (alvo.y > this.y + this.w) return false;

    return true;

}

inimigos.prototype.perseguir = function (opcoes) {
    this.vx = 100 * Math.sign(opcoes.alvo.x - this.x);
    this.vy = 100 * Math.sign(opcoes.alvo.y - this.y);
}

inimigos.prototype.controlePorTeclas = function (opcoes) {
    if (opcoes.teclas.esquerda) { this.vx = -50; }
    if (opcoes.teclas.direita) { this.vx = 50; }
    if (!opcoes.teclas.esquerda && !opcoes.teclas.direita){
        this.vx = 0;
    }
    if (opcoes.teclas.cima) { this.vy = -50; }
    if (opcoes.teclas.baixo) { this.vy = 50; }
    if (!opcoes.teclas.cima && !opcoes.teclas.baixo){
        this.vy = 0;
    }
}