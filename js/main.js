"use strict";
(() => {

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
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function () {
            changeClip(event.beta, event.gamma);
        }, true);
    } else if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function () {
            changeClip(event.acceleration.x * 2, event.acceleration.y * 2);
        }, true);
    } else {
        window.addEventListener("MozOrientation", function () {
            changeClip(orientation.x * 50, orientation.y * 50);
        }, true);
    }
    document.addEventListener('mousemove', function(e){
        changeClip(e.clientX, e.clientY);
    });
    function changeClip(x,y){
        if(currentSection == 'initial'){
            let w = window.innerWidth,
                h = window.innerHeight;
            if(x < w/2){
                changeMask((70-((y*20)/h)),(50+((y*20)/h)));
            }
            if(x > w/2){
                changeMask((30+((y*20)/h)),(50-((y*20)/h)));
            }
        }
    }
    

    /*********************************** */
    // functions for Stages
    var codeSectionOpen,
        codeWorkOpen, 
        designSectionOpen,
        designWorkOpen,
        initialSectionOpen, 
        centerSectionOpen;

    
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
        TweenMax.to(designBanner, .5, {left: '50%'});
        TweenMax.to(codeBanner, .5, {left: '50%'});
        TweenMax.to(codeBanner.querySelector('.aboutMsg'), .5, {opacity: '1'});
        TweenMax.to(designBanner.querySelector('.aboutMsg'), .5, {opacity: '1'});
        TweenMax.to(avatarShape, .25, {left: '50%'});
        TweenMax.to(avatar, .25, {left: '50%'});
        TweenMax.to(codeBtn, 1, {x: `-100%`});
        TweenMax.to(designBtn, 1, {x: 0});

        document.title = 'Deep Panchal : Interactive Media Designer';
        removeAllLottieAnimation();
        bodymovin.loadAnimation(animCodeBackground)
            .setSpeed(0.15);
        bodymovin.loadAnimation(animDesignBackground)
            .setSpeed(0.1);
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
        document.title = 'Coder : Deep Panchal';
        TweenMax.to(codeBanner.querySelector('.aboutMsg'), .5, {opacity: '0'});
        TweenMax.to(designBanner.querySelector('.aboutMsg'), .5, {opacity: '0'});

        removeAllLottieAnimation();
        bodymovin.loadAnimation(animCodeBackground)
            .setSpeed(0.15);
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
        document.title = 'Portfolio | Coder : Deep Panchal';
        TweenMax.to(codeBanner.querySelector('.aboutMsg'), .5, {opacity: '0'});
        TweenMax.to(designBanner.querySelector('.aboutMsg'), .5, {opacity: '0'});
        removeAllLottieAnimation();
        bodymovin.loadAnimation(animCodeBackground)
            .setSpeed(0.15);    
    };  
    designSectionOpen = function(){
        avatar.style.filter = '';
        document.body.style.backgroundColor = designSectionColor;
        document.body.style['overflow'] = 'hidden';

        currentSection = 'design';
        TweenMax.to(homeContent, .25, {opacity : 1, right : "-100%"});
        TweenMax.to(avatar, .25, {left: '50%'});
        changeMask(0,0);
        document.title = 'Designer : Deep Panchal';
        TweenMax.to(codeBanner.querySelector('.aboutMsg'), .5, {opacity: '0'});
        TweenMax.to(designBanner.querySelector('.aboutMsg'), .5, {opacity: '0'});
        codeBackground.innerHTML = '';
        removeAllLottieAnimation();
        bodymovin.loadAnimation(animDesignBackground)
            .setSpeed(0.1);
        bodymovin.loadAnimation(animNameTag);
        bodymovin.loadAnimation(animGraphicsTitle).setSpeed(.8);
        bodymovin.loadAnimation(animMotionTitle);
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
        document.title = 'Portfolio | Designer : Deep Panchal';
        TweenMax.to(codeBanner.querySelector('.aboutMsg'), .5, {opacity: '0'});
        TweenMax.to(designBanner.querySelector('.aboutMsg'), .5, {opacity: '0'});
        removeAllLottieAnimation();
        bodymovin.loadAnimation(animDesignBackground)
            .setSpeed(0.1);
    };
    centerSectionOpen = function(){
        currentSection = 'center';
        homeContent.style.pointerEvents = 'none';
        TweenMax.to(designBanner, 1, {left: '150%'});
        TweenMax.to(codeBanner, 1, {left: '-100%'});
        TweenMax.to(codeBtn, 1, {x: `-${window.innerWidth/2}px`});
        TweenMax.to(designBtn, 1, {x: `${window.innerWidth/2}px`});
        document.title = 'About : Deep Panchal';
        removeAllLottieAnimation();
        bodymovin.loadAnimation(animCenterBackground)
            .setSpeed(0.06);
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
    //*********************************** */

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
        .addEventListener('touchstart', function(e){
            cursorX = e.targetTouches[0].clientX;
        }, false);        
    homeContent
        .addEventListener('touchend', function(e){
            if((cursorX - e.changedTouches[0].clientX) > 150){
                sectionSwitch('right');
            } else if((e.changedTouches[0].clientX - cursorX) > 150){
                sectionSwitch('left');
            }
        }, false);

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

    homeContent.style.opacity = 1;

    var contactForm = new Vue({
        el: '#contactForm',
        data: {
            error: '',
            status: '',
            name: '',
            email: '',
            msg: '',
            formHide: false,
        },
        methods: {
            subForm: function(){
                if(this.name == ''){
                    this.error = 'Name should not be empty !';
                } else if(this.email == ''){
                    this.error = 'Email Address should not be empty !';
                } else if(this.msg == ''){
                    this.error = 'Message should not be empty !';
                } else {
                    this.error = '';
                    this.formHide = true;
                    this.status =  'Sending ...',
                    fetch(`php/mail.php?email=${encodeURI(this.email)}&name=${encodeURI(this.name)}&message=${encodeURI(this.msg)}`)
                    .then(response => response.json())
                    .then(data => {
                        if(data.res == 200){
                            this.status = data.msg;
                        } else {
                            this.error = data.msg;
                            this.formHide = false;
                        }
                    })
                    .catch(error => console.error(error));
                }
                
            }
        },
        watch: {

        }
    });
})();