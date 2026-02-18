// ===================================
// DARK LUXURY CAMPAIGN - VANILLA JS
// ===================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollReveal();
    initStickyNav();
    initFloatingButton();
    initSmoothScroll();
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll with throttle
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                revealOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ===================================
// STICKY NAVIGATION
// ===================================

function initStickyNav() {
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(6, 6, 11, 0.95)';
            nav.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.4)';
        } else {
            nav.style.background = 'rgba(6, 6, 11, 0.85)';
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ===================================
// FLOATING CALL BUTTON
// ===================================

function initFloatingButton() {
    const floatingBtn = document.getElementById('floatingCallBtn');
    
    if (floatingBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                floatingBtn.style.opacity = '1';
                floatingBtn.style.transform = 'translateY(0)';
            } else {
                floatingBtn.style.opacity = '0';
                floatingBtn.style.transform = 'translateY(20px)';
            }
        });
        
        // Initial state
        floatingBtn.style.opacity = '0';
        floatingBtn.style.transform = 'translateY(20px)';
        floatingBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.main-nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===================================
// FAQ ACCORDION
// ===================================

function toggleFaq(button) {
    const faqItem = button.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = '0';
    });
    
    // Open clicked item if it wasn't already active
    if (!isActive) {
        faqItem.classList.add('active');
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
    }
}

// ===================================
// CALL MODAL
// ===================================

function openCallModal() {
    const modal = document.getElementById('callModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCallModal(event) {
    const modal = document.getElementById('callModal');
    if (modal && (!event || event.target === modal)) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCallModal();
    }
});

// ===================================
// FORM VALIDATION (for contact page)
// ===================================

function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            showError(input, 'This field is required');
        } else {
            input.classList.remove('error');
            hideError(input);
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
                showError(input, 'Please enter a valid email address');
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value.trim()) {
            const phoneRegex = /^[\d\s\-\(\)\+]+$/;
            if (!phoneRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
                showError(input, 'Please enter a valid phone number');
            }
        }
    });
    
    return isValid;
}

function showError(input, message) {
    let errorDiv = input.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '4px';
}

function hideError(input) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.remove();
    }
}

// Real-time input validation
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.classList.add('error');
                    showError(input, 'This field is required');
                } else {
                    input.classList.remove('error');
                    hideError(input);
                }
            });
            
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.classList.remove('error');
                    hideError(input);
                }
            });
        });
    });
});

// ===================================
// PAGE TRANSITION EFFECTS
// ===================================

// Fade in page on load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// PERFORMANCE: LAZY LOAD IMAGES
// ===================================

function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', initLazyLoad);
}

// ===================================
// ACCESSIBILITY: FOCUS MANAGEMENT
// ===================================

// Add visible focus styles for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format phone number
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    const match = value.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
        input.value = !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}`;
    }
}

// Track user interactions (for analytics - can be connected to GA4)
function trackEvent(category, action, label) {
    // This is a placeholder for analytics tracking
    console.log('Event tracked:', { category, action, label });
    
    // Example: Connect to Google Analytics 4
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track CTA clicks
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.primary-cta, .secondary-cta, .mega-cta, .floating-call-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('CTA', 'click', button.textContent.trim());
        });
    });
});
