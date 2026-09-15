const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WidthSize = 25; 
const HighSize = 30;  

let pacman = { // memoria
    x: 1 * WidthSize + WidthSize / 2,
    y: 1 * HighSize + HighSize / 2,
    Radius: 10,
    speed: 2,
    dx: 0,
    dy: 0,
    rotation: 0
};

let map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,1],
    [1,0,0,1,1,1,0,0,0,1,1,1,0,0,1,1,1,0,0,0,1],
    [1,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,1,0,0,0,1,1,0,0,1,1,0,1,1,1,0,0,1],
    [1,0,0,1,1,1,0,0,1,0,0,0,0,1,0,1,1,1,0,0,1],
    [1,0,0,1,1,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,1],
    [1,0,0,0,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
    [1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,1],
    [1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,1],
    [1,0,0,0,1,1,1,0,0,0,1,0,0,0,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

function drawPac() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(
        pacman.x,
        pacman.y, 
        pacman.Radius,
        pacman.rotation + 0.2 * Math.PI,  
        pacman.rotation + 1.8 * Math.PI
    );
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fill();
    ctx.closePath();
}

function drawMap() {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 1) {
                let x = WidthSize * j;
                let y = HighSize * i;

                ctx.beginPath();

                if (i === 0 || map[i - 1][j] !== 1) {
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + WidthSize, y);
                }
                if (j === map[i].length - 1 || map[i][j + 1] !== 1) {
                    ctx.moveTo(x + WidthSize, y);
                    ctx.lineTo(x + WidthSize, y + HighSize);
                }
                if (i === map.length - 1 || map[i + 1][j] !== 1) {
                    ctx.moveTo(x, y + HighSize);
                    ctx.lineTo(x + WidthSize, y + HighSize);
                }
                if (j === 0 || map[i][j - 1] !== 1) {
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + HighSize);
                }

                ctx.stroke();
            } else if (map[i][j] === 0) {
                ctx.fillStyle = "#f8f809";
                ctx.beginPath();
                ctx.arc(
                    j * WidthSize + WidthSize / 2, 
                    i * HighSize + HighSize / 2, 
                    3, 
                    0, 
                    Math.PI * 2
                );
                ctx.fill();
            }
        }
    }
}

let score = 0;

function update() {

    let nextX = pacman.x + pacman.dx;
    let nextY = pacman.y + pacman.dy;

    let checkX = nextX + (pacman.dx > 0 ? pacman.Radius : (pacman.dx < 0 ? -pacman.Radius : 0));
    let checkY = nextY + (pacman.dy > 0 ? pacman.Radius : (pacman.dy < 0 ? -pacman.Radius : 0));

    let targetRow = Math.floor(checkY / HighSize);
    let targetCol = Math.floor(checkX / WidthSize);

   
    if (map[targetRow][targetCol] !== 1) {

        pacman.x = nextX;
        pacman.y = nextY;

    } else {
        pacman.dx = 0;
        pacman.dy = 0;
    }

    let currentRow = Math.floor(pacman.y/HighSize)
    let currentCol = Math.floor(pacman.x/WidthSize)

    if(map[currentRow][currentCol] == 0){
        map[currentRow][currentCol] = -1
        score += 10
    }

}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    update();
    drawMap();
    drawPac();

    requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", function(e) {
    switch (e.key.toLowerCase()) {
        case "w":
            pacman.dx = 0;
            pacman.dy = -pacman.speed;
            pacman.rotation = 1.5 * Math.PI;     
            break;
        case "s": 
            pacman.dx = 0;
            pacman.dy = pacman.speed;
            pacman.rotation = 0.5 * Math.PI; 
            break;
        case "a": 
            pacman.dx = -pacman.speed;
            pacman.dy = 0;
            pacman.rotation = 1.0 * Math.PI; 
            break;
        case "d":
            pacman.dx = pacman.speed;
            pacman.dy = 0;
            pacman.rotation = 0;             
            break;
    }
});

gameLoop();