import { Pacman } from "./pacman.js";
import { Map } from "./map.js";
import { Ghost } from "./Ghost.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WidthSize = 25; 
const HighSize = 30;  

let gameMap = new Map();
let ghost = new Ghost(((gameMap.map[0].length-1)*WidthSize) / 2 + WidthSize / 2,((gameMap.map.length-1) / 2 * HighSize) + HighSize/2,WidthSize,HighSize)
let pacman = new Pacman(1 * WidthSize + WidthSize / 2, 1 * HighSize + HighSize / 2, WidthSize, HighSize);


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    pacman.update(gameMap.map);
    ghost.updateGhost(gameMap.map,pacman.x,pacman.y);
    gameMap.drawMap(ctx, WidthSize, HighSize);
    pacman.draw(ctx);
    ghost.drawGhost(ctx);

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