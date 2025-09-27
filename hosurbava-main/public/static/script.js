// HosurBava Website Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Contact form handler
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.classList.add('loading');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitButton.disabled = true;
            
            try {
                const response = await axios.post('/api/contact', data);
                
                if (response.data.success) {
                    showMessage('success', response.data.message);
                    contactForm.reset();
                } else {
                    showMessage('error', response.data.message);
                }
            } catch (error) {
                showMessage('error', 'Sorry, there was an error sending your message. Please try again.');
            } finally {
                // Reset button
                submitButton.classList.remove('loading');
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
    
    // Service buttons handlers
    setupServiceButtons();
    
    // Intersection Observer for animations
    setupScrollAnimations();
    
    // Statistics counter animation
    setupCounterAnimation();
    
    // Navbar scroll effect
    setupNavbarScrollEffect();
});

// Show form messages
function showMessage(type, message) {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;
    
    formMessage.className = `mt-4 p-4 rounded-lg ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
    formMessage.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} mr-2"></i>${message}`;
    formMessage.classList.remove('hidden');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// Setup service buttons
function setupServiceButtons() {
    const serviceButtons = document.querySelectorAll('button[class*="bg-brand"]');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.closest('.bg-white').querySelector('h3').textContent;
            
            // Scroll to contact section and pre-fill the service field
            const contactSection = document.getElementById('contact');
            const serviceSelect = document.querySelector('select[name="service"]');
            
            if (contactSection && serviceSelect) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Pre-fill service based on button clicked
                setTimeout(() => {
                    if (serviceName.includes('Repair')) {
                        serviceSelect.value = 'mobile-repair';
                    } else if (serviceName.includes('Accessories')) {
                        serviceSelect.value = 'accessories';
                    } else if (serviceName.includes('Consultation')) {
                        serviceSelect.value = 'consultation';
                    }
                }, 1000);
            }
        });
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.bg-white.p-8, .grid.grid-cols-1 > div, .text-center.mb-16').forEach(el => {
        observer.observe(el);
    });
}

// Setup counter animation
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        countObserver.observe(counter);
    });
}

// Animate counter numbers
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/[\d,]/g, '');
    let current = 0;
    const increment = target / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, 30);
}

// Setup navbar scroll effect
function setupNavbarScrollEffect() {
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-sticky');
        } else {
            navbar.classList.remove('nav-sticky');
        }
    });
}

// WhatsApp floating button (if needed)
function addWhatsAppButton() {
    const whatsappButton = document.createElement('a');
    whatsappButton.href = 'https://wa.me/919342334005?text=Hi HosurBava! I visited your website and would like to know more about your services.';
    whatsappButton.target = '_blank';
    whatsappButton.className = 'fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 animate-pulse-custom';
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp text-2xl"></i>';
    
    document.body.appendChild(whatsappButton);
}

// Initialize WhatsApp button
// addWhatsAppButton();

// ===== SLIDESHOW FUNCTIONALITY =====

let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.hero-slide');
const slideDots = document.querySelectorAll('.slide-dot');
const totalSlides = slides.length;
const slideDelay = 6000; // 6 seconds per slide

// Initialize slideshow
function initializeSlideshow() {
    if (slides.length === 0) return;
    
    // Set up initial slide
    showSlide(0);
    
    // Start auto-play
    startAutoPlay();
    
    // Add event listeners
    setupSlideNavigation();
    
    // Pause on hover, resume on leave
    const slideshow = document.getElementById('hero-slideshow');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', pauseAutoPlay);
        slideshow.addEventListener('mouseleave', startAutoPlay);
    }
}

// Show specific slide
function showSlide(index) {
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    
    // Update current slide
    currentSlide = index;
    
    // Hide all slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i < index) {
            slide.classList.add('prev');
        }
    });
    
    // Show current slide
    slides[currentSlide].classList.add('active');
    
    // Update dots
    slideDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    
    // Add entrance animations to slide content
    addSlideAnimations();
}

// Add entrance animations to slide content
function addSlideAnimations() {
    const currentSlideElement = slides[currentSlide];
    const animatedElements = currentSlideElement.querySelectorAll('.animate-slide-in-left, .animate-slide-in-right');
    
    // Reset animations
    animatedElements.forEach(element => {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
    });
    
    // Re-apply animations with delay
    setTimeout(() => {
        animatedElements.forEach((element, index) => {
            if (element.classList.contains('animate-slide-in-left')) {
                element.style.animation = `slideInLeft 0.8s ease-out ${index * 0.2}s both`;
            } else if (element.classList.contains('animate-slide-in-right')) {
                element.style.animation = `slideInRight 0.8s ease-out ${index * 0.2}s both`;
            }
        });
    }, 100);
}

// Next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Previous slide
function previousSlide() {
    showSlide(currentSlide - 1);
}

// Start auto-play
function startAutoPlay() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideDelay);
    
    // Add progress indicator
    addProgressIndicator();
}

// Pause auto-play
function pauseAutoPlay() {
    clearInterval(slideInterval);
    removeProgressIndicator();
}

// Add progress indicator
function addProgressIndicator() {
    removeProgressIndicator();
    
    const progressBar = document.createElement('div');
    progressBar.className = 'slide-progress';
    progressBar.style.animationDuration = `${slideDelay}ms`;
    
    const slideshow = document.getElementById('hero-slideshow');
    if (slideshow) {
        slideshow.appendChild(progressBar);
    }
}

// Remove progress indicator
function removeProgressIndicator() {
    const existingProgress = document.querySelector('.slide-progress');
    if (existingProgress) {
        existingProgress.remove();
    }
}

