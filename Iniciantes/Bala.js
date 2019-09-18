function bala(exemplo) {
    var {
        x = 100,
        y = 100,
        w = 100,
        vx = 0,
        vy = 0,
        color = "white",
        ladoDaBala = 1,
        verticeDaBala = 0,
    } = exemplo;

    this.x = x;
    this.y = y;
    this.w = w;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.ladoDaBala = ladoDaBala;
    this.verticeDaBala = verticeDaBala;
}
bala.prototype.mover = function (dt) {
    this.x = this.x + this.vx * dt * this.ladoDaBala;
    this.y = this.y + this.vy * dt * this.verticeDaBala;
    if (this.atirando > 0) {
        this.atirando = this.atirando - 1 * dt;
    }
}

bala.prototype.desenhar = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.w);
}