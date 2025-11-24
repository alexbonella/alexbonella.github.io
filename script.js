document.addEventListener('DOMContentLoaded', () => {
    // --- Wave Animation for Title ---
    const titleElement = document.getElementById('wave-title');
    const text = "Senior Data Engineer";

    // Split text into spans for wave effect
    titleElement.innerHTML = text.split('').map((char, index) => {
        if (char === ' ') return '<span>&nbsp;</span>';
        // Add delay based on index for wave effect
        return `<span style="animation-delay: ${index * 0.1}s">${char}</span>`;
    }).join('');

    // Colorize "Data Engineer"
    const spans = titleElement.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (index >= 7) { // "Senior " is 7 chars
            span.classList.add('accent');
        }
    });

    // --- Floating Counters Animation ---
    const counters = document.querySelectorAll('.count');

    const runCounterAnimation = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds animation
        const increment = target / (duration / 16); // 60fps

        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    };

    counters.forEach(counter => {
        // Initial run
        runCounterAnimation(counter);

        // Loop every 5 seconds (2s animation + 3s pause)
        setInterval(() => {
            runCounterAnimation(counter);
        }, 3000);
    });

    // --- Courses Circle Wandering Animation ---
    const coursesCircle = document.querySelector('.center-counter');
    const heroSection = document.querySelector('.hero-section');

    if (coursesCircle && heroSection) {
        const moveCircle = () => {
            // Get dimensions
            const heroRect = heroSection.getBoundingClientRect();
            const circleRect = coursesCircle.getBoundingClientRect();

            // Calculate safe boundaries (padding of 50px)
            const maxX = heroRect.width - circleRect.width - 50;
            const maxY = heroRect.height - circleRect.height - 50;
            const minX = 50;
            const minY = 50;

            // Random position
            const randomX = Math.random() * (maxX - minX) + minX;
            const randomY = Math.random() * (maxY - minY) + minY;

            // Apply new position
            // We use left/top instead of transform translate to avoid conflict with centering transform
            // But since we have transition on 'all', we can just update left/top
            coursesCircle.style.left = `${randomX}px`;
            coursesCircle.style.top = `${randomY}px`;
            coursesCircle.style.transform = 'none'; // Remove centering transform
        };

        // Start moving
        // Initial move
        setTimeout(moveCircle, 100);

        // Move every 6 seconds (matches CSS transition time)
        setInterval(moveCircle, 6000);
        // Move every 6 seconds (matches CSS transition time)
        setInterval(moveCircle, 6000);
    }

    // --- Dynamic Subtitle Typing Effect ---
    const subtitleElement = document.getElementById('dynamic-subtitle');
    const subtitleIcon = document.getElementById('subtitle-icon');

    if (subtitleElement && subtitleIcon) {
        const phrases = [
            { text: "Udemy instructor with 2 data courses and over 1,900 students.", icon: "fas fa-chalkboard-teacher" },
            { text: "AWS Community Builder in Data for 4+ years.", icon: "fab fa-aws" },
            { text: "Technical writer with 18+ published posts and over 40K views.", icon: "fas fa-pen-fancy" }
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 50; // Typing speed

        function typeSubtitle() {
            const currentPhrase = phrases[phraseIndex];

            // Update Icon
            subtitleIcon.className = `subtitle-icon ${currentPhrase.icon}`;

            if (isDeleting) {
                // Deleting
                subtitleElement.textContent = currentPhrase.text.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 30; // Faster deleting
            } else {
                // Typing
                subtitleElement.textContent = currentPhrase.text.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 50; // Normal typing
            }

            if (!isDeleting && charIndex === currentPhrase.text.length) {
                // Finished typing, pause before deleting
                isDeleting = true;
                typeSpeed = 2000; // 2 seconds pause
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting, switch to next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before typing next
            }

            setTimeout(typeSubtitle, typeSpeed);
        }

        // Start typing
        setTimeout(typeSubtitle, 1000);
    }
});
