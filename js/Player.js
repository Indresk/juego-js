import MovingDirection from "./MovingDirection.js";

export default class Player {
    constructor(x,y,tileSize,velocity,tileMap){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.currentMovingDirection = null;
        this.viewDirection = null;
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

    getTexts(text){
        this.texts = text;
    }

    #mapChanger(verification,location,mapIndex){
        if (verification === 3 && mapIndex === 0) { // && location.row === 0 && location.col === 3
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
        if (verification === 10 && mapIndex === 1) {
            this.tileMap.mapSelector(2);
            this.y = this.tileSize*6
            this.x = this.tileSize*3
            this.currentMovingDirection = null;
            document.querySelector('#displayed-text').innerText = this.texts.TMap02;
        }

        // ruta slime
        if (verification === 20 && mapIndex === 2) {
            this.tileMap.mapSelector(1);
            this.y = this.tileSize*0
            this.x = this.tileSize*4
            this.currentMovingDirection = null;
            document.querySelector('#displayed-text').innerText = this.texts.TMap01;
        }
        if (verification === 10 && mapIndex === 2) {
            this.tileMap.mapSelector(3);
            this.y = this.tileSize*0
            this.x = this.tileSize*4
            this.currentMovingDirection = null;
            document.querySelector('#displayed-text').innerText = this.texts.TMap04;
        }
        if (verification === 21 && mapIndex === 2) {
            this.tileMap.mapSelector(4);
            this.y = this.tileSize*0
            this.x = this.tileSize*4
            this.currentMovingDirection = null;
            document.querySelector('#displayed-text').innerText = this.texts.TMap07;
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

    pickupItem(){
        let verification = this.tileMap.collide(this.x, this.y, this.viewDirection);
        if ([1,18].includes(verification.itemColided)) {
            this.items += 1;
            window.document.querySelector('#pi').innerText = `Items del jugador: ${this.items}`
            this.tileMap.modifyWorld(this.x, this.y, this.viewDirection);
        }
    }
}