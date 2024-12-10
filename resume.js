// select the navbar
const navbar = document.querySelector(".navbar");

// select the header
const header = document.querySelector("#index-cover-background");

let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(()=> {
            if (window.scrollY > 0) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove('scrolled');
            }
            header.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Side navigation bar and burger button
const sideNavbar = document.getElementById('side-navbar');
const burgerButton = document.getElementById("burger-button");
const navLinks = document.querySelectorAll(".nav-links li");
const body = document.body;
const dimOverlay = document.getElementById("dime-overlay");


// Function to add animation to nav links
function addAnimationToNavLinks() {
    navLinks.forEach((link, index) => {
        link.style.animation = `slideText 0.4s ease forwards ${0.2 + index * 0.1}s`;
    });
}

// Function to remove animation from nav links
function removeAnimationFromNavLinks() {
    navLinks.forEach((link) => {
        link.style.animation = 'none';
    });

    setTimeout(() => {
        navLinks.forEach((link) => {
            link.removeAttribute('style');
        });
    }, 500);
}

// Toggle the side navbar and burger button when clicked
burgerButton.addEventListener('click', (e) => {
    e.stopPropagation();

    

    // If the button is active (menu is open), close the menu
    if (burgerButton.classList.contains("active")) {
        closeNavBar();
        body.classList.remove("dimmed");
    } 
    // Otherwise, open the menu
    else {
        burgerButton.classList.add("active");
        sideNavbar.classList.add("active");
        addAnimationToNavLinks();

        // Dim the body
        body.classList.add("dimmed");
    }
});

function closeNavBar() {
    if (burgerButton.classList.contains("active")) {
        // Remove active state and add closing state for animation
        burgerButton.classList.remove('active');
        burgerButton.classList.add("closing");

        sideNavbar.classList.remove('active');
        removeAnimationFromNavLinks();

        // remove dim from the  body
        body.classList.remove("dimmed");
        
        // Wait for the reverse animation to finish
        setTimeout(() => {
            burgerButton.classList.remove("closing");
        }, 500); // Match the duration of rotate360-reverse
    }
}


// Close navbar if clicked outside of the burger button or navbar
document.addEventListener("click", (e) => {
    if (!sideNavbar.contains(e.target) && !burgerButton.contains(e.target)) {
    closeNavBar();
    }
});


// Reset navbar if resized above a certain width
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) { // Adjust the breakpoint as needed
        closeNavBar();
    }
});


// Lazy Background Image Loader
document.addEventListener("DOMContentLoaded", function () {
    const lazyBgElements = document.querySelectorAll(".lazy-bg");

    const lazyLoadBg = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bgElement = entry.target;
                const bgImage = bgElement.getAttribute("data-bg");
                bgElement.style.backgroundImage = `url(${bgImage})`;
                bgElement.classList.add("loaded");
                observer.unobserve(bgElement);
            }
        });
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(lazyLoadBg, {
            root: null,
            threshold: 0.1
        });

        lazyBgElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        lazyBgElements.forEach(bgElement => {
            const bgImage = bgElement.getAttribute("data-bg");
            bgElement.style.backgroundImage = `url(${bgImage})`;
            bgElement.classList.add("loaded");
        });
    }
});
