document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       SMOOTH SCROLLING FOR ANCHOR LINKS
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

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

        currentYearElement.textContent =
            new Date().getFullYear();
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
       TEXT + BUTTON STAGGER
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

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    /* =========================================
       IMAGE SCALE REVEAL
    ========================================= */

    const revealImages = Array.from(
        document.querySelectorAll("main img")
    );

    revealImages.forEach(image => {
        image.classList.add("reveal-image");
    });


    /* =========================================
       CHECK VIEWPORT
    ========================================= */

    function isVisible(element) {

        const rect =
            element.getBoundingClientRect();

        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        );
    }


    /* =========================================
       TEXT STAGGER FUNCTION
    ========================================= */

    function staggerElements(elements) {

        const sortedElements =
            [...elements].sort((a, b) => {

                const aRect =
                    a.getBoundingClientRect();

                const bRect =
                    b.getBoundingClientRect();

                if (
                    Math.abs(
                        aRect.top - bRect.top
                    ) > 10
                ) {
                    return aRect.top - bRect.top;
                }

                return aRect.left - bRect.left;
            });


        sortedElements.forEach(
            (element, index) => {

                setTimeout(() => {

                    element.classList.add(
                        "active"
                    );

                }, index * 180);

            }
        );
    }


    /* =========================================
       INITIAL TEXT
    ========================================= */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            const visibleText =
                revealElements.filter(
                    element =>
                        isVisible(element)
                );

            staggerElements(
                visibleText
            );

        });

    });


    /* =========================================
       TEXT SCROLL OBSERVER
    ========================================= */

    const textObserver =
        new IntersectionObserver(
            entries => {

                const newlyVisible =
                    entries
                        .filter(entry =>
                            entry.isIntersecting &&
                            !entry.target.classList.contains(
                                "active"
                            )
                        )
                        .map(
                            entry =>
                                entry.target
                        );

                if (
                    newlyVisible.length === 0
                ) {
                    return;
                }

                staggerElements(
                    newlyVisible
                );

                newlyVisible.forEach(
                    element => {

                        textObserver.unobserve(
                            element
                        );

                    }
                );

            },
            {
                threshold: 0.1
            }
        );


    revealElements.forEach(element => {

        if (!isVisible(element)) {

            textObserver.observe(
                element
            );
        }

    });


    /* =========================================
       IMAGE SCROLL OBSERVER
    ========================================= */

    const imageObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("active");

                        imageObserver.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    /* =========================================
       INITIAL IMAGES + SCROLL IMAGES
    ========================================= */

    revealImages.forEach(
        (image, index) => {

            if (isVisible(image)) {

                setTimeout(() => {

                    image.classList.add(
                        "active"
                    );

                }, 250 + (index * 120));

            } else {

                imageObserver.observe(
                    image
                );
            }

        }
    );


    /* =========================================
       CURSOR DRAWING CANVAS
    ========================================= */

    const drawingCanvas =
        document.createElement("canvas");

    drawingCanvas.id =
        "drawing-canvas";

    document.body.appendChild(
        drawingCanvas
    );

    const ctx =
        drawingCanvas.getContext("2d");


    /* =========================================
       BRAND COLORS
    ========================================= */

    const RED =
        "#9A3227";

    const BEIGE =
        "#eac08c";


    /* =========================================
       CANVAS SIZE
    ========================================= */

    function resizeDrawingCanvas() {

        const dpr =
            window.devicePixelRatio || 1;

        drawingCanvas.width =
            window.innerWidth * dpr;

        drawingCanvas.height =
            window.innerHeight * dpr;

        drawingCanvas.style.width =
            `${window.innerWidth}px`;

        drawingCanvas.style.height =
            `${window.innerHeight}px`;

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );
    }


    resizeDrawingCanvas();


    window.addEventListener(
        "resize",
        resizeDrawingCanvas
    );


    /* =========================================
       FIND BACKGROUND UNDER CURSOR
    ========================================= */

    function getDrawingColor(x, y) {

        let element =
            document.elementFromPoint(
                x,
                y
            );

        while (
            element &&
            element !==
            document.documentElement
        ) {

            const style =
                window.getComputedStyle(
                    element
                );

            const background =
                style.backgroundColor;

            if (
                background &&
                background !==
                    "transparent" &&
                background !==
                    "rgba(0, 0, 0, 0)"
            ) {

                const rgb =
                    background.match(
                        /rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/
                    );

                if (rgb) {

                    const r =
                        Number(rgb[1]);

                    const g =
                        Number(rgb[2]);

                    const b =
                        Number(rgb[3]);


                    /*
                        Compare to your brand red
                        #9A3227
                    */

                    const redDifference =
                        Math.abs(r - 154) +
                        Math.abs(g - 50) +
                        Math.abs(b - 39);


                    /*
                        Red-ish background
                        -> beige pencil
                    */

                    if (
                        redDifference < 80
                    ) {
                        return BEIGE;
                    }


                    /*
                        Dark background
                        -> beige pencil
                    */

                    const brightness =
                        (
                            r * 299 +
                            g * 587 +
                            b * 114
                        ) / 1000;

                    if (
                        brightness < 140
                    ) {
                        return BEIGE;
                    }


                    /*
                        Light background
                        -> red pencil
                    */

                    return RED;
                }
            }

            element =
                element.parentElement;
        }


        return RED;
    }


    /* =========================================
       STORE TRAIL POINTS
    ========================================= */

    const trailPoints = [];

    /*
        How long the line stays visible
        in milliseconds
    */

    const trailLife =
        1400;

    /*
        Ignore extremely tiny mouse
        movements
    */

    const minimumDistance =
        4;

    let lastX = null;
    let lastY = null;


    /* =========================================
       TRACK CURSOR
    ========================================= */

    document.addEventListener(
        "mousemove",
        event => {

            const x =
                event.clientX;

            const y =
                event.clientY;


            if (
                lastX !== null &&
                lastY !== null
            ) {

                const distance =
                    Math.hypot(
                        x - lastX,
                        y - lastY
                    );

                if (
                    distance <
                    minimumDistance
                ) {
                    return;
                }
            }


            const color =
                getDrawingColor(
                    x,
                    y
                );


            trailPoints.push({
                x: x,
                y: y,
                time: performance.now(),
                color: color
            });


            lastX = x;
            lastY = y;
        }
    );


    document.addEventListener(
        "mouseleave",
        () => {

            lastX = null;
            lastY = null;

        }
    );


    /* =========================================
       DRAW + FADE
    ========================================= */

    function drawTrail(currentTime) {

        /*
            Completely clear the canvas
            every frame.

            This prevents grey residue.
        */

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );


        /*
            Remove expired points.
        */

        while (
            trailPoints.length &&
            currentTime -
                trailPoints[0].time >
                trailLife
        ) {

            trailPoints.shift();
        }


        /*
            Draw trail segments.
        */

        for (
            let i = 1;
            i < trailPoints.length;
            i++
        ) {

            const previous =
                trailPoints[i - 1];

            const current =
                trailPoints[i];


            const distance =
                Math.hypot(
                    current.x -
                        previous.x,
                    current.y -
                        previous.y
                );


            /*
                Don't connect giant jumps.
            */

            if (distance > 80) {
                continue;
            }


            const age =
                currentTime -
                current.time;


            const opacity =
                Math.max(
                    0,
                    1 -
                        age /
                        trailLife
                );


            ctx.beginPath();


            ctx.moveTo(
                previous.x,
                previous.y
            );


            ctx.lineTo(
                current.x,
                current.y
            );


            /*
                Red/dark background
                -> beige line

                Light/beige background
                -> red line
            */

            if (
                current.color === BEIGE
            ) {

                ctx.strokeStyle =
                    `rgba(
                        234,
                        192,
                        140,
                        ${opacity}
                    )`;

            } else {

                ctx.strokeStyle =
                    `rgba(
                        154,
                        50,
                        39,
                        ${opacity}
                    )`;
            }


            ctx.lineWidth = 3;

            ctx.lineCap =
                "round";

            ctx.lineJoin =
                "round";

            ctx.stroke();
        }


        requestAnimationFrame(
            drawTrail
        );
    }


    requestAnimationFrame(
        drawTrail
    );

});