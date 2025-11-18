import Player from './Player.js';

export default class TileMap{
    constructor(tileSize){
        this.tileSize = tileSize;
        this.maps = undefined;
        this.selectedMap = undefined;
        this.mapIndex = 0;
        this.#mapImages();
    }
    
    // 0 -- Floor
    // 1 -- Pot
    // 2 -- Wall
    // 3 -- Portal
    // 4 -- Enemy
    // 5 -- Grass
    // 6 -- Tree
    // 7 -- Path

    #mapImages(){
        const floor = './assets/img/maptiles/white-tile.webp';
        const pot = './assets/img/maptiles/pot.webp';
        const wall = './assets/img/maptiles/brick-g.webp';
        const portal = './assets/img/maptiles/door-open.webp';
        const enemy = './assets/img/maptiles/egg.webp';
        const grass = './assets/img/maptiles/grass.webp';
        const tree = './assets/img/maptiles/tree.webp';
        const path = './assets/img/maptiles/rocks-path.webp';

        this.mapImages = [floor,pot,wall,portal,enemy,grass,tree,path]
    }

    mapDefiner(maps){
        this.maps = maps
        this.selectedMap = Object.values(this.maps)[0];
    }

    mapSelector(newMap){
        this.selectedMap = Object.values(this.maps)[newMap];
        this.mapIndex = newMap;
    }

    draw(canvas){
        this.mapSize(canvas);
        this.clearCanvas(canvas);
        this.drawMap(canvas);
    }

    mapSize(canvas){
        canvas.style.height = `${this.selectedMap.length * this.tileSize}px`;
        canvas.style.width = `${this.selectedMap[0].length * this.tileSize}px`;
        canvas.style.backgroundColor = 'white';
    }

    clearCanvas(canvas){
        canvas.innerHTML = '';
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
        // tile.style.border = 'yellow 1px solid';
        canvas.appendChild(tile);
    }

    drawMap(canvas){
        for(let row = 0; row < this.selectedMap.length; row++){
            for(let column = 0; column < this.selectedMap[row].length; column++){
                const tile = this.selectedMap[row][column];
                let image = this.mapImages[tile] || null;
                if(image != null){
                    this.drawImage(canvas,image,column * this.tileSize,row * this.tileSize,this.tileSize,this.tileSize);
                }
            }
        }
    }

    getPlayer(velocity){
        return new Player(4 * this.tileSize,5 * this.tileSize,this.tileSize,velocity, this);
    }

    collide(x, y, direction) {
        const s = this.tileSize;
        const half = s / 2;
        
        const centerX = x + half;
        const centerY = y + half;

        let checkX = centerX;
        let checkY = centerY;

        switch (direction) {
            case 4:    
                checkY = centerY - half - 1;
            break;
            case 1:  
                checkY = centerY + half + 1; 
            break;
            case 2:  
                checkX = centerX - half - 1; 
            break;
            case 3: 
                checkX = centerX + half + 1; 
            break;
        }

        const col = Math.floor(checkX / s);
        const row = Math.floor(checkY / s);

        if (row < 0 || col < 0 || row >= this.selectedMap.length || col >= this.selectedMap[0].length)
            return true;
        return {itemColided: this.selectedMap[row][col], itemLocation:{row:row,col:col}};
    }
}
