//crear una instancia del objeto Audio y guardarlas en variables
const html=document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo=document.querySelector('.app__title'); 
const botones= document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const botonIniciarPausar= document.querySelector('#start-pause');

const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');

let tiempoTranscurridoEnSegundos =5;
let idIntervalo=null;

musica.loop=true;

inputEnfoqueMusica.addEventListener('change',()=>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

//escuchar cuando alquien haganun click--- evento Listener
botonCorto.addEventListener('click', ()=> {
    //html.setAttribute('data-contexto','descanso-corto');
    //banner.setAttribute('src','./imagenes/descanso-corto.png');
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});//aero feishon

botonEnfoque.addEventListener('click' , ()=> {
    /*html.setAttribute('data-contexto','enfoque');
    banner.setAttribute('src','./imagenes/enfoque.png');*/
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonLargo.addEventListener('click' , ()=> {
   /* html.setAttribute('data-contexto','descanso-largo');
    banner.setAttribute('src','./imagenes/descanso-largo.png');*/
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});

function cambiarContexto(contexto){
    //limpiar los botones que no fueron clickeados
    botones.forEach(function(contexto){
        contexto.classList.remove('active');
    })
        
    
    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`./imagenes/${contexto}.png`);

    switch(contexto){
        case "enfoque":
            titulo.innerHTML=`
            Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.
            </strong>`;
            break;
        case "descanso-corto":
            titulo.innerHTML=`
            ¿Què tal tomar un respiro?
            <strong class="app__title-strong">¡Haz una pausa corta!
            </strong>`;
            break;
        case "descanso-largo":
            titulo.innerHTML=`
            Hora de volver a la superficie
            Haz una pausa larga.
            <strong class="app__title-strong">¡Haz una pausa larga!
            </strong>`; 
            break;   
        default:
            break;

    }
}

const cuentaREgresiva=()=>{
    //iniciarPausar();
    if(tiempoTranscurridoEnSegundos<=0){
       reiniciar(); 
       alert('Tiempo final');//para decirle al usuario que el tiempo se ha agotado y después concluye el flujo con un "return".
       return; 
    }
    //disminuir el valor de la variable en uno cada vez que la función "cuentaRegresiva" es ejecutada.
    tiempoTranscurridoEnSegundos -=1;
    console.log("Temporizador: " + tiempoTranscurridoEnSegundos);
}

//botonIniciarPausar.addEventListener('click',cuentaREgresiva);

//Pasa la función "iniciarPausar()" como parámetro para el eventListener del botonIniciarPausar.
botonIniciarPausar.addEventListener('click',iniciarPausar);//para escuchar cada vez que el usuario haga clic en el botón "Comenzar".

function iniciarPausar(){
    if(idIntervalo){//donde la variable "idIntervalo" existe
        reiniciar();
        return;
    }
    idIntervalo=setInterval(cuentaREgresiva,1000);//método "setInterval()".pasa la función "cuentaRegresiva" y 1000 milisegundos.
}

function reiniciar(){
    clearInterval(idIntervalo);//interrumpe el setInterval
    idIntervalo=null;
}