/* ================================================================
   SKILLFORGE AI — Global JavaScript
   Handles: Preloader, Cursor, Navbar, Scroll, Reveals, Counters
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== PRELOADER ====================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hide');
            }, 1800);
        });
        // Fallback: hide after 4 seconds max
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 4000);
    }

    // ==================== CUSTOM CURSOR ====================
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = (mouseX - 4) + 'px';
            cursorDot.style.top = (mouseY - 4) + 'px';
        });

        // Smooth ring follow
        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = (ringX - 20) + 'px';
            cursorRing.style.top = (ringY - 20) + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover effect on interactive elements
        const hoverElements = document.querySelectorAll(
            'a, button, .sf-btn, .sf-card, .team-card, input, textarea, .navbar-toggler'
        );
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });
    }

    // ==================== NAVBAR SCROLL ====================
    const navbar = document.getElementById('sfNavbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    function handleScroll() {
        const scrolled = window.scrollY > 80;
        if (navbar) navbar.classList.toggle('scrolled', scrolled);
        if (scrollTopBtn) scrollTopBtn.classList.toggle('show', window.scrollY > 500);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on load

    // Scroll to top
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==================== MOBILE NAV CLOSE ====================
    const navLinks = document.querySelectorAll('.sf-nav-link');
    const navCollapse = document.getElementById('sfNavCollapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapse && navCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    // ==================== SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==================== COUNTER ANIMATION ====================
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 16);

                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

    // ==================== PROGRESS BAR ANIMATION ====================
    const progressBars = document.querySelectorAll('.sf-progress-bar');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        bar.style.width = '0%';
        progressObserver.observe(bar);
    });

    // ==================== PARTICLES ============== ==========
    const particleFields = document.querySelectorAll('.particle-field');
    particleFields.forEach(field => {
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = (Math.random() * 6) + 's';
            p.style.animationDuration = (4 + Math.random() * 4) + 's';

            // Random colors
            const colors = ['var(--primary)', 'var(--cyan)', 'var(--orange)'];
            p.style.background = colors[Math.floor(Math.random() * 3)];
            field.appendChild(p);
        }
    });

    // ==================== TYPING EFFECT ====================
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(el => {
        const texts = JSON.parse(el.getAttribute('data-texts'));
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];
            if (isDeleting) {
                el.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                el.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentText.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = 500;
            }

            setTimeout(type, speed);
        }
        type();
    });

});