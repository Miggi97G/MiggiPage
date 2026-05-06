document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    // Parallax logic
    const parallaxItems = document.querySelectorAll('.p-item');
    let scrollPos = window.pageYOffset;
    let mouseX = 0;
    let mouseY = 0;

    // Track mouse
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    const updateParallax = () => {
        scrollPos = window.pageYOffset;
        
        parallaxItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-speed')) || 2;
            const mouseSpeed = parseFloat(item.getAttribute('data-mouse')) || 1;
            
            // Scroll parallax
            const yOffset = scrollPos * (speed / 10);
            
            // Mouse parallax
            const mxOffset = mouseX * 50 * mouseSpeed;
            const myOffset = mouseY * 50 * mouseSpeed;
            
            item.style.transform = `translate(${mxOffset}px, ${yOffset + myOffset}px)`;
        });
        
        requestAnimationFrame(updateParallax);
    };

    updateParallax();
});
