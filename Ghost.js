export class Ghost {
    constructor(x, y, widthSize, highSize) {
        this.x = x;
        this.y = y;
        this.widthSize = widthSize;
        this.highSize = highSize;
        this.velocity = 1;
        this.radius = 8;
        
        // Inicializar dx e dy é essencial para não dar undefined
        this.dx = -this.velocity;
        this.dy = 0;
    }

    drawGhost(ctx) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            2 * Math.PI
        );
        ctx.fill();
        ctx.closePath();
    }

    updateGhost(map, targetX, targetY) {
        let col = Math.floor(this.x / this.widthSize);
        let row = Math.floor(this.y / this.highSize);

        let centerX = col * this.widthSize + this.widthSize / 2;
        let centerY = row * this.highSize + this.highSize / 2;

        // Se estiver perto do centro do bloco, reavalia o caminho
        if (Math.abs(this.x - centerX) < this.velocity && Math.abs(this.y - centerY) < this.velocity) {
            this.x = centerX;
            this.y = centerY;

            let possibleMoves = [];

            // A trava de não poder dar meia-volta instantânea:
            if (map[row - 1] && map[row - 1][col] !== 1 && this.dy >= 0) possibleMoves.push({ dx: 0, dy: -this.velocity }); // Cima
            if (map[row + 1] && map[row + 1][col] !== 1 && this.dy <= 0) possibleMoves.push({ dx: 0, dy: this.velocity });  // Baixo
            if (map[row][col - 1] !== 1 && this.dx >= 0) possibleMoves.push({ dx: -this.velocity, dy: 0 });                 // Esquerda
            if (map[row][col + 1] !== 1 && this.dx <= 0) possibleMoves.push({ dx: this.velocity, dy: 0 });                  // Direita

            // Caso esteja parado no início do jogo, permite qualquer direção livre
            if (possibleMoves.length === 0) {
                if (map[row - 1] && map[row - 1][col] !== 1) possibleMoves.push({ dx: 0, dy: -this.velocity });
                if (map[row + 1] && map[row + 1][col] !== 1) possibleMoves.push({ dx: 0, dy: this.velocity });
                if (map[row][col - 1] !== 1) possibleMoves.push({ dx: -this.velocity, dy: 0 });
                if (map[row][col + 1] !== 1) possibleMoves.push({ dx: this.velocity, dy: 0 });
            }

            let bestMove = null;
            let shortestDistance = Infinity;

            for (let move of possibleMoves) {
                let nextX = this.x + move.dx;
                let nextY = this.y + move.dy;

                let dist = Math.hypot(targetX - nextX, targetY - nextY);

                if (dist < shortestDistance) {
                    shortestDistance = dist;
                    bestMove = move;
                }
            }

            if (bestMove) {
                this.dx = bestMove.dx;
                this.dy = bestMove.dy;
            }
        }

        this.x += this.dx;
        this.y += this.dy;
    }
}