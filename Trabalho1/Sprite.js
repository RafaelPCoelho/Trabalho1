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
    if (this.inicial){
        if (this.vida == 5){
            ctx.font = "bold 20px Arial";
            ctx.fillText("Bem Vindos!",this.x-30,this.y+30);
            ctx.fillText("Esta pronto para começar uma incrivel aventura?",this.x-30,this.y+50);
            ctx.fillText("(controle a mira com o Mause e aperte o botão esquerdo para atirar em MIM)",this.x-30,this.y+70);
        }
        if (this.vida == 4){
            ctx.font = "bold 20px Arial";
            ctx.fillText("Tudo bem :). Atirar em mim não machuca, mas pode ter certeza",this.x-30,this.y+30);
            ctx.fillText("que UM tiro desses é o suficiente para matar os zumbis que estão por vir",this.x-30,this.y+50);
            ctx.fillText("(atira em mim de novo)",this.x-30,this.y+70);
        }
        if (this.vida == 3){
            ctx.font = "bold 20px Arial";
            ctx.fillText("Ahh, vc n sabe? Esta vindo uma horda de zumbis para ca...",this.x-30,this.y+30);
            ctx.fillText("eles são iguais a mim so q Verdes, da pra vc correr deles tb",this.x-30,this.y+50);
            ctx.fillText("(Use W,A,S,D para controlar seu personagem(e atira em mim de novo :P))",this.x-30,this.y+70);
        }
        if (this.vida == 2){
            ctx.font = "bold 20px Arial";
            ctx.fillText("Os zumbis vão deixar cair items quando vc mata-los",this.x-30,this.y+30);
            ctx.fillText("o AMARELO diminui seu Reload, AZUL aumenta seu pente de balas",this.x-30,this.y+50);
            ctx.fillText("o ROSA aumenta a taxa de tiro por segundo e o MARROM te da VIDA!!!",this.x-30,this.y+70);
        }
        if (this.vida == 1){
            ctx.font = "bold 40px Arial";
            ctx.fillText("AIII!!!! EU NÃO PEDI PRA ME ATIRAR DE NOVO!!!",this.x-60,this.y+50);
            ctx.font = "bold 20px Arial";
            ctx.fillText("Enfim, GOOD LUCK!!!",this.x-30,this.y+70);
            ctx.fillText("Agora pode atirar Hehe",this.x-30,this.y+90);
        }
    }
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
