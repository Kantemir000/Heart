/* document это значит мы обращаемся к html структуре */
/* html структура будет запускаться, когда будет готова (ready) */
/* $ - библиотека jquery */
/* Эта структура нужна, чтобы когда загружали наш слайдер тогда, когда наш документ полностью готов*/
/* для того чтобы наши скрипты загружались только тогда когда вёрстка построенная как документ будет готова */
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

    //Modal

    /* $('[data-modal=consultation]').fadeOut(); */ /* красиво, анимированно скрыть какие-то элементы */
    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

/* Модальное окно */
/*  $('.button_mini').on('click', function(){
    $('.overlay, #order').fadeIn('slow');
    }); */
    
    /* Динамически меняющееся модальное окно */
    $('.button_mini').each(function(i){ /* each для каждого элемента будет выполняться какая-то операция */
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text()); /* eq получать определённый элемент по порядку. text(любой текст) */
            $('.overlay, #order').fadeIn('slow');
        })
    });

    /* Validate */

    /* 1) */ /* $('.feed-form').validate(); */ //работает только на одной форме (работает на первом элементе с селектором который мы передали(feed-form))

    /* 2) */ /* $('#consultation-form').validate();
    $('#consultation form').validate();
    $('#order form').validate(); */
 
    /* 3) */
    /* class error можем застилизовать  */
    function validateForm (form){
        $(form).validate({
            rules: {
                phone: "required",
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                required: true,
                email: true
                }
            },
            messages: {
                phone: "Введите номер телефона",
                name: {
                    required: "Введите имя",
                    minlength: jQuery.validator.format("Введите {0} символ(а)")
                },
                email: {
                    required: "Введите почту",
                    email: "Неверно введен адрес почты"
                }
            }
        });
    };   
    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');

    /* Mask */
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    /* Отправка данных формы на почту  */
    $('form').submit(function(e){ /* событие submit означает "подтверждаться", когда прошли все валидации у нас эта форма отправляется  */
        e.preventDefault(); /* позволяет отменить стандартное поведение браузера */
        $.ajax({
            type: "POST", /* отдать данные серверу  */
            url: "mailer/smart.php", /* обработчик, который будет обрабатывать данные всю операцию  */ 
            data: $(this).serialize() /* data те данные, которые я хочу отправить на сервер, this работаем с тем чем работаем, если мы отправили вторую форму, мы работаем с теми данными, которые во второй форме, serialize данные подготовить перед отправкой на сервер*/
        }).done(function(){ /* done мы выполнили операцию  */
            $(this).find("input").val(""); /* find находим, val('') после отправки формы очистим все input */
            $('#consultation, #order').fadeOut(); /* закрытие формы */
            $('.overlay, #thanks').fadeIn('slow'); /* открытие модального окна спасибо  slow плавное отображение*/
            $('form').trigger('reset'); /* все мои формы должны очиститься */
        });
        return false;/*  выполнение функции останавливается*/
    });
    
   /*  Smooth scroll and pageup */
   $(window).scroll(function() { 
       if ($(this).scrollTop() > 1600) { /*scrollTop отступ при скроллинге */
            $('.pageup').fadeIn();
       } else {
            $('.pageup').fadeOut();
       }
   });

   new WOW().init();

   $("a[href^='#']").click(function(){ /* взять все ссылки по определённым параметрам: a(ссылка)[атрибут], [href(ссылки) ^(которые начанаются с) #(решётки(потому что задавали и будем задавать локальные ссылки, которые начинаются с #))] */
    var _href = $(this).attr("href"); /* _href переменная, this перём ссылку на которую нажали, attr("href") берём атрибут который находится непосредственно в href(у нас это #up)*/
    $('html, body').animate({scrollTop: $(_href).offset().top+"px"}); /* анимируем html и body и долистываем до того элемента до которого нам нужно */
    return false;
    });
}); 

 