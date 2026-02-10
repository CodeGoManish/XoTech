// Main JavaScript for NexoraTech Website
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 XoTech website loaded successfully');
    
    // ==================== THEME TOGGLE ====================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('nexoratech_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                localStorage.setItem('nexoratech_theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                localStorage.setItem('nexoratech_theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
            
            // Add transition effect
            body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 500);
        });
    }
    
    // ==================== MOBILE MENU ====================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ==================== ANIMATIONS ====================
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .service-card, .testimonial, .team-member');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                setTimeout(() => {
                    element.classList.add('animated');
                }, index * 100);
            }
        });
    };
    
    // Initialize animations
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .testimonial, .team-member');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Trigger animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // ==================== HEADER SCROLL EFFECT ====================
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            // Don't intercept if it's a modal trigger
            if (href === '#loginModal' || href === '#signupModal') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuBtn) {
                        const icon = mobileMenuBtn.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==================== CONTACT FORM ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Simulate API call (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                // Log to console (for demo)
                console.log('Contact Form Submitted:', { name, email, message });
                
            } catch (error) {
                showNotification('Something went wrong. Please try again.', 'error');
                console.error('Contact form error:', error);
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // ==================== NOTIFICATION SYSTEM ====================
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Set icon based on type
        const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
        const bgColor = type === 'success' ? '#10B981' : '#EF4444';
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${icon}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                    max-width: 400px;
                    animation: slideInRight 0.3s ease;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .notification-success {
                    background: rgba(16, 185, 129, 0.9);
                    color: white;
                }
                
                .notification-error {
                    background: rgba(239, 68, 68, 0.9);
                    color: white;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                
                .notification-close {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 0.9rem;
                    padding: 4px 8px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s ease;
                }
                
                .notification-close:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Add to body
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            clearTimeout(autoRemove);
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
    
    // ==================== COUNTER ANIMATION ====================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }
    
    // Initialize counters when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    if (!isNaN(target)) {
                        animateCounter(stat, target);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe hero section for counters
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
    
    // ==================== TESTIMONIAL SLIDER ====================
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentTestimonial = 0;
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.opacity = i === index ? '1' : '0';
                testimonial.style.transform = i === index ? 'translateY(0)' : 'translateY(30px)';
                testimonial.style.position = 'absolute';
                testimonial.style.top = '0';
                testimonial.style.left = '0';
                testimonial.style.width = '100%';
                testimonial.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
        }
        
        // Auto rotate testimonials
        if (testimonials.length > 1) {
            showTestimonial(0);
            
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 5000);
        } else if (testimonials.length === 1) {
            testimonials[0].style.opacity = '1';
            testimonials[0].style.transform = 'translateY(0)';
        }
    }
    
    // ==================== FORM VALIDATION ====================
    function setupFormValidation(formId) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error on input
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
        
        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name || field.placeholder || field.id;
            
            if (!value) {
                showFieldError(field, `${fieldName} is required`);
                return false;
            }
            
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showFieldError(field, 'Please enter a valid email address');
                    return false;
                }
            }
            
            if (field.type === 'password' && value.length < 6) {
                showFieldError(field, 'Password must be at least 6 characters');
                return false;
            }
            
            clearError(field);
            return true;
        }
        
        function showFieldError(field, message) {
            clearError(field);
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            errorDiv.style.cssText = `
                color: #EF4444;
                font-size: 0.85rem;
                margin-top: 5px;
                animation: fadeIn 0.3s ease;
            `;
            
            field.parentNode.appendChild(errorDiv);
            field.classList.add('error');
        }
        
        function clearError(field) {
            const existingError = field.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
            field.classList.remove('error');
        }
    }
    
    // Setup form validations
    setupFormValidation('contactForm');
    setupFormValidation('loginForm');
    setupFormValidation('signupForm');
    
    // ==================== LAZY LOADING IMAGES ====================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ==================== PROGRESS BARS ====================
    function initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage') || '0';
            const fill = bar.querySelector('.progress-fill');
            
            if (fill) {
                setTimeout(() => {
                    fill.style.width = percentage + '%';
                }, 300);
            }
        });
    }
    
    // Initialize when in viewport
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initializeProgressBars();
                progressObserver.unobserve(entry.target);
            }
        });
    });
    
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) {
        progressObserver.observe(progressContainer);
    }
    
    // ==================== BACK TO TOP BUTTON ====================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4A6FFF 0%, #8B5CF6 100%);
        color: white;
        border: none;
        cursor: pointer;
        z-index: 999;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(74, 111, 255, 0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-5px)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    // ==================== PAGE LOADER ====================
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 500);
        }, 1000);
    }
    
    // ==================== INITIALIZE EVERYTHING ====================
    console.log('✨ All features initialized successfully');
});