export class Ghost{

    constructor(x,y,widthSize,highSize){
        this.x = x;
        this.y = y;
        this.widthSize = widthSize;
        this.highSize = highSize;
        this.velocity = 2;
        this.radius = 8;
        this.angle = 0;
    }

    drawGhost(ctx){
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            2* Math.PI
        );
        ctx.fill();
        ctx.closePath();
    }

    updateGhost(map, Xp, Yp) {

    let dx = Xp - this.x;
    let dy = Yp - this.y;

   
    this.angle = Math.atan2(dy, dx); // o atan2 pega o circulo trigonometrico completo

    
    this.dx = this.velocity * Math.cos(this.angle);
    this.dy = this.velocity * Math.sin(this.angle);

    
    this.x += this.dx; 
    this.y += this.dy;
}


}