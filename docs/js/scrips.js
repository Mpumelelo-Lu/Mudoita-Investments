// Loading Spinner
window.addEventListener('load', function() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        setTimeout(function() {
            spinner.classList.add('hidden');
        }, 500);
    }
});

// Show spinner on page navigation
document.addEventListener('DOMContentLoaded', function() {
    // Highlight active nav link based on current page
    const path = window.location.pathname.toLowerCase();
    let active = 'home';
    if (path.endsWith('contactus.html')) {
        active = 'contact';
    } else if (path.endsWith('projects.html')) {
        active = 'projects';
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        const isHome = active === 'home' && (href === '#' || href.endsWith('index.html'));
        const isProjects = active === 'projects' && href.endsWith('projects.html');
        const isContact = active === 'contact' && href.endsWith('contactus.html');
        link.classList.toggle('active', isHome || isProjects || isContact);
    });

    document.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                const spinner = document.getElementById('loading-spinner');
                if (spinner) {
                    spinner.classList.remove('hidden');
                }
            }
        });
    });
});

// Typing animation
const words = ['excavation', 'foundation', 'structure', 'concrete', 'steel', 'quality'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.getElementById('typingText');

if (typingText) {
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
}

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
    const titleEl = document.getElementById('heroSectionTitle');
    const subtitleEl = document.getElementById('heroSectionSubtitle');
    if (titleEl && subtitleEl) {
        // Add smooth transition if not already set
        if (!titleEl.style.transition) {
            titleEl.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
            subtitleEl.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
        }
        
        // Fade out with slide
        titleEl.style.opacity = '0';
        titleEl.style.transform = 'translateY(-20px)';
        subtitleEl.style.opacity = '0';
        subtitleEl.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            // Change text
            titleEl.textContent = heroTitles[heroIndex];
            subtitleEl.textContent = heroSubtitles[heroIndex];
            
            // Reset position for fade in
            titleEl.style.transform = 'translateY(20px)';
            subtitleEl.style.transform = 'translateY(20px)';
            
            // Trigger fade in with slide
            setTimeout(() => {
                titleEl.style.opacity = '1';
                titleEl.style.transform = 'translateY(0)';
                subtitleEl.style.opacity = '1';
                subtitleEl.style.transform = 'translateY(0)';
            }, 50);
            
            // Next index
            heroIndex = (heroIndex + 1) % heroTitles.length;
        }, 600);
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

// Foundation Cards Navigation
const cardDots = document.querySelectorAll('.card-dot');

if (cardDots.length) {
    cardDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all dots
            cardDots.forEach(d => d.classList.remove('active'));
            // Add active class to clicked dot
            dot.classList.add('active');
            
            // Scroll to corresponding card
            const cards = document.querySelectorAll('.company-card');
            if (cards[index]) {
                cards[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        });
    });

    // Update active dot on scroll
    const cardsContainer = document.querySelector('.cards-wrapper');
    if (cardsContainer) {
        let scrollTimeout;
        cardsContainer.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollLeft = cardsContainer.scrollLeft;
                const cards = Array.from(cardsContainer.querySelectorAll('.company-card'));
                let activeIndex = 0;
                
                cards.forEach((card, index) => {
                    const cardLeft = card.offsetLeft - cardsContainer.offsetLeft;
                    const cardCenter = cardLeft + (card.offsetWidth / 2);
                    const scrollCenter = scrollLeft + (cardsContainer.offsetWidth / 2);
                    
                    if (Math.abs(cardCenter - scrollCenter) < card.offsetWidth / 2) {
                        activeIndex = index;
                    }
                });
                
                cardDots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === activeIndex);
                });
            }, 100);
        });
    }
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

// Mobile Navigation Toggle (supports multiple nav instances)
document.addEventListener('DOMContentLoaded', function() {
    const navSections = document.querySelectorAll('.nav-oval');
    
    navSections.forEach(nav => {
        const navLinks = nav.querySelector('.nav-links');
        const menuBtn = nav.querySelector('.menu-btn');

        if (!navLinks || !menuBtn) {
            return;
        }

        const closeMenu = () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        };

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target)) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                closeMenu();
            }
        });
    });
});

// ====== SERVICES SLIDER ======
const servicesSlider = document.getElementById('servicesSlider');
const prevServiceBtn = document.getElementById('prevService');
const nextServiceBtn = document.getElementById('nextService');
const servicesProgressFill = document.getElementById('progressFill');
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
        if (servicesProgressFill) {
            const progress = ((currentSlide + 1) / totalSlides) * 100;
            servicesProgressFill.style.width = progress + '%';
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
            if (servicesProgressFill) {
                const progress = ((currentSlide + 1) / totalSlides) * 100;
                servicesProgressFill.style.width = progress + '%';
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

// Hero section smooth animations
window.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.hero h1');
    const subtitle = document.querySelector('.hero-subtitle');
    const actions = document.querySelector('.hero-actions');
    const trustIndicators = document.querySelector('.trust-indicators');
    
    if (title) {
        title.style.opacity = 0;
        title.style.transform = 'translateY(40px)';
        setTimeout(function() {
            title.style.transition = 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)';
            title.style.opacity = 1;
            title.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (subtitle) {
        subtitle.style.opacity = 0;
        subtitle.style.transform = 'translateY(40px)';
        setTimeout(function() {
            subtitle.style.transition = 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)';
            subtitle.style.opacity = 1;
            subtitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (actions) {
        actions.style.opacity = 0;
        actions.style.transform = 'translateY(40px)';
        setTimeout(function() {
            actions.style.transition = 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)';
            actions.style.opacity = 1;
            actions.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (trustIndicators) {
        trustIndicators.style.opacity = 0;
        trustIndicators.style.transform = 'translateY(40px)';
        setTimeout(function() {
            trustIndicators.style.transition = 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)';
            trustIndicators.style.opacity = 1;
            trustIndicators.style.transform = 'translateY(0)';
        }, 400);
    }
});