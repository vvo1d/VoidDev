// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.querySelector('.navbar-menu');

hamburger?.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

// Close menu on nav link click
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
    });
});

// Restaurants Slider
const restaurantsSlider = document.getElementById('restaurantsSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (restaurantsSlider && prevBtn && nextBtn) {
    const cardWidth = 280; // Приблизительная ширина карточки + gap
    const scrollAmount = cardWidth;

    prevBtn.addEventListener('click', () => {
        restaurantsSlider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        restaurantsSlider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Handle button visibility
    const updateButtonState = () => {
        const isAtStart = restaurantsSlider.scrollLeft <= 0;
        const isAtEnd = 
            restaurantsSlider.scrollLeft >= 
            restaurantsSlider.scrollWidth - restaurantsSlider.clientWidth - 10;

        prevBtn.style.opacity = isAtStart ? '0.5' : '1';
        prevBtn.style.cursor = isAtStart ? 'not-allowed' : 'pointer';
        nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
        nextBtn.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
    };

    restaurantsSlider.addEventListener('scroll', updateButtonState);
    window.addEventListener('resize', updateButtonState);
    updateButtonState();
}

// Specialities Slider
const specialitiesSlider = document.getElementById('specialitiesSlider');
const specialitiesPrevBtn = document.getElementById('specialitiesPrevBtn');
const specialitiesNextBtn = document.getElementById('specialitiesNextBtn');

if (specialitiesSlider && specialitiesPrevBtn && specialitiesNextBtn) {
    const cardWidth = 160; // Приблизительная ширина карточки + gap
    const scrollAmount = cardWidth;

    specialitiesPrevBtn.addEventListener('click', () => {
        specialitiesSlider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    specialitiesNextBtn.addEventListener('click', () => {
        specialitiesSlider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Handle button visibility
    const updateSpecialitiesButtonState = () => {
        const isAtStart = specialitiesSlider.scrollLeft <= 0;
        const isAtEnd = 
            specialitiesSlider.scrollLeft >= 
            specialitiesSlider.scrollWidth - specialitiesSlider.clientWidth - 10;

        specialitiesPrevBtn.style.opacity = isAtStart ? '0.5' : '1';
        specialitiesPrevBtn.style.cursor = isAtStart ? 'not-allowed' : 'pointer';
        specialitiesNextBtn.style.opacity = isAtEnd ? '0.5' : '1';
        specialitiesNextBtn.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
    };

    specialitiesSlider.addEventListener('scroll', updateSpecialitiesButtonState);
    window.addEventListener('resize', updateSpecialitiesButtonState);
    updateSpecialitiesButtonState();
}





