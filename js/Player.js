import MovingDirection from "./MovingDirection.js";

export default class Player {
    constructor(x,y,tileSize,velocity,tileMap){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.health = 10;
        this.currentMovingDirection = null;
        this.viewDirection = null;
        this.moveAllowed = true;
        this.texts = undefined;
        this.items = 0;
        this.#loadImages();
    }

    draw(canvas){
        this.#moveVerification();
        this.drawImage(canvas,this.playerImages[this.playerMovementIndex],this.x,this.y,this.tileSize,this.tileSize)
    }

    #loadImages(){
        const frontView = `./assets/img/player/row-5-column-8.webp`;
        const frontViewAlter = `./assets/img/player/row-3-column-5.webp`;

        const leftView = `./assets/img/player/row-1-column-8.webp`;
        const leftViewAlter = `./assets/img/player/row-1-column-7.webp`;

        const rightView = `./assets/img/player/row-1-column-4.webp`;
        const rightViewAlter = `./assets/img/player/row-1-column-3.webp`;

        const backView = `./assets/img/player/row-8-column-5.webp`;
        const backViewAlter = `./assets/img/player/row-8-column-6.webp`;

        this.playerImages = [frontView,leftView,rightView,backView,frontViewAlter,leftViewAlter,rightViewAlter,backViewAlter]

