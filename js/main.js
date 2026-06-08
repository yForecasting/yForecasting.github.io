// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Only proceed if elements exist (for multi-page compatibility)
    if (navToggle && navMenu) {
        // Toggle mobile menu
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);

            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Set active navigation link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(function (link) {
            link.classList.remove('active');

            // Get the href attribute and extract the filename
            const linkHref = link.getAttribute('href');
            const linkPage = linkHref ? linkHref.split('/').pop() : '';

            // Set active for exact matches or for index page when on root
            if (linkPage === currentPage ||
                (currentPage === 'index.html' && linkHref === 'index.html') ||
                (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Set initial active nav link
    setActiveNavLink();

    // Handle navigation action buttons (search and dark mode)
    const actionButtons = document.querySelectorAll('.nav-action-btn');

    actionButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const ariaLabel = this.getAttribute('aria-label');

            if (ariaLabel === 'Search') {
                // Placeholder for search functionality
                console.log('Search functionality would be implemented here');
            } else if (ariaLabel === 'Toggle dark mode') {
                // Placeholder for dark mode toggle
                console.log('Dark mode toggle would be implemented here');
                toggleDarkMode();
            }
        });
    });

    // Simple dark mode toggle (placeholder implementation)
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');

        // Store preference in localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    }

    // Load dark mode preference on page load
    function loadDarkModePreference() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
    }

    // Load preference on page load
    loadDarkModePreference();

    // Smooth scrolling for internal anchor links, excluding UI controls that handle state locally
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not(.teaching-tab):not(.teaching-nav-card)');

    anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar height

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading state management for page transitions
    function addLoadingStateToLinks() {
        const pageLinks = document.querySelectorAll('a[href$=".html"]');

        pageLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                // Add a small loading indicator (optional)
                document.body.style.cursor = 'wait';

                // Reset cursor after a short delay (in case navigation is instant)
                setTimeout(function () {
                    document.body.style.cursor = 'default';
                }, 500);
            });
        });
    }

    // Initialize loading states
    addLoadingStateToLinks();

    // Handle profile audio icon click (placeholder)
    const profileAudioIcon = document.querySelector('.profile-audio-icon');
    if (profileAudioIcon) {
        profileAudioIcon.addEventListener('click', function () {
            console.log('Profile audio functionality would be implemented here');
            // You could implement actual audio playbook here
        });
    }

    // Abstract functionality for publications and projects pages
    function initializeAbstractFunctionality() {
        const abstractButtons = document.querySelectorAll('.abstract-btn');
        const clickableTitles = document.querySelectorAll('.clickable-title');

        // Handle abstract button clicks
        abstractButtons.forEach(function (button) {
            button.addEventListener('click', function (e) {
                const abstractId = this.getAttribute('data-abstract');
                if (!abstractId) {
                    return;
                }

                e.preventDefault(); // Prevent default link behavior only for abstract toggles
                toggleAbstract(abstractId);
            });
        });

        // Handle clickable title clicks
        clickableTitles.forEach(function (title) {
            title.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default behavior
                const abstractId = this.getAttribute('data-abstract');
                toggleAbstract(abstractId);
            });
        });
    }

    function toggleAbstract(abstractId) {
        const abstractContainer = document.getElementById('abstract-' + abstractId);

        if (!abstractContainer) {
            console.warn('Abstract container not found for ID:', abstractId);
            return;
        }

        // Close all other open abstracts first
        const allAbstracts = document.querySelectorAll('.abstract-container');
        allAbstracts.forEach(function (container) {
            if (container.id !== 'abstract-' + abstractId) {
                container.classList.remove('active');
            }
        });

        // Toggle the clicked abstract
        abstractContainer.classList.toggle('active');

        // Scroll to the abstract if it's being opened
        if (abstractContainer.classList.contains('active')) {
            setTimeout(function () {
                const offsetTop = abstractContainer.offsetTop - 100; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 150); // Small delay to allow for animation
        }
    }

    function closeAllAbstracts() {
        const allAbstracts = document.querySelectorAll('.abstract-container');
        allAbstracts.forEach(function (container) {
            container.classList.remove('active');
        });
    }

    function initializeTeachingTabs() {
        const tabs = document.querySelectorAll('.teaching-tab');
        const panels = document.querySelectorAll('.teaching-panel');

        if (!tabs.length || !panels.length) {
            return;
        }

        function activateTab(targetId) {
            tabs.forEach(function (tab) {
                const isActive = tab.getAttribute('data-tab-target') === targetId;
                tab.classList.toggle('active', isActive);
                tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            panels.forEach(function (panel) {
                const isActive = panel.id === targetId;
                panel.classList.toggle('active', isActive);
                panel.hidden = !isActive;
            });

            closeAllAbstracts();
        }

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                const targetId = this.getAttribute('data-tab-target');
                if (targetId) {
                    activateTab(targetId);
                }
            });
        });

        activateTab('supervised-work-panel');
    }

    // Initialize abstract functionality if we're on pages that use it
    if (window.location.pathname.includes('publications.html') ||
        window.location.pathname.includes('projects.html') ||
        window.location.pathname.includes('teaching.html') ||
        document.querySelector('.publications-content') ||
        document.querySelector('.projects-content') ||
        document.querySelector('.supervision-projects')) {
        initializeAbstractFunctionality();
    }

    if (window.location.pathname.includes('teaching.html') ||
        document.querySelector('.teaching-tabs')) {
        initializeTeachingTabs();
    }
});

// Download slides functionality for teaching page
function downloadSlides(filename) {
    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = `../assets/lectures/${filename}`;
    link.download = filename;
    link.style.display = 'none';

    // Add to DOM temporarily
    document.body.appendChild(link);

    // Trigger download
    link.click();

    // Clean up
    document.body.removeChild(link);

    // Optional: Show feedback to user
    console.log(`Downloading: ${filename}`);
}