// Setup slide navigation
function setupSlideNavigation() {
    // Dot navigation
    slideDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            pauseAutoPlay();
            setTimeout(startAutoPlay, 3000); // Resume after 3 seconds
        });
    });
    
    // Previous/Next buttons
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            previousSlide();
            pauseAutoPlay();
            setTimeout(startAutoPlay, 3000);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            pauseAutoPlay();
            setTimeout(startAutoPlay, 3000);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            previousSlide();
            pauseAutoPlay();
            setTimeout(startAutoPlay, 3000);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            pauseAutoPlay();
            setTimeout(startAutoPlay, 3000);
        } else if (e.key === ' ') { // Spacebar to pause/resume
            e.preventDefault();
            if (slideInterval) {
                pauseAutoPlay();
            } else {
                startAutoPlay();
            }
        }
    });
}

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swiped right - go to previous slide
            previousSlide();
        } else {
            // Swiped left - go to next slide
            nextSlide();
        }
        
        pauseAutoPlay();
        setTimeout(startAutoPlay, 3000);
    }
}

// Setup touch events
function setupTouchEvents() {
    const slideshow = document.getElementById('hero-slideshow');
    if (slideshow && 'ontouchstart' in window) {
        slideshow.addEventListener('touchstart', handleTouchStart, { passive: true });
        slideshow.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
}

// Intersection Observer for slideshow performance
function setupSlideObserver() {
    const slideshow = document.getElementById('hero-slideshow');
    if (!slideshow) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoPlay();
            } else {
                pauseAutoPlay();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(slideshow);
}

// Enhanced counter animation for slides
function animateSlideCounters() {
    const activeSlide = slides[currentSlide];
    if (!activeSlide) return;
    
    const counters = activeSlide.querySelectorAll('.counter');
    counters.forEach(counter => {
        if (!counter.hasAttribute('data-animated')) {
            animateCounter(counter);
            counter.setAttribute('data-animated', 'true');
        }
    });
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        initializeSlideshow();
        setupTouchEvents();
        setupSlideObserver();
        
        // Animate counters in first slide
        setTimeout(animateSlideCounters, 1000);
    }, 100);
});

// Re-animate counters when slide changes
function showSlide(index) {
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    
    const previousSlide = currentSlide;
    currentSlide = index;
    
    // Hide all slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i < index) {
            slide.classList.add('prev');
        }
        
        // Reset animations for all slides except current
        if (i !== index) {
            const elements = slide.querySelectorAll('[data-animated]');
            elements.forEach(el => el.removeAttribute('data-animated'));
        }
    });
    
    // Show current slide
    slides[currentSlide].classList.add('active');
    
    // Update dots
    slideDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    
    // Add entrance animations
    addSlideAnimations();
    
    // Animate counters after slide transition
    setTimeout(animateSlideCounters, 500);
}

// Preload slide images for better performance
function preloadSlideImages() {
    slides.forEach(slide => {
        const images = slide.querySelectorAll('img');
        images.forEach(img => {
            if (img.src && !img.complete) {
                const preloadImg = new Image();
                preloadImg.src = img.src;
            }
        });
    });
}

// Initialize image preloading
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(preloadSlideImages, 2000);
});

// Social media click tracking
document.querySelectorAll('a[href*="instagram"], a[href*="youtube"], a[href*="facebook"], a[href*="whatsapp"]').forEach(link => {
    link.addEventListener('click', function() {
        const platform = this.href.includes('instagram') ? 'Instagram' : 
                        this.href.includes('youtube') ? 'YouTube' : 
                        this.href.includes('facebook') ? 'Facebook' : 'WhatsApp';
        
        // You can add analytics tracking here
        console.log(`Social media click: ${platform}`);
    });
});

// Service inquiry quick form (for service buttons)
async function showServiceInquiry(serviceType) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-brand-dark">Quick Service Inquiry</h3>
                <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <form id="service-inquiry-form" class="space-y-4">
                <input type="hidden" name="serviceType" value="${serviceType}">
                
                <input type="text" name="name" placeholder="Your Name" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary">
                
                <input type="tel" name="phone" placeholder="Phone Number" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary">
                
                <input type="text" name="device" placeholder="Device Model (if repair)" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary">
                
                <textarea name="issue" rows="3" placeholder="Brief description of your requirement" 
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary"></textarea>
                
                <select name="urgency" required 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary">
                    <option value="">How urgent is this?</option>
                    <option value="same-day">Same day</option>
                    <option value="within-week">Within a week</option>
                    <option value="not-urgent">Not urgent</option>
                </select>
                
                <button type="submit" 
                        class="w-full bg-brand-primary text-white py-3 rounded-lg hover:bg-brand-secondary transition-colors font-semibold">
                    <i class="fas fa-paper-plane mr-2"></i>
                    Send Inquiry
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('#service-inquiry-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        try {
            const response = await axios.post('/api/service-inquiry', data);
            
            if (response.data.success) {
                modal.innerHTML = `
                    <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center">
                        <i class="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
                        <h3 class="text-xl font-bold text-brand-dark mb-4">Inquiry Sent!</h3>
                        <p class="text-gray-600 mb-6">${response.data.message}</p>
                        <button onclick="this.closest('.fixed').remove()" 
                                class="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-secondary">
                            Close
                        </button>
                    </div>
                `;
            }
        } catch (error) {
            alert('Sorry, there was an error sending your inquiry. Please try again.');
        }
    });
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add event listeners to service buttons for quick inquiry
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.querySelectorAll('button[class*="bg-brand"]').forEach(button => {
            const originalHandler = button.onclick;
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceName = this.closest('.bg-white').querySelector('h3').textContent;
                showServiceInquiry(serviceName);
            });
        });
    }, 1000);
});