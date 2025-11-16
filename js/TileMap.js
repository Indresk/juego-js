import Player from './Player.js';

export default class TileMap{
    constructor(tileSize){
        this.tileSize = tileSize
        this.floor = this.image('white-tile.webp');
        this.player = this.image('green.webp');
        this.wall = this.image('brick-g.webp');
        this.portal = this.image('door-open.webp');
        this.enemy = this.image('egg.webp');
        this.grass = this.image('grass.webp');
        this.tree = this.image('tree.webp');
        this.path = this.image('rocks-path.webp');
    }

    image(fileName){
        return `./assets/img/maptiles/${fileName}`;
    }
    
    // 0 -- Floor
    // 1 -- Player
    // 2 -- Wall
    // 3 -- Portal
    // 4 -- Enemy
    // 5 -- Grass
    // 6 -- Tree
    // 7 -- Path

    houseMap = [
        [2,2,2,2,3,2,2,2,2],
        [2,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,2],
        [2,0,0,0,1,0,0,0,2],
        [2,2,2,2,2,2,2,2,2],
    ];

    outDoorMap = [
        [0,0,0,0,0,0,0,0,0],
        [0,6,0,0,7,0,0,0,0],
        [0,0,5,0,7,0,0,0,0],
        [0,0,0,0,7,7,7,7,0],
        [0,0,0,0,7,0,0,6,0],
        [0,0,0,0,7,0,5,5,0],
        [0,0,0,0,3,0,0,0,0],
    ];

    selectedMap = [...this.houseMap];
    mapIndex = 0;

    mapSelector(newMap){
        switch(newMap){
            case 1:
                this.selectedMap = [...this.houseMap]
                this.mapIndex = 0;
            break;
            case 2:
                this.selectedMap = [...this.outDoorMap]
                this.mapIndex = 1;
            break;
            case 3:
                this.selectedMap = [...this.houseMap]
                this.mapIndex = 2;
            break;
            case 4:
                this.selectedMap = [...this.houseMap]
                this.mapIndex = 3;
            break;
            case 5:
                this.selectedMap = [...this.houseMap]
                this.mapIndex = 4;
            break;
            case 6:
                this.selectedMap = [...this.houseMap]
                this.mapIndex = 5;
            break;
            default:
                this.selectedMap = [...this.houseMap]
                this.mapIndex = 6;
            break;
        }
    }

    draw(canvas){
        this.mapSize(canvas);
        this.clearCanvas(canvas);
        this.drawMap(canvas);
    }

    mapSize(canvas){
        canvas.style.height = `${this.selectedMap.length * this.tileSize}px`;
        canvas.style.width = `${this.selectedMap[0].length * this.tileSize}px`;
        canvas.style.backgroundColor = 'black';
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
                let image = null;
                switch(tile){
                    case 0:
                        image = this.floor;
                    break;
                    case 1:
                        // image = this.player;
                    break;
                    case 2:
                        image = this.wall;
                    break;
                    case 3:
                        image = this.portal;
                    break;
                    case 4:
                        image = this.enemy;
                    break;
                    case 5:
                        image = this.grass;
                    break;
                    case 6:
                        image = this.tree;
                    break;
                    case 7:
                        image = this.path;
                    break;
                }

                if(image != null){
                    this.drawImage(canvas,image,column * this.tileSize,row * this.tileSize,this.tileSize,this.tileSize);
                }
            }
        }
    }

    getPlayer(velocity){
        for(let row = 0; row < this.selectedMap.length; row++){
            for(let column = 0; column < this.selectedMap[row].length; column++){
                let tile = this.selectedMap[row][column];
                if(tile === 1){
                    this.selectedMap[row][column] = 0;
                    return new Player(column * this.tileSize,row * this.tileSize,this.tileSize,velocity, this);
                }
            }
        }
    }

    collide(x, y, direction) {

        const s = this.tileSize;
        const centerX = x + s / 2;
        const centerY = y + s / 2;

        let checkX = centerX;
        let checkY = centerY;

        const half = s / 2;

        switch (direction) {
            case "up":    
                checkY = centerY - half - 1; 
            break;
            case "down":  
                checkY = centerY + half + 1; 
            break;
            case "left":  
                checkX = centerX - half - 1; 
            break;
            case "right": 
                checkX = centerX + half + 1; 
            break;
        }

        const col = Math.floor(checkX / s);
        const row = Math.floor(checkY / s);

        if (row < 0 || col < 0 ||
            row >= this.selectedMap.length ||
            col >= this.selectedMap[0].length)
            return true;

        return this.selectedMap[row][col];
    }
}
