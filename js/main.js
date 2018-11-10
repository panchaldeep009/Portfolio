"use strict";

(() => {
    // Document Height Width

    // CSS Variables
    var cssVar = window.getComputedStyle(document.body);
    const codeSectionColor = cssVar.getPropertyValue('--codeBackground').trim(),
        designSectionColor = cssVar.getPropertyValue('--designBackground').trim();

    // To Resize Background
    window
        .addEventListener('resize', resizeBackground,false);
    resizeBackground();
    function resizeBackground(){
        let docHeight = document.body.clientHeight;
        let docWidth = document.body.clientWidth;
        let background = document.querySelector("#backgroundSVG");
        if(docWidth/docHeight < 1.8){
            background.style.width = (docHeight*1.9)+"px";
            background.style.height = docHeight+"px";
        } else {
            background.style.width = docWidth+"px";
            background.style.height = (docWidth*0.58)+"px";
        }
    }

    // Change Background Colors to match theme
    
    document.querySelector('#backgroundSVG')
        .addEventListener('load', function(){

            let content = this.contentDocument;
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

            remapColor(content.querySelector('#duoToneFilter'),codeSectionColor, 0);
            remapColor(content.querySelector('#duoToneFilter'),designSectionColor, 1);
            
            content.querySelector('#codeSectionBGColor').setAttribute('fill', codeSectionColor);
            content.querySelector('#designSectionBGColor').setAttribute('fill', designSectionColor);
            
            this.style.opacity = 1;
        });
    // Logo animation
    
    // [    // Code Section
    //     document.querySelector('#codeSection'),
    //     // Design Section
    //     document.querySelector('#designSection')  

    // ].forEach(section => {
    //     // Selecting logo and animate stroke
    //     section.querySelector('.logoSVG')
    //         .addEventListener('load', function(){

    //             this.contentDocument
    //                 .querySelectorAll('svg polyline, svg circle, svg path')
    //                 .forEach(svgElement => {
    //                     svgElement.style['stroke-dasharray'] = 
    //                     svgElement.style['stroke-dashoffset'] =
    //                         svgElement.getTotalLength();
    //                     svgElement.style.stroke = 
    //                         section.id == 'codeSection' ?
    //                         designSectionColor : codeSectionColor;
    //                 });

    //             setTimeout(() => {
    //                 this.contentDocument
    //                     .querySelectorAll('#centerLine')
    //                     .forEach(svgElement => {
    //                         svgElement.classList.add('dashoffsetTransition');
    //                         svgElement.style.strokeDashoffset = 0;
    //                     });
    //             }, 500);

    //             setTimeout(() => {
    //                 this.contentDocument
    //                     .querySelectorAll('svg circle, svg path')
    //                     .forEach(svgElement => {
    //                         svgElement.classList.add('dashoffsetTransition');
    //                         svgElement.style.strokeDashoffset = 0;
    //                     });
    //             }, 1000);

    //         }, false);
    // })

    // // Update DuoFilter with theme Color

})();