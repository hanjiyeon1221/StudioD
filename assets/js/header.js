/* lenis */
const lenis = new Lenis({
    wrapper: document.querySelector('.wrapper'),
    content: document.querySelector('.inner-wrapper'),
    // content:document.querySelector('.container')
});

lenis.on('scroll', ScrollTrigger.update);

/* header */
//--로고 및 메뉴버튼 모션(첫 로드시)
let hdTl = gsap.timeline();
hdTl.from('.header .logo-svg > *', {
    duration: 0.2,
    y: 30,
    stagger: 0.1,
    ease: 'Power1.out',
});
hdTl.from('.header .btn-menu', {
    duration: 0.4,
    scale: 0.8,
    autoAlpha: 0,
});

//--로고 및 메뉴버튼 모션(스크롤시)
let logoTl = gsap.timeline({
    scrollTrigger: {
        scroller: '.wrapper',
    },
});
logoTl.to(
    '.header .logo .studio',
    {
        duration: 0.2,
        y: 30,
        stagger: -0.07,
        ease: 'Power1.out',
    },
    'a',
);
logoTl.to(
    '.header .logo .d',
    {
        duration: 0.3,
        x: -100,
        scale: 1.3,
        ease: 'Power1.out',
    },
    '-=.2',
);
logoTl.to(
    '.header .btn-menu .label span',
    {
        duration: 0.5,
        y: -20,
        ease: 'Power1.out',
    },
    'a',
);
logoTl.pause();

/* lenis wrapper 적용후 스크립트 자체 이벤트 막힘 */
// --스크롤 시작시,
// let lastScroll = 0;
// $(window).scroll(function () {
//     current = $(window).scrollTop();

//     console.log(current, lastScroll);
//     if (current > lastScroll) {
//         logoTl.play();
//         $('.pagenation-sc').addClass('on');
//     } else {
//         $('.pagenation-sc').removeClass('on');
//         setTimeout(function () {
//             logoTl.reverse();
//         }, 1000);
//     }

//     function mediaqueryM(current) {
//         if ($(window).width() < 601) {
//             if (current > 0) {
//                 $('.header .btn-menu').addClass('white');
//             } else {
//                 $('.header .btn-menu').removeClass('white');
//             }
//         }
//     }
//     mediaqueryM(current);
//     $(window).resize(function () {
//         mediaqueryM(current);
//     });
// });

/* 스크립트 스크롤 이벤트 대신 gsap으로 변경 */
ScrollTrigger.create({
    trigger: '.wrapper',
    scroller: '.wrapper',
    onUpdate: self => {
        // console.log('progress:', self.progress.toFixed(3));
        if (self.progress.toFixed(3) > 0.5) {
            logoTl.play();
            $('.pagenation-sc').addClass('on');
        } else {
            setTimeout(function () {
                logoTl.reverse();
            }, 1000);
            $('.pagenation-sc').removeClass('on');
        }
    },
});

ScrollTrigger.matchMedia({
    '(max-width: 600px)': function () {
        ScrollTrigger.create({
            trigger: '.wrapper',
            scroller: '.wrapper',
            onUpdate: self => {
                if (self.progress.toFixed(3) > 0.5) {
                    $('.header .btn-menu').addClass('white');
                } else {
                    $('.header .btn-menu').removeClass('white');
                }
            },
        });
    },
});

// --메뉴버튼 클릭시, gnb창 활성화
let fullGnbTl = gsap.timeline();
fullGnbTl.set('.gnb', { opacity: 1, visibility: 'visible' });
fullGnbTl.fromTo(
    '.gnb',
    {
        yPercent: -50,
        // clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    },
    {
        yPercent: 0,
        // clipPath: 'polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%)',
        // transform: 'translate3d(0px, 24.3vw, 0px)',
        duration: 0.5,
        // zIndex: -10,
        // ease: 'linear',
    },
);
fullGnbTl.from(
    '.gnb ul > li > a',
    {
        duration: 0.3,
        stagger: 0.1,
        y: 100,
    },
    '-=.7',
);
fullGnbTl.pause();

let cnt = 0;
$('.header .btn-menu').click(function () {
    cnt++;
    //toggle
    if (cnt % 2 == 0) {
        $(this).find('.label span').show('slow');
        $('.header').removeClass('white');
        $('.header .lines').removeClass('close');
        $('.container').removeClass('down');
        // $('body').css('overflow', 'auto');
        // $('.container').css('transform', 'translateY(0)');
        $('.wrapper').removeClass('inactive');
        fullGnbTl.reverse();
        lenis.start();
    } else {
        $(this).find('.label span').hide('fast');
        $('.header').addClass('white');
        $('.header .lines').addClass('close');
        $('.container').addClass('down');
        // $('body').css('overflow', 'hidden');
        // $('.container').css('transform', 'translateY(100vh)');
        $('.wrapper').addClass('inactive');
        fullGnbTl.play();
        lenis.stop();
    }
});

let mediaM = gsap.matchMedia();
mediaM.add('(min-width: 601px)', () => {
    // 특정 섹션에서 header 색상 변경
    let dataValue = $('*').filter(function () {
        return $(this).data('bg') === 'white';
    });
    // console.log(dataValue);
    $(dataValue).each(function () {
        ScrollTrigger.create({
            trigger: this,
            scroller: '.wrapper',
            start: 'top top',
            end: 'bottom top',
            // markers: true,
            toggleClass: { targets: '.header', className: 'white' },
        });
    });
    // 특정 섹션에서 pagenation 색상 변경
    ScrollTrigger.create({
        trigger: '.sc-project',
        scroller: '.wrapper',
        start: 'top bottom',
        end: 'bottom bottom',
        // markers: true,
        toggleClass: { targets: '.pagenation-sc', className: 'white' },
    });

    // $(window).scroll(function () {
    //     if ($(window).scrollTop > 0) {
    //         $('.header .btn-menu').addClass('white');
    //     } else {
    //         $('.header .btn-menu').removeClass('white');
    //     }
    // });
});
