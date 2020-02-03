'use strict';
const menu = document.querySelector('.hamburger');
const header = document.querySelector('header');

menu.addEventListener('click', function () {
    header.classList.toggle('header-visible');
    menu.classList.toggle('menu-clicked');
});


header.addEventListener('click', function (event) {
    let target = event.target;

    if (target.classList['1'] === 'nav__link') {

        
        const border = document.querySelector('.nav__active-link');
        
        if (document.documentElement.clientWidth < 993) { // для мобилок
            let posAfter = target.id[10] * 3.15 + 'em';

            if (border.style.top === posAfter) {
                return false;
            }
            
            border.style.width = 0;
            if (border.style.top < posAfter) { // если идет вниз
                setTimeout( () => border.style.height = '1.2em', 40);
            } else {
                border.style.height = '1.5em';
            }

            border.style.top = posAfter;
            setTimeout( () => border.style.height = '3.15em', 340);
            setTimeout( () => border.style.width = '13em', 625);

        } else {
            if (target.classList.contains('nav__link-small')) {
                var posAfter;
                target.id === 'nav__link-4' ?
                    posAfter = target.id[10] * 10 + 'em' :
                    posAfter = target.id[10] * 10.645 + 'em';
                var widthAfter = 8.3;
            } else {
                posAfter = target.id[10] * 10.6 + 'em';
                widthAfter = 10.8;
            }

            // Изначально left: 0, после вычислений - 0em
            if (border.style.left === posAfter) {
                return false;
            } else if (posAfter === '0em' && border.style.left === 0) {
                return false;
            }

            border.style.height = 0;
            
            if (border.style.left < posAfter) {
                setTimeout( () => border.style.width = widthAfter - 3 + 'em', 50);
            } else {
                border.style.width = widthAfter - 3 + 'em';
            }
            border.style.left = posAfter;
            setTimeout( () => border.style.width = widthAfter + 'em', 350);
            setTimeout( () => border.style.height = '3.15em', 800);
        }
    }
});