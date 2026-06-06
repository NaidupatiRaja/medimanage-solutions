// ========================================
// MOBILE MENU TOGGLE
// ========================================

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// ========================================
// MODAL FUNCTIONALITY
// ========================================

const contactModal = document.getElementById('contactModal');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');

// All CTA buttons that open the modal
const ctaButtons = [
    document.getElementById('navCTA'),
    document.getElementById('heroCTA'),
    document.getElementById('ctaButton')
];

// Open modal when any CTA button is clicked
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal when close button is clicked
modalClose.addEventListener('click', () => {
    contactModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the modal content
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        hospital: formData.get('hospital'),
        role: formData.get('role'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };
    
    // Log the form data (in a real application, this would be sent to a server)
    console.log('Form submitted:', data);
    
    // Show success message
    alert(`Thank you, ${data.name}! Your consultation request has been received. We'll contact you soon at ${data.email}.`);
    
    // Reset form
    contactForm.reset();
    
    // Close modal
    contactModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 102, 204, 0.12)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========================================
// SMOOTH SCROLL OFFSET FOR FIXED NAVBAR
// ========================================

const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        
        const element = document.querySelector(href);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const navHeight = navbar.offsetHeight;
            
            window.scrollTo({
                top: elementPosition - navHeight - 20,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards, step cards, and other animatable elements
document.querySelectorAll('.service-card, .step-card, .benefit-icon').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserverOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNum = entry.target.querySelector('.stat-num');
            const numText = statNum.textContent;
            
            // Extract number from text (handles formats like "2,450", "94%", "18+")
            const number = parseInt(numText.replace(/[^\d]/g, ''));
            
            if (!isNaN(number)) {
                animateCounter(statNum, number, 2000);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, statsObserverOptions);

// Observe all stats
document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// LEARN MORE BUTTON SCROLL
// ========================================

const learnMoreBtn = document.getElementById('learnMoreBtn');
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
        const howItWorks = document.getElementById('how-it-works');
        const elementPosition = howItWorks.getBoundingClientRect().top + window.scrollY;
        const navHeight = navbar.offsetHeight;
        
        window.scrollTo({
            top: elementPosition - navHeight - 20,
            behavior: 'smooth'
        });
    });
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ========================================
// FORM VALIDATION
// ========================================

const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#ff6b6b';
    } else {
        emailInput.style.borderColor = '';
    }
});

phoneInput.addEventListener('blur', () => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
        phoneInput.style.borderColor = '#ff6b6b';
    } else {
        phoneInput.style.borderColor = '';
    }
});

// ========================================
// HERO DASHBOARD ANIMATION
// ========================================

const chartBars = document.querySelectorAll('.chart-bar');
chartBars.forEach((bar, index) => {
    bar.style.animation = `fillChart 0.8s ease-out ${index * 0.1}s forwards`;
});

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fillChart {
        from {
            height: 0;
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// FEATURE DETECTION & POLYFILLS
// ========================================

// Smooth scroll polyfill check
if (!('scrollBehavior' in document.documentElement.style)) {
    console.warn('Smooth scroll not supported, using fallback');
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Throttle scroll events for better performance
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll event handling
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Add focus styles for keyboard navigation
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #0066cc';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// ========================================
// ANALYTICS & TRACKING (Optional)
// ========================================

// Track button clicks
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('CTA button clicked');
        // Send analytics event
    });
});

// Track form submissions
contactForm.addEventListener('submit', () => {
    console.log('Contact form submitted');
    // Send analytics event
});

console.log('MediManage Solutions website loaded successfully!');