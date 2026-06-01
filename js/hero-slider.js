window.addEventListener('load', () => {
    const track = document.querySelector('.hero-slider-track');
    const slides = Array.from(document.querySelectorAll('.hero-slide'));
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const sliderSection = document.getElementById('hero-slider');

    if (!track || slides.length === 0) return;

    let counter = 1;
    let isMoving = false;
    let autoplayTimer = null;
    const intervalTime = 3000;

    // 1. Klonování (Infinity setup)
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    const updateSize = () => sliderSection.clientWidth;
    let size = updateSize();
    track.style.transform = `translateX(${-size * counter}px)`;

    // 2. Funkce pro pohyb
    const move = (direction) => {
        if (isMoving) return;
        isMoving = true;
        
        size = updateSize();
        track.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        
        counter = (direction === 'next') ? counter + 1 : counter - 1;
        track.style.transform = `translateX(${-size * counter}px)`;
    };

    // 3. Autoplay logika (rekurzivní a stabilní)
    const startAutoplay = () => {
        stopAutoplay();
        autoplayTimer = setTimeout(() => {
            move('next');
            startAutoplay(); // naplánuje další slide nezávisle na transitionend
        }, intervalTime);
    };

    const stopAutoplay = () => {
        if (autoplayTimer) {
            clearTimeout(autoplayTimer);
            autoplayTimer = null;
        }
    };

    // 4. Infinity Reset po animaci
    track.addEventListener('transitionend', () => {
        isMoving = false;
        const allSlides = document.querySelectorAll('.hero-slide');

        if (counter >= allSlides.length - 1) {
            track.style.transition = 'none';
            counter = 1;
            track.style.transform = `translateX(${-size * counter}px)`;
        }

        if (counter <= 0) {
            track.style.transition = 'none';
            counter = allSlides.length - 2;
            track.style.transform = `translateX(${-size * counter}px)`;
        }
    });

    // Eventy pro tlačítka
    nextBtn.addEventListener('click', () => {
        stopAutoplay();
        move('next');
        startAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoplay();
        move('prev');
        startAutoplay();
    });

    // Inteligentní pauza
    sliderSection.addEventListener('mouseenter', stopAutoplay);
    sliderSection.addEventListener('mouseleave', startAutoplay);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    // Responzivita
    window.addEventListener('resize', () => {
        size = updateSize();
        track.style.transition = 'none';
        track.style.transform = `translateX(${-size * counter}px)`;
    });

    // Start
    startAutoplay();
});