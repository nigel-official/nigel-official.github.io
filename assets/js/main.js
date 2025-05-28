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
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
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
    header.classList.toggle('scrolled', window.scrollY > 50);
});


// Product Modal
const modal = document.getElementById('productModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');
const productInfoBtns = document.querySelectorAll('.product-info-btn');

const productDetails = {
    'polo-escolar': {
        title: 'Camiseta Polo Escolar',
        image: './assets/img/produto-02.png',
        description: 'Nossa camiseta polo escolar é confeccionada com tecido de alta qualidade, oferecendo conforto e durabilidade para o uso diário. Disponível em diversas cores e tamanhos.',
        features: [
            'Tecido 100% algodão ou misto',
            'Bordado personalizado incluído',
            'Disponível do P ao GG',
            'Cores variadas conforme escola',
            'Lavagem fácil e secagem rápida'
        ]
    },
    'avental': {
        title: 'Avental Profissional',
        image: './assets/img/produto-01.png',
        description: 'Avental profissional resistente e confortável, ideal para uso em cozinhas, laboratórios e ambientes profissionais diversos.',
        features: [
            'Material resistente a manchas',
            'Bolsos práticos',
            'Ajuste personalizado',
            'Fácil limpeza',
            'Diversas cores disponíveis'
        ]
    },
    'personalizado': {
        title: 'Uniforme Personalizado',
        image: './assets/img/produto-03.png',
        description: 'Criamos uniformes únicos de acordo com suas especificações, incluindo logotipos, cores e design exclusivos para sua empresa ou escola.',
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
                <button style="margin-top: 2rem; background: var(--accent-primary); color: white; border: none; padding: 0.75rem 2rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600; transition: all 0.3s ease;" onclick="window.location.href='#contact'">
                    Solicitar Orçamento
                </button>
            `;
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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);    
    // Add fade in animation to page elements
    setTimeout(() => {
        document.querySelectorAll('section').forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});


document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".client-carousel-track");
  const slides = Array.from(track.children);

  // Duplicate the slides for infinite looping
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
  });
});



