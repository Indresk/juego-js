import MovingDirection from "./movingDirection.js";

export default class Player {
    constructor(x,y,tileSize,velocity,tileMap){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;
        window.addEventListener('keydown',this.#keydown);
        window.addEventListener('keyup',this.#keyup);
        this.#loadImages();
    }

    draw(canvas){
        this.#move();
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

    #keyup = (event) => {
        if(["w","a","s","d"].includes(event.key)){
            this.requestedMovingDirection = null;
            this.currentMovingDirection = null;
            this.isStopping = true;
        }
    }

    #keydown = (event) => {
        if(event.key == "w") this.requestedMovingDirection = MovingDirection.up;
        if(event.key == "a") this.requestedMovingDirection = MovingDirection.left;
        if(event.key == "s") this.requestedMovingDirection = MovingDirection.down;
        if(event.key == "d") this.requestedMovingDirection = MovingDirection.right;
    }

    #move() {
        if (this.currentMovingDirection === null) {
            if (this.isStopping) {
                this.#snapToGrid();
                return;
            }
        }

        if (this.requestedMovingDirection &&
            this.currentMovingDirection !== this.requestedMovingDirection) {

            if (this.#isAlignedToGrid()) {
                let canTurn = this.tileMap.collide(this.x, this.y, this.requestedMovingDirection) !== 2;
                if (canTurn) {
                    this.currentMovingDirection = this.requestedMovingDirection;
                }
            }
        }

        if (this.currentMovingDirection) {
            let verification = this.tileMap.collide(this.x, this.y, this.currentMovingDirection);
            let index = this.tileMap.mapIndex;
            if (verification === 2) {
                return;
            }
            if (verification === 3 && index === 0) {
                this.tileMap.mapSelector(2);
                this.y = this.tileSize*5
            }
            if (verification === 3 && index === 1) {
                this.tileMap.mapSelector(1);
                this.y = this.tileSize*1
                this.x = this.tileSize*4
                console.log(this.tileMap)
                console.log(this.tileMap.mapIndex === 1)
            }
        }

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


    #isAlignedToGrid() {
    return (
        Math.abs(this.x % this.tileSize) < 1 &&
        Math.abs(this.y % this.tileSize) < 1
        );
    }


    #snapToGrid() {
        const s = this.tileSize;

        const cx = this.x / s;
        const cy = this.y / s;

        const candidates = [];
        const baseCol = Math.round(cx);
        const baseRow = Math.round(cy);

        for (let r = baseRow - 1; r <= baseRow + 1; r++) {
            for (let c = baseCol - 1; c <= baseCol + 1; c++) {
                if (r < 0 || c < 0 || r >= this.tileMap.selectedMap.length || c >= this.tileMap.selectedMap[0].length) continue;
                if (this.tileMap.selectedMap[r][c] === 2) continue;
                const tileCenterX = c * s + s / 2;
                const tileCenterY = r * s + s / 2;
                const dist = Math.hypot(this.x + s/2 - tileCenterX, this.y + s/2 - tileCenterY);
                candidates.push({r, c, tileCenterX, tileCenterY, dist});
            }
        }

        if (candidates.length === 0) {
            this.isStopping = false;
            return;
        }

        candidates.sort((a,b) => a.dist - b.dist);
        const target = candidates[0];

        const targetX = target.tileCenterX - s / 2;
        const targetY = target.tileCenterY - s / 2;

        const snapSpeed = this.velocity * 2;

        let doneX = false;
        let doneY = false;

        if (Math.abs(this.x - targetX) <= snapSpeed) {
            this.x = targetX;
            doneX = true;
        } else {
            this.x += (this.x < targetX ? snapSpeed : -snapSpeed);
        }

        if (Math.abs(this.y - targetY) <= snapSpeed) {
            this.y = targetY;
            doneY = true;
        } else {
            this.y += (this.y < targetY ? snapSpeed : -snapSpeed);
        }

        if (doneX && doneY) {
            this.isStopping = false;
        }
    }
}