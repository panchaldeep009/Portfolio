"use strict";
Element.prototype.animateCSS = function(css, dur, fun, delay){
    var trans = '';
    Object.entries(css).forEach(([property]) => {
        trans += property;
        if(dur != null){ trans += ' '+dur } else { trans += ' 1s' }
        if(fun != null){ trans += ' '+fun } else { trans += ' linear' }
        if(delay != null){ trans += ' '+delay } else { trans += ' 0s' }
        trans += ',';
    });
    this.style += ` transition : ${trans}; -webkit-transition : ${trans}; -moz-transition : ${trans}; -o-transition : ${trans}`;
    Object.entries(css).forEach(([property, value]) => {
        this.style += `${property} : ${value}`;
    });
};