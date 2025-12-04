const sound = new Audio('../assets/sounds/forest.wav');
sound.loop = true;
sound.play();
sound.volume = 0.3;

const musicButton = document.querySelector('.music')

const toastActivation = (copy)=>{
    Toastify({
        text: `${copy}`,
        className: "toast",
        gravity: "bottom",
        position: "center",
        duration: 2000
    }).showToast();
}

musicButton.addEventListener('click',()=>{
    let state = musicButton.getAttribute('data-state');
    if(state == 'on'){
        musicButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 10c0 -1.146 .277 -2.245 .78 -3.219m1.792 -2.208a7 7 0 0 1 10.428 9.027a10 10 0 0 1 -.633 .762m-2.045 1.96a8 8 0 0 0 -1.322 2.278a4.5 4.5 0 0 1 -6.8 1.4" /><path d="M11.42 7.414a3 3 0 0 1 4.131 4.13" /><path d="M3 3l18 18" /></svg>'
        musicButton.setAttribute('data-state','off')
        toastActivation("Musica pausada");
        sound.pause();
    }
    else{
        musicButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 10a7 7 0 1 1 13 3.6a10 10 0 0 1 -2 2a8 8 0 0 0 -2 3a4.5 4.5 0 0 1 -6.8 1.4" /><path d="M10 10a3 3 0 1 1 5 2.2" /></svg>'
        musicButton.setAttribute('data-state','on')
        toastActivation("Musica activada");
        sound.play();
    }
});