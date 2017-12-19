$(document).ready(function(){
    
     function animation() {
        var windowHeight = $(window).height();
        var scroll = $(window).scrollTop();
        $('.animation').each(function () {
            var pozicija = $(this).offset().top;
            var animacija = $(this).attr('data-animation');
            if (pozicija < scroll + windowHeight - 100) {
                $(this).addClass(animacija);
            }
        });
    }

    animation();
    $(window).scroll(function () {
        animation();
    });
    
    
    
});