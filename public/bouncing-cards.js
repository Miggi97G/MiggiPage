console.log("Bouncing cards script initialized");

function initBouncingCards() {
    const wrappers = Array.from(document.querySelectorAll('.card-wrapper'));
    console.log("Found wrappers:", wrappers.length);
    if (!wrappers.length) return;

    const cardData = wrappers.map(wrapper => {
        const card = wrapper.querySelector('.card');
        if (!card) return null;
        
        // Ensure the card has no CSS transitions for transform
        card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
        card.style.opacity = '1';
        card.style.visibility = 'visible';
        
        // Ultra-slow velocity for an almost static, breathing feel
        let vx = (Math.random() * 0.1 + 0.05) * (Math.random() > 0.5 ? 1 : -1);
        let vy = (Math.random() * 0.1 + 0.05) * (Math.random() > 0.5 ? 1 : -1);
        
        return {
            wrapper: wrapper,
            el: card,
            x: Math.random() * 20,
            y: Math.random() * 20,
            vx: vx,
            vy: vy,
            isHovered: false
        };
    }).filter(d => d !== null);

    // Hover Events
    cardData.forEach(data => {
        data.el.addEventListener('mouseenter', () => { data.isHovered = true; });
        data.el.addEventListener('mouseleave', () => { data.isHovered = false; });
    });

    function animate() {
        cardData.forEach(cd => {
            if (!cd.isHovered) {
                cd.x += cd.vx;
                cd.y += cd.vy;

                // Dynamic calculation of bounds
                const maxW = cd.wrapper.clientWidth - cd.el.offsetWidth;
                const maxH = cd.wrapper.clientHeight - cd.el.offsetHeight;

                // Bounce X
                if (cd.x <= 0) {
                    cd.x = 0;
                    cd.vx = Math.abs(cd.vx);
                } else if (cd.x >= maxW && maxW > 0) {
                    cd.x = maxW;
                    cd.vx = -Math.abs(cd.vx);
                }

                // Bounce Y
                if (cd.y <= 0) {
                    cd.y = 0;
                    cd.vy = Math.abs(cd.vy);
                } else if (cd.y >= maxH && maxH > 0) {
                    cd.y = maxH;
                    cd.vy = -Math.abs(cd.vy);
                }
            }

            // Apply transform (Only on desktop)
            cd.el.style.transform = `translate3d(${cd.x}px, ${cd.y}px, 0)`;
        });
        
        requestAnimationFrame(animate);
    }

    console.log("Starting animation loop");
    animate();
}

// Running it directly since it's a defer script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBouncingCards);
} else {
    initBouncingCards();
}
