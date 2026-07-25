// ==========================================
// TITANZ SECURITY SERVICES - COMPLETE JAVASCRIPT
// Enhanced with Slide-Left Fade-In Animations
// ==========================================

// ========== HERO SLIDER WITH SLIDE-LEFT FADE-IN ==========
let slideIndex = 0;
let slideTimer;
let isTransitioning = false;

function showSlides() {
    if (isTransitioning) return;
    
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (slides.length === 0) return;
    
    isTransitioning = true;
    
    // Find current active slide
    let currentSlide = null;
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('active')) {
            currentSlide = slides[i];
            break;
        }
    }
    
    // Fade out current slide
    if (currentSlide) {
        currentSlide.classList.remove('active');
        currentSlide.classList.add('fade-out');
    }
    
    // Increment slide index
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    // Wait for fade out animation
    setTimeout(() => {
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove('fade-out', 'active');
        }
        
        // Show new slide
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
            
            setTimeout(() => {
                slides[slideIndex - 1].classList.add("active");
            }, 50);
        }
        
        // Activate corresponding dot
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].classList.add("active");
        }
        
        isTransitioning = false;
    }, 600);
    
    // Auto-advance every 6 seconds
    slideTimer = setTimeout(showSlides, 6000);
}

// Manual slide navigation
function currentSlide(n) {
    if (isTransitioning) return;
    
    clearTimeout(slideTimer);
    
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (slides.length === 0) return;
    
    isTransitioning = true;
    
    // Find current slide
    let currentSlide = null;
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('active')) {
            currentSlide = slides[i];
            break;
        }
    }
    
    // Fade out current
    if (currentSlide) {
        currentSlide.classList.remove('active');
        currentSlide.classList.add('fade-out');
    }
    
    // Add ripple to clicked dot
    if (dots[n - 1]) {
        dots[n - 1].classList.add('clicked');
        setTimeout(() => {
            dots[n - 1].classList.remove('clicked');
        }, 600);
    }
    
    setTimeout(() => {
        // Hide all
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove('fade-out', 'active');
        }
        
        // Remove dot active
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }
        
        // Show selected
        slideIndex = n;
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
            
            setTimeout(() => {
                slides[slideIndex - 1].classList.add("active");
            }, 50);
        }
        
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].classList.add("active");
        }
        
        isTransitioning = false;
        slideTimer = setTimeout(showSlides, 6000);
    }, 600);
}

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementsByClassName("slide").length > 0) {
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("dot");
        
        // Show first slide
        if (slides[0]) {
            slides[0].style.display = "block";
            setTimeout(() => {
                slides[0].classList.add("active");
            }, 100);
        }
        
        if (dots[0]) {
            dots[0].classList.add("active");
        }
        
        slideIndex = 1;
        slideTimer = setTimeout(showSlides, 6000);
    }
});

// Pause slider on hover
document.addEventListener('DOMContentLoaded', function() {
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', function() {
            clearTimeout(slideTimer);
        });
        
        heroSlider.addEventListener('mouseleave', function() {
            if (!isTransitioning) {
                slideTimer = setTimeout(showSlides, 6000);
            }
        });
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;
    
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        let nextSlide = slideIndex + 1;
        if (nextSlide > slides.length) nextSlide = 1;
        currentSlide(nextSlide);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        let prevSlide = slideIndex - 1;
        if (prevSlide < 1) prevSlide = slides.length;
        currentSlide(prevSlide);
    }
});

// Touch/Swipe support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        heroSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
});

function handleSwipe() {
    const slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;
    
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        let nextSlide = slideIndex + 1;
        if (nextSlide > slides.length) nextSlide = 1;
        currentSlide(nextSlide);
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        let prevSlide = slideIndex - 1;
        if (prevSlide < 1) prevSlide = slides.length;
        currentSlide(prevSlide);
    }
}

// Pause when tab not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        clearTimeout(slideTimer);
    } else {
        if (document.getElementsByClassName("slide").length > 0 && !isTransitioning) {
            slideTimer = setTimeout(showSlides, 6000);
        }
    }
});

// ========== SMOOTH SCROLL ANIMATION ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const header = document.querySelector('.main-header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ========== STICKY HEADER ON SCROLL ==========
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    }
    
    lastScroll = currentScroll;
});

// ========== FORM VALIDATION ==========
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff0000';
                    
                    setTimeout(() => {
                        field.style.borderColor = '';
                    }, 3000);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
});

