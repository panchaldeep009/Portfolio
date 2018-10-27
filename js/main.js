"use strict";
(() => {
    html2canvas(document.querySelector("body")).then(canvas => {
        document.querySelector(".frostGlass > .backgroundImage").style.backgroundImage = `url(${canvas.toDataURL('image/jpeg', 1.0)})`;
    });

    document.addEventListener("resize", function(){
        html2canvas(document.querySelector("body")).then(canvas => {
            document.querySelector(".frostGlass > .backgroundImage").style.backgroundImage = `url(${canvas.toDataURL('image/jpeg', 1.0)})`;
        });
    });

    document.addEventListener("scroll", function(){
        document.querySelector(".frostGlass > .backgroundImage")
            .style.backgroundPosition = 
            `0px -${document.documentElement.scrollTop}px`;
    });
    
    document.addEventListener("mousemove", function(e){
        document.querySelector(".frostGlass").style.top = e.clientY-100+"px";
        document.querySelector(".frostGlass").style.left = e.clientX-100+"px";
    });

})();