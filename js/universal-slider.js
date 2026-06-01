document.querySelectorAll('.universal-slider').forEach(slider => {
    const inner = slider.querySelector('.slides-inner');
    const images = inner.querySelectorAll('img');
    
    if (images.length === 0) return;

    // Klonování pro infinity efekt
    const firstClone = images[0].cloneNode(true);
    const lastClone = images[images.length - 1].cloneNode(true);
    inner.appendChild(firstClone);
    inner.insertBefore(lastClone, images[0]);

    // Nastavení startu
    let index = 1;
    inner.style.transition = "none";
    inner.style.transform = `translate3d(-${index * 100}%, 0, 0)`;

    slider.dataset.currentIndex = index;
    slider.dataset.isMoving = "false";
});

function moveSlide(button, direction) {
    const slider = button.closest('.universal-slider');
    const inner = slider.querySelector('.slides-inner');
    const slides = inner.querySelectorAll('img');
    
    if (slider.dataset.isMoving === "true") return;

    let index = parseInt(slider.dataset.currentIndex);
    index += direction;

    slider.dataset.isMoving = "true";
    slider.dataset.currentIndex = index;

    inner.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    inner.style.transform = `translate3d(-${index * 100}%, 0, 0)`;

    inner.addEventListener('transitionend', () => {
        slider.dataset.isMoving = "false";
        
        // Nekonečná smyčka bez cuknutí
        if (index >= slides.length - 1) {
            index = 1;
            inner.style.transition = "none";
            inner.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
        } else if (index <= 0) {
            index = slides.length - 2;
            inner.style.transition = "none";
            inner.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
        }
        slider.dataset.currentIndex = index;
    }, { once: true });
}