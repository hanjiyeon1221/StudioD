gsap.ticker.add(time => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* index */
// 인트로 section1 부분
gsap.from('.sc-intro .healine span', {
    yPercent: 100,
});
gsap.from('.sc-intro .title span', {
    yPercent: 100,
    stagger: 0.1,
});
let introTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-intro',
        scroller: '.wrapper',
        start: '0% 0%',
        // end: '100% 100%',
        // scrub: 1,
        // markers: true,
        onEnter: function () {
            // intro 페이지네이션 적용
            $('.page-box').removeClass('on').eq(0).addClass('on');
        },
    },
});
introTl.from('.sc-intro .quote .linehidden span', {
    yPercent: 100,
    stagger: 0.1,
});

// service 페이지네이션 적용
ScrollTrigger.create({
    trigger: '.sc-service',
    scroller: '.wrapper',
    start: '0% 70%',
    onEnter: function () {
        $('.page-box').removeClass('on').eq(1).addClass('on');
    },
    onLeaveBack: function () {
        $('.page-box').removeClass('on').eq(0).addClass('on');
    },
});
// 서비스 txt-box 움직임 (최소601px부터~)
ScrollTrigger.matchMedia({
    '(min-width: 601px)': function () {
        let txtTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.sc-service',
                scroller: '.wrapper',
                stagger: 0.1,
                start: '0% 30%',
                end: '100% 70%',
                scrub: 1,
            },
        });
        txtTl.to('.sc-service .txt-box', {
            yPercent: -20,
            ease: 'none',
        });
    },
});

// project 페이지네이션 적용
ScrollTrigger.create({
    trigger: '.sc-project',
    scroller: '.wrapper',
    start: '0% 70%',
    onEnter: function () {
        $('.page-box').removeClass('on').eq(2).addClass('on');
    },
    onLeaveBack: function () {
        $('.page-box').removeClass('on').eq(1).addClass('on');
    },
});
// 프로젝트 섹션 상단 움직임
gsap.to('.sc-service', {
    scrollTrigger: {
        trigger: '.sc-project',
        scroller: '.wrapper',
        start: '0% 100%',
        end: '100% 0%',
        // markers: true,
        scrub: 0,
    },
    '--bg': 'rgba(0, 0, 0, 1)',
    yPercent: 120,
    ease: 'none',
});

// 프로젝트 내부 이미지 움직임 조절
$('.sc-project .prj-item').each(function (index, el) {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            scroller: '.wrapper',
            start: '0% 30%',
            end: '200% 100%',
            scrub: 1,
            // markers: true,
        },
        backgroundPosition: '0% 50%',
        ease: 'none',
    });
});

// all프로젝트 페이지네이션 적용 & headline 모션
let allprjTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-allprj',
        scroller: '.wrapper',
        start: '0% 70%',
        onEnter: function () {
            $('.page-box').removeClass('on').eq(3).addClass('on');
        },
        onLeaveBack: function () {
            $('.page-box').removeClass('on').eq(2).addClass('on');
        },
    },
});
allprjTl.from('.sc-allprj .linehidden span', {
    yPercent: 100,
    stagger: 0.1,
});
// all프로젝트 섹션 상단 움직임
gsap.to('.sc-project', {
    scrollTrigger: {
        trigger: '.sc-allprj',
        scroller: '.wrapper',
        start: '0% 100%',
        end: '100% 0%',
        // markers: true,
        scrub: 0,
    },
    '--bg': 'rgba(0, 0, 0, .5)',
    yPercent: 20,
    ease: 'none',
});

// about 페이지네이션 적용 & headline 모션
let aboutTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-about',
        scroller: '.wrapper',
        start: '0% 70%',
        onEnter: function () {
            $('.page-box').removeClass('on').eq(4).addClass('on');
        },
        onLeaveBack: function () {
            $('.page-box').removeClass('on').eq(3).addClass('on');
        },
    },
});
aboutTl.from('.sc-about .linehidden span', {
    yPercent: 100,
    stagger: 0.1,
});
// allprj & about 배경색상 변경
gsap.to('.sc-allprj, .sc-about', {
    scrollTrigger: {
        trigger: '.sc-allprj',
        scroller: '.wrapper',
        start: '30% 0%',
        end: '100% 100%',
        // markers: true,
        scrub: 1.5,
    },
    backgroundColor: 'rgb(242, 237, 228)',
});