        this.playerMovementIndex = 0;
    }
    

    drawImage = (canvas,image,positionX,positionY,sizeX,sizeY) => {
        const tile = document.createElement('div');
        tile.style.height = `${sizeY}px`;
        tile.style.width = `${sizeX}px`;
        tile.style.backgroundSize = 'cover';
        tile.style.backgroundImage = `url('${image}')`
        tile.style.position = 'absolute';
        tile.style.left = `${positionX}px`;
        tile.style.top = `${positionY}px`;
        canvas.appendChild(tile);
    }

    keyup = (event) => {
        if(["w","a","s","d"].includes(event)){
            this.currentMovingDirection = null;
        }
    }

    keydown = (event) => {
        if(event == "w") this.currentMovingDirection = MovingDirection.up;
        if(event == "a") this.currentMovingDirection = MovingDirection.left;
        if(event == "s") this.currentMovingDirection = MovingDirection.down;
        if(event == "d") this.currentMovingDirection = MovingDirection.right;
        if(this.currentMovingDirection) this.viewDirection = this.currentMovingDirection;
        if(event == "e") this.pickupItem();
    }

    #moveVerification() {
        if(this.moveAllowed){
            if (this.currentMovingDirection) {
                let verification = this.tileMap.collide(this.x, this.y, this.currentMovingDirection);
                let index = this.tileMap.mapIndex;
                if ([2,1,6,8,17,18].includes(verification.itemColided) || verification === true) {
                    return;
                }
                this.#mapChanger(verification.itemColided,verification.itemLocation,index);
            }
            this.#move();
        }
    }

    getTexts(text){
        this.texts = text;
    }

    #mapChanger(verification,location,mapIndex){
        if (verification === 3 && mapIndex === 0) {
            this.tileMap.mapSelector(1);
            this.y = this.tileSize*5
            this.x = this.tileSize*4
            this.currentMovingDirection = null;
            document.querySelector('#displayed-text').innerText = this.texts.TMap01;
        }

        // fuera de la cabaña
        if (verification === 3 && mapIndex === 1) {
            this.tileMap.mapSelector(0);
            this.y = this.tileSize*1
            this.x = this.tileSize*3
            this.currentMovingDirection = null;
            document.querySelector('#displayed-text').innerText = this.texts.TMap00;
        }
        if (verification === 7 && mapIndex === 1 && location.row === 0 && location.col === 4) {
            this.tileMap.mapSelector(2);
            this.y = this.tileSize*6
            this.x = this.tileSize*3
            this.currentMovingDirection = null;
            document.querySelector('#displayed-text').innerText = this.texts.TMap02;
        }

        // ruta slime
        if (verification === 0 && mapIndex === 2 && location.row === 6 && location.col === 3) {
            this.tileMap.mapSelector(1);
            this.y = this.tileSize*0
            this.x = this.tileSize*4
            this.currentMovingDirection = null;
            document.querySelector('#displayed-text').innerText = this.texts.TMap01;
        }
        if (verification === 7 && mapIndex === 2 && location.row === 0 && location.col === 3) {
            this.tileMap.mapSelector(3);
            this.y = this.tileSize*5
            this.x = this.tileSize*3
            this.currentMovingDirection = null;
            document.querySelector('#displayed-text').innerText = this.texts.TMap04;
        }
        if (verification === 0 && mapIndex === 2 && location.row === 3 && location.col === 6) {
            this.tileMap.mapSelector(4);
            this.y = this.tileSize*2
            this.x = this.tileSize*0
            this.currentMovingDirection = null;
            document.querySelector('#displayed-text').innerText = this.texts.TMap07;
        }
        // combate slime
        if (mapIndex === 3 && location.row === 2 && location.col === 3) {
            try{this.startBattleOverlay(1)}catch(error){console.log(error)}
            this.moveAllowed = false
            this.currentMovingDirection = null;
            document.querySelector('#displayed-text').innerText = this.texts.TMap04;
        }
        if (mapIndex === 3 && location.row === 5 && location.col === 3) {
            this.tileMap.mapSelector(2);
            this.y = this.tileSize*5
            this.x = this.tileSize*3
            this.currentMovingDirection = null;
            document.querySelector('#displayed-text').innerText = this.texts.TMap04;
        }

        // ruta armiño

        
    }

    #move(){
        switch(this.currentMovingDirection){
            case MovingDirection.up:
                this.y -= this.velocity;
                this.playerMovementIndex = (Math.round(this.y/100)%2===0)?0:4;
            break;
            case MovingDirection.down:
                this.y += this.velocity;
                this.playerMovementIndex = (Math.round(this.y/100)%2===0)?3:7;
            break;
            case MovingDirection.left:
                this.x -= this.velocity;
                this.playerMovementIndex = (Math.round(this.x/100)%2===0)?1:5;
            break;
            case MovingDirection.right:
                this.x += this.velocity;
                this.playerMovementIndex = (Math.round(this.x/100)%2===0)?2:6;
            break;
        }
    }

    pickupItem(){
        let verification = this.tileMap.collide(this.x, this.y, this.viewDirection);
        if ([1,18].includes(verification.itemColided)) {
            this.items += 1;
            this.updateHUD();
            this.tileMap.modifyWorld(this.x, this.y, this.viewDirection);
        }
    }

    updateHUD(salud=this.health,items=this.items){
        window.document.querySelector('#pi').innerText = `Items: ${items}`
        window.document.querySelector('#hp').innerText = `Salud: ${salud}`
    }

    startBattleOverlay(enemyCode){
        let enemyName = '';
        let enemyHealth = 1;
        if (enemyCode === 2) {
            enemyHealth = 8;
            enemyName = 'Armiño';}

        if (enemyCode === 1) {
            enemyHealth = 5;
            enemyName = 'Slime';}

        const overlay = document.createElement('div');
        overlay.id = 'battle-overlay';
        overlay.style.position = 'fixed';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.8)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = 100;

        const panel = document.createElement('div');
        panel.style.background = '#222';
        panel.style.color = 'white';
        panel.style.padding = '20px';
        panel.style.borderRadius = '8px';
        panel.style.width = '520px';
        panel.style.maxHeight = '80%';
        panel.style.overflow = 'auto';
        panel.innerHTML = `
        <h3>Combate contra ${enemyName}</h3>
        <div id="battle-log">Vida del ${enemyName}: ${enemyHealth} puntos.
</div>
        <div id="battle-controls" style="text-align:center;">
            <button id="battle-start">Comenzar batalla</button>
            <button id="battle-cancel">Huir</button>
        </div>`;

        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        const logEl = panel.querySelector('#battle-log');
        const controlsEl = panel.querySelector('#battle-controls');

        const log = (text) => {
            logEl.innerText += text + '\n';
            logEl.scrollTop = logEl.scrollHeight;
        };

        const cleanup = () => {
            if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
            this.moveAllowed = true;
        };

        const cancelBtn = panel.querySelector('#battle-cancel');
        cancelBtn.addEventListener('click', () => {
            log('Batalla cancelada.');
            cleanup();
        });

        const startBtn = panel.querySelector('#battle-start');
        startBtn.addEventListener('click', () => {
            startBtn.disabled = true;
            cancelBtn.disabled = true;

            // Estado de la batalla
            let ph = this.health;
            let pi = this.items;
            let active = true;

            const renderControlsForTurn = (Ataques, piAvailable) => {
                controlsEl.innerHTML = `
                    <div id="status-displayer">
                        <div>Vida: ${ph}</div>
                        <div>Enemigo: ${enemyHealth}</div>
                        <div>Ataques: ${Ataques}</div>
                        <div>Items: ${piAvailable}</div>
                    </div>
                    <div>
                        <input id="use-items-input" type="number" min="0" value="0" style="width:80px;margin-right:8px;padding:.5rem" />
                        <button id="use-items-btn">Usar</button>
                        <button id="skip-btn">No usar</button>
                    </div>
                `;
            };

            const Hits = (eh, phLocal, GolpesEnemigo, RespuestaJugador) => {
                let contador = GolpesEnemigo - RespuestaJugador;
                if(contador>0){
                    phLocal -= contador;
                    log(`Recibiste: ${contador} puntos de daño, tu vida actual es: ${phLocal}`);
                }
                else if(contador<0){
                    let damage = -contador;
                    eh -= damage;
                    log(`Realizaste: ${damage} puntos de daño, la vida actual de tu enemigo es: ${eh}`);
                }
                else{
                    log('Tu y tu enemigo lanzaron el mismo número de ataques, ninguno recibio daño.');
                }
                return [phLocal, eh];
            };

            const waitForUserChoice = () => {
                return new Promise((resolve) => {
                    const useBtn = panel.querySelector('#use-items-btn');
                    const skipBtn = panel.querySelector('#skip-btn');
                    const input = panel.querySelector('#use-items-input');

                    const cleanHandlers = () => {
                        useBtn.removeEventListener('click', onUse);
                        skipBtn.removeEventListener('click', onSkip);
                    };

                    const onUse = () => {
                        let val = parseInt(input.value, 10);
                        if (isNaN(val) || val < 0) val = 0;
                        if (val > pi) {
                            log('No tienes suficientes objetos.');
                            return;
                        }
                        cleanHandlers();
                        resolve(val);
                    };

                    const onSkip = () => {
                        cleanHandlers();
                        resolve(0);
                    };

                    useBtn.addEventListener('click', onUse);
                    skipBtn.addEventListener('click', onSkip);
                });
            };

            const nextRound = async () => {
                if (!active) return;
                if (enemyHealth <= 0 || ph <= 0) {
                    finish();
                    return;
                }

                const Ataques = Math.floor(Math.random() * 6) + 1;
                const Piedras = Math.floor(Math.random() * 10);
                pi += Piedras;
                log(`- Encontraste ${Piedras} piedras en el piso para usar en tu batalla (ahora tienes ${pi} items).`);
                log(`+ Tu enemigo hará ${Ataques} puntos de daño, ¿Cómo te vas a defender?.`);

                renderControlsForTurn(Ataques, pi);
                this.updateHUD(this.health,pi);
                const respuestaAlAtaque = await waitForUserChoice();
                const resultado = Hits(enemyHealth, ph, Ataques, respuestaAlAtaque);
                ph = resultado[0];
                enemyHealth = resultado[1];
                pi -= respuestaAlAtaque;
                this.items = pi;
                this.health = ph;
                
                setTimeout(nextRound, 250);
            };

            const finish = () => {
                active = false;
                controlsEl.innerHTML = '';
                if (enemyHealth > ph) {
                    log('Has sido derrotado.');
                } else {
                    log('Victoria.');
                }
                this.items = pi;
                this.health = ph;
                this.updateHUD();

                const doneBtn = document.createElement('button');
                doneBtn.innerText = 'Cerrar';
                doneBtn.addEventListener('click', () => { cleanup(); });
                controlsEl.appendChild(doneBtn);
            };

            nextRound();
        });
    }
}