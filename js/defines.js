"use strict";
// CSS Variables
var cssVar = window.getComputedStyle(document.body);
const codeSectionColor = cssVar.getPropertyValue('--codeBackground').trim(),
    designSectionColor = cssVar.getPropertyValue('--designBackground').trim(),
    centerSectionColor = cssVar.getPropertyValue('--yellowColor').trim();

//  Variable for current section Status.
var currentSection = 'initial';

// Elements
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
    preLoader = document.querySelector('#preLoader'),
    preLoaderPercentage = document.querySelector('#preLoaderPercentage'),
    preLoaderAnimation = document.querySelector('#preLoaderAnimation');

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
