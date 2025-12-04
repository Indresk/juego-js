import TileMap from "./TileMap.js";
import getData from "./getData.js";
import getControlUi from "./controlsUi.js";
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

window.addEventListener('click', async (e)=>{
    if(e.target.innerText === 'NUEVA PARTIDA'){
            generalContainer.innerHTML = 'Cargando';
        try{
            await new Promise(res => setTimeout(res, 1000));
            db = await Promise.all([
                getData('../db/maps.json'),
                getData('../db/textos.json'),
                getData('https://jsonplaceholder.typicode.com/todos/2')
            ]);
        }
        catch(error){
            generalContainer.innerHTML = `Error en la carga de archivos:
            ${error}`;
            return;
        }
        tileMap.mapDefiner(db[0]);
        player.getTexts(db[1]);
        generalContainer.innerHTML = '';
        generalContainer.appendChild(gameBoard);
        generalContainer.appendChild(getControlUi());
        gameLoop(gameBoard);
    }
});

window.addEventListener('mouseup', (e)=>{
    if(e.target.closest('#WKey'))player.keyup('w');
    if(e.target.closest('#SKey'))player.keyup('s');
    if(e.target.closest('#AKey'))player.keyup('a');
    if(e.target.closest('#DKey'))player.keyup('d');    
});

window.addEventListener('mousedown', (e)=>{
    if(e.target.closest('#WKey'))player.keydown('w');
    if(e.target.closest('#SKey'))player.keydown('s');
    if(e.target.closest('#AKey'))player.keydown('a');
    if(e.target.closest('#DKey'))player.keydown('d');    
});

window.addEventListener('keyup', (e)=>{
    player.keyup(e.key);
    if(e.key == 'w') generalContainer.querySelector('#WKey').className = '';
    if(e.key == 's') generalContainer.querySelector('#SKey').className = '';
    if(e.key == 'a') generalContainer.querySelector('#AKey').className = '';
    if(e.key == 'd') generalContainer.querySelector('#DKey').className = '';   
});

window.addEventListener('keydown', (e)=>{
    player.keydown(e.key);
    if(e.key == 'w') generalContainer.querySelector('#WKey').className = 'active';
    if(e.key == 's') generalContainer.querySelector('#SKey').className = 'active';
    if(e.key == 'a') generalContainer.querySelector('#AKey').className = 'active';
    if(e.key == 'd') generalContainer.querySelector('#DKey').className = 'active';
});






