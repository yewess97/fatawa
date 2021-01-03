$(document).ready(function () {
    "use strict";

    function getAJAX(url) {
        var results;
        $.ajax
        ({
            type: 'GET',
            url: url,
            dataType: 'json',
            data: {},
            async: false,
            success: function (data) {
                //console.log(data);
                results = data;
            },
            error: function (data) {
                console.log(data);
                results = data;
            }
        });
        return results;
    }

    var language = $("html").attr("lang"); //get language from html set lang="en" or lang ="ar" if you don't set it

    /* countries */
    var conutriesURL = 'http://api.geonames.org/countryInfoJSON?q=&country=&lang=ar&username=abdulnaser_mohsen'; //url that get your conuntries
    var countries = getAJAX(conutriesURL); // the importance of async test without aync or aync is true
    //console.log(countries);
    //console.log(countries.geonames);
    $(countries.geonames).each(function (index, item) {
        //console.log(item.countryName , item.geonameId);
        var selectOption = $("<option>")
        selectOption.attr("value", item.geonameId).append(item.countryName);
        $('.country').append(selectOption);
    });
});

!(function ($) {

    $(document).on('click', '.mobile-nav-toggle', function (e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
    });

    $(document).click(function (e) {
        var container = $(".mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('body').hasClass('mobile-nav-active')) {
                $('body').removeClass('mobile-nav-active');
                $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            }
        }
    });

    var nav_sections = $('section');
    var main_nav = $('.nav-menu, .mobile-nav');

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop() + 200;

        nav_sections.each(function () {
            var top = $(this).offset().top,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                if (cur_pos <= bottom) {
                    main_nav.find('li').removeClass('active');
                }
                main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
            }
            if (cur_pos < 300) {
                $(".nav-menu ul:first li:first").addClass('active');
            }
        });
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return true;
    });

    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });

    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out-back",
            once: true
        });
    }

    $(window).on('load', function () {
        aos_init();
    });

    $(document).ready(function () {
        "use strict";

        function initMilestones() {
            if ($('.milestone_counter').length) {
                var milestoneItems = $('.milestone_counter');

                milestoneItems.each(function (i) {
                    var ele = $(this);
                    var endValue = ele.data('end-value');
                    var eleValue = ele.text();

                    /* Use data-sign-before and data-sign-after to add signs
                    infront or behind the counter number */
                    var signBefore = "";
                    var signAfter = "";

                    if (ele.attr('data-sign-before')) {
                        signBefore = ele.attr('data-sign-before');
                    }

                    if (ele.attr('data-sign-after')) {
                        signAfter = ele.attr('data-sign-after');
                    }

                    var milestoneScene = new ScrollMagic.Scene({
                        triggerElement: this,
                        triggerHook: 'onEnter',
                        reverse: false
                    })
                        .on('start', function () {
                            var counter = {value: eleValue};
                            var counterTween = TweenMax.to(counter, 4,
                                {
                                    value: endValue,
                                    roundProps: "value",
                                    ease: Circ.easeOut,
                                    onUpdate: function () {
                                        document.getElementsByClassName('milestone_counter')[i].innerHTML = signBefore + counter.value + signAfter;
                                    }
                                });
                        })
                        .addTo(ctrl);
                });
            }
        }
    });

})(jQuery);