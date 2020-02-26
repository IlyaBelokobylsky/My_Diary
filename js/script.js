'use strict';
const menu = document.querySelector('.hamburger'),
    header = document.querySelector('header'),
    container = document.querySelector('.container'),
    navMenu = document.querySelector('.header__nav_list'),
    arrow = document.querySelector('.btn-up');


function headerToggle() {
    menu.classList.toggle('menu-clicked');
    document.querySelector('.btn-up').classList.toggle('btn-up-hidden');
    container.classList.toggle('container-translated')
    
    if (menu.classList.contains('menu-clicked')) {
        // Без этого перемещение наверх резкое
        document.querySelector('.head-screen').scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        
        // Убрать/вернуть скролл
        document.documentElement.style.overflow = 'hidden';
        pageYOffset > 0 ?
        setTimeout(() => document.documentElement.style.position = 'fixed', 1200) :
        document.documentElement.style.position = 'fixed';
    } else {
        document.documentElement.style.position = 'absolute';
        document.documentElement.style.overflow = 'visible';
    }
}

menu.addEventListener('click', headerToggle);


// Обработка нажатий на ссылки в nav меню
navMenu.addEventListener('click', function (event) {
    event.preventDefault(); // дабы не было "как обычно"
    const href = event.target.getAttribute('href');
    const beforeActive = document.querySelector('.nav__active-link');
    const active = event.target.closest('li');

    beforeActive.classList.remove('nav__active-link');
    active.classList.add('nav__active-link');

    headerToggle();
    setTimeout(function() { // чтобы хедер успел убраться
        document.querySelector(`${href}`).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 600);
});


let pagePosition = pageYOffset;

// Появление стрелочки для перехода вверх
document.addEventListener('scroll', function(event) {
    // В случае, если скролл идет вверх
    if (pagePosition >= pageYOffset) {
        pageYOffset >= document.documentElement.clientHeight ?
        arrow.classList.remove('btn-up_hidden') :
        arrow.classList.add('btn-up_hidden');
    } else arrow.classList.add('btn-up_hidden');

    // Перезапись свойства для следующей проверки
    pagePosition = pageYOffset;
})
arrow.onclick = () => container.scrollIntoView({ behavior: 'smooth', block: 'start'});
