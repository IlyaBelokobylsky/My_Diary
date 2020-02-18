'use strict';
const MENU = document.querySelector('.hamburger');
const HEADER = document.querySelector('header');

function headerToggle() {
    HEADER.classList.toggle('header-visible');
    MENU.classList.toggle('menu-clicked');
}

function scrollToElem(target) {
    let elemTo = document.querySelector('.' + target.dataset.link);
    elemTo.classList.contains('make-and-settings') ?// для более корректной работы 
    elemTo.scrollIntoView({ behavior: 'smooth', block: 'start' }) :
    elemTo.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

MENU.addEventListener('click', headerToggle);

HEADER.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList['1'] === 'nav__link') {
        const border = document.querySelector('.nav__active-link');

        // Различия между мобильной и десктопной версиями
        if (document.documentElement.clientWidth < 993) {
            let posAfter = target.id[10] * 3.15 + 'em';

            if (border.style.top === posAfter) {
                return false;
            }
            
            border.style.width = 0;
            if (border.style.top < posAfter) { // если идет вниз
                setTimeout( () => border.style.height = '1.2em', 60);
            } else {
                border.style.height = '1.5em';
            }

            border.style.top = posAfter;
            setTimeout( () => border.style.height = '3.15em', 345);
            setTimeout( () => border.style.width = '13em', 750);

        } else {
            if (target.classList.contains('nav__link-small')) {
                var posAfter;
                target.id === 'nav__link-5' ?
                    posAfter = target.id[10] * 10.15 + 'em' :
                    posAfter = target.id[10] * 10.655 + 'em';
                var widthAfter = 8.3;
            } else {
                posAfter = target.id[10] * 10.65 + 'em';
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
                setTimeout( () => border.style.width = widthAfter - 5 + 'em', 60);
            } else {
                border.style.width = widthAfter - 5 + 'em';
            }
            border.style.left = posAfter;
            setTimeout( () => border.style.width = widthAfter + 'em', 345);
            setTimeout( () => border.style.height = '3.15em', 750);
        }

        scrollToElem(target);
        setTimeout(headerToggle, 1000);
    }
});


document.querySelector('.why-we').addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-link')) {
        scrollToElem(event.target);
    }
});

document.querySelectorAll('.feature__btn_more').forEach(elem => {
    elem.addEventListener('click', function(event) {
    let target = event.target;
    let feature = target.parentNode;
    feature.classList.toggle('feature-opened');
    target.classList.toggle('feature__btn_clicked');
});
});