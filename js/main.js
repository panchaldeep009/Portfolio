"use strict";
(() => {
    // Document Height Width

    // CSS Variables
    var cssVar = window.getComputedStyle(document.body);
    const codeSectionColor = cssVar.getPropertyValue('--codeBackground').trim(),
        designSectionColor = cssVar.getPropertyValue('--designBackground').trim(),
        centerSectionColor = cssVar.getPropertyValue('--yellowColor').trim();

    //  Variable for current section Status.
    var currentSection = 'initial';

    // Sections
    let homeContent = document.querySelector('#homeContent'),
        lottieBackground = document.querySelector('#lottieBackground'),
        lottieBackgroundOverly = document.querySelector('#lottieBackgroundOverly'),
        foreground = document.querySelector('#foreground'),
        nameDesign = document.querySelector('#nameInDesign'),
        motionTitle = document.querySelector('#motionTitle'),
        graphicsTitle = document.querySelector('#graphicsTitle'),
        codeBackground = document.querySelector('#codeBackground'),
        designBackground = document.querySelector('#designBackground'),
        codeBanner = document.querySelector('#codeBanner'),
        designBanner = document.querySelector('#designBanner'),
        about = document.querySelector('#about'),
        codeSpark = document.querySelector('#codeSparks'),
        designSpark = document.querySelector('#designSparks'),
        avatarShape = document.querySelector('#myAvatarShape'),
        avatar = document.querySelector('#myAvatar'),
        codeBtn = document.querySelector('#codeBtn'),
        designBtn = document.querySelector('#designBtn'),
        preLoaderPercentage = document.querySelector('#preLoaderPercentage'),
        preLoaderAnimation = document.querySelector('#preLoaderAnimation');

    let changeMask = function(x1,x2){
        codeBanner.style['clip-path'] = 
        codeBanner.style['shape-inside'] = 
        codeBanner.style['-webkit-clip-path'] = 
            `polygon(0 0, ${x1}% 0, ${x2}% 100%, 0% 100%, 0 0)`;
        designBanner.style['clip-path'] = 
        designBanner.style['shape-inside'] = 
        designBanner.style['-webkit-clip-path'] = 
            `polygon(100% 0, ${x1}% 0, ${x2}% 100%, 100% 100%, 100% 0)`;

    }
    /// Mask Interactive
    //TODO : Moblie Gyro
    document.addEventListener('mousemove', function(e){
        if(currentSection == 'initial'){
            let w = window.innerWidth,
                h = window.innerHeight,
                x = e.clientX,
                y = e.clientY;
            if(x < w/2){
                changeMask((70-((y*20)/h)),(50+((y*20)/h)));
            }
            if(x > w/2){
                changeMask((30+((y*20)/h)),(50-((y*20)/h)));
            }
        }
    });

    // Lottie Animations
    let animPreLoader = bodymovin.loadAnimation({
        wrapper: preLoaderAnimation,
        animType: 'svg',
        prerender: true,
        path: './data/loadingScreen.json'
    }), animCodeSparks = bodymovin.loadAnimation({
        wrapper: codeSpark,
        animType: 'svg',
        prerender: true,
        path: './data/codeOpenSparks.json'
    }), animCodeTransition = {
        wrapper: foreground,
        animType: 'svg',
        prerender: true,
        path: './data/codeTransition.json'
    }, animDesignTransition = {
        wrapper: foreground,
        animType: 'svg',
        prerender: true,
        path: './data/designTransition.json'
    }, animDesignSpark = bodymovin.loadAnimation({
        wrapper: designSpark,
        animType: 'svg',
        prerender: true,
        path: './data/designSpark.json'
    }), animCenterBackground = bodymovin.loadAnimation({
        wrapper: lottieBackground,
        animType: 'canvas',
        prerender: true,
        loop: true,
        autoplay: true,
        renderer: 'canvas',
        path: './data/centerBackground.json'
    }), animDesignBackground = {
        wrapper: designBackground,
        animType: 'canvas',
        prerender: true,
        loop: true,
        autoplay: true,
        path: './data/designBackground.json'
    }, animCodeBackground = {
        wrapper: codeBackground,
        animType: 'canvas',
        prerender: true,
        loop: true,
        autoplay: true,
        path: './data/codeBackground.json'
    }, animMotionTitle = bodymovin.loadAnimation({
        wrapper: motionTitle,
        animType: 'svg',
        prerender: true,
        autoplay: false,
        loop: true,
        path: './data/motionTitle.json'
    }), animGraphicsTitle = bodymovin.loadAnimation({
        wrapper: graphicsTitle,
        animType: 'svg',
        prerender: true,
        autoplay: false,
        loop: true,
        path: './data/graphicTitle.json'
    }), animNameTag = bodymovin.loadAnimation({
        wrapper: nameDesign,
        animType: 'svg',
        prerender: true,
        autoplay: false,
        path: './data/name.json'
    });
    animGraphicsTitle.setSpeed(.8);
    animCenterBackground.setSpeed(.06);

    /*********** Pre-Loading *********** */
    let
        perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
        EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
        time = parseInt((EstimatedTime/1000)%60)*100;
        // Percentage Increment Animation
    let start = 0,
        end = 100,
        duration = time;
        countProgress(preLoaderPercentage, start, end, duration);
            
    function countProgress(id, start, end, duration) {
        var range = end - start,
        current = start,
        increment = end > start? 1 : -1,
        stepTime = Math.abs(Math.floor(duration / range));
        var timer = setInterval(function() {
            current += increment;
            id.innerHTML = current+"%";
            animPreLoader.goToAndStop(Math.round(current*1.5));
            if (current == end) {
                clearInterval(timer);
                TweenMax.to(id, .2, {opacity : 0});
                animPreLoader.setSpeed(.5);
                animPreLoader.play();
            }
        }, stepTime);
    }

    function generateRandomNumber(min , max) {
        return Math.random() * (max-min) + min ;
    }
    
    initializeGrid(document.querySelectorAll('#codePortfolio .item'));
    initializeGrid(document.querySelectorAll('#graphicsPortfolio .item'));
    function nextThumbs(thumbs){
        
        let activeThumbI = parseInt(thumbs[0].parentElement.dataset.activeThumb),
            newThumbI = activeThumbI,
            tTumb = 4;
        if(activeThumbI < thumbs.length){
            thumbs[0].parentElement.querySelectorAll('.activeThumb').forEach(actT => {
                actT.style.top = generateRandomNumber(2 , 90)+"%";
                actT.style.left = generateRandomNumber(2 , 90)+"%";
                actT.style.transform = `translate3d(0,0,0) rotateY(180deg) rotate(${generateRandomNumber(-30 , 30)}deg)`;
                actT.className = 'item';
            });
        }
        for(var i = 0; i <= (tTumb-1); i++){
            if((activeThumbI+i) < thumbs.length){
                thumbs[activeThumbI+i].classList.add('activeThumb');
                thumbs[activeThumbI+i].classList.add('aT'+i);
                newThumbI++;
            }
        }
        thumbs[0].parentElement.dataset.activeThumb = newThumbI;
    }
    function preThumbs(thumbs){
        let activeThumbI = parseInt(thumbs[0].parentElement.dataset.activeThumb),
            newThumbI = activeThumbI,
            tTumb = 4;
            
        if(activeThumbI-((tTumb*2)-1) >= 0){
            thumbs[0].parentElement.querySelectorAll('.activeThumb').forEach(actT => {
                actT.style.top = generateRandomNumber(2 , 90)+"%";
                actT.style.left = generateRandomNumber(2 , 90)+"%";
                actT.style.transform = `translate3d(0,0,0) rotateY(-180deg) rotate(${generateRandomNumber(-30 , 30)}deg)`;
                actT.className = 'item';
            });
        }
        for(var i = 0; i <= (tTumb-1); i++){
            if(activeThumbI-((tTumb*2)-i) >= 0){
                thumbs[activeThumbI-((tTumb*2)-i)].classList.add('activeThumb');
                thumbs[activeThumbI-((tTumb*2)-i)].classList.add('aT'+i);
                newThumbI--;
            }
        }
        thumbs[0].parentElement.dataset.activeThumb = newThumbI;
    }
    function initializeGrid(thumbs){
        let parentE = thumbs[0].parentElement;
        parentE.dataset.activeThumb = 0;
        parentE.dataset.xState = 0;
        parentE.dataset.yState = 0;
        thumbs.forEach(item => {
            item.style.top = generateRandomNumber(2 , 90)+"%"; 
            item.style.left = generateRandomNumber(2 , 90)+"%";
            item.style.transform = `translate3d(0,0,0) rotateY(-180deg) rotate(${generateRandomNumber(-30 , 30)}deg)`;
        });
        nextThumbs(thumbs);
        parentE.addEventListener('mousedown', function(e){
            parentE.dataset.xState = e.clientX;
            parentE.dataset.yState = e.clientY;
        });
        parentE.addEventListener('mousemove', function(e){
            if(parentE.dataset.yState != 0){
                if(Math.abs(parentE.dataset.xState - e.clientX) < 60){
                    if((parentE.dataset.yState - e.clientY) > 50){
                        nextThumbs(thumbs);
                        parentE.dataset.xState = e.clientX;
                        parentE.dataset.yState = e.clientY;
                    } else if((parentE.dataset.yState - e.clientY) < -50){
                        preThumbs(thumbs);
                        parentE.dataset.xState = e.clientX;
                        parentE.dataset.yState = e.clientY;
                    }
                }
            }
        });
        parentE.addEventListener('mouseup', function(e){
            if(parentE.dataset.yState != 0){
                parentE.dataset.xState = 0;
                parentE.dataset.yState = 0;
            }
        });
    }
    /*********************************** */
    // functions for Stages
    var codeSectionOpen,
        codeWorkOpen, 
        designSectionOpen,
        designWorkOpen,
        initialSectionOpen, 
        centerSectionOpen;

        bodymovin.loadAnimation(animCodeBackground)
            .setSpeed(0.15);
        bodymovin.loadAnimation(animDesignBackground)
            .setSpeed(0.1);

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
            remapColor(document.querySelector('#duoToneFilter'),codeSectionColor, 0);
            remapColor(document.querySelector('#duoToneFilter'),designSectionColor, 1);

            // Functions for switching Stages

            initialSectionOpen = function(){

                avatarShape.style.filter = 'url(#duoToneFilter)';
                avatar.style.filter = 'url(#duoToneFilter)';
                document.body.style['overflow'] = 'auto';

                currentSection = 'initial';
                homeContent.style.pointerEvents = 'auto';

                TweenMax.to(homeContent, .25, {opacity : 1, right : "-200%"});
                TweenMax.to(about, .25, {opacity : 0, y : "1000"});
                TweenMax.to(designBanner, .5, {left: '50%'});
                TweenMax.to(codeBanner, .5, {left: '50%'});
                TweenMax.to(avatarShape, .25, {left: '50%'});
                TweenMax.to(avatar, .25, {left: '50%'});
                TweenMax.to(codeBtn, 1, {x: `-100%`});
                TweenMax.to(designBtn, 1, {x: 0});
            };
            codeSectionOpen = function(){
                avatarShape.style.filter = '';
                document.body.style.backgroundColor = codeSectionColor;
                document.body.style['overflow'] = 'hidden';
                
                currentSection = 'code';
                homeContent.style.pointerEvents = 'auto';

                TweenMax.to(homeContent, .25, {opacity : 1, right : "-300%"});

                let codeTitle = document.querySelector('#codeTitle');
                TweenMax.fromTo(codeTitle, 
                    codeTitle.innerHTML.length*0.08, {width : 0}, {
                    width : codeTitle.offsetWidth-12, 
                    ease:SteppedEase.config(codeTitle.innerHTML.length-1)
                }).delay(.5);
                
                TweenMax.fromTo(codeTitle, .5, 
                    {borderRight: '12px solid white'}, 
                    {borderRight: '12px solid transparent'}).repeat(-1);
                TweenMax.to(avatarShape, .25, {left: '50%'});

                lottieBackgroundOverly.innerHTML = "";
                animCodeSparks.goToAndPlay(1,true);
                changeMask(100,100);
            };
            codeWorkOpen = function(){

                avatarShape.style.filter = '';
                document.body.style.backgroundColor = codeSectionColor;
                document.body.style['overflow'] = 'hidden';

                currentSection = 'codeSkills';
                TweenMax.to(homeContent, .25, {opacity : 1, right : "-400%"});
                TweenMax.to(avatarShape, .25, {left: '120%'});
                
                foreground.innerHTML = "";
                bodymovin.loadAnimation(animCodeTransition)
                    .setSpeed(3);
                changeMask(100,100);
            };
            designSectionOpen = function(){
                avatar.style.filter = '';
                document.body.style.backgroundColor = designSectionColor;
                document.body.style['overflow'] = 'hidden';

                currentSection = 'design';
                TweenMax.to(homeContent, .25, {opacity : 1, right : "-100%"});
                TweenMax.to(avatar, .25, {left: '50%'});
                animGraphicsTitle.goToAndPlay(1,true);
                animDesignSpark.goToAndPlay(1,true);
                animMotionTitle.goToAndPlay(1,true);
                animNameTag.goToAndPlay(1,true);
                changeMask(0,0);
            };
            designWorkOpen = function(){
                avatar.style.filter = '';

                document.body.style.backgroundColor = designSectionColor;
                document.body.style['overflow'] = 'hidden';

                currentSection = 'designSkills';
                TweenMax.to(homeContent, .25, {opacity : 1, right : "0%"});
                TweenMax.to(avatar, .25, {left: '-20%'});
                
                foreground.innerHTML = "";
                bodymovin.loadAnimation(animDesignTransition)
                    .setSpeed(2);
                changeMask(0,0);
            };
            centerSectionOpen = function(){

                currentSection = 'center';
                homeContent.style.pointerEvents = 'none';

                TweenMax.to(about, .25, {opacity : 1, y : "0"});
                TweenMax.to(designBanner, 1, {left: '150%'});
                TweenMax.to(codeBanner, 1, {left: '-100%'});
                TweenMax.to(codeBtn, 1, {x: `-${window.innerWidth/2}px`});
                TweenMax.to(designBtn, 1, {x: `${window.innerWidth/2}px`});
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
            
            // Open from center on scroll Down 
            window
                .addEventListener('scroll', function(e){
                    if(window.scrollY > 200 && currentSection != 'center'){
                        window.location.href = '#/about';
                    }
                    else if(window.scrollY < 200 && currentSection != 'initial' ){
                        window.location.href = '#';
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
                    window.location.href = '#/code';
                } else if(dragStatus == 'right' &&
                    currentSection == 'initial'){
                    window.location.href = '#/design';
                } else if(
                    (dragStatus == 'left' && currentSection == 'design') ||
                    (dragStatus == 'right' && currentSection == 'code') ){
                    window.location.href = '#';
                } else if(dragStatus == 'left' &&
                    currentSection == 'code'){
                    window.location.href = '#/code/work';
                } else if(dragStatus == 'right' &&
                    currentSection == 'design'){
                    window.location.href = '#/design/work';
                } else if(dragStatus == 'right' &&
                    currentSection == 'codeSkills'){
                    window.location.href = '#/code';
                } else if(dragStatus == 'left' &&
                    currentSection == 'designSkills'){
                    window.location.href = '#/design';
                }
            }

            //*********************************** */

            homeContent.style.opacity = 1;
    
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