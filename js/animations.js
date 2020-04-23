'use strict';
const centerX = document.documentElement.clientWidth / 2,
    centerY = document.documentElement.clientHeight / 2,
    moveableElements = document.querySelectorAll('.js-moveable'),
    arrow = document.querySelector('.btn-up'),
    rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);


function checkItemVisibility(item) {
    item.top = item.getBoundingClientRect().top + pageYOffset;
    item.bottom = item.getBoundingClientRect().bottom + pageYOffset;
    return pageYOffset + document.documentElement.clientHeight - item.bottom > 0 && 
    pageYOffset - item.top < 0;
}


let pagePosition = pageYOffset;

document.querySelector('.why-we__semicircle-bottom').semicircleMoving = function(elem, step) {
    const topBefore = parseFloat(window.getComputedStyle(elem).top) / rootFontSize;
    if (topBefore >= elem.dataset.max && step > 0) return;
    if (topBefore <= elem.dataset.min && step < 0) return;
    elem.style.top = `${topBefore + step}rem`;
};


// Узнать местоположение каждой секции относительно документа
moveableElements.forEach(function(item) {
    item.movingFunction = function(step) {
        let action = item.dataset.action;
        if (action) {
            this[action](this, step);
        }
    };
});

// Анимация для блюра на первом экране
for (let i = 3; i >= 1; i--) {
    setTimeout(() => 
        document.querySelector(`.head-screen__phone-blur-${i}`).classList.add(`head-screen__phones_blur-visible-${i}`)
    , 1333 * Math.pow(i, -1));
}


// Появление стрелочки для перехода вверх
document.addEventListener('scroll', function(event) {
    // В случае, если скролл идет вверх
    if (pagePosition >= pageYOffset) {
        pageYOffset >= document.documentElement.clientHeight ?
        arrow.classList.remove('btn-up_hidden') :
        arrow.classList.add('btn-up_hidden');
    } else arrow.classList.add('btn-up_hidden');

    


    // Анимация движения полукругов на мобилках
    if (document.documentElement.clientWidth < 993) {
        const step = (pageYOffset - pagePosition) / 50;
        const perhapsForMove = [].filter.call(moveableElements, checkItemVisibility);
        for(let item of perhapsForMove) {
            item.movingFunction(step);
        }
    }
    // Перезапись свойства для следующей проверки
    pagePosition = pageYOffset;
});
arrow.onclick = () => container.scrollIntoView({ behavior: 'smooth', block: 'start'});



// Появление текста по скроллу
document.addEventListener('scroll', function (e) {
    const text = document.querySelectorAll('.temp-animated');
    let visibleText = [].filter.call(text, checkItemVisibility);
    // Показать текст (который на экране)
    for(let key of visibleText) {
        key.classList.remove('temp-hidden');
        key.classList.add('temp-visible');
    }
});