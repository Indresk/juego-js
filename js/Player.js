import MovingDirection from "./MovingDirection.js";

export default class Player {
    constructor(x,y,tileSize,velocity,tileMap){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.currentMovingDirection = null;
        window.addEventListener('keydown',this.#keydown);
        window.addEventListener('keyup',this.#keyup);
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

    #keyup = (event) => {
        if(["w","a","s","d"].includes(event.key)){
            this.currentMovingDirection = null;
        }
    }

    #keydown = (event) => {
        if(event.key == "w") this.currentMovingDirection = MovingDirection.up;
        if(event.key == "a") this.currentMovingDirection = MovingDirection.left;
        if(event.key == "s") this.currentMovingDirection = MovingDirection.down;
        if(event.key == "d") this.currentMovingDirection = MovingDirection.right;
    }

    #moveVerification() {
        if (this.currentMovingDirection) {
            let verification = this.tileMap.collide(this.x, this.y, this.currentMovingDirection);
            let index = this.tileMap.mapIndex;
            if ([2,1,6].includes(verification.itemColided) || verification === true) {
                return;
            }
            this.#mapChanger(verification.itemColided,verification.itemLocation,index);
        }
        this.#move();
    }

    #mapChanger(verification,location,mapIndex){
        if (verification === 3 && mapIndex === 0 && location.row === 0 && location.col === 4) {
            this.tileMap.mapSelector(1);
            this.y = this.tileSize*5
        }
        if (verification === 3 && mapIndex === 0 && location.row === 3 && location.col === 8) {
            this.tileMap.mapSelector(2);
            this.y = this.tileSize*5
        }
        if (verification === 3 && mapIndex === 2) {
            this.tileMap.mapSelector(0);
            this.y = this.tileSize*5
        }
        if (verification === 3 && mapIndex === 1) {
            this.tileMap.mapSelector(0);
            this.y = this.tileSize*1
            this.x = this.tileSize*4
        }
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
}