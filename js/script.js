'use strict';
const menu = document.querySelector('.hamburger'),
    header = document.querySelector('header'),
    container = document.querySelector('.container'),
    navMenu = document.querySelector('.header__nav_list'),
    rem = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    


let headerTimerID ;
function headerToggle() {
    let headerActiveLink = document.querySelector(`.nav__link[href*=head-screen]`).parentNode;

    menu.classList.toggle('menu-clicked');
    document.querySelector('.btn-up').classList.toggle('btn-up-hidden');
    container.classList.toggle('container-translated');
    

    if (menu.classList.contains('menu-clicked')) {
        // Без этого перемещение наверх резкое
        document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })

        // С задержкой или нет?
        headerTimerID = setTimeout(() => {
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.style.position = 'fixed';
            document.querySelector('.nav__active-link').classList.remove('nav__active-link')
            headerActiveLink.classList.add('nav__active-link');
        }, 1300);
    } else {
        clearTimeout(headerTimerID);
        document.documentElement.style.position = 'absolute';
        document.documentElement.style.overflow = 'visible';
    }
}

menu.addEventListener('click', headerToggle);

// Изменение активной ссылки в хедере при скролле
document.addEventListener('scroll', function (e) {
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


// Слайдер (возможности MyDiary)
const sliderBtns = [...document.querySelectorAll('.possibilities__slider-btn')],
    imagesList = document.querySelector('.possibilities__images');

sliderBtns.forEach(function(item) {
    item.addEventListener('click', function(event) {
        const btn = event.target.closest('button'),
            visibleImage = imagesList.querySelector('.visible-images');
        let nextPos = +visibleImage.dataset.position + +btn.dataset.direction;
        
        if(nextPos === 0) nextPos = imagesList.children.length;
        if(nextPos === imagesList.children.length + 1) nextPos = 1;

        const nextImage = imagesList.children[nextPos - 1];

        visibleImage.classList.add('hidden-images');
        visibleImage.classList.remove('visible-images');

        nextImage.classList.add('visible-images');
        nextImage.classList.remove('hidden-images');
        
        const visibleTexts = [...document.querySelectorAll('.slider_text-' + visibleImage.dataset.position)],
            currentTexts = [...document.querySelectorAll('.slider_text-' + nextPos)];

        visibleTexts.forEach(function(item) {
            item.classList.remove('slider_text-visible');
            item.classList.add('slider_text-hidden');
        });
        currentTexts.forEach(function(item) {
            item.classList.remove('slider_text-hidden');
            item.classList.add('slider_text-visible');
        });
    });
});




// FAQ
// Коррекция ширины блоков
const questList = [...document.querySelectorAll('.faq__question')];
questList.forEach(function(item) {
    let width = 0;
    for(let i = 0; i < item.children.length; i++) {
        width += parseFloat(getComputedStyle(item.children[i]).width) / rem;
    }
    width += 1.5;
    item.closest('li').style.width = width + 'rem'; // ширина для родителя
});
// Клик по кнопке
const faqBtns = [...document.querySelectorAll('.question__show-more')];
faqBtns.forEach(function(item) {
    item.addEventListener('click', function(event) {
        const faqEl = event.target.closest('li');
        faqEl.classList.toggle('opened');
        event.target.closest('button').classList.toggle('clicked')
    });
});

// Поиск вопроса
const faqSearch = document.querySelector('.faq__input-search'),
    quesTitletList = [...document.querySelectorAll('.question-title')];

quesTitletList.forEach(function(item) {
    item.dataset.content = item.innerHTML; // для замены снизу
})

faqSearch.addEventListener('input', function(e) {
    const valueReg = new RegExp(faqSearch.value, "gi");
    let confused = true;
    quesTitletList.forEach(function(item) {
        item.innerHTML = item.dataset.content.replace(valueReg, function(part) {
            part = '<mark>' + part + '</mark>';
            confused = false;
            console.log(confused);
            return part;
        });
    });
    console.log(confused);
    if (confused) {
        faqSearch.parentElement.classList.add('errored');
        setTimeout(() => {
            faqSearch.parentElement.classList.remove('errored');
        }, 500);
    }
});