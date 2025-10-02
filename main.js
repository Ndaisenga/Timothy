// JS for KIU Campaign Website

document.addEventListener('DOMContentLoaded', function () {
    // Sticky nav highlight
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (window.location.pathname.endsWith(link.getAttribute('href'))) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Dark/Light mode toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
        // Load theme preference
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    // Carousel JS (Home)
    const carouselImgs = document.querySelectorAll('.carousel-img');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    let carouselIdx = 0;
    function showCarousel(idx) {
        carouselImgs.forEach((img, i) => img.classList.toggle('active', i === idx));
        carouselDots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    }
    if (carouselImgs.length) {
        setInterval(() => {
            carouselIdx = (carouselIdx + 1) % carouselImgs.length;
            showCarousel(carouselIdx);
        }, 2600);
        carouselDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                carouselIdx = i;
                showCarousel(carouselIdx);
            });
        });
    }

    // Scroll-down arrow animation (Home)
    const scrollArrow = document.querySelector('.scroll-down');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' });
        });
    }

    // Accordion (About)
    document.querySelectorAll('.accordion-button').forEach(btn => {
        btn.addEventListener('click', function () {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            document.querySelectorAll('.accordion-button').forEach(b => b.setAttribute('aria-expanded', 'false'));
            document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
            if (!expanded) {
                btn.setAttribute('aria-expanded', 'true');
                btn.nextElementSibling.classList.add('open');
            }
        });
    });

    // Programs filter
    const facultySelect = document.getElementById('faculty-select');
    const programCards = document.querySelectorAll('.program-card');
    if (facultySelect) {
        facultySelect.addEventListener('change', function () {
            const val = facultySelect.value;
            programCards.forEach(card => {
                if (val === 'all' || card.dataset.faculty === val) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Animated progress bars and counters (Goals)
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const fill = bar.querySelector('.progress-fill');
        const percent = bar.dataset.progress;
        setTimeout(() => {
            fill.style.width = percent + '%';
        }, 350);
    });

    document.querySelectorAll('.goal-counter').forEach(counter => {
        const target = parseInt(counter.dataset.target, 10);
        let value = 0;
        const speed = Math.ceil(target / 40);
        function updateCounter() {
            value += speed;
            if (value >= target) value = target;
            counter.textContent = value;
            if (value < target) requestAnimationFrame(updateCounter);
        }
        updateCounter();
    });

    // Modal popups (News & Events)
    document.querySelectorAll('.event-more-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const modalId = btn.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) modal.classList.add('open');
        });
    });
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            btn.closest('.modal').classList.remove('open');
        });
    });
    window.addEventListener('click', function (e) {
        document.querySelectorAll('.modal.open').forEach(modal => {
            if (e.target === modal) modal.classList.remove('open');
        });
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;
            contactForm.querySelectorAll('.form-group').forEach(group => {
                const input = group.querySelector('input, textarea');
                const errorMsg = group.querySelector('.error-msg');
                if (!input.value.trim()) {
                    errorMsg.textContent = 'This field is required.';
                    valid = false;
                } else if (input.type === 'email' && !input.value.match(/^[\w\.-]+@[\w\.-]+\.\w+$/)) {
                    errorMsg.textContent = 'Please enter a valid email.';
                    valid = false;
                } else {
                    errorMsg.textContent = '';
                }
            });
            if (valid) {
                contactForm.reset();
                alert('Thank you for contacting us!');
            }
        });
    }
});