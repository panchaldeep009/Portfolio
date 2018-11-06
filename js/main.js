"use strict";
(() => {

    // CSS Variables
    var cssVar = window.getComputedStyle(document.body);
    const codeSectionColor = cssVar.getPropertyValue('--codeBackground').trim(),
        designSectionColor = cssVar.getPropertyValue('--designBackground').trim();

    // Logo animation
    
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

    // Update DuoFilter with theme Color

    var remapColor = function(filter,color, index) {
        let colR = filter.querySelector('feFuncR'),
            colRVal = colR.getAttribute('tableValues').split(' ');
        colRVal[index] = (parseInt(color.substr(1, 2), 16)) / 255;
        colR.setAttribute('tableValues', colRVal.join(' '));
        
        let colG = filter.querySelector('feFuncG'),
            colGVal = colG.getAttribute('tableValues').split(' ');
        colGVal[index] = (parseInt(color.substr(3, 2), 16)) / 255;
        colG.setAttribute('tableValues', colGVal.join(' '));
        
        let colB = filter.querySelector('feFuncB'),
            colBVal = colB.getAttribute('tableValues').split(' ');
        colBVal[index] = (parseInt(color.substr(5, 2), 16)) / 255;
        colB.setAttribute('tableValues', colBVal.join(' '));
    };
    remapColor(document.querySelector('#duoToneFilter'),codeSectionColor, 0);
    remapColor(document.querySelector('#duoToneFilter'),designSectionColor, 1);
})();