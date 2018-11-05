"use strict";
(() => {
    // Logo animation
    [
        // Code Section
        document.querySelector('#codeSection'),
        document.querySelector('#designSection'),
    ].forEach(section => {
        // Selecting logo and animate stroke
        section.querySelector('.logoSVG')
            .addEventListener('load', function(){
                
                this.contentDocument
                    .querySelectorAll('svg polyline, svg circle, svg path')
                    .forEach(svgElement => {
                        svgElement.style['stroke-dasharray'] = 
                        svgElement.style['stroke-dashoffset'] =
                            svgElement.getTotalLength();
                        svgElement.style.stroke = 
                            section.id == 'codeSection' ?
                            "#e5e5e5" : "#292d3e";
                    });

                setTimeout(() => {
                    this.contentDocument
                        .querySelectorAll('#centerLine')
                        .forEach(svgElement => {
                            svgElement.classList.add('dashoffsetTransition');
                            svgElement.style.strokeDashoffset = 0;
                        });
                }, 500);

                setTimeout(() => {
                    this.contentDocument
                        .querySelectorAll('svg circle, svg path')
                        .forEach(svgElement => {
                            svgElement.classList.add('dashoffsetTransition');
                            svgElement.style.strokeDashoffset = 0;
                        });
                }, 1000);
            }, false);
    })
})();