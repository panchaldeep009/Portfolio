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
    TweenMax.to(id, .2, {opacity : 1});
    TweenMax.to(preLoader, .2, {opacity : 1});
    animPreLoader.goToAndStop(Math.round(current*1.5));
    if (current == end) {
        clearInterval(timer);
        TweenMax.to(id, .2, {opacity : 0});
        animPreLoader.setSpeed(.5);
        animPreLoader.play();
    }
}, stepTime);
}