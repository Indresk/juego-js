import TileMap from "./TileMap.js";
const generalContainer = document.querySelector('.general-container');
const tileSize = generalContainer.clientWidth/15;

const tileMap = new TileMap(tileSize);

const gameBoard = document.createElement('div');
gameBoard.id = 'gameBoard';
gameBoard.style.position = 'relative';

generalContainer.addEventListener('click',(e)=>{
    if(e.target.innerText === 'NUEVA PARTIDA'){
        generalContainer.innerHTML = '';
        generalContainer.appendChild(gameBoard);
        gameLoop(gameBoard);
    }
});

const gameLoop = (canvas) => {
    setInterval(()=>{tileMap.draw(canvas)},1000/2)
}
