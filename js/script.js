'use strict';
const menu = document.querySelector('.hamburger'),
    header = document.querySelector('header'),
    container = document.querySelector('.container'),
    navMenu = document.querySelector('.header__nav_list'),
    rem = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    


let headerTimerID ;
function headerToggle() {
    header.classList.toggle('header-visible');
    menu.classList.toggle('menu-clicked');
    container.classList.toggle('container-darken');
    if(header.classList.contains('header-visible')) {
        document.querySelector('.btn-up').classList.add('btn-up_hidden');
    }
    setTimeout(() =>
        document.querySelector('.btn-up').classList.add('display-none'),
    200)
}

menu.addEventListener('click', headerToggle);

// Изменение активной ссылки в хедере при скролле
document.addEventListener('scroll', function (e) {
    const centerXish = document.documentElement.clientWidth / 1.75, // чтобы хедер не перекрыл
        centerYish = document.documentElement.clientHeight / 1.75,
        centerElem = document.elementFromPoint(centerXish, centerYish),
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
        }, 400);
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
const questList = [...document.querySelectorAll('.faq__question')],
    faqElems = [...document.querySelector('.faq__list').children];
// Коррекция высоты блоков
faqElems.forEach(function(item, index) {
    const quest = item.querySelector('.question-title');
    if (~quest.innerHTML.search(/<br>/)){
        item.dataset.strings = 2;
    }
    // Сортировка блоков право-лево
    if(index % 2 === 0) item.classList.add('faq__right')
});

// Коррекция ширины блоков

questList.forEach(function(item) {
    let width = 0;
    for(let i = 0; i < item.children.length; i++) {
        width += parseFloat(getComputedStyle(item.children[i]).width) / rem;
    }
    width += 1.5;
    item.closest('li').style.width = width + 'rem'; // ширина для родителя
});

// Правки для transition
faqElems.forEach(function(item) {
    item.dataset.height = parseFloat(getComputedStyle(item).height) / rem + 'rem';
    item.classList.add('closed');
});


// Клик по кнопке
const faqBtns = [...document.querySelectorAll('.question__show-more')];
faqBtns.forEach(function(item) {
    item.addEventListener('click', function(event) {
        const faqEl = event.target.closest('li');
        if(faqEl.classList.contains('closed')) {
            faqEl.classList.remove('closed');
            faqEl.style.height = faqEl.dataset.height;
        } else {
            faqEl.classList.add('closed');
            faqEl.style.height = '';
        }
        const btn = event.target.closest('button');
        btn.classList.toggle('clicked');
    });
});

// Поиск вопроса
const faqSearch = document.querySelector('.faq__input-search'),
    quesTitletList = [...document.querySelectorAll('.question-title')];

quesTitletList.forEach(function(item) {
    item.dataset.content = item.innerHTML; // для замены снизу
})

faqSearch.addEventListener('input', function(e) {
    let value = faqSearch.value;
    if (~value.search(/\?/)) {
        value = value.replace(/\?/gi, '[?]');
    }
    const valueReg = new RegExp(value, "gi");
    let confused = true;
    quesTitletList.forEach(function(item) {
        if(~value.search(/[<>]/)) return;
        item.innerHTML = item.dataset.content.replace(valueReg, function(part) {
            part = '<mark>' + part + '</mark>';
            confused = false;
            return part;
        });
    });
    if (!value) { // теги внутри превращаются в текст
        quesTitletList.forEach(function(item) {
            item.innerHTML = item.dataset.content;
        })
    }
    if (confused) {
        faqSearch.parentElement.classList.add('errored');
        setTimeout(() => {
            faqSearch.parentElement.classList.remove('errored');
        }, 500);
    }
});