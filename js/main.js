"use strict";
(() => {
    // Document Height Width

    // CSS Variables
    var cssVar = window.getComputedStyle(document.body);
    const codeSectionColor = cssVar.getPropertyValue('--codeBackground').trim(),
        designSectionColor = cssVar.getPropertyValue('--designBackground').trim();

    //  Variable for current section Status.
    var currentSection = 'initial';

    // Section open Button
    let codeSectionButton = document.querySelector("#codeBtn"),
        designSectionButton = document.querySelector("#designBtn");


    // Change Background Colors to match theme
    
    document.querySelector('#backgroundSVG')
        .addEventListener('load', function(){

            // functions for Stages
            var codeSectionOpen, 
                designSectionOpen, 
                initialSectionOpen, 
                centerSectionOpen;

            // define current content
            let content = this.contentDocument;
            
            // Change color of dual tone filter in svg
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

            // Change background color to theme color
            content.querySelector('#codeSectionBGColor').setAttribute('fill', codeSectionColor);
            content.querySelector('#designSectionBGColor').setAttribute('fill', designSectionColor);

            // Functions for switching Stages
            initialSectionOpen = function(){
                content.querySelector('#myAvatarShape').setAttribute('filter', 'url(#duoToneFilter)');
                content.querySelector('#myAvatar').setAttribute('filter', 'url(#duoToneFilter)');
                content.querySelector('#codeCenter').beginElement();
                content.querySelector('#designCenter').beginElement();
                currentSection = 'initial';
                TweenMax.to(codeSectionButton, .5, {opacity : 1});
                TweenMax.to(designSectionButton, .5, {opacity : 1});
                codeSectionButton.style.pointerEvents = 'auto';
                designSectionButton.style.pointerEvents = 'auto';
            };
            initialSectionOpen();

            codeSectionOpen = function(){
                content.querySelector('#codeOpenHalf').beginElement();
                content.querySelector('#designCloseHalf').beginElement();
                content.querySelector('#myAvatarShape').setAttribute('filter', '');
                currentSection = 'code';
                TweenMax.to(codeSectionButton, .5, {opacity : 0});
                TweenMax.to(designSectionButton, .5, {opacity : 0});
                codeSectionButton.style.pointerEvents = 'none';
                designSectionButton.style.pointerEvents = 'none';
            };

            designSectionOpen = function(){
                content.querySelector('#codeCloseHalf').beginElement();
                content.querySelector('#designOpenHalf').beginElement();
                content.querySelector('#myAvatar').setAttribute('filter', '');
                currentSection = 'design';
                TweenMax.to(codeSectionButton, .5, {opacity : 0});
                TweenMax.to(designSectionButton, .5, {opacity : 0});
                codeSectionButton.style.pointerEvents = 'none';
                designSectionButton.style.pointerEvents = 'none';
            };
            centerSectionOpen = function(){
                content.querySelector('#myAvatarShape').setAttribute('filter', 'url(#duoToneFilter)');
                content.querySelector('#myAvatar').setAttribute('filter', 'url(#duoToneFilter)');
                content.querySelector('#codeCloseHalf').beginElement();
                content.querySelector('#designCloseHalf').beginElement();
                currentSection = 'center';
                TweenMax.to(codeSectionButton, .5, {opacity : 0});
                TweenMax.to(designSectionButton, .5, {opacity : 0});
                codeSectionButton.style.pointerEvents = 'none';
                designSectionButton.style.pointerEvents = 'none';
            };
            // switching section event
            codeSectionButton.addEventListener('click', codeSectionOpen, false);
            designSectionButton.addEventListener('click', designSectionOpen, false);
            // Open from center on scroll Down 
            window
                .addEventListener('scroll', function(e){
                    if(window.scrollY > 200 && currentSection != 'center'){
                        centerSectionOpen();
                        document.querySelector('#background').style.height = 0;
                    }
                    else if(window.scrollY < 200 && currentSection != 'initial' ){
                        initialSectionOpen();
                        document.querySelector('#background').style.height = '100vh';
                    }
                });

            // Detect Mouse Swipe and switch Section
            let cursorX = 0;
            document.querySelector('#background').onmousedown = function(e) {
                this.style.cssText = ` 
                    cursor: grabbing;
                    cursor: -moz-grabbing;
                    cursor: -webkit-grabbing;`;
                cursorX = e.clientX;
            }
            document.querySelector('#background').onmouseup = function(e) {
                this.style.cssText = ` 
                    cursor: grab;
                    cursor: -moz-grab;
                    cursor: -webkit-grab;`;
                if(cursorX < e.clientX){
                    sectionSwitch('left');
                } else if(cursorX > e.clientX){
                    sectionSwitch('right');
                }

            }

            // Detect Finger Swipe and switch Section
            document.querySelector('#background')
                .addEventListener('touchstart', touchStart, false);        
            document.querySelector('#background')
                .addEventListener('touchend', touchEnd, false);

            function touchStart(e){
                cursorX = e.targetTouches[0].clientX;
            }
            function touchEnd(e){
                if(cursorX < e.changedTouches[0].clientX){
                    sectionSwitch('left');
                } else if(cursorX > e.changedTouches[0].clientX){
                    sectionSwitch('right');
                }
            }

            // Switch section based on swipe direction
            function sectionSwitch(dragStatus){
                if(dragStatus == 'left' &&
                    currentSection == 'initial'){
                    codeSectionOpen();
                } else if(dragStatus == 'right' &&
                    currentSection == 'initial'){
                        designSectionOpen();
                } else if(
                    (dragStatus == 'left' && currentSection == 'design') ||
                    (dragStatus == 'right' && currentSection == 'code') ){
                    initialSectionOpen();
                }
            }

            this.style.opacity = 1;
        });

    // To Resize Background
    window
        .addEventListener('resize', resizeBackground,false);
    resizeBackground();
    function resizeBackground(){
        let docHeight = window.innerHeight;
        let docWidth = window.innerWidth;
        let background = document.querySelector("#backgroundSVG");
        if(docWidth/docHeight < 1.8){
            background.style.width = (docHeight*1.9)+"px";
            background.style.height = docHeight+"px";
        } else {
            background.style.width = docWidth+"px";
            background.style.height = (docWidth*0.58)+"px";
        }
    }
    
    // Design button animation
    document.querySelector('#designBtnSVG')
        .addEventListener('load', function(){
            let content = this.contentDocument;
            content.querySelector('#designDrawing').beginElement();
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