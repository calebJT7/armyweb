// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.member-card, .calendar-section, .activity, .platform, .content-type, .album').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navegación activa
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Función para actualizar calendario con fechas dinámicas
function updateCalendar() {
    const currentYear = new Date().getFullYear();
    const birthdays = [
        { date: '2024-02-18', name: 'J-Hope', element: 'jhope-birthday' },
        { date: '2024-03-09', name: 'Suga', element: 'suga-birthday' },
        { date: '2024-09-01', name: 'Jungkook', element: 'jungkook-birthday' },
        { date: '2024-09-12', name: 'RM', element: 'rm-birthday' },
        { date: '2024-10-13', name: 'Jimin', element: 'jimin-birthday' },
        { date: '2024-12-04', name: 'Jin', element: 'jin-birthday' },
        { date: '2024-12-30', name: 'V', element: 'v-birthday' }
    ];
    
    // Calcular días hasta próximos cumpleaños
    const today = new Date();
    birthdays.forEach(birthday => {
        const birthDate = new Date(birthday.date.replace('2024', currentYear));
        if (birthDate < today) {
            birthDate.setFullYear(currentYear + 1);
        }
        
        const timeDiff = birthDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        // Aquí podrías actualizar el DOM si quisieras mostrar días restantes
        console.log(`Días hasta cumpleaños de ${birthday.name}: ${daysDiff}`);
    });
}

// Función para crear efecto de partículas en el hero
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.overflow = 'hidden';
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// CSS para animación de partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
    }
    
    .nav-menu a.active {
        background: rgba(255, 255, 255, 0.3) !important;
    }
    
    .particles {
        z-index: 0;
    }
`;
document.head.appendChild(style);

// Inicializar funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    updateCalendar();
    createParticles();
    
    // Efecto hover mejorado para las tarjetas
    document.querySelectorAll('.member-card, .activity, .platform').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Función para mostrar notificaciones de eventos próximos
function checkUpcomingEvents() {
    const today = new Date();
    const events = [
        { date: '2024-06-13', name: 'Aniversario de Debut de BTS', type: 'anniversary' },
        { date: '2024-07-09', name: 'Día de ARMY', type: 'army' }
    ];
    
    events.forEach(event => {
        const eventDate = new Date(event.date);
        const timeDiff = eventDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        if (daysDiff <= 7 && daysDiff > 0) {
            showNotification(`¡${event.name} en ${daysDiff} días! 💜`);
        }
    });
}

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: linear-gradient(135deg, #6B46C1, #A855F7);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.5s ease;
        max-width: 300px;
        font-size: 0.9rem;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// CSS para animaciones de notificación
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyle);

// Ejecutar verificación de eventos al cargar
setTimeout(checkUpcomingEvents, 2000);

// Función para cambiar tema (opcional - modo oscuro)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Cargar tema guardado
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Lazy loading para imágenes (si las agregamos más tarde)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Función para compartir en redes sociales
function shareContent(platform, url, text) {
    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Contador de visitas (almacenado localmente)
function updateVisitCounter() {
    let visits = parseInt(localStorage.getItem('bts-page-visits') || '0');
    visits++;
    localStorage.setItem('bts-page-visits', visits.toString());
    
    // Mostrar mensaje especial en ciertas visitas
    if (visits === 7) {
        showNotification('¡7ª visita! Como los 7 miembros de BTS 💜');
    }
}

// Actualizar contador al cargar
updateVisitCounter();
// Agregar este código al final del script.js existente

// Funcionalidad para botones "Ver más"
document.addEventListener('DOMContentLoaded', function() {
    
    // Manejar clicks en botones "Ver más"
    document.querySelectorAll('.ver-mas-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const memberId = this.dataset.member;
            const details = document.getElementById(`details-${memberId}`);
            
            // Toggle del contenido expandido
            if (details.classList.contains('active')) {
                details.classList.remove('active');
                this.textContent = 'Ver más';
                this.classList.remove('active');
            } else {
                // Cerrar otros detalles abiertos
                document.querySelectorAll('.member-details.active').forEach(detail => {
                    detail.classList.remove('active');
                });
                document.querySelectorAll('.ver-mas-btn.active').forEach(button => {
                    button.textContent = 'Ver más';
                    button.classList.remove('active');
                });
                
                // Abrir el actual
                details.classList.add('active');
                this.textContent = 'Ver menos';
                this.classList.add('active');
            }
        });
    });
    
    // Manejar clicks en tabs de miembros
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            const memberId = this.closest('.member-details').id.split('-')[1];
            
            // Remover active de todas las tabs del miembro actual
            const memberTabs = this.closest('.member-details');
            memberTabs.querySelectorAll('.tab-btn').forEach(tab => {
                tab.classList.remove('active');
            });
            memberTabs.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Activar tab seleccionada
            this.classList.add('active');
            document.getElementById(`${tabName}-${memberId}`).classList.add('active');
        });
    });
    
});

// Función para cerrar todos los detalles expandidos (opcional)
function closeAllMemberDetails() {
    document.querySelectorAll('.member-details.active').forEach(detail => {
        detail.classList.remove('active');
    });
    document.querySelectorAll('.ver-mas-btn.active').forEach(button => {
        button.textContent = 'Ver más';
        button.classList.remove('active');
    });
}

// Cerrar detalles al hacer scroll (opcional)
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        // Solo cerrar si se ha scrolleado mucho
        if (window.scrollY > 100) {
            const openDetails = document.querySelectorAll('.member-details.active');
            if (openDetails.length > 0) {
                // closeAllMemberDetails(); // Descomenta si quieres que se cierre al hacer scroll
            }
        }
    }, 150);
});