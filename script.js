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
        });
    });

    // Menu Filter Logic
    const filterBtns = document.querySelectorAll('.menu-filter-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Auto-scroll the clicked button into view (centered)
            const container = btn.parentElement;
            const scrollLeftPos = btn.offsetLeft - (container.offsetWidth / 2) + (btn.offsetWidth / 2);
            container.scrollTo({
                left: scrollLeftPos,
                behavior: 'smooth'
            });

            const filterValue = btn.getAttribute('data-filter');

            menuCategories.forEach(category => {
                if (filterValue === 'all' || category.getAttribute('data-category') === filterValue) {
                    category.style.display = 'flex';
                    // Small delay to allow display flex to apply before opacity transition
                    setTimeout(() => {
                        category.style.opacity = '1';
                        category.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    category.style.opacity = '0';
                    category.style.transform = 'translateY(10px)';
                    // Wait for transition before hiding
                    setTimeout(() => {
                        category.style.display = 'none';
                    }, 400); // Matches CSS transition duration
                }
            });
        });
    });
    // Menu Scroll Buttons Logic (Mobile)
    const menuFiltersContainer = document.querySelector('.menu-filters');
    const scrollLeftBtn = document.querySelector('.menu-scroll-btn.left');
    const scrollRightBtn = document.querySelector('.menu-scroll-btn.right');

    if (menuFiltersContainer && scrollLeftBtn && scrollRightBtn) {
        const scrollAmount = 150; // Amount to scroll per click

        scrollLeftBtn.addEventListener('click', () => {
            menuFiltersContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            menuFiltersContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        
        // Optional: Hide buttons if at start/end of scroll
        menuFiltersContainer.addEventListener('scroll', () => {
            // If scrolled to the very beginning
            if (menuFiltersContainer.scrollLeft <= 0) {
                scrollLeftBtn.style.opacity = '0.5';
                scrollLeftBtn.style.pointerEvents = 'none';
            } else {
                scrollLeftBtn.style.opacity = '1';
                scrollLeftBtn.style.pointerEvents = 'auto';
            }

            // If scrolled to the very end
            if (menuFiltersContainer.scrollLeft + menuFiltersContainer.clientWidth >= menuFiltersContainer.scrollWidth - 1) {
                scrollRightBtn.style.opacity = '0.5';
                scrollRightBtn.style.pointerEvents = 'none';
            } else {
                scrollRightBtn.style.opacity = '1';
                scrollRightBtn.style.pointerEvents = 'auto';
            }
        });
        
        // Trigger scroll event once to set initial button states
        menuFiltersContainer.dispatchEvent(new Event('scroll'));
    }

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Auto-filter trigger for buttons pointing to sectors with filters
    document.querySelectorAll('[data-filter-trigger]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const filterValue = trigger.getAttribute('data-filter-trigger');
            const targetBtn = document.querySelector(`.menu-filter-btn[data-filter="${filterValue}"]`);
            if (targetBtn) {
                targetBtn.click();
            }
        });
    });

    // Universal Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // For mobile, we might need a small delay if the burger menu is closing
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });



    // Gallery Modal Logic
    const galleryModal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('prevImg');
    const nextBtn = document.getElementById('nextImg');
    const galleryTriggers = document.querySelectorAll('.btn-gallery');

    const galleryData = {
        wood: [
            { src: './assets/sauna_wood.png', alt: 'Парная на дровах' },
            { src: './assets/benefit_steam_rooms.png', alt: 'Традиционная парная' },
            { src: './assets/zone_family.png', alt: 'Уютная семейная сауна' }
        ],
        pool: [
            { src: './assets/bento_ice_pool.png', alt: 'Ледяной бассейн' },
            { src: './assets/benefit_pool_spa.png', alt: 'Водные процедуры' }
        ],
        relax: [
            { src: './assets/bento_relax.png', alt: 'Зона Релакса' },
            { src: './assets/benefit_relax_halls.png', alt: 'Залы отдыха' },
            { src: './assets/zone_lobby.png', alt: 'Лобби комплекса' }
        ],
        spa: [
            { src: './assets/bento_spa.png', alt: 'SPA-ритуалы' },
            { src: './assets/zone_khan.png', alt: 'VIP Ханская сауна' }
        ]
    };

    let currentZone = '';
    let currentIndex = 0;

    function openGallery(zone) {
        currentZone = zone;
        currentIndex = 0;
        updateModal();
        galleryModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    function updateModal() {
        const item = galleryData[currentZone][currentIndex];
        modalImg.src = item.src;
        modalCaption.textContent = item.alt;
    }

    galleryTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openGallery(btn.dataset.zone);
        });
    });

    closeBtn.addEventListener('click', () => {
        galleryModal.classList.remove('show');
        document.body.style.overflow = '';
    });

    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryData[currentZone].length) % galleryData[currentZone].length;
        updateModal();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryData[currentZone].length;
        updateModal();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!galleryModal.classList.contains('show')) return;
        
        if (e.key === 'Escape') closeBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });
});
