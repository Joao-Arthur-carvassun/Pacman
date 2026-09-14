const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WidthSize = 25; // Largura (Eixo X)
const HighSize = 30;  // Altura (Eixo Y)

let pacman = {

    x: 1* WidthSize + WidthSize / 2,
    y: 1* HighSize + HighSize / 2,

    Radius: 10,

    Speed : 5,

    dx:0,
    dy:0,

    rotation: 0
}

function drawPac(){

    ctx.fillStyle = "yellow"
    ctx.beginPath();
    ctx.arc(
        pacman.x,
        pacman.y, 
        pacman.Radius,
        pacman.rotation + 0.2 * Math.PI,  
        pacman.rotation + 1.8 * Math.PI
    );
    ctx.fill();

    ctx.lineTo(pacman.x, pacman.y);
    ctx.fill();
    ctx.closePath();

}

ctx.lineWidth = 2;
ctx.strokeStyle = "blue";

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

//o eixo y é representado pelo indice i e o x pelo indice j, de i para i+1 aumenta-se o widthSize 
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if(i == 1 && j == 1){
            continue
        }
        // Desenha APENAS se a célula atual for uma parede (1)
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
        } 
        // Aproveita o loop para desenhar as comidas onde for 0
        else if (map[i][j] === 0) {
            ctx.fillStyle = "#f8f809";
            ctx.beginPath();
            ctx.arc(
                j * WidthSize + WidthSize / 2, 
                i * HighSize + HighSize / 2, 
                2, 
                0, 
                Math.PI * 2
            );
            ctx.fill();
        }
    }
}


drawPac()

window.onload = function(){

    canvas.addEventListener("keydown",function(event){
        chave = event.key
        if(chave == "w"){
            console.log("Mover para cima")
        }else if(chave == "s"){
            console.log("Mover para baixo")
        }else if(chave == "d"){
            console.log("Mover para direita")
        }else if(chave == "a"){
            console.log("Mover para esquerda")
        }
});
}


