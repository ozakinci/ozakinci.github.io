// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Account for sticky navigation
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active navigation item based on scroll position
    function highlightActiveNav() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.clientHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', highlightActiveNav);
    
    // Add animation on scroll for cards
    function animateOnScroll() {
        const cards = document.querySelectorAll('.day-card, .beach-card, .restaurant-card, .sight-card, .tip-card, .overview-card');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardVisible = 150;
            
            if (cardTop < window.innerHeight - cardVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize cards with animation styles
    const cards = document.querySelectorAll('.day-card, .beach-card, .restaurant-card, .sight-card, .tip-card, .overview-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on page load
    animateOnScroll();
    
    // Add click functionality to day cards for better mobile experience
    const dayCards = document.querySelectorAll('.day-card');
    dayCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle expanded state for mobile
            this.classList.toggle('expanded');
        });
    });
    
    // Add search functionality
    function addSearchFunctionality() {
        // Create search input
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="searchInput" placeholder="Search activities, restaurants, beaches..." />
            <button id="clearSearch">Clear</button>
        `;
        
        // Add search styles
        const searchStyles = `
            .search-container {
                margin: 1rem 0;
                text-align: center;
            }
            
            #searchInput {
                padding: 0.8rem;
                font-size: 1rem;
                border: 2px solid #007bff;
                border-radius: 25px;
                width: 300px;
                max-width: 90%;
                outline: none;
            }
            
            #searchInput:focus {
                box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
            }
            
            #clearSearch {
                margin-left: 0.5rem;
                padding: 0.8rem 1.5rem;
                background-color: #6c757d;
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.9rem;
            }
            
            #clearSearch:hover {
                background-color: #5a6268;
            }
            
            .highlight {
                background-color: yellow;
                font-weight: bold;
            }
            
            .hidden {
                display: none !important;
            }
        `;
        
        // Add styles to head
        const styleSheet = document.createElement('style');
        styleSheet.textContent = searchStyles;
        document.head.appendChild(styleSheet);
        
        // Insert search container after navigation
        const nav = document.querySelector('nav');
        nav.parentNode.insertBefore(searchContainer, nav.nextSibling);
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const clearButton = document.getElementById('clearSearch');
        
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const searchableElements = document.querySelectorAll('.day-card, .beach-card, .restaurant-card, .sight-card');
            
            // Clear previous highlights
            document.querySelectorAll('.highlight').forEach(el => {
                el.outerHTML = el.innerHTML;
            });
            
            if (searchTerm === '') {
                // Show all elements
                searchableElements.forEach(el => {
                    el.classList.remove('hidden');
                });
                return;
            }
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                
                if (text.includes(searchTerm)) {
                    element.classList.remove('hidden');
                    
                    // Highlight search term
                    const regex = new RegExp(`(${searchTerm})`, 'gi');
                    const walker = document.createTreeWalker(
                        element,
                        NodeFilter.SHOW_TEXT,
                        null,
                        false
                    );
                    
                    const textNodes = [];
                    let node;
                    while (node = walker.nextNode()) {
                        textNodes.push(node);
                    }
                    
                    textNodes.forEach(textNode => {
                        if (textNode.textContent.toLowerCase().includes(searchTerm)) {
                            const highlightedText = textNode.textContent.replace(regex, '<span class="highlight">$1</span>');
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = highlightedText;
                            
                            while (tempDiv.firstChild) {
                                textNode.parentNode.insertBefore(tempDiv.firstChild, textNode);
                            }
                            textNode.remove();
                        }
                    });
                } else {
                    element.classList.add('hidden');
                }
            });
        }
        
        function clearSearch() {
            searchInput.value = '';
            document.querySelectorAll('.highlight').forEach(el => {
                el.outerHTML = el.innerHTML;
            });
            document.querySelectorAll('.hidden').forEach(el => {
                el.classList.remove('hidden');
            });
        }
        
        searchInput.addEventListener('input', performSearch);
        clearButton.addEventListener('click', clearSearch);
    }
    
    // Initialize search functionality
    addSearchFunctionality();
    
    // Add print functionality
    function addPrintButton() {
        const printButton = document.createElement('button');
        printButton.textContent = '🖨️ Print Guide';
        printButton.className = 'print-button';
        printButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 50px;
            cursor: pointer;
            font-size: 1rem;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        printButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.backgroundColor = '#0056b3';
        });
        
        printButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '#007bff';
        });
        
        document.body.appendChild(printButton);
    }
    
    // Initialize print button
    addPrintButton();
    
    // Add back to top functionality
    function addBackToTop() {
        const backToTopButton = document.createElement('button');
        backToTopButton.textContent = '↑';
        backToTopButton.className = 'back-to-top';
        backToTopButton.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background-color: #28a745;
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            width: 50px;
            height: 50px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.transform = 'scale(1)';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.transform = 'scale(0.8)';
            }
        });
        
        document.body.appendChild(backToTopButton);
    }
    
    // Initialize back to top button
    addBackToTop();
});

// Add active class style for navigation
const navActiveStyle = document.createElement('style');
navActiveStyle.textContent = `
    nav a.active {
        background-color: #007bff;
        color: white;
    }
`;
document.head.appendChild(navActiveStyle);

