document.addEventListener('DOMContentLoaded', () => {
    // Burger Menu Logic
    const burgerBtn = document.querySelector('.burger-btn');
    const pillNav = document.querySelector('.pill-nav');
    const navLinks = document.querySelectorAll('.pill-nav a');

    if (burgerBtn && pillNav) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');
            pillNav.classList.toggle('active');
            document.body.style.overflow = pillNav.classList.contains('active') ? 'hidden' : '';
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('active');
                pillNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Pricing Features Toggle Logic
    const toggleButtons = document.querySelectorAll('.btn-features-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.pricing-card');
            const isExpanded = card.classList.toggle('expanded');
            
            const textSpan = button.querySelector('span');
            textSpan.textContent = isExpanded ? 'Скрыть' : 'Показать все преимущества';
            
            // Smooth reveal for items if they are displayed (handled by CSS transitions)
            if (isExpanded) {
                // Potential extra logic for height if needed, 
                // but CSS nth-child display toggle is specified.
            }
        });
    });
});
