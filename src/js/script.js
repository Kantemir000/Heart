/* document это значит мы обращаемся к html структуре */
/* html структура будет запускаться, когда будет готова (ready) */
/* $ - библиотека jquery */
/* Эта структура нужна, чтобы когда загружали наш слайдер тогда, когда наш документ полностью готов*/
$(document).ready(function(){ 
    /* slick это метод, который помогает запустить слайдер */
    $('.slider__inner').slick({      
        speed: 1000,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/our_advantages/left_hand.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/our_advantages/right_hand.svg"></button>',
        responsive:[
            {
                breakpoint: 1024,
                settings: {
                    dots: true,
                    arrows: false,
                    dotsClass: 'slick-dots'
                }
            }
        ]
        /* dots: true, */ /* навигация по нашему слайдам */
        /* infinite: true, */ /* доходим до последнего элемента, и слайды начинаются по новой */
        /* slidesToShow: 1, */ /* сколько показывается слайдов */
        /* slidesToScroll: 1  *//* сколько меняется слайдов */
    }); 
});
