export class Winscreen {
    constructor(canvas, onRestart) {
        this.canvas = canvas;
        this.onRestart = onRestart; 

        this.botao = {
            x: 118,
            y: 420,
            largura: 200, 
            altura: 50,
            cor: '#4CAF50',
            corTexto: '#eff705',
            texto: "REINICIAR"
        };
 
        this.listenerAtivo = false;
        this.configurarClique();
    }

    configurarClique() {
        this.canvas.addEventListener('click', (event) => {
            if (!this.listenerAtivo) return;

            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            
            if (
                mouseX >= this.botao.x && 
                mouseX <= this.botao.x + this.botao.largura &&
                mouseY >= this.botao.y && 
                mouseY <= this.botao.y + this.botao.altura
            ) {
                console.log("Reiniciar ativado!");
                this.listenerAtivo = false;
                if (this.onRestart) this.onRestart();
            }
        });
    }

    drawWinscreen(ctx, scoreTotal) {
        
        this.listenerAtivo = true;

        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.fillStyle = "yellow";
        ctx.font = "bold 36px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("SCORE: " + scoreTotal, this.canvas.width / 2, 300);

        ctx.fillStyle = this.botao.cor;
        ctx.fillRect(this.botao.x, this.botao.y, this.botao.largura, this.botao.altura);

        ctx.fillStyle = this.botao.corTexto;
        ctx.font = 'bold 20px Arial';
        ctx.fillText(
            this.botao.texto, 
            this.botao.x + (this.botao.largura / 2), 
            this.botao.y + (this.botao.altura / 2)
        );
    }
}