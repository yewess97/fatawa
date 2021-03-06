$(document).ready(function () {
    "use strict";

    var header = $('.header');
    var hambActive = false;
    var menuActive = false;
    var hambProfileActive = false;
    var menuProfileActive = false;
    var ctrl = new ScrollMagic.Controller();

    setHeader();

    $(window).on('resize', function () {
        setHeader();
    });

    $(document).on('scroll', function () {
        setHeader();
    });

    initHeroSlider();
    initSvg();
    initHamburger();
    initProfileHamburger();
    initMilestones();

    function setHeader() {
        if (window.innerWidth < 992) {
            if ($(window).scrollTop() > 100) {
                header.addClass('scrolled');
            } else {
                header.removeClass('scrolled');
            }
        } else {
            if ($(window).scrollTop() > 100) {
                header.addClass('scrolled');
            } else {
                header.removeClass('scrolled');
            }
        }
        if (window.innerWidth > 991 && menuActive) {
            closeMenu();
        }
    }


    function initHeroSlider() {
        if ($('.hero_slider').length) {
            var owl = $('.hero_slider');

            owl.owlCarousel(
                {
                    items: 1,
                    loop: true,
                    smartSpeed: 800,
                    autoplay: true,
                    nav: false,
                    dots: false
                });

            // add animate.css class(es) to the elements to be animated
            function setAnimation(_elem, _InOut) {
                // Store all animationend event name in a string.
                // cf animate.css documentation
                var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

                _elem.each(function () {
                    var $elem = $(this);
                    var $animationType = 'animated ' + $elem.data('animation-' + _InOut);

                    $elem.addClass($animationType).one(animationEndEvent, function () {
                        $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
                    });
                });
            }

            // Fired before current slide change
            owl.on('change.owl.carousel', function (event) {
                var $currentItem = $('.owl-item', owl).eq(event.item.index);
                var $elemsToanim = $currentItem.find("[data-animation-out]");
                setAnimation($elemsToanim, 'out');
            });

            // Fired after current slide has been changed
            owl.on('changed.owl.carousel', function (event) {
                var $currentItem = $('.owl-item', owl).eq(event.item.index);
                var $elemsToanim = $currentItem.find("[data-animation-in]");
                setAnimation($elemsToanim, 'in');
            })

            // Handle Custom Navigation
            if ($('.hero_slider_left').length) {
                var owlPrev = $('.hero_slider_left');
                owlPrev.on('click', function () {
                    owl.trigger('prev.owl.carousel');
                });
            }

            if ($('.hero_slider_right').length) {
                var owlNext = $('.hero_slider_right');
                owlNext.on('click', function () {
                    owl.trigger('next.owl.carousel');
                });
            }
        }
    }


    function initSvg() {
        jQuery('img.svg').each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);
            }, 'xml');
        });
    }


    function initHamburger() {
        if ($('.hamburger_container').length) {
            var hamb = $('.hamburger_container');

            hamb.on('click', function (event) {
                event.stopPropagation();

                if (!menuActive) {
                    openMenu();

                    $(document).one('click', '.menu_item , .menu_close', function cls(e) {
                        if ($(e.target).hasClass('menu_mm')) {
                            $(document).one('click', cls);
                        } else {
                            closeMenu();
                        }
                    });
                } else {
                    $('.menu_container').removeClass('active');
                    menuActive = false;
                }
            });
        }
    }

    function openMenu() {
        var fs = $('.menu_container');
        fs.addClass('active');
        hambActive = true;
        menuActive = true;
    }

    function closeMenu() {
        var fs = $('.menu_container');
        fs.removeClass('active');
        hambActive = false;
        menuActive = false;
    }


    function initProfileHamburger() {
        if ($('.profile_hamburger_container').length) {
            var hambProfile = $('.profile_hamburger_container');

            hambProfile.on('click', function (event) {
                event.stopPropagation();

                if (!menuProfileActive) {
                    openProfileMenu();

                    $(document).one('click', function cls(e) {
                        if ($(e.target).hasClass('menu_profile')) {
                            $(document).one('click', cls);
                        } else {
                            closeProfileMenu();
                        }
                    });
                } else {
                    $('.menu-half').removeClass('active');
                    menuProfileActive = false;
                }
            });
        }
    }

    function openProfileMenu() {
        var fh = $('.menu-half');
        fh.addClass('active');
        hambProfileActive = true;
        menuProfileActive = true;
    }

    function closeProfileMenu() {
        var fh = $('.menu-half');
        fh.removeClass('active');
        hambProfileActive = false;
        menuProfileActive = false;
    }

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