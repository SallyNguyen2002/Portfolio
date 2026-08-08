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
       STAGGERED SCROLL REVEAL
    ========================================= */

    const revealSelector =
        "section h1, section h2, section h3, section h4, section p, section .button";


    const revealElements =
        document.querySelectorAll(
            revealSelector
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        const section =
            element.closest("section");


        if (section) {

            const sectionElements =
                Array.from(
                    section.querySelectorAll(
                        "h1, h2, h3, h4, p, .button"
                    )
                );


            const position =
                sectionElements.indexOf(
                    element
                );


            element.style.setProperty(
                "--delay",
                `${position * 0.12}s`
            );
        }

    });


    /* =========================================
       REVEAL OBSERVER
    ========================================= */

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("active");


                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    document
        .querySelectorAll(".reveal")
        .forEach(element => {

            revealObserver.observe(
                element
            );

        });

});