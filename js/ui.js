import TileMap from "./TileMap.js";
import getData from "./getData.js";
import getControlUi from "./controlsUi.js";
import recordScreen from "./recordsScreen.js";
const generalContainer = document.querySelector('.general-container');

const tileSize = generalContainer.clientWidth/15;
const velocity = tileSize/10;

let db = undefined;

let tileMap = null;
let player = null;

const gameLoop = (canvas) => {
    let loop = setInterval(()=>{
        tileMap.draw(canvas);
        player.draw(canvas);
        if(document.querySelector('#gameover')){clearInterval(loop);player=null;tileMap=null}
    },1000/30)
}

const gameBoard = document.createElement('div');
gameBoard.id = 'gameBoard';
gameBoard.style.position = 'relative';

window.addEventListener('click', async (e)=>{
    if(e.target.innerText === 'NUEVA PARTIDA'){
        tileMap = new TileMap(tileSize);
        player = tileMap.getPlayer(velocity);
        generalContainer.innerHTML = 'Cargando';
        click.play();
        try{
            await new Promise(res => setTimeout(res, 1000));
            db = await Promise.all([
                getData('../db/maps.json'),
                getData('../db/textos.json'),
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
    if(e.target.innerText === 'VOLVER AL INICIO'){gameInit();click.play();};
    if(e.target.innerText === 'RECORDS'){recordScreen();click.play();};
});

// UI detection

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
    if(e.target.closest('#EKey'))player.keydown('e');
});

window.addEventListener('keyup', (e)=>{
    if(player)player.keyup(e.key);
    if(e.key == 'w' && player) generalContainer.querySelector('#WKey').className = '';
    if(e.key == 's' && player) generalContainer.querySelector('#SKey').className = '';
    if(e.key == 'a' && player) generalContainer.querySelector('#AKey').className = '';
    if(e.key == 'd' && player) generalContainer.querySelector('#DKey').className = '';   
    if(e.key == 'e' && player) generalContainer.querySelector('#EKey').className = ''; 
});

window.addEventListener('keydown', (e)=>{
    if(player)player.keydown(e.key);
    if(e.key == 'w' && player) generalContainer.querySelector('#WKey').className = 'active';
    if(e.key == 's' && player) generalContainer.querySelector('#SKey').className = 'active';
    if(e.key == 'a' && player) generalContainer.querySelector('#AKey').className = 'active';
    if(e.key == 'd' && player) generalContainer.querySelector('#DKey').className = 'active';
    if(e.key == 'e' && player) generalContainer.querySelector('#EKey').className = 'active';
});






