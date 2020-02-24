'use strict';
const menu = document.querySelector('.hamburger');
const header = document.querySelector('header');
const container = document.querySelector('.container');
let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);

function headerToggle() {
    container.classList.toggle('container-translated')
    menu.classList.toggle('menu-clicked');
    header.classList.toggle('header-visible');
    document.querySelector('.btn-up').classList.toggle('btn-up-hidden');

    if (header.classList.contains('header-visible')) {
        document.documentElement.style.overflow = 'hidden';
        if (scrollHeight >= 993) {
            scrollToElem('head-screen');
        }
    } else {
        document.documentElement.style.overflow = '';
    }
}

function scrollToElem(id) {
    let elemTo = document.querySelector('.' + id);
    elemTo.classList.contains('make-and-settings') ?// для более корректной работы 
    elemTo.scrollIntoView({ behavior: 'smooth', block: 'start' }) :
    elemTo.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

menu.addEventListener('click', headerToggle);

header.addEventListener('click', function (event) {
    const target = event.target;


});







// Анимация для блюра на первом экране
for (let i = 3; i >= 1; i--) {
    setTimeout(() => 
        document.querySelector(`.head-screen__phone-blur-${i}`).classList.add(`head-screen__phones_blur-visible-${i}`)
    , 1900 * Math.pow(i, -1));
}

