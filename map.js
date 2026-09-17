export class Map {
    
     map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1],
    [0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0], // Linha 8: Túnel de teleporte nas pontas (colunas 0 e 18)
    [1,1,1,1,0,1,0,1,1,-1,1,1,0,1,0,1,1,1,1],
    [0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0], // Linha 10: Dentro da Casa dos Fantasmas
    [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
    [0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0], // Linha 12: Túnel de teleporte nas pontas
    [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
    [1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

    drawMap(ctx, widthSize, highSize) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "blue";

        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] === 1) {
                    let x = widthSize * j;
                    let y = highSize * i;

                    ctx.beginPath();

                    if (i === 0 || this.map[i - 1][j] !== 1) {
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + widthSize, y);
                    }
                    if (j === this.map[i].length - 1 || this.map[i][j + 1] !== 1) {
                        ctx.moveTo(x + widthSize, y);
                        ctx.lineTo(x + widthSize, y + highSize);
                    }
                    if (i === this.map.length - 1 || this.map[i + 1][j] !== 1) {
                        ctx.moveTo(x, y + highSize);
                        ctx.lineTo(x + widthSize, y + highSize);
                    }
                    if (j === 0 || this.map[i][j - 1] !== 1) {
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + highSize);
                    }

                    ctx.stroke();
                } else if (this.map[i][j] === 0) {
                    ctx.fillStyle = "#f8f809";
                    ctx.beginPath();
                    ctx.arc(
                        j * widthSize + widthSize / 2, 
                        i * highSize + highSize / 2, 
                        3, 
                        0, 
                        Math.PI * 2
                    );
                    ctx.fill();
                }
            }
        }
    }
}