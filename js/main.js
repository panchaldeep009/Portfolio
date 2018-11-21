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

    // Sections
    let homeContent = document.querySelector('#homeContent');
    // Change Background Colors to match theme
    
    document.querySelector('#backgroundSVG')
        .addEventListener('load', function(){

            // functions for Stages
            var codeSectionOpen,
                codeWorkOpen, 
                designSectionOpen,
                designWorkOpen,
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
                TweenMax.to(homeContent, .25, {opacity : 1, right : "-200%"});
                TweenMax.to(content.querySelector('#myAvatarShape'), .25, {x : 0, y : 0});
                TweenMax.to(content.querySelector('#myAvatar'), .25, {x : 0});
                homeContent.style.pointerEvents = 'auto';
            };
            codeSectionOpen = function(){
                content.querySelector('#codeOpenHalf').beginElement();
                content.querySelector('#designCloseHalf').beginElement();
                content.querySelector('#myAvatarShape').setAttribute('filter', '');
                currentSection = 'code';
                TweenMax.to(homeContent, .25, {opacity : 1, right : "-300%"});
                TweenMax.to(content.querySelector('#myAvatarShape'), .25, {x : 0, y : 30});
                let codeTitle = document.querySelector('#codeTitle');
                TweenMax.fromTo(codeTitle, 
                    codeTitle.innerHTML.length*0.08, {width : 0}, {
                    width : codeTitle.offsetWidth, 
                    ease:SteppedEase.config(codeTitle.innerHTML.length-1)
                }).delay(.5);
                TweenMax.fromTo(codeTitle, .5, 
                    {borderRight: '12px solid white'}, 
                    {borderRight: '12px solid transparent'}).repeat(-1);
            };
            codeWorkOpen = function(){
                content.querySelector('#designEnd').beginElement();
                content.querySelector('#codeWide').beginElement();
                currentSection = 'codeSkills';
                TweenMax.to(homeContent, .25, {opacity : 1, right : "-400%"});
                TweenMax.to(content.querySelector('#myAvatarShape'), .4, {x : "1200"});
            };
            designSectionOpen = function(){
                content.querySelector('#codeCloseHalf').beginElement();
                content.querySelector('#designOpenHalf').beginElement();
                content.querySelector('#myAvatar').setAttribute('filter', '');
                currentSection = 'design';
                TweenMax.to(homeContent, .25, {opacity : 1, right : "-100%"});
                TweenMax.to(content.querySelector('#myAvatar'), .25, {x : 0});
            };
            designWorkOpen = function(){
                content.querySelector('#codeEnd').beginElement();
                content.querySelector('#designWide').beginElement();
                currentSection = 'designSkills';
                TweenMax.to(homeContent, .25, {opacity : 1, right : "0%"});
                TweenMax.to(content.querySelector('#myAvatar'), .25, {x : -1200});
            };
            centerSectionOpen = function(){
                content.querySelector('#myAvatarShape').setAttribute('filter', 'url(#duoToneFilter)');
                content.querySelector('#myAvatar').setAttribute('filter', 'url(#duoToneFilter)');
                content.querySelector('#codeCloseHalf').beginElement();
                content.querySelector('#designCloseHalf').beginElement();
                currentSection = 'center';
                TweenMax.to(homeContent, .25, {opacity : 0});
                homeContent.style.pointerEvents = 'none';
            };

            window.addEventListener("hashchange", switchSectionBasedOnUrl, false);
            switchSectionBasedOnUrl();
            function switchSectionBasedOnUrl(){
                if(window.location.href.includes('#/code/work')){
                    codeWorkOpen();
                } else if(window.location.href.includes('#/code')){
                    codeSectionOpen();
                } else if(window.location.href.includes('#/design/work')){
                    designWorkOpen();
                } else if(window.location.href.includes('#/design')){
                    designSectionOpen();
                } else if(window.location.href.includes('#/about')){
                    centerSectionOpen();
                } else if(window.location.href.includes('#/home')){
                    initialSectionOpen();
                } else {
                    initialSectionOpen();
                }
            }

            // switching section event
            //codeSectionButton.addEventListener('click', codeSectionOpen, false);
            //designSectionButton.addEventListener('click', designSectionOpen, false);
            // Open from center on scroll Down 
            window
                .addEventListener('scroll', function(e){
                    if(window.scrollY > 200 && currentSection != 'center'){
                        window.location.href = '/#/about';
                    }
                    else if(window.scrollY < 200 && currentSection != 'initial' ){
                        window.location.href = '/#';
                        window.scrollTo(0,0);
                    }
                });


            //*********************************** */
            // Detect Mouse Swipe and switch Section
            let cursorX = 0;

            homeContent
                .onmousedown = function(e) {
                this.style.cssText += ` 
                    cursor: grabbing;
                    cursor: -moz-grabbing;
                    cursor: -webkit-grabbing;`;
                cursorX = e.clientX;
            }
            homeContent
                .onmouseup = function(e) {
                this.style.cssText += ` 
                    cursor: grab;
                    cursor: -moz-grab;
                    cursor: -webkit-grab;`;
                if((cursorX - e.clientX) > 150){
                    sectionSwitch('right');
                } else if((e.clientX - cursorX) > 150){
                    sectionSwitch('left');
                }

            }
            // Detect Finger on Background Swipe and switch Section
            homeContent
                .addEventListener('touchstart', touchStart, false);        
            homeContent
                .addEventListener('touchend', touchEnd, false);

            function touchStart(e){
                cursorX = e.targetTouches[0].clientX;
            }

            function touchEnd(e){
                if((cursorX - e.changedTouches[0].clientX) > 150){
                    sectionSwitch('right');
                } else if((e.changedTouches[0].clientX - cursorX) > 150){
                    sectionSwitch('left');
                }
            }

            // Switch section based on swipe direction
            function sectionSwitch(dragStatus){
                if(dragStatus == 'left' &&
                    currentSection == 'initial'){
                    window.location.href = '/#/code';
                } else if(dragStatus == 'right' &&
                    currentSection == 'initial'){
                    window.location.href = '/#/design';
                } else if(
                    (dragStatus == 'left' && currentSection == 'design') ||
                    (dragStatus == 'right' && currentSection == 'code') ){
                    window.location.href = '/#';
                } else if(dragStatus == 'left' &&
                    currentSection == 'code'){
                    window.location.href = '/#/code/work';
                } else if(dragStatus == 'right' &&
                    currentSection == 'design'){
                    window.location.href = '/#/design/work';
                } else if(dragStatus == 'right' &&
                    currentSection == 'codeSkills'){
                    window.location.href = '/#/code';
                } else if(dragStatus == 'left' &&
                    currentSection == 'designSkills'){
                    window.location.href = '/#/design';
                }
            }

            //*********************************** */

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
    document.querySelectorAll('[data-link]').forEach(element => {
            element.style.cursor = "pointer";
            element.addEventListener('click', function() {
                window.location.href = this.dataset.link;
            }, true);
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