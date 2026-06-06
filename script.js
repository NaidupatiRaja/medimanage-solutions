// ========================================
// MOBILE MENU TOGGLE
// ========================================

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 2px 8px rgba(31, 53, 104, 0.12)';
    } else {
        navbar.style.boxShadow = 'none';
    }
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

// Observe all service cards and reason cards
document.querySelectorAll('.service-card, .reason-card, .process-step, .impact-card').forEach(element => {
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

const statsObserverOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNum = entry.target.querySelector('.stat-number');
            const numText = statNum.textContent;
            const number = parseInt(numText.replace(/[^\d]/g, ''));
            
            if (!isNaN(number)) {
                animateCounter(statNum, number, 2000);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, statsObserverOptions);

document.querySelectorAll('.stat-box').forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// FORM SUBMISSION
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            hospital: formData.get('hospital'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };
        
        // Log form data (in production, send to backend)
        console.log('Form submitted:', data);
        
        // Show success message
        alert(`Thank you ${data.name}! Your inquiry has been received. We'll contact you soon at ${data.phone}.`);
        
        // Reset form
        contactForm.reset();
    });
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #1F3568';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

console.log('MediManage Solutions website initialized successfully!');
