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
    }

    // --- Dynamic Subtitle Typing Effect ---
    const subtitleElement = document.getElementById('dynamic-subtitle');
    const subtitleIcon = document.getElementById('subtitle-icon');

    if (subtitleElement && subtitleIcon) {
        const phrases = [
            { text: "Senior Data Engineer | 6+ Years | AI-First Mindset", icon: "fas fa-brain" },
            { text: "AI Engineer in progress — building with Amazon Bedrock & MCP.", icon: "fas fa-robot" },
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

    // --- Network Graph Particles ---
    const canvas = document.getElementById('matrix-canvas');
    const heroSection2 = document.querySelector('.hero-section');

    if (canvas && heroSection2) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let logicW = 0;
        let logicH = 0;
        let particles = [];
        let isHeroVisible = true;
        const mouse = { x: -9999, y: -9999 };

        const CONNECTION_DIST = 140;
        const MOUSE_REPEL_DIST = 110;
        const BASE_SPEED = 0.35;

        function resizeCanvas() {
            logicW = heroSection2.offsetWidth;
            logicH = heroSection2.offsetHeight;
            canvas.width = logicW * dpr;
            canvas.height = logicH * dpr;
            canvas.style.width = logicW + 'px';
            canvas.style.height = logicH + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initParticles();
        }

        function initParticles() {
            const count = logicW < 768 ? 40 : 85;
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * logicW,
                y: Math.random() * logicH,
                vx: (Math.random() - 0.5) * BASE_SPEED * 2,
                vy: (Math.random() - 0.5) * BASE_SPEED * 2,
                r: Math.random() * 1.5 + 1,
            }));
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        heroSection2.addEventListener('mousemove', (e) => {
            const rect = heroSection2.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        heroSection2.addEventListener('mouseleave', () => {
            mouse.x = -9999;
            mouse.y = -9999;
        });

        function drawNetwork() {
            if (!isHeroVisible) {
                requestAnimationFrame(drawNetwork);
                return;
            }

            ctx.clearRect(0, 0, logicW, logicH);

            // Update particles
            for (const p of particles) {
                // Mouse repulsion
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < MOUSE_REPEL_DIST && d > 0) {
                    const force = (MOUSE_REPEL_DIST - d) / MOUSE_REPEL_DIST * 0.4;
                    p.vx += (dx / d) * force;
                    p.vy += (dy / d) * force;
                }

                // Damping — drift back to base speed
                p.vx *= 0.98;
                p.vy *= 0.98;

                // Minimum drift so particles never fully stop
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed < BASE_SPEED * 0.3) {
                    p.vx += (Math.random() - 0.5) * 0.05;
                    p.vy += (Math.random() - 0.5) * 0.05;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Wrap edges (smoother than bouncing for network effect)
                if (p.x < -10) p.x = logicW + 10;
                if (p.x > logicW + 10) p.x = -10;
                if (p.y < -10) p.y = logicH + 10;
                if (p.y > logicH + 10) p.y = -10;
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < CONNECTION_DIST) {
                        const alpha = (1 - d / CONNECTION_DIST) * 0.6;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
                        ctx.lineWidth = alpha * 1.2;
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = '#00FFFF';
                ctx.fill();
            }

            requestAnimationFrame(drawNetwork);
        }

        requestAnimationFrame(drawNetwork);

        const heroObserver = new IntersectionObserver((entries) => {
            isHeroVisible = entries[0].isIntersecting;
        });
        heroObserver.observe(heroSection2);
    }

    // --- Scroll Reveal ---
    const sections = document.querySelectorAll('.section:not(.hero-section)');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => revealObserver.observe(section));

    // --- Keyboard Ambient Sound (MP3) ---
    const soundToggle = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    let isSoundPlaying = false;

    const ambientAudio = new Audio('media/keyboard_ambient.mp3');
    ambientAudio.loop = true;
    ambientAudio.volume = 0.3;

    function startAudio() {
        ambientAudio.play().then(() => {
            isSoundPlaying = true;
            soundIcon.className = 'fas fa-keyboard';
            soundToggle.classList.add('active');
        }).catch(() => {
            // Browser blocked autoplay — stay muted until user clicks
        });
    }

    // Try autoplay immediately
    startAudio();

    // If blocked, start on first user interaction anywhere on the page
    function onFirstInteraction() {
        if (isSoundPlaying) {
            // Already playing — clean up listeners
            document.removeEventListener('click', onFirstInteraction);
            document.removeEventListener('scroll', onFirstInteraction);
            document.removeEventListener('keydown', onFirstInteraction);
            return;
        }
        ambientAudio.play().then(() => {
            isSoundPlaying = true;
            soundIcon.className = 'fas fa-keyboard';
            soundToggle.classList.add('active');
            // Remove only after confirmed playing
            document.removeEventListener('click', onFirstInteraction);
            document.removeEventListener('scroll', onFirstInteraction);
            document.removeEventListener('keydown', onFirstInteraction);
        }).catch(() => {
            // Keep listeners — try again on next interaction
        });
    }
    document.addEventListener('click', onFirstInteraction);
    document.addEventListener('scroll', onFirstInteraction);
    document.addEventListener('keydown', onFirstInteraction);

    if (soundToggle) {
        soundToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent triggering onFirstInteraction
            if (isSoundPlaying) {
                ambientAudio.pause();
                isSoundPlaying = false;
            } else {
                ambientAudio.play();
                isSoundPlaying = true;
            }
            soundIcon.className = isSoundPlaying ? 'fas fa-keyboard' : 'fas fa-volume-mute';
            soundToggle.classList.toggle('active', isSoundPlaying);
        });
    }
});
