export class Pacman {

    constructor(x, y, widthSize, highSize) {
        this.x = x;
        this.y = y;
        this.widthSize = widthSize;
        this.highSize = highSize;
        this.radius = 10;
        this.speed = 3;
        this.dx = 0;
        this.dy = 0;
        this.rotation = 0;
    }

    draw(ctx) {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            this.rotation + 0.2 * Math.PI,
            this.rotation + 1.8 * Math.PI
        );
        ctx.lineTo(this.x, this.y);
        ctx.fill();
        ctx.closePath();
    }

    update(map) {
        let nextX = this.x + this.dx;
        let nextY = this.y + this.dy;

        let checkX = nextX + (this.dx > 0 ? this.radius : (this.dx < 0 ? -this.radius : 0));
        let checkY = nextY + (this.dy > 0 ? this.radius : (this.dy < 0 ? -this.radius : 0));

        let targetRow = Math.floor(checkY / this.highSize);
        let targetCol = Math.floor(checkX / this.widthSize);

        if (map[targetRow][targetCol] !== 1) {
            this.x = nextX;
            this.y = nextY;
        } else {
            this.dx = 0;
            this.dy = 0;
        }
    }
}