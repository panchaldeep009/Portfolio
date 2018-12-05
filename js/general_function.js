"use strict";

function generateRandomNumber(min , max) {
    return Math.random() * (max-min) + min ;
}
(() => {
    document.querySelectorAll('[data-link]').forEach(element => {
        element.style.cursor = "pointer";
        element.addEventListener('click', function() {
            window.location.href = this.dataset.link;
        }, true);
    });
})();