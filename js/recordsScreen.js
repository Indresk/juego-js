export default function recordScreen(){
    let registrosActuales = JSON.parse(localStorage.getItem("jugadores")) || [];
    
    generalContainer.innerHTML = `
        <div id="records" class="intro-container">
            <div>
                <h1 class="highlighted-text">Mejores puntuaciones</h1>
                <p>¿Aún no aparece tu nombre? Juega una partida y muestranos de lo que eres capaz</p>
            </div>
            <div id="puntuaciones">
            </div>
            <div class="btniL">
                <button class="secondary">Volver al inicio</button>
            </div>
        </div>
    `

    const boardPuntos = document.querySelector('#puntuaciones')
    if(registrosActuales.length == 0){
        boardPuntos.innerHTML = `Nadie ha registrado su puntuación todavia. :(`
    }
    else{
        registrosActuales.sort((a, b) => b.puntuacion - a.puntuacion);
        registrosActuales.forEach(registro => {
            let card = document.createElement('div');
            card.classList = 'score-card';
            card.innerHTML = `
                <div class="nombre">
                    <p>Nombre del jugador: ${registro.nombre}</p>
                </div>
                <div class="puntos">
                    <p>Puntuación</p> 
                    <div>${registro.puntuacion}</div>
                </div>
            `
            boardPuntos.appendChild(card);
        });
    }
}