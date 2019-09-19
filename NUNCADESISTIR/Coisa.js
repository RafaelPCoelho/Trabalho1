function Coisa(parametros = {}) {
    var padrao = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        h: 40,
        w: 40,
        a: 0,
        va: 0,
        vm: 0,
        cooldown: 0.1,
        mira: 0,
        item: 0,
        inicial: 0,
        color: "blue",
        imune: 0,
        atirando: 0,
        carregando: 0,
        props: 0,
        vida: 0,
        comportar: undefined,
        mirar: undefined,
        scene: undefined,
    }
    Object.assign(this, padrao, parametros);
}

Coisa.prototype.desenhar = function (ctx) {
    if (!this.mira && !this.item) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.a);
        ctx.fillStyle = this.color;
        if (this.imune > 0) {
            ctx.globalAlpha = 0.5 * Math.cos(60 * this.imune);
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(-this.w / 2, -this.h / 2);
        ctx.lineTo(-this.w / 2, +this.h / 2);
        ctx.lineTo(+this.w / 2, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        ctx.globalAlpha = 1.0;
    }
}

Coisa.prototype.desenharItens = function (ctx){
    if (this.item){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w, this.h)
    }
}

Coisa.prototype.desenharPersonagem = function (ctx) {
    if (!this.mira) {
        if (this.carregando){
            ctx.font = "bold 15px Arial";
            ctx.fillText("Recharge...",this.x-30,this.y+30);
        }
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.a);
        ctx.fillStyle = this.color;
        if (this.imune > 0) {
            ctx.globalAlpha = 0.2 * Math.cos(60 * this.imune);
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.moveTo(-this.w / 2, -this.h / 2);
        ctx.lineTo(-this.w / 2, +this.h / 2);
        ctx.lineTo(+this.w / 2, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "lightred";
        
        ctx.restore();
        
        ctx.globalAlpha = 1.0;

    }
}

Coisa.prototype.desenharMira = function (ctx) {
    if (this.mira) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.a);
        ctx.fillStyle = "lightgreen";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(-this.w / 2, -this.h / 2);
        ctx.lineTo(-this.w / 2, -this.h * 2);
        ctx.lineTo(this.w / 2, -this.h * 2);
        ctx.lineTo(this.w / 2, -this.h / 2);
        ctx.lineTo(this.w * 2, -this.h / 2);
        ctx.lineTo(this.w * 2, this.h / 2);
        ctx.lineTo(this.w / 2, this.h / 2);
        ctx.lineTo(this.w / 2, this.h * 2);
        ctx.lineTo(-this.w / 2, this.h * 2);
        ctx.lineTo(-this.w / 2, this.h / 2);
        ctx.lineTo(-this.w * 2, this.h / 2);
        ctx.lineTo(-this.w * 2, -this.h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);

        ctx.restore();
    }
}

Coisa.prototype.mover = function (dt) {
    this.a = this.a + this.va * dt;

    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;

    this.vx = this.vm * Math.cos(this.a);
    this.vy = this.vm * Math.sin(this.a);

    if (this.imune > 0) {
        this.imune = this.imune - 1 * dt;
    }

    this.cooldown = this.cooldown - dt;
}

Coisa.prototype.colidiuCom = function (alvo) {
    if (alvo.x + alvo.w / 2 < this.x - this.w / 2) return false;
    if (alvo.x - alvo.w / 2 > this.x + this.w / 2) return false;

    if (alvo.y + alvo.h / 2 < this.y - this.h / 2) return false;
    if (alvo.y - alvo.h / 2 > this.y + this.h / 2) return false;

    return true;
}
