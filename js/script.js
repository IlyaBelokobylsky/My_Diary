'use strict';
const menu = document.querySelector('.hamburger');
const header = document.querySelector('header');
const container = document.querySelector('.container');
const navMenu = document.querySelector('.header__nav_list');

function headerToggle() {
    menu.classList.toggle('menu-clicked');
    document.querySelector('.btn-up').classList.toggle('btn-up-hidden');
    container.classList.toggle('container-translated')

    if (menu.classList.contains('menu-clicked')) {
        // Без этого перемещение наверх резкое
        scrollToElem(document.querySelector('.head-screen'));

        // Убрать/вернуть скролл
        document.documentElement.style.overflow = 'hidden';
        pageYOffset > 0 ?
        setTimeout(() => document.documentElement.style.position = 'fixed', 1500) :
        document.documentElement.style.position = 'fixed';
    } else {
        document.documentElement.style.position = 'absolute';
        document.documentElement.style.overflow = 'visible';
    }
}

menu.addEventListener('click', headerToggle);

function scrollToElem(elem) {/* 
    elem.classList.contains('make-and-settings') ?// для более корректной работы 
    elem.scrollIntoView({ behavior: 'smooth', block: 'start' }) : */
    elem.scrollIntoView({ behavior: 'smooth', block: 'end' });
}


// Анимация для блюра на первом экране
for (let i = 3; i >= 1; i--) {
    setTimeout(() => 
        document.querySelector(`.head-screen__phone-blur-${i}`).classList.add(`head-screen__phones_blur-visible-${i}`)
    , 1333 * Math.pow(i, -1));
}