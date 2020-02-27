'use strict';
// Анимация для блюра на первом экране
for (let i = 3; i >= 1; i--) {
    setTimeout(() => 
        document.querySelector(`.head-screen__phone-blur-${i}`).classList.add(`head-screen__phones_blur-visible-${i}`)
    , 1333 * Math.pow(i, -1));
}