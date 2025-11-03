// Typing animation
const words = ['excavation', 'foundation', 'structure', 'concrete', 'steel', 'quality'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.getElementById('typingText');

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, 100);
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else {
            setTimeout(type, 150);
        }
    }
}

type();

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// === Rotating Hero Section Sentences ===
const heroTitles = [
    'Building Trust Through Experience',
    'Delivering Quality Civil Engineering',
    'Innovative Solutions for Every Project',
    'Your Vision, Our Mission',
    'Exceeding Expectations Since 2016'
];
const heroSubtitles = [
    'Professional civil engineering and construction services since 2016',
    'Expertise in commercial and residential construction',
    'Modern techniques, reliable results',
    'Partnering for your success',
    'Trusted by leading organizations'
];
let heroIndex = 0;
function swapHeroSection() {
    const titleEl = document.getElementById('heroTitle');
    const subtitleEl = document.getElementById('heroSubtitle');
    if (titleEl && subtitleEl) {
        // Fade out
        titleEl.style.opacity = 0;
        subtitleEl.style.opacity = 0;
        setTimeout(() => {
            // Change text
            titleEl.textContent = heroTitles[heroIndex];
            subtitleEl.textContent = heroSubtitles[heroIndex];
            // Fade in
            titleEl.style.opacity = 1;
            subtitleEl.style.opacity = 1;
            // Next index
            heroIndex = (heroIndex + 1) % heroTitles.length;
        }, 400);
    }
}
setInterval(swapHeroSection, 10000);
swapHeroSection();

// Swipeable Cards Navigation
const cardsWrapper = document.getElementById('cardsWrapper');
const navDots = document.querySelectorAll('.nav-dot');

if (cardsWrapper && navDots.length) {
    // Click navigation for dots
    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(dot.dataset.index);
            const cards = cardsWrapper.querySelectorAll('.company-card');
            const card = cards[index];
            if (card) {
                const cardLeft = card.offsetLeft;
                const gap = parseFloat(getComputedStyle(cardsWrapper).gap) || 32;
                cardsWrapper.scrollTo({
                    left: cardLeft - gap,
                    behavior: 'smooth'
                });
            }
            
            navDots.forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });
        });
    });

    // Update active dot on scroll
    let scrollTimeout;
    cardsWrapper.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollLeft = cardsWrapper.scrollLeft;
            const cards = Array.from(cardsWrapper.querySelectorAll('.company-card'));
            let activeIndex = 0;
            
            cards.forEach((card, index) => {
                const cardLeft = card.offsetLeft - cardsWrapper.offsetLeft;
                const cardCenter = cardLeft + (card.offsetWidth / 2);
                const scrollCenter = scrollLeft + (cardsWrapper.offsetWidth / 2);
                
                if (Math.abs(cardCenter - scrollCenter) < card.offsetWidth / 2) {
                    activeIndex = index;
                }
            });
            
            navDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === activeIndex);
            });
        }, 100);
    });
}

// Core Values Tab Switching
const valueTabs = document.querySelectorAll('.value-tab');
const valueCards = document.querySelectorAll('.value-card');

if (valueTabs.length && valueCards.length) {
    valueTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetValue = tab.dataset.value;
            
            // Update active tab
            valueTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active card
            valueCards.forEach(card => {
                card.classList.remove('active');
                if (card.id === targetValue) {
                    card.classList.add('active');
                }
            });
        });
    });
}

// Count-up animation for objective numbers
function animateCountUp(element, target, duration = 1200) {
    let start = 0;
    const startTime = performance.now();
    
    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);
        element.textContent = value < target ? String(value).padStart(2, '0') : String(target).padStart(2, '0');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

const objectivesSection = document.querySelector('.objectives-container');
const objectiveNumbers = document.querySelectorAll('.objective-number');

if (objectivesSection && objectiveNumbers.length) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                objectiveNumbers.forEach(num => {
                    const target = parseInt(num.textContent, 10);
                    animateCountUp(num, target);
                });
                obs.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(objectivesSection);
}

// Mobile Navigation Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
    
    // Close menu when clicking a link
    const navLinksItems = navLinks.querySelectorAll('.nav-link');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
}

// ====== SERVICES SLIDER ======
const servicesSlider = document.getElementById('servicesSlider');
const prevServiceBtn = document.getElementById('prevService');
const nextServiceBtn = document.getElementById('nextService');
const progressFill = document.getElementById('progressFill');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');

if (servicesSlider) {
    const serviceCards = servicesSlider.querySelectorAll('.service-card');
    const totalSlides = serviceCards.length;
    let currentSlide = 0;
    
    // Set total slides
    if (totalSlidesSpan) {
        totalSlidesSpan.textContent = totalSlides;
    }
    
    // Update slider display
    function updateSlider() {
        const cardWidth = serviceCards[0].offsetWidth;
        const gap = 32; // 2rem gap
        const scrollPosition = currentSlide * (cardWidth + gap);
        
        servicesSlider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Update progress bar
        if (progressFill) {
            const progress = ((currentSlide + 1) / totalSlides) * 100;
            progressFill.style.width = progress + '%';
        }
        
        // Update counter
        if (currentSlideSpan) {
            currentSlideSpan.textContent = currentSlide + 1;
        }
    }
    
    // Next button
    if (nextServiceBtn) {
        nextServiceBtn.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSlider();
            }
        });
    }
    
    // Previous button
    if (prevServiceBtn) {
        prevServiceBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });
    }
    
    // Update on manual scroll
    let scrollTimeout;
    servicesSlider.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const cardWidth = serviceCards[0].offsetWidth;
            const gap = 32;
            const scrollLeft = servicesSlider.scrollLeft;
            currentSlide = Math.round(scrollLeft / (cardWidth + gap));
            
            // Update progress bar
            if (progressFill) {
                const progress = ((currentSlide + 1) / totalSlides) * 100;
                progressFill.style.width = progress + '%';
            }
            
            // Update counter
            if (currentSlideSpan) {
                currentSlideSpan.textContent = currentSlide + 1;
            }
        }, 150);
    });
    
    // Initialize
    updateSlider();
    
    // Update on window resize
    window.addEventListener('resize', () => {
        updateSlider();
    });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});