"use strict";
(() => {
    // Logo animation
    
    // CSS Variables
    var cssVar = window.getComputedStyle(document.body);
    const codeSectionColor = cssVar.getPropertyValue('--codeBackground');
    const designSectionColor = cssVar.getPropertyValue('--designBackground');

    [    // Code Section
        document.querySelector('#codeSection'),
        // Design Section
        document.querySelector('#designSection')  
        
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
                            designSectionColor : codeSectionColor;
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