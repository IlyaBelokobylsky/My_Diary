'use strict';
const menu = document.querySelector('.hamburger'),
    header = document.querySelector('header'),
    container = document.querySelector('.container'),
    navMenu = document.querySelector('.header__nav_list'),
    arrow = document.querySelector('.btn-up'),
    sections = document.querySelectorAll('.js-section');


function headerToggle() {
    let headerActiveLink = document.querySelector(`.nav__link[href*=head-screen]`).parentNode;
    
    

    menu.classList.toggle('menu-clicked');
    document.querySelector('.btn-up').classList.toggle('btn-up-hidden');
    container.classList.toggle('container-translated');
    

    
    if (menu.classList.contains('menu-clicked')) {
        // Без этого перемещение наверх резкое
        document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })

        // Убрать/вернуть скролл
        document.documentElement.style.overflow = 'hidden';

        // С задержкой или нет?
        setTimeout(() => {
            document.documentElement.style.position = 'fixed';
            document.querySelector('.nav__active-link').classList.remove('nav__active-link')
            headerActiveLink.classList.add('nav__active-link');
        }, 1300) 
    } else {
        document.documentElement.style.position = 'absolute';
        document.documentElement.style.overflow = 'visible';
    }
}

menu.addEventListener('click', headerToggle);

// Изменение активной ссылки в хедере при скролле
document.addEventListener('scroll', function (event) {
    const centerX = document.documentElement.clientWidth / 2,
        centerY = document.documentElement.clientHeight / 2,
        centerElem = document.elementFromPoint(centerX, centerY),
        centerSection = centerElem.closest('.js-section');
    if (!centerSection) return;
    let headerActiveLink = document.querySelector(`.nav__link[href*=${centerSection.id}]`).parentNode;
    let headerBeforeActiveLink = document.querySelector('.nav__active-link');
    headerBeforeActiveLink.classList.remove('nav__active-link');
    headerActiveLink.classList.add('nav__active-link')
});


// Обработка нажатий на ссылки в nav меню
navMenu.addEventListener('click', function (event) {
    if (event.target.closest('a')) {
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
    }
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


// Появление телефона при наведении на текст
document.querySelectorAll('.why-we__list_elem-js').forEach(function(item) {
    item.onmouseover = () => {
        let phone = document.querySelector('.why-we__phone');
        phone.classList.remove('hidden');
        phone.classList.add('visible');
    };
    
    item.onmouseout = () => { 
        let phone = document.querySelector('.why-we__phone');
        phone.classList.remove('visible');
        phone.classList.add('hidden');
    };
});