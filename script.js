// select the navbar
const navbar = document.querySelector(".navbar");

// select the header
const header = document.querySelector("#index-cover-background");

// add the scroll event listener to the window
window.addEventListener('scroll', () => {
    // check if the page has been scrolled down (greater than 0)
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    }
    else {
        navbar.classList.remove('scrolled');
    }

    // header background image scroll speed
    const scrollPosition = scrollY;
    header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});


// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    fetch('https://formspree.io/f/xnnqvwnv', {
        method: 'POST',
        body: formData,
        headers: {
        'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
        document.querySelector('.confirmation-message').style.display = 'block';
        form.reset();

        setTimeout(() => {
            document.querySelector('.confirmation-message').style.display = 'none';
        }, 5000);
        } else {
        alert('There was an error submitting the form.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the form.');
    });
});

// Slides
let slideIndex = 0;
let slideInterval;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slides");
    let slides_title = document.getElementsByClassName("slides-title");

    for (let i=0; i<slides.length; i++) {
        slides[i].style.display="none";
    }

    for (let i=0; i<slides_title.length; i++) {
        slides_title[i].style.display="none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {slideIndex=1;}
    slides[slideIndex-1].style.display="block";
    slides_title[slideIndex-1].style.display="block";
}

function startSlideshow() {
    slideInterval = setInterval(() => {
        showSlides();
    }, 3000)
}

function plusSlides(n) {
    clearInterval(slideInterval);
    slideIndex += n;
    let slides = document.getElementsByClassName("slides");
    let slides_title = document.getElementsByClassName("slides-title");
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }

    for (let i=0; i<slides.length; i++) {
        slides[i].style.display="none";
    }
    for (let i=0; i<slides_title.length; i++) {
        slides_title[i].style.display="none";
    }
    slides[slideIndex-1].style.display="block";
    slides_title[slideIndex-1].style.display="block";
    startSlideshow()
}

showSlides()
startSlideshow()


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
    burgerButton.classList.toggle("active");
    sideNavbar.classList.toggle('active');

    // Add animation to nav links when the side navbar is open
    if (sideNavbar.classList.contains("active")) {
        addAnimationToNavLinks();
    } else {
        removeAnimationFromNavLinks();
    }
});

function closeNavBar() {
    burgerButton.classList.remove('active');
    sideNavbar.classList.remove('active');
    removeAnimationFromNavLinks();
};


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


// GTag
function gtagResumeDownload() {
    gtag('event', 'download', {
        'event_category': 'File',
        'event_label': 'Resume.pdf',
        'value': 1
    });
}

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
