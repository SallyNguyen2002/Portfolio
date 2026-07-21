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

    // Open navigation menu for mobile version
        const hamburger = document.querySelector(".hamburger");
        const menu = document.getElementById("nav-menu");
        const menuIcon = document.querySelector(".menu-icon");

        if (!hamburger || !menu || !menuIcon) return;

        const menuImage = menuIcon.dataset.menu;
        const closeImage = menuIcon.dataset.close;

        hamburger.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("active");

            hamburger.classList.toggle("active", isOpen);
            document.body.classList.toggle("menu-open", isOpen);

            menuIcon.src = isOpen ? closeImage : menuImage;
            hamburger.setAttribute("aria-expanded", isOpen);
        });

        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("active");
                hamburger.classList.remove("active");
                document.body.classList.remove("menu-open");

                menuIcon.src = menuImage;
                hamburger.setAttribute("aria-expanded", "false");
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                menu.classList.remove("active");
                hamburger.classList.remove("active");
                document.body.classList.remove("menu-open");

                menuIcon.src = menuImage;
                hamburger.setAttribute("aria-expanded", "false");
            }
        });

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

