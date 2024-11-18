document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Toggle navigation menu (for mobile)
    function toggleMenu() {
        const menu = document.getElementById('nav-menu');
        menu.classList.toggle('active');
    }

    // Back to Top Button Functionality
    const scrollToTopBtn = document.querySelector(".scroll-up-btn");

    if (scrollToTopBtn) {
        // Show the button after scrolling down 20px
        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };

        // Smooth scroll to the top when the button is clicked
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        console.warn("Scroll to top button not found.");
    }
    
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Set the year in the HTML
    document.getElementById('currentYear').textContent = currentYear;

    const greetingElement = document.getElementById("greeting");
    const welcomeContainer = document.getElementById("welcome");

    // Get the current hour
    const currentHour = new Date().getHours();

    // Determine the greeting and corresponding CSS class
    let greetingText;
    let cssClass;

    if (currentHour < 12) {
        greetingText = "Good morning!";
        cssClass = "morning";
    } else if (currentHour < 17) {
        greetingText = "Good afternoon!";
        cssClass = "afternoon";
    } else {
        greetingText = "Good evening!";
        cssClass = "evening";
    }

    // Update the greeting text
    greetingElement.textContent = greetingText;

    // Add the corresponding CSS class to the container
    welcomeContainer.classList.add(cssClass);
});
