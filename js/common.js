document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       SMOOTH SCROLLING FOR ANCHOR LINKS
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            // Ignore links that are only "#"
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const hamburger = document.querySelector(".hamburger");
    const menu = document.getElementById("nav-menu");
    const menuIcon = document.querySelector(".menu-icon");

    // Only run navigation code if all elements exist
    if (hamburger && menu && menuIcon) {

        const menuImage = menuIcon.dataset.menu;
        const closeImage = menuIcon.dataset.close;

        hamburger.addEventListener("click", () => {

            const isOpen = menu.classList.toggle("active");

            hamburger.classList.toggle("active", isOpen);
            document.body.classList.toggle("menu-open", isOpen);

            menuIcon.src = isOpen ? closeImage : menuImage;

            hamburger.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });


        /* Close menu after clicking a navigation link */

        menu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menu.classList.remove("active");
                hamburger.classList.remove("active");
                document.body.classList.remove("menu-open");

                menuIcon.src = menuImage;

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });


        /* Reset navigation when returning to desktop */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {

                menu.classList.remove("active");
                hamburger.classList.remove("active");
                document.body.classList.remove("menu-open");

                menuIcon.src = menuImage;

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });
    }


    /* =========================================
       BACK TO TOP BUTTON
    ========================================= */

    const scrollToTopBtn =
        document.querySelector(".scroll-up-btn");

    if (scrollToTopBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 20) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }

        });


        scrollToTopBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* =========================================
       FOOTER CURRENT YEAR
    ========================================= */

    const currentYearElement =
        document.getElementById("currentYear");

    if (currentYearElement) {

        const currentYear =
            new Date().getFullYear();

        currentYearElement.textContent =
            currentYear;
    }


    /* =========================================
       GREETING TEXT
    ========================================= */

    const greetingElement =
        document.getElementById("greeting");

    const welcomeContainer =
        document.getElementById("welcome");


    if (greetingElement && welcomeContainer) {

        const currentHour =
            new Date().getHours();

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


        greetingElement.textContent =
            greetingText;

        welcomeContainer.classList.add(
            cssClass
        );
    }


    /* =========================================
       LEARN MORE ALERT BUTTON
    ========================================= */

    const alertButton =
        document.getElementById("btn-alert");


    if (alertButton) {

        alertButton.addEventListener(
            "click",
            () => {

                alert(
                    "Yay! You want to learn more about me??!!"
                );

            }
        );


        alertButton.addEventListener(
            "mouseover",
            () => {

                alertButton.innerText =
                    "Wink wink <3";

            }
        );


        alertButton.addEventListener(
            "mouseout",
            () => {

                alertButton.innerText =
                    "Learn More";

            }
        );
    }


    /* =========================================
    GLOBAL STAGGERED SCROLL REVEAL
    ========================================= */

    const revealElements = Array.from(
        document.querySelectorAll(`
            main h1,
            main h2,
            main h3,
            main h4,
            main h5,
            main h6,
            main p,
            main .line-text,
            main button:not(.hamburger):not(.scroll-up-btn),
            main .button
        `)
    );


    /* Add hidden state to everything */

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    /* =========================================
    CHECK IF ELEMENT IS ON SCREEN
    ========================================= */

    function isVisible(element) {

        const rect = element.getBoundingClientRect();

        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        );
    }


    /* =========================================
    STAGGER FUNCTION
    ========================================= */

    function staggerElements(elements) {

        const sortedElements = [...elements].sort((a, b) => {

            const aRect = a.getBoundingClientRect();
            const bRect = b.getBoundingClientRect();

            /* Top to bottom */
            if (Math.abs(aRect.top - bRect.top) > 10) {
                return aRect.top - bRect.top;
            }

            /* Left to right if same row */
            return aRect.left - bRect.left;

        });


        sortedElements.forEach((element, index) => {

            setTimeout(() => {

                element.classList.add("active");

            }, index * 180);

        });

    }


    /* =========================================
    INITIAL SCREEN
    ========================================= */

    /*
        Wait until browser has applied .reveal
        before showing anything.
    */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            const initiallyVisible =
                revealElements.filter(element =>
                    isVisible(element)
                );

            staggerElements(initiallyVisible);

        });

    });


    /* =========================================
    SCROLL REVEAL
    ========================================= */

    const observer = new IntersectionObserver(
        entries => {

            const newlyVisible = entries
                .filter(entry =>
                    entry.isIntersecting &&
                    !entry.target.classList.contains("active")
                )
                .map(entry => entry.target);


            if (newlyVisible.length === 0) return;


            /*
                Reveal everything that entered
                during this observer update
            */

            staggerElements(newlyVisible);


            newlyVisible.forEach(element => {
                observer.unobserve(element);
            });

        },

        {
            threshold: 0.1,
            rootMargin: "0px 0px -5% 0px"
        }
    );


    /* =========================================
    OBSERVE BELOW-SCREEN ELEMENTS
    ========================================= */

    revealElements.forEach(element => {

        if (!isVisible(element)) {
            observer.observe(element);
        }

    });
});