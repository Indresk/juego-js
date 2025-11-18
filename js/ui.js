import TileMap from "./TileMap.js";
import getData from "./getData.js";
const generalContainer = document.querySelector('.general-container');

const tileSize = generalContainer.clientWidth/15;
const velocity = tileSize/10;

let db = undefined;

const tileMap = new TileMap(tileSize);
const player = tileMap.getPlayer(velocity);

const gameLoop = (canvas) => {
    setInterval(()=>{
        tileMap.draw(canvas);
        player.draw(canvas)
    },1000/30)
}

const gameBoard = document.createElement('div');
gameBoard.id = 'gameBoard';
gameBoard.style.position = 'relative';

generalContainer.addEventListener('click', async (e)=>{
if(e.target.innerText === 'NUEVA PARTIDA'){
        generalContainer.innerHTML = 'Cargando';
    try{
        await new Promise(res => setTimeout(res, 1000));
        db = await Promise.all([
            getData('../db/maps.json'),
            // getData('https://jsonplaceholder.typicode.com/todos/1'),
            // getData('https://jsonplaceholder.typicode.com/todos/2')
        ]);
    }
    catch(error){
        generalContainer.innerHTML = `Error en la carga de archivos:
        ${error}`;
        return;
    }
    console.log(db) // Test
    tileMap.mapDefiner(db[0]);
    generalContainer.innerHTML = '';
    generalContainer.appendChild(gameBoard);  
    gameLoop(gameBoard);
}});







