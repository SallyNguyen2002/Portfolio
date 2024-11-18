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


    // FOOTER COPYRIGHT OF CURRENT YEAR
    const currentYear = new Date().getFullYear();

    document.getElementById('currentYear').textContent = currentYear;

    const greetingElement = document.getElementById("greeting");
    const welcomeContainer = document.getElementById("welcome");


    // GREETING TEXT
    const currentHour = new Date().getHours();

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

    greetingElement.textContent = greetingText;
    welcomeContainer.classList.add(cssClass);


    // Alert button
    const alertButton = document.getElementById("btn-alert");

    //display a message
    alertButton.addEventListener("click", function (event) {
        alert("Yay! You want to learn more about me??!!");
    });

    // Change the button text when the mouse is over it
    alertButton.onmouseover = function () {
        alertButton.innerText = "Wink wink <3";
    };

    // Revert the button text when the mouse leaves
    alertButton.onmouseout = function () {
        alertButton.innerText = "Learn More";
    };
});
