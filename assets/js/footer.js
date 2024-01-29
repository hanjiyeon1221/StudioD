/* footer */
// 푸터 상단 움직임 (최소601px부터~)
ScrollTrigger.matchMedia({
    '(min-width: 601px)': function () {
        gsap.set('.sc-about', { zIndex: 5, position: 'relative' });
        gsap.from('.footer', {
            scrollTrigger: {
                trigger: '.footer',
                scroller: '.wrapper',
                start: '50% 100%',
                end: '120% 100%',
                // markers: true,
                scrub: 0,
            },
            // duration: 1,
            yPercent: -30,
            ease: 'none',
        });
    },
});

// 푸터 loof
let tl = new TimelineMax({ repeat: -1 });
tl.to('.loof-wrap', 10, {
    x: '-65%',
    ease: Linear.easeNone,
});

// 푸터 loof 좌우 움직임 (to보다 from이 자연스러운듯)
gsap.from('.loof', {
    xPercent: 30,
    ease: 'power1.easeOut',
    scrollTrigger: {
        trigger: '.footer',
        scroller: '.wrapper',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        // markers: true,
    },
});
