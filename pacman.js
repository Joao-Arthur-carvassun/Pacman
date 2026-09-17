export class Pacman {

    constructor(x, y, widthSize, highSize) {
        this.x = x;
        this.y = y;
        this.widthSize = widthSize;
        this.highSize = highSize;
        this.radius = 9;
        this.speed = 2;
        this.dx = 0;
        this.dy = 0;
        this.rotation = 0;
        this.score = 0;
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
    if (!this.checkCollision(nextX, this.y, map)) {
        this.x = nextX;
    } else {
        this.dx = 0; 
    }

    let nextY = this.y + this.dy;
    if (!this.checkCollision(this.x, nextY, map)) {
        this.y = nextY;
    } else {
        this.dy = 0;
    }

    let currentRow = Math.floor(this.y/this.highSize);
    let currentCol = Math.floor(this.x/this.widthSize);

    if(map[currentRow][currentCol] == 0 ){
        map[currentRow][currentCol] = -2;
        this.score+=10
    }
    
    this.snapToGrid();
    
}

// ?
checkCollision(x, y, map) {
    const padding =0.5; // Margem para não colidir exatamente no limite
    const checkRadius = this.radius - padding;

    // Pontos de teste nos limites da circunferência
    const points = [
        { x: x - checkRadius, y: y - checkRadius }, // Canto superior esquerdo
        { x: x + checkRadius, y: y - checkRadius }, // Canto superior direito
        { x: x - checkRadius, y: y + checkRadius }, // Canto inferior esquerdo
        { x: x + checkRadius, y: y + checkRadius }  // Canto inferior direito
    ];

    for (let p of points) {
        let col = Math.floor(p.x / this.widthSize);
        let row = Math.floor(p.y / this.highSize);

        // Se estiver fora do mapa ou em cima de parede (1)
        if (!map[row] || map[row][col] === undefined || map[row][col] === 1) {
            return true; 
        }
    }
    return false; 
}

// ?
snapToGrid() {
    const threshold = 4; // Distância limite para alinhar
    
    // Se estiver se movendo na horizontal, alinha no centro vertical da linha
    if (this.dx !== 0) {
        let centerY = Math.floor(this.y / this.highSize) * this.highSize + this.highSize / 2;
        if (Math.abs(this.y - centerY) < threshold) {
            this.y = centerY;
        }
    }
    
    // Se estiver se movendo na vertical, alinha no centro horizontal da coluna
    if (this.dy !== 0) {
        let centerX = Math.floor(this.x / this.widthSize) * this.widthSize + this.widthSize / 2;
        if (Math.abs(this.x - centerX) < threshold) {
            this.x = centerX;
        }
    }
}

}