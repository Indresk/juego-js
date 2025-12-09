export default function gameover(playerItems,playerDefeatedEnemies,health){
    gameoverSound.play()
    let finalScore = playerItems + (playerDefeatedEnemies*10) + (health*2)
    let registrosActuales = JSON.parse(localStorage.getItem("jugadores")) || [];
    
    generalContainer.innerHTML = `
        <div id="gameover" class="intro-container">
            <div>
                <h1 class="highlighted-text">Game Over</h1>
                <p>Fue una gran aventura pero hasta aquí ha llegado, tu puntuación fue:</p>
            </div>
            <p class="finalScore">
                ${finalScore}
            </p>
            <div>
                <p>¿Quieres registrar tu puntuación?</p>
                <label for="jugador">Escribe tu nombre aquí y oprime el botón registrar:</label>
                <input id="jugador" type="text"></input>
            </div>
            <div class="btniL">
                <button class="primary">Registrar</button>
                <button class="secondary">Volver al inicio</button>
            </div>
        </div>
    `

    generalContainer.addEventListener('click',(e)=>{
        if(e.target.innerText === 'REGISTRAR'){
            click.play();
            let nombreARegistrar = document.querySelector('#jugador').value;
            if(nombreARegistrar != ''){
                let puntuacionJugador = {nombre: nombreARegistrar, puntuacion: finalScore}
                let index = registrosActuales.findIndex(jugador =>jugador.nombre == nombreARegistrar)
                if(index != -1){
                    registrosActuales[index] = puntuacionJugador;
                    toastActivation("Nueva puntuación registrada, puntuación anterior sobre escrita");
                }
                else{
                    registrosActuales.push(puntuacionJugador);
                    toastActivation("Puntuación registrada");
                }
                localStorage.setItem("jugadores",JSON.stringify(registrosActuales));
            }
            else{
                toastActivation("Ingresa un nombre para registrar tu puntuación");
            }
        };

    })
}