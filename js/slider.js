'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/
let outil, previous, toggle, next, randomSlide, compteur=0, VerificationKeyDown=0, image, IdInterval, span3, span4, pause, legende,bouton1,bouton2,bouton3,bouton4,bouton5,bouton6;
let tableauImages = ['images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg','images/5.jpg','images/6.jpg'];
let tableauLegende = ['Street Art','Fast Lane','Colorful Building','Skyscrapers','City by night','Tour Eiffel la nuit'];
let tableauBouton = ['bouton1','bouton2','bouton3','bouton4','bouton5','bouton6'];
/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/

function Display() {
    let option = document.getElementById('toolbar'), span1 = document.getElementById('span1'), span2 = document.getElementById('span2');
    option.classList.toggle('display');
    span1.classList.toggle('display');
    span2.classList.toggle('display');
}

function Previous(){
    if ( VerificationKeyDown === 1 ) {
        Pause();
    }
    compteur--;
    image.setAttribute('src',tableauImages[compteur]);
    legende.innerHTML = tableauLegende[compteur];
    desactivation();
    verification();
    if ( compteur === -1) {
        compteur=5;
        image.setAttribute('src',tableauImages[compteur]);
        legende.innerHTML = tableauLegende[compteur];
        desactivation();
        verification();
    }
}
function Next(){
    if ( VerificationKeyDown === 1 ) {
        Pause();
    }
    compteur++;
    image.setAttribute('src',tableauImages[compteur]);
    legende.innerHTML = tableauLegende[compteur];
    desactivation();
    verification();
    if ( compteur === 6 ) {
        compteur = 0;
        image.setAttribute('src',tableauImages[compteur]);
        legende.innerHTML = tableauLegende[compteur];
        desactivation();
        verification();
    }
}
function Start() {
    VerificationKeyDown = 1;
    span3.classList.toggle('display');
    span4.classList.toggle('display');
    IdInterval = setInterval(Toggle,2000);
}
function Toggle(){
    image.setAttribute('src',tableauImages[compteur]);
    legende.innerHTML = tableauLegende[compteur];
    desactivation();
    verification();
    compteur ++;
    if ( compteur === 6 ) {
        compteur = 0;
    }
    toggle.removeEventListener('click',Start);
}
function RandomSlide(){
    if ( VerificationKeyDown === 1 ) {
        Pause();
    }
    let compteur2 = Math.floor(Math.random()*6);  
    while ( compteur2 === compteur) {
        compteur2 = Math.floor(Math.random()*6);
    }
    image.setAttribute('src',tableauImages[compteur2]);
    legende.innerHTML = tableauLegende[compteur2];
    compteur=compteur2;
    desactivation();
    verification();
}
function Pause() {
    VerificationKeyDown = 0;
    span3.classList.toggle('display');
    span4.classList.toggle('display');
    clearInterval(IdInterval);
    toggle.addEventListener('click',Start);
}

function ImageDirect(x) {
    desactivation();
    for ( let i = 0 ; i < tableauBouton.length ; i++) {
        if (x.getAttribute('id') === tableauBouton[i]) {
            compteur = i;
            image.setAttribute('src',tableauImages[compteur]);
            legende.innerHTML = tableauLegende[compteur];
            x.classList.add('Couleur');
        }
    }  
}
function desactivation() {
    bouton1.classList.remove('Couleur');
    bouton2.classList.remove('Couleur');
    bouton3.classList.remove('Couleur');
    bouton4.classList.remove('Couleur');
    bouton5.classList.remove('Couleur');
    bouton6.classList.remove('Couleur');
}
function verification() {
    if ( 'bouton1' === tableauBouton[compteur]) {
        bouton1.classList.add('Couleur');
    } else if ( 'bouton2' === tableauBouton[compteur]) {
        bouton2.classList.add('Couleur');
    } else if ( 'bouton3' === tableauBouton[compteur]) {
        bouton3.classList.add('Couleur');
    } else if ( 'bouton4' === tableauBouton[compteur]) {
        bouton4.classList.add('Couleur');
    } else if ( 'bouton5' === tableauBouton[compteur]) {
        bouton5.classList.add('Couleur');
    } else if ( 'bouton6' === tableauBouton[compteur]) {
        bouton6.classList.add('Couleur');
    }
}

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

document.addEventListener('DOMContentLoaded', function(){
    
    previous = document.getElementById('slider_previous');
    toggle = document.getElementById('slider_toggle');
    next = document.getElementById('slider_next');
    randomSlide = document.getElementById('slider_random');
    outil = document.getElementById('toolbar_toggle');
    image = document.getElementById('image');
    legende = document.getElementById('legende');
    span3 = document.getElementById('span3');
    span4 = document.getElementById('span4');
    pause= document.getElementById('pause');
    bouton1 = document.getElementById("bouton1");
    bouton2 = document.getElementById("bouton2");
    bouton3 = document.getElementById("bouton3");
    bouton4 = document.getElementById("bouton4");
    bouton5 = document.getElementById("bouton5");
    bouton6 = document.getElementById("bouton6");
    
    bouton1.addEventListener('click', function() {
        ImageDirect(bouton1);
    });
    bouton2.addEventListener('click', function() {
        ImageDirect(bouton2);
    });
    bouton3.addEventListener('click', function() {
        ImageDirect(bouton3);
    });
    bouton4.addEventListener('click', function() {
        ImageDirect(bouton4);
    });
    bouton5.addEventListener('click', function() {
        ImageDirect(bouton5);
    });
    bouton6.addEventListener('click', function() {
        ImageDirect(bouton6);
    });

    outil.addEventListener('click',Display);
    previous.addEventListener('click',Previous);
    toggle.addEventListener('click',Start);
    next.addEventListener('click',Next);
    randomSlide.addEventListener('click',RandomSlide);
    pause.addEventListener('click',Pause);
    
    window.addEventListener('keydown',function (event) {
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "ArrowRight" :
                Next();
                break;
            case "ArrowLeft" :
                Previous();
                break;
            case "Enter" :
                if ( VerificationKeyDown === 0 ) {
                Start();
                break;
                }

            case "Enter" :
                if ( VerificationKeyDown === 1) {
                Pause();
                }
                break;
            default:
            return;
        }
    event.preventDefault(); 
    },true);
});