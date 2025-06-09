/**
 * Scrumptiously Sourdough - Enhanced JavaScript
 * Handles all UI interactions and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SCROLL REVEAL ANIMATIONS =====
    initScrollReveal();
    
    // ===== NAVIGATION =====
    initSmoothScrolling();
    initBurgerMenu();
    
    // ===== OVERLAYS AND MODALS =====
    initKitchenOverlay();
    initProjectModal();
    
    // ===== GLOBAL EVENT LISTENERS =====
    initGlobalEvents();
    
    /**
     * Initialize intersection observer for scroll reveal animations
     */
    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with reveal class
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    /**
     * Add smooth scrolling for navigation links
     */
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    /**
     * Initialize burger menu functionality
     */
    function initBurgerMenu() {
        const burgerMenu = document.getElementById('burgerMenu');
        const mobileNavMenu = document.getElementById('mobileNavMenu');

        if (!burgerMenu || !mobileNavMenu) return;

        // Burger menu click handler
        burgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            burgerMenu.classList.toggle('active');
            mobileNavMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on regular nav links
        document.querySelectorAll('#mobileNavMenu a[href^="#"]').forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                mobileNavMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!burgerMenu.contains(e.target) && !mobileNavMenu.contains(e.target)) {
                burgerMenu.classList.remove('active');
                mobileNavMenu.classList.remove('active');
            }
        });
    }
    
    /**
     * Initialize The Wild Yeast Kitchen overlay
     */
    function initKitchenOverlay() {
        const kitchenBtn = document.getElementById('kitchenStoryBtn');
        const kitchenBtnMobile = document.getElementById('kitchenStoryBtnMobile');
        const kitchenQuoteBtn = document.getElementById('kitchenQuoteBtn');
        const kitchenOverlay = document.getElementById('kitchenOverlay');
        const closeKitchen = document.getElementById('closeKitchen');
        const burgerMenu = document.getElementById('burgerMenu');
        const mobileNavMenu = document.getElementById('mobileNavMenu');

        if (!kitchenOverlay) return;

        // Function to open kitchen overlay
        function openKitchenOverlay(e) {
            e.preventDefault();
            e.stopPropagation();
            kitchenOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Event listeners for opening overlay
        kitchenBtn?.addEventListener('click', openKitchenOverlay);
        kitchenQuoteBtn?.addEventListener('click', openKitchenOverlay);

        // Mobile kitchen button - closes mobile menu first
        kitchenBtnMobile?.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Close mobile menu first
            if (burgerMenu && mobileNavMenu) {
                burgerMenu.classList.remove('active');
                mobileNavMenu.classList.remove('active');
            }
            // Then open kitchen overlay
            kitchenOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close kitchen overlay
        closeKitchen?.addEventListener('click', function() {
            kitchenOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    /**
     * Initialize Project Story Modal
     */
    function initProjectModal() {
        const forgeheartCredit = document.getElementById('forgeheartCredit');
        const projectModal = document.getElementById('projectModal');
        const closeModal = document.getElementById('closeModal');

        if (!projectModal) return;

        // Open modal function
        function openProjectModal(e) {
            e.preventDefault();
            projectModal.classList.remove('hidden');
            setTimeout(() => projectModal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
        }

        // Event listeners for opening modal
        forgeheartCredit?.addEventListener('click', openProjectModal);

        // Close modal function
        function closeProjectModal() {
            projectModal.classList.remove('active');
            setTimeout(() => {
                projectModal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }

        // Close modal event listeners
        closeModal?.addEventListener('click', closeProjectModal);

        // Close modal on backdrop click
        projectModal?.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }
    
    /**
     * Initialize global event listeners
     */
    function initGlobalEvents() {
        // Close overlays and modals on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const kitchenOverlay = document.getElementById('kitchenOverlay');
                const projectModal = document.getElementById('projectModal');
                
                if (kitchenOverlay?.classList.contains('active')) {
                    kitchenOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                if (projectModal && !projectModal.classList.contains('hidden')) {
                    projectModal.classList.remove('active');
                    setTimeout(() => {
                        projectModal.classList.add('hidden');
                        document.body.style.overflow = '';
                    }, 300);
                }
            }
        });
    }
});