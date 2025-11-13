export default class TileMap{
    constructor(tileSize){
        this.tileSize = tileSize
        this.player = this.image('green.webp');//'#ffca28'//
        this.void = this.image('black-tile.webp');//'#000' //
        this.portal = this.image('door-open.webp');//'#1b78a5' //
        this.wall = this.image('brick-g.webp');//'#f18127' //
        this.enemy = this.image('red.webp');//'#aa2409' //
    }

    image(fileName){
        return `./assets/img/maptiles/${fileName}`;
    }
    
    // 0 -- void
    // 1 -- Player
    // 2 -- Wall
    // 3 -- Portal
    // 4 -- Enemy

    houseMap = [
        [2,2,2,2,3,2,2,2,2],
        [2,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,2],
        [2,2,2,2,2,2,2,2,2],
    ];

    draw(canvas){
        this.mapSize(canvas);
        this.clearCanvas(canvas);
        this.drawMap(canvas);
    }

    mapSize(canvas){
        canvas.style.height = `${this.houseMap.length * this.tileSize}px`;
        canvas.style.width = `${this.houseMap[0].length * this.tileSize}px`;
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
        // tile.style.backgroundColor = image;
        tile.style.position = 'absolute';
        tile.style.left = `${positionX}px`;
        tile.style.top = `${positionY}px`;
        canvas.appendChild(tile);
    }

    drawMap(canvas){
        for(let row = 0; row < this.houseMap.length; row++){
            for(let column = 0; column < this.houseMap[row].length; column++){
                const tile = this.houseMap[row][column];
                let image = null;
                let positionX = column * this.tileSize;
                let positionY = row * this.tileSize;
                switch(tile){
                    case 0:
                        image = this.void;
                    break;
                    case 1:
                        image = this.player;
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
                }

                if(image != null){
                    this.drawImage(canvas,image,positionX,positionY,this.tileSize,this.tileSize);
                }
            }
        }
    }
}
