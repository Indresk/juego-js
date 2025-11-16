import TileMap from "./TileMap.js";
const generalContainer = document.querySelector('.general-container');

const tileSize = 90;
const velocity = tileSize/10;

const tileMap = new TileMap(tileSize);
const player = tileMap.getPlayer(velocity);

const gameBoard = document.createElement('div');
gameBoard.id = 'gameBoard';
gameBoard.style.position = 'relative';


// const getData = async (url)=>{
//     try{
//         const r = await fetch(url);
//         const data = await r.json();
//         return await data;
//     }
//     catch(error){
//         console.warn('error en: ',error)
//         return null;
//     }
//     finally{
//     }
// }

// console.log(getData('../db/maps.json'));

// fetch('../db/maps.json')
//     .then(respuesta => respuesta.json())
//     .then(datos => console.log(datos))


const gameLoop = (canvas) => {
    setInterval(()=>{
        tileMap.draw(canvas);
        player.draw(canvas)
    },1000/30)
}

// setTimeout(()=>{tileMap.mapSelector(2)},3000)

// generalContainer.addEventListener('click',(e)=>{
//     if(e.target.innerText === 'NUEVA PARTIDA'){
//         generalContainer.innerHTML = '';
        generalContainer.appendChild(gameBoard);
        gameLoop(gameBoard);
//     }
// });