// ========== MOBILE MENU TOGGLE ==========
function createMobileMenu() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;
    
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-toggle');
    menuButton.innerHTML = '☰';
    menuButton.setAttribute('aria-label', 'Toggle Menu');
    
    nav.parentNode.insertBefore(menuButton, nav);
    
    const overlay = document.createElement('div');
    overlay.classList.add('mobile-overlay');
    overlay.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9998;
    `;
    document.body.appendChild(overlay);
    
    menuButton.addEventListener('click', function() {
        nav.classList.toggle('mobile-active');
        overlay.style.display = nav.classList.contains('mobile-active') ? 'block' : 'none';
        menuButton.innerHTML = nav.classList.contains('mobile-active') ? '✕' : '☰';
    });
    
    overlay.addEventListener('click', function() {
        nav.classList.remove('mobile-active');
        overlay.style.display = 'none';
        menuButton.innerHTML = '☰';
    });
    
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        if (dropbtn) {
            dropbtn.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('mobile-open');
                }
            });
        }
    });
    
    const navLinks = nav.querySelectorAll('a:not(.dropbtn)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('mobile-active');
                overlay.style.display = 'none';
                menuButton.innerHTML = '☰';
            }
        });
    });
    
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
        } else {
            menuButton.style.display = 'none';
            nav.classList.remove('mobile-active');
            overlay.style.display = 'none';
            menuButton.innerHTML = '☰';
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

document.addEventListener('DOMContentLoaded', createMobileMenu);

// ========== TESTIMONIAL SLIDER ==========
function initTestimonialSlider() {
    const sliders = document.querySelectorAll('.testimonials-slider');
    
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.testimonial-slide');
        if (slides.length <= 1) return;
        
        let currentIndex = 0;
        
        slides.forEach((slide, index) => {
            if (index !== 0) slide.style.display = 'none';
        });
        
        setInterval(() => {
            slides[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].style.display = 'block';
        }, 6000);
    });
}

document.addEventListener('DOMContentLoaded', initTestimonialSlider);

// ========== DROPDOWN ACCESSIBILITY ==========
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropbtn && dropdownContent) {
            dropbtn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dropdownContent.style.display = 
                        dropdownContent.style.display === 'block' ? 'none' : 'block';
                }
            });
            
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    dropdownContent.style.display = 'none';
                }
            });
        }
    });
});

// ========== LOADING ANIMATION ==========
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            element.classList.add('visible');
        }
    });
});

// ========== THEME TOGGLE FUNCTIONALITY ==========
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

function createThemeToggle() {
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'theme-toggle-container';
    
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle Dark/Light Mode');
    toggleButton.setAttribute('data-tooltip', currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    
    toggleButton.innerHTML = `
        <span class="theme-icon sun">☀️</span>
        <span class="theme-icon moon">🌙</span>
    `;
    
    toggleContainer.appendChild(toggleButton);
    document.body.appendChild(toggleContainer);
    
    toggleButton.addEventListener('click', function() {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        toggleButton.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            toggleButton.style.transform = 'rotate(0deg)';
        }, 300);
        
        toggleButton.setAttribute('data-tooltip', 
            newTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
        );
        
        console.log(`Theme switched to: ${newTheme}`);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    createThemeToggle();
    
    setTimeout(() => {
        document.body.classList.add('theme-transitions-enabled');
    }, 100);
});

// Keyboard shortcut for theme toggle (Ctrl/Cmd + K)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.click();
        }
    }
});

// Detect system theme preference
function detectSystemTheme() {
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemTheme);
        localStorage.setItem('theme', systemTheme);
    }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme-user-override')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
});

detectSystemTheme();

// ========== WHATSAPP & PHONE TRACKING ==========
document.addEventListener('DOMContentLoaded', function() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('WhatsApp link clicked');
        });
    });
    
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone call initiated');
        });
    });
});

// ========== CONSOLE BRANDING ==========
console.log('%c Titanz Security Services', 'color: #E3C580; font-size: 24px; font-weight: bold;');
console.log('%c Website with Dark/Light Theme & Smooth Animations', 'color: #2E2D2D; font-size: 14px;');


// ==========================================
// SWITCHABLE CONTACT FORM - CLIENT/APPLICANT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const clientToggle = document.getElementById('client-toggle');
    const applicantToggle = document.getElementById('applicant-toggle');
    const clientForm = document.getElementById('client-form');
    const applicantForm = document.getElementById('applicant-form');
    const clientInfo = document.querySelector('.client-info');
    const applicantInfo = document.querySelector('.applicant-info');
    
    if (clientToggle && applicantToggle && clientForm && applicantForm) {
        
        // Switch to Client Form
        clientToggle.addEventListener('click', function() {
            // Toggle active states
            clientToggle.classList.add('active');
            applicantToggle.classList.remove('active');
            
            // Show/hide forms with animation
            clientForm.style.display = 'none';
            applicantForm.style.display = 'none';
            
            setTimeout(() => {
                clientForm.style.display = 'block';
                applicantForm.style.display = 'none';
            }, 50);
            
            // Show/hide info boxes
            if (clientInfo) clientInfo.style.display = 'block';
            if (applicantInfo) applicantInfo.style.display = 'none';
            
            // Clear applicant form
            applicantForm.reset();
            
            // Update form header color
            updateFormHeader('client');
        });
        
        // Switch to Applicant Form
        applicantToggle.addEventListener('click', function() {
            // Toggle active states
            applicantToggle.classList.add('active');
            clientToggle.classList.remove('active');
            
            // Show/hide forms with animation
            clientForm.style.display = 'none';
            applicantForm.style.display = 'none';
            
            setTimeout(() => {
                applicantForm.style.display = 'block';
                clientForm.style.display = 'none';
            }, 50);
            
            // Show/hide info boxes
            if (clientInfo) clientInfo.style.display = 'none';
            if (applicantInfo) applicantInfo.style.display = 'block';
            
            // Clear client form
            clientForm.reset();
            
            // Update form header color
            updateFormHeader('applicant');
        });
    }
    
    // File upload name display
    const fileInput = document.getElementById('applicant_cv');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name;
            const fileNameDisplay = document.querySelector('.file-upload-name');
            const fileTextDisplay = document.querySelector('.file-upload-text');
            
            if (fileName && fileNameDisplay && fileTextDisplay) {
                fileNameDisplay.textContent = `Selected: ${fileName}`;
                fileTextDisplay.textContent = 'Click to change file';
                
                // Validate file size (5MB max)
                const fileSize = e.target.files[0].size / 1024 / 1024; // in MB
                if (fileSize > 5) {
                    alert('File size must be less than 5MB');
                    fileInput.value = '';
                    fileNameDisplay.textContent = '';
                    fileTextDisplay.textContent = 'Click to upload CV (PDF, DOC, DOCX - Max 5MB)';
                }
            }
        });
    }
    
    // Form validation enhancement
    const forms = document.querySelectorAll('.main-contact-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            let firstInvalidField = null;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff0000';
                    field.style.boxShadow = '0 0 0 3px rgba(255, 0, 0, 0.1)';
                    
                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                    
                    setTimeout(() => {
                        field.style.borderColor = '';
                        field.style.boxShadow = '';
                    }, 3000);
                }
            });
            
            // Check file upload for applicant form
            if (form.id === 'applicant-form') {
                const cvInput = document.getElementById('applicant_cv');
                if (cvInput && !cvInput.files.length) {
                    isValid = false;
                    const fileLabel = document.querySelector('.file-upload-label');
                    if (fileLabel) {
                        fileLabel.style.borderColor = '#ff0000';
                        setTimeout(() => {
                            fileLabel.style.borderColor = '';
                        }, 3000);
                    }
                    alert('Please upload your CV/Resume');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                if (firstInvalidField) {
                    firstInvalidField.focus();
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                alert('Please fill in all required fields');
            }
        });
    });
    
    // Helper function to update form header styling
    function updateFormHeader(formType) {
        const headers = document.querySelectorAll('.form-header');
        headers.forEach(header => {
            if (formType === 'client') {
                header.style.borderBottomColor = 'var(--primary-gold)';
            } else {
                header.style.borderBottomColor = '#4caf50';
            }
        });
    }
    
    // Real-time validation
    const allInputs = document.querySelectorAll('.main-contact-form input, .main-contact-form select, .main-contact-form textarea');
    allInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ff0000';
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 2000);
            }
        });
        
        input.addEventListener('input', function() {
            if (this.hasAttribute('required') && this.value.trim()) {
                this.style.borderColor = '#4caf50';
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 1000);
            }
        });
    });
    
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailPattern.test(this.value)) {
                this.style.borderColor = '#ff0000';
                alert('Please enter a valid email address');
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 2000);
            }
        });
    });
    
    // Phone validation (basic UAE format)
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const phonePattern = /^(\+971|00971|0)?[0-9]{9}$/;
            if (this.value && !phonePattern.test(this.value.replace(/\s/g, ''))) {
                this.style.borderColor = '#ff6b00';
                // Don't block submission, just warn
            }
        });
    });
});