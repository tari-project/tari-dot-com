(function() {
    function getTelegramData() {
        $.ajax({
            url: Tari.telegramCachingURL,
            headers: { "Access-Control-Allow-Origin": "*" },
            success: function(res) {
                const { online = "" } = res;
                const telegramCountEl = document.getElementById("telegram-counter");
                const mobileTelegramCountEl = document.getElementById("mobile-telegram-counter");
                if (telegramCountEl) {
                    telegramCountEl.innerText = online.trim() + " PEOPLE ONLINE";
                    mobileTelegramCountEl.innerText = online.trim() + " PEOPLE ONLINE";
                }
            }
        });
    }
    const site = window.location.origin;
    let updateHash = false;
    const homepage = window.location.href.split('/#')[0] === site || window.location.href.replace(/\/$/, "") === site;

    if (homepage) {
        renderIssues(Tari.githubIssuesPlaceholder);
    }
    // Cache ajax requests by default
    jQuery.ajaxSetup({
        cache: true
    });

    jQuery(document).ready(function ($) {
        //Telegram data
        getTelegramData();

        $.fn.scrollToElement = function (callback) {
            callback = callback || function () {
            };
            const container = $('#slide-content');
            const hash = '#' + $(this)[0].id;

            // Check if we are on the home page. Home page: scroll. Other pages: Redirect with the hash.
            if (homepage) {
                //Check if we are on smaller screens or devices
                if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/) || $(window).width() < 900) {
                    $('html, body').animate({
                        scrollTop: $(hash).position().top - container.offset().top + container.scrollTop() - 60
                    }, 1000, function () {
                        updateHash = true;
                        callback();
                    });
                } else {
                    container.animate({
                        scrollTop: $(hash).offset().top - container.offset().top + container.scrollTop() - 20
                    }, 1000, function () {
                        updateHash = true;
                        callback();
                    });
                }
            }
        };

        $.fn.isInViewport = function () {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();

            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            return elementBottom > viewportTop && elementTop < viewportBottom;
        };

        /* scroll indicator */
        function indicate() {
            // Check if we are on the home page.
            if (homepage) {
                $('.main .anchor').each(function () {
                    let href;
                    if (window.location.hash) {
                        const hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
                        href = "#" + hash;
                    } else if (window.location.pathname.length > 1) { //check if separate page
                        href = "/" + $(this).attr('id');
                    } else {
                        href = "#" + $(this).attr('id'); //if scrolling not click
                    }
                    if ($(this).isInViewport()) { /* section is visible */
                        history.pushState({}, "", site + '/#' + $(this).attr('id'));
                        if ($('.navmenu li.current a, #mobileMenu li.current a').attr('href') != href) {
                            $('.navmenu li.current, #mobileMenu li.current').removeClass('current');
                            $('.navmenu li a[href="' + href + '"], #mobileMenu li a[href="' + href + '"]').parent().addClass('current');
                        }

                        return false;
                    }
                });
            }
        }

        function onLoadHash() {
            let href;
            // Check if we are on the home page.
            if (window.location.hash && window.location.href.split('/#')[0] === site) {
                const hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
                href = "#" + hash;
                $(href).scrollToElement(function () {
                });

            }
        }

        /* Menu item click to scroll/display */
        $('#menu ul li a, #mobileMenu ul li a, #for-everyone a, a[data-scroll]').on('click', function (e) {
            const href = $(this).attr("href");
            const hostname = $(href).prop('hostname');
            e.preventDefault();

            // Check if we are on the home page. Home page: scroll. Other pages: Redirect with the hash.
            if (homepage && href.indexOf('#') === 0) {
                let hash;
                $('.navmenu li.current, #mobileMenu li.current').removeClass('current');
                $(this).parent().addClass('current');
                if (href.indexOf("#") >= 0) {
                    hash = href.substr(href.indexOf("#"));
                    if ($(hash).length > 0) {
                        $(hash).scrollToElement();
                    }
                }
            } else if (hostname) {
                window.open(href, '_blank');
            } else { //check if separate page
                window.location.assign(site + '/' + href);
            }

        });

        /* Click newsletter on mobile menu */
        $('#sign-up-mobi').click(function () {
            $('#newsletter').fadeIn(800, "linear");
        });

        //Desktop scrolling update navigation indicator
        $('.main').on('scroll', indicate);
        //Mobile scrolling update navigation indicator
        $(window).on('scroll', function (e) {
            indicate();
        });

        /* mobile menu */
        $('#mobileTrigger').on('click', function (e) {
            $('#newsletter').fadeOut(800, "linear");
            const $this = $(this),
                nav = $('#mobileNav');

            if ($this.hasClass('opened')) {
                $this.removeClass('opened');
                nav.animate({'left': '-100%'}, 500);
            } else {
                $this.addClass('opened');
                nav.animate({'left': '0'}, 500);
            }
        });

        $('#mobileNav a').on('click', function () {
            const nav = $('#mobileNav');
            $('#mobileTrigger').removeClass('opened');
            nav.animate({'left': '-100%'}, 500);
            $('html, body').removeClass('no-scroll');
        });

        /* transitions */
        $('.animsition').animsition({
            inClass: 'fade-in',
            outClass: 'fade-out',
            inDuration: 1000,
            outDuration: 1000,
        });

        $(".animsition").on('animsition.inEnd', function () {
            //Run this on dom ready to scroll to hash
            onLoadHash();
        });
        /* animations */
        $('.home .mainMenu').addClass('hidden');

        $('.main').scroll(function () {
            var scrollTop = $('.main').scrollTop();
            var height = $('.main').height();

            $('lottie-player').css({
                'opacity': ((600 - scrollTop) / height)
            });
        });

        setupEditors();
        codeSnippets();
        clipboard();

    });

	// FAQ toggle Animation

	$(document).ready(function(){
	   $('.faq-container').click(function(){
	      if ($(this).hasClass("faq-not-active")){
	         $(this).removeClass("faq-not-active");
	         $(this).addClass("faq-active");
	         $(this).find('.arrow').addClass("arrow-rotate");
	         $(this).find("p").slideDown("swing");
	     }else{
	         $(this).find("p").slideUp("swing");
	         $(this).removeClass("faq-active");
	         $(this).find('.arrow').removeClass("arrow-rotate");
	         $(this).addClass("faq-not-active");
	     }
	 });

	});

    $(window).on("load", function () {
        setTimeout(function () {
            $('.slide-up, .slide-up-2').show();
            $(".hero-cta, .hero-body, #vid, #newsletter, #copyright").delay(500).animate({'opacity': '1',}, 1500, "easeInOutExpo");
            $("lottie-player").delay(1200).animate({'opacity': '.3',}, 1500, "easeInOutExpo");

        }, 10);

        setTimeout(function () {
            $('.home .mainMenu').addClass('visible animated slideInLeft');


        }, 500);
    });

})();

