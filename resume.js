// Side navigation bar and burger button
const sideNavbar = document.getElementById('side-navbar');
const burgerButton = document.getElementById("burger-button");
const navLinks = document.querySelectorAll(".nav-links li");

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
    } 
    // Otherwise, open the menu
    else {
        burgerButton.classList.add("active");
        sideNavbar.classList.add("active");
        addAnimationToNavLinks();
    }
});

function closeNavBar() {
    if (burgerButton.classList.contains("active")) {
        // Remove active state and add closing state for animation
        burgerButton.classList.remove('active');
        burgerButton.classList.add("closing");

        sideNavbar.classList.remove('active');
        removeAnimationFromNavLinks();

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
