/**
 * Utility function to add the same event listener to multiple elements
 * @param {NodeList} elements - The elements to which the event will be added
 * @param {string} eventType - The type of event (e.g., 'click')
 * @param {Function} callback - The function to be executed when the event occurs
 */
const addEventOnElements = (elements, eventType, callback) => {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventType, callback);
    }
};

// Handle loading screen: Removes the loading overlay and activates the body once the window is fully loaded
const loadingElement = document.querySelector('[data-loading]');
window.addEventListener('load', () => {
    loadingElement.classList.add('loaded'); // Mark loading as complete
    document.body.classList.remove('active'); // Re-enable body scrolling
});

// Mobile navigation toggle
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const navLinks = document.querySelectorAll('.navbar-item');
const navbar = document.querySelector('[data-navbar]');
const overlay = document.querySelector('[data-overlay]');

/**
 * Toggles the mobile navigation menu, overlay, and body scroll
 */
const toggleNav = () => {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('active'); // Disable body scroll when nav is open
};

// Attach the toggleNav function to each nav toggle button
addEventOnElements(navTogglers, 'click', toggleNav);

/**
 * Closes the mobile navigation menu when a nav link is clicked
 */
const closeNav = function () {
    navbar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('active');
};

// Attach the closeNav function to each nav link
addEventOnElements(navLinks, 'click', closeNav);

// Header: Add/remove active class based on scroll position
const header = document.querySelector('[data-header]');

/**
 * Adds an active class to the header when scrolled down
 */
const activeElementsOnScroll = function () {
    if (window.scrollY > 100) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
};

// Add scroll event to manage header visibility
window.addEventListener('scroll', activeElementsOnScroll);

// Hero Animation: Adds letter-by-letter animation effect
const letterBoxes = document.querySelectorAll('[data-letter-effect]');
let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

/**
 * Adds animation to letters inside the hero section
 */

const setLetterEffect = function () {
    for (let i = 0; i < letterBoxes.length; i++) {
        let letterAnimationDelay = 0;
        const letters = letterBoxes[i].textContent.trim();
        letterBoxes[i].textContent = ''; // Clear text for animation

        for (let j = 0; j < letters.length; j++) {
            const span = document.createElement('span');
            span.style.animationDelay = `${letterAnimationDelay}s`; // Stagger animation
            span.classList.add(i === activeLetterBoxIndex ? 'in' : 'out');
            span.textContent = letters[j];
            if (letters[j] === ' ') span.classList.add('space');
            letterBoxes[i].appendChild(span);

            letterAnimationDelay += 0.05;
        }

        if (i === activeLetterBoxIndex) {
            totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
        }
        letterBoxes[i].classList.toggle(
            'active',
            i === lastActiveLetterBoxIndex
        );
    }

    // Loop through animations
    setTimeout(() => {
        lastActiveLetterBoxIndex = activeLetterBoxIndex;
        activeLetterBoxIndex = (activeLetterBoxIndex + 1) % letterBoxes.length;
        setLetterEffect();
    }, totalLetterBoxDelay * 1000 + 3000); // Delay between loops
};

// Start the letter animation effect once the page is loaded
window.addEventListener('load', () => {
    setLetterEffect();
});

// Back-to-top button: Display percentage scrolled
const backTopBtn = document.querySelector('[data-back-top-btn]');

window.addEventListener('scroll', function () {
    const bodyHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollEndPos = bodyHeight - windowHeight;
    const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

    backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`; // Update text

    if (totalScrollPercent > 5) {
        backTopBtn.classList.add('show');
    } else {
        backTopBtn.classList.remove('show');
    }
});

// Scroll reveal: Reveal elements as they come into the viewport
const revealElements = document.querySelectorAll('[data-reveal]');

/**
 * Adds a reveal effect to elements when they come into view
 */
const scrollReveal = function () {
    for (let i = 0; i < revealElements.length; i++) {
        const elementIsInScreen =
            revealElements[i].getBoundingClientRect().top <
            window.innerHeight / 1.15;

        revealElements[i].classList.toggle('revealed', elementIsInScreen);
    }
};

// Attach scroll reveal effect
window.addEventListener('scroll', scrollReveal);
scrollReveal(); // Initial call to reveal elements already in view

// Custom cursor behavior
const cursor = document.querySelector('[data-cursor]');
const anchorElements = document.querySelectorAll('a');
const buttons = document.querySelectorAll('button');

// Update cursor position based on mouse movement
document.body.addEventListener('mousemove', (e) => {
    setTimeout(() => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
    }, 100); // Smooth update
});

// Highlight cursor when hovering over links/buttons
const hoverActive = function () {
    cursor.classList.add('hovered');
};
const hoverDeactive = function () {
    cursor.classList.remove('hovered');
};

// Attach hover effects to anchors and buttons
addEventOnElements(anchorElements, 'mouseover', hoverActive);
addEventOnElements(anchorElements, 'mouseout', hoverDeactive);
addEventOnElements(buttons, 'mouseover', hoverActive);
addEventOnElements(buttons, 'mouseout', hoverDeactive);
