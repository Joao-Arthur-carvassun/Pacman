export class Ghost {
    constructor(x, y, widthSize, highSize, color = "red") {
        this.x = x;
        this.y = y;
        this.widthSize = widthSize;
        this.highSize = highSize;
        this.color = color;
        this.velocity = 2;
        this.radius = 8;

        this.dx = 0;
        this.dy = -this.velocity; 
    }

    drawGhost(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    getHeuristicDistance(rowA, colA, rowB, colB) {
        return Math.hypot(colB - colA, rowB - rowA);
    }

    isWalkable(tile) {
        return tile === 0 || tile === -1 || tile === -2;
    }

    updateGhost(map, targetX, targetY) {
        let col = Math.floor(this.x / this.widthSize);
        let row = Math.floor(this.y / this.highSize);

        let targetCol = Math.floor(targetX / this.widthSize);
        let targetRow = Math.floor(targetY / this.highSize);

        let centerX = col * this.widthSize + this.widthSize / 2;
        let centerY = row * this.highSize + this.highSize / 2;

        let isAtCenter = Math.abs(this.x - centerX) < this.velocity && 
                         Math.abs(this.y - centerY) < this.velocity;

        if (isAtCenter) {
            let possibleMoves = [];

            
            if (map[row - 1] && this.isWalkable(map[row - 1][col]) && this.dy <= 0) {
                possibleMoves.push({ col, row: row - 1, dx: 0, dy: -this.velocity });
            }
            
            if (map[row + 1] && this.isWalkable(map[row + 1][col]) && this.dy >= 0) {
                possibleMoves.push({ col, row: row + 1, dx: 0, dy: this.velocity });
            }
            
            if (map[row][col - 1] !== undefined && this.isWalkable(map[row][col - 1]) && this.dx <= 0) {
                possibleMoves.push({ col: col - 1, row, dx: -this.velocity, dy: 0 });
            }
            
            if (map[row][col + 1] !== undefined && this.isWalkable(map[row][col + 1]) && this.dx >= 0) {
                possibleMoves.push({ col: col + 1, row, dx: this.velocity, dy: 0 });
            }

            
            if (possibleMoves.length === 0) {// caso ele atinja um beco
                if (map[row - 1] && this.isWalkable(map[row - 1][col])) possibleMoves.push({ col, row: row - 1, dx: 0, dy: -this.velocity });
                if (map[row + 1] && this.isWalkable(map[row + 1][col])) possibleMoves.push({ col, row: row + 1, dx: 0, dy: this.velocity });
                if (map[row][col - 1] !== undefined && this.isWalkable(map[row][col - 1])) possibleMoves.push({ col: col - 1, row, dx: -this.velocity, dy: 0 });
                if (map[row][col + 1] !== undefined && this.isWalkable(map[row][col + 1])) possibleMoves.push({ col: col + 1, row, dx: this.velocity, dy: 0 });
            }

            let bestMove = null;
            let shortestDistance = Infinity;

            for (let move of possibleMoves) {
                let dist = this.getHeuristicDistance(move.row, move.col, targetRow, targetCol);
                if (dist < shortestDistance) {
                    shortestDistance = dist;
                    bestMove = move;
                }
            }

            if (bestMove) {
                if (this.dx !== bestMove.dx || this.dy !== bestMove.dy) {
                    this.x = centerX;
                    this.y = centerY;
                }
                this.dx = bestMove.dx;
                this.dy = bestMove.dy;
            }
        }

        this.x += this.dx;
        this.y += this.dy;
    }
}