/* document это значит мы обращаемся к html структуре */
/* html структура будет запускаться, когда будет готова (ready) */
/* $ - библиотека jquery */
/* Эта структура нужна, чтобы когда загружали наш слайдер тогда, когда наш документ полностью готов*/
$(document).ready(function(){ 
    /* slick это метод, который помогает запустить слайдер */
    $('.slider__inner').slick({      
        speed: 1000,
       /*  adaptiveHeight: true, */
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
     
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this) //ссылаемся на тот элемент на который только что нажали 
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active') //addClass - добавляем следующему табу класс активности,subling - все соседние табы, на которые мы не нажали, removeClass - удалить этот класс
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active'); //closest - найти ближайший элемент(в большом блоке), finf - найти класс, removeClass - удалить этот класс, eq($(this).index()) - получает тот номер элемента на который мы нажали, addClass - добавляем табу класс активности. Допустим мы удалим catalog__content для бега, то там не будет пусто, а будет catalog__content для триатлона, но если мы оставим catalog__content для бега, а внутри блока будет пусто, то catalog__content для бега будет пуст на сайте, а catalog__content для триатлона полон. И это всё благодаря номерации блоков по порядку с помощью eq($(this).index()).
    });

/* Неоптимизированный скрипт */
/*     $('.catalog-item__link').each(function(i) { 
        $(this).on('click', (function(e) { 
            e.preventDefault(); 
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); 
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    }) */

    function toggleSlide(item) { //function название(аргумент)
        $(item).each(function(i) { //each - перебор каждого элемента
            $(this).on('click', function(e) { //ссылаемся на каждый элемент который перебирается
                e.preventDefault();//чаще всего используется на ссылках, чтобы мы по ним не переходили, а выполняли какие-то другие действия.
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active'); //toggleClass - переключенение класса, если он есть, то он убирается, если его нет, то он добавляется. eq(i) - конкретно какой элемент я сейчас хочу использовать.
            })
        });
    };

    toggleSlide('.catalog-item__link'); //вызываем функцию 
    toggleSlide('.catalog-item__back'); //вызываем функцию 
}); 
