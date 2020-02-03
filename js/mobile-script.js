'use strict';
const menu = document.querySelector('.hamburger');
const header = document.querySelector('header');

menu.addEventListener('click', function() {
    header.classList.toggle('header-visible');
    menu.classList.toggle('menu-clicked');
});

header.addEventListener('click', function(event) {
    if(event.target.classList['1'] === 'nav__a') {
        // Удаление предыдущего выделения
        document.querySelector('.nav__active-link').classList.remove('nav__active-link');
        event.target.classList.add('nav__active-link');
    }
});