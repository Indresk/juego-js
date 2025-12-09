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
    // 8 -- Sign
    // 9 -- Mushroom
    // 10 -- PathTp

    #mapImages(){
        const floor = './assets/img/maptiles/white-tile.webp';       // 00
        const pot = './assets/img/maptiles/pot.webp';                // 01
        const wall = './assets/img/maptiles/brick-g.webp';           // 02
        const portal = './assets/img/maptiles/door-open.webp';       // 03
        const enemy = './assets/img/maptiles/egg.webp';              // 04
        const grass = './assets/img/maptiles/grass.webp';            // 05
        const tree = './assets/img/maptiles/tree.webp';              // 06
        const path = './assets/img/maptiles/rocks-path.webp';        // 07
        const sign = './assets/img/maptiles/sign.webp';              // 08
        const mushroom = './assets/img/maptiles/mushroom.webp';      // 09
        const gargoyle = './assets/img/maptiles/gargoyle.webp';   // 10
        const lakebl = './assets/img/maptiles/lake-bl.webp';         // 11
        const lakebr = './assets/img/maptiles/lake-br.webp';         // 12
        const laketl = './assets/img/maptiles/lake-tl.webp';         // 13
        const laketr = './assets/img/maptiles/lake-tr.webp';         // 14
        const lakeml = './assets/img/maptiles/lake-ml.webp';         // 15
        const lakemr = './assets/img/maptiles/lake-mr.webp';         // 16
        const treeWl = './assets/img/maptiles/tree-wl.webp';         // 17
        const potion = './assets/img/maptiles/full-potion.webp';     // 18
        const egg = './assets/img/maptiles/egg.webp';                // 19

        this.mapImages = [floor,pot,wall,portal,enemy,grass,tree,path,sign,mushroom,gargoyle,lakebl,lakebr,laketl,laketr,lakeml,lakemr,treeWl,potion,egg]
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
        return new Player(3 * this.tileSize,4 * this.tileSize,this.tileSize,velocity, this);
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

    modifyWorld(x, y, direction){
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

        this.selectedMap[row].splice(col,1,0);
    }
}
