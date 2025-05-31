// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    const header = document.querySelector('.header');
    const isMenuOpen = navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');

    if (window.innerWidth < 768) {
        if (isMenuOpen) {
            header.classList.add('scrolled');
        } else {
            if (window.scrollY <= 50) {
                header.classList.remove('scrolled');
            }
        }
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Hero Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

// Event listeners for carousel controls
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Indicator click events
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
});

// Auto-advance carousel
setInterval(nextSlide, 5000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const isMobileMenuOpen = navMenu.classList.contains('active');

    // Only toggle scroll class if mobile menu is NOT open
    if (!isMobileMenuOpen) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

window.addEventListener('resize', () => {
    const header = document.querySelector('.header');
    if (window.innerWidth >= 768 && !navMenu.classList.contains('active')) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});


// Product Modal
const modal = document.getElementById('productModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');
const productInfoBtns = document.querySelectorAll('.product-info-btn');

const productDetails = {
    'polo-escolar': {
        title: 'Perdidos Personalizados',
        image: './assets/img/produto-02.png',
        description: 'Confeccionada em tecido de alta qualidade, com stampa e bordado personalizado.',
        features: [
            'Tecido 100% algodão ou misto',
            'Bordado personalizado incluído',
            'Disponível do P ao GG',
            'Cores variadas conforme escola',
            'Lavagem fácil e secagem rápida'
        ]
    },
    'avental': {
        title: 'Uniformes Profissionais',
        image: './assets/img/produto-01.png',
        description: 'Resistente e confortável, ideal para uso profissional diário.',
        features: [
            'Material resistente a manchas',
            'Bolsos práticos',
            'Ajuste personalizado',
            'Fácil limpeza',
            'Diversas cores disponíveis'
        ]
    },
    'personalizado': {
        title: 'Uniformes para Eventos',
        image: './assets/img/produto-03.png',
        description: 'Criação exclusiva com sua marca e especificações.',
        features: [
            'Design exclusivo',
            'Logotipo bordado ou estampado',
            'Escolha de cores e materiais',
            'Atendimento personalizado',
            'Orçamento sem compromisso'
        ]
    }
};

productInfoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = btn.getAttribute('data-product');
        const product = productDetails[productId];
        
        if (product) {
            modalContent.innerHTML = `
                <h2 style="margin-bottom: 1rem; color: var(--text-primary);">${product.title}</h2>
                <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 400px; object-fit: cover; object-position: top; border-radius: 0.5rem; margin-bottom: 1rem;">
                <p style="margin-bottom: 1.5rem; color: var(--text-secondary); line-height: 1.6;">${product.description}</p>
                <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Características:</h3>
                <ul style="list-style: none; padding: 0;">
                    ${product.features.map(feature => `
                        <li style="padding: 0.5rem 0; color: var(--text-secondary); display: flex; align-items: center;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2" style="margin-right: 0.5rem; flex-shrink: 0;">
                                <polyline points="20,6 9,17 4,12"/>
                            </svg>
                            ${feature}
                        </li>
                    `).join('')}
                </ul>
                <button id="goToContactBtn" style="margin-top: 2rem; background: var(--accent-primary); color: rgb(72, 72, 72); border: none; padding: 0.75rem 2rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
                    Solicitar Orçamento
                </button>
            `;

            setTimeout(() => {
                const goToContactBtn = document.getElementById('goToContactBtn');
                if (goToContactBtn) {
                    goToContactBtn.addEventListener('click', () => {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        document.getElementById('contact').scrollIntoView({
                            behavior: 'smooth'
                        });
                    });
                }
            }, 50);

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
        }
    });
});




closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Disable this too
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Form submissions
const customOrderForm = document.getElementById('customOrderForm');
const contactForm = document.getElementById('contactForm');

function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

if (customOrderForm) {
    customOrderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(customOrderForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        console.log('Custom Order Form Data:', data);
        
        showAlert('Solicitação de orçamento enviada com sucesso! Entraremos em contato em breve.');
        customOrderForm.reset();
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        console.log('Contact Form Data:', data);
        
        showAlert('Mensagem enviada com sucesso! Responderemos em breve.');
        contactForm.reset();
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Add scroll animation class to elements
const animateElements = document.querySelectorAll('.feature-card, .category-card, .product-card, .faq-item');
animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// CTA Button actions
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Add CSS for slide in animation
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);


// === CLIENT CAROUSEL ===

const clientTrack = document.querySelector(".client-carousel-track");
const clientSlides = Array.from(clientTrack.children);
const clientContainer = document.querySelector(".client-carousel-container");

// Create and append navigation buttons
const prevClientBtn = document.createElement("button");
prevClientBtn.className = "carousel-btn prev";
prevClientBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15,18 9,12 15,6"/></svg>`;

const nextClientBtn = document.createElement("button");
nextClientBtn.className = "carousel-btn next";
nextClientBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"/></svg>`;

clientContainer.appendChild(prevClientBtn);
clientContainer.appendChild(nextClientBtn);

let clientCurrentIndex = 0;
let clientVisibleSlides = window.innerWidth >= 768 ? 3 : 1;

function updateClientSlideView() {
    const slide = clientSlides[0];
    const slideStyle = window.getComputedStyle(slide);
    const slideWidth = slide.offsetWidth;
    const slideMargin = parseFloat(slideStyle.marginLeft) + parseFloat(slideStyle.marginRight);
    const fullSlideWidth = slideWidth + slideMargin;

    clientVisibleSlides = window.innerWidth >= 768 ? 3 : 1;
    const maxIndex = Math.max(clientSlides.length - clientVisibleSlides, 0);
    clientCurrentIndex = Math.min(clientCurrentIndex, maxIndex);

    const offset = clientCurrentIndex * fullSlideWidth;
    clientTrack.style.transition = 'transform 0.5s ease-in-out';
    clientTrack.style.transform = `translateX(-${offset}px)`;

    // Update center-slide visual effect
    clientSlides.forEach((slide, index) => {
        slide.classList.remove("center-slide");
        if ((clientVisibleSlides === 3 && index === clientCurrentIndex + 1) ||
            (clientVisibleSlides === 1 && index === clientCurrentIndex)) {
            slide.classList.add("center-slide");
        }
    });
}



function nextClientSlide() {
    const maxIndex = clientSlides.length - clientVisibleSlides;
    clientCurrentIndex = (clientCurrentIndex + 1) > maxIndex ? 0 : clientCurrentIndex + 1;
    updateClientSlideView();
}

function prevClientSlide() {
    const maxIndex = clientSlides.length - clientVisibleSlides;
    clientCurrentIndex = (clientCurrentIndex - 1) < 0 ? maxIndex : clientCurrentIndex - 1;
    updateClientSlideView();
}

// Initial load
window.addEventListener("load", updateClientSlideView);
window.addEventListener("resize", updateClientSlideView);
nextClientBtn.addEventListener("click", nextClientSlide);
prevClientBtn.addEventListener("click", prevClientSlide);

// Auto slide every 5s
let clientInterval = setInterval(nextClientSlide, 5000);
clientContainer.addEventListener('mouseenter', () => clearInterval(clientInterval));
clientContainer.addEventListener('mouseleave', () => {
    clientInterval = setInterval(nextClientSlide, 5000);
});



// Resize listener
window.addEventListener("resize", () => {
    // Reset to first slide on resize to avoid layout issues
    clientCurrentIndex = 0;
    updateClientSlideView();
});

// Initial call
window.addEventListener('load', () => {
  updateClientSlideView();
});


