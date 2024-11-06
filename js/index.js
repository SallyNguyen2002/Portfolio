let introText = "Welcome To My ";
let portfolioText = "Portfolio";
let index = 0;

function typeIntro() {
    const introElement = document.getElementById("intro-text");

    if (index < introText.length) {
        introElement.innerHTML += introText.charAt(index);
        index++;
        setTimeout(typeIntro, 100);
    } else {
        index = 0; // Reset index for the next text
        typePortfolio(); // Start typing "Portfolio"
    }
}

function typePortfolio() {
    const portfolioElement = document.getElementById("portfolio-text");

    if (index < portfolioText.length) {
        portfolioElement.innerHTML += portfolioText.charAt(index);
        index++;
        setTimeout(typePortfolio, 100);
    }
}

// Start the typing effect when the page loads
document.addEventListener("DOMContentLoaded", typeIntro);


$(document).ready(function() {
    var $tickerWrapper = $(".tickerwrapper");
    var $list = $tickerWrapper.find("ul.list");
    var $clonedList = $list.clone();
    var listWidth = 0;

    // Calculate total width of the list
    $list.find("li").each(function() {
        listWidth += $(this).outerWidth(true);
    });

    // Set widths for animation
    $list.add($clonedList).css({
        "width": listWidth + "px"
    });

    // Append cloned list for infinite effect
    $clonedList.addClass("cloned").appendTo($tickerWrapper);

    // Create GSAP timeline
    var time = 20; // Duration for scrolling effect
    var infinite = gsap.timeline({ repeat: -1, paused: true });

    infinite
      .fromTo($list, time, { x: 0 }, { x: -listWidth, ease: "none" })
      .fromTo($clonedList, time, { x: listWidth }, { x: 0, ease: "none" }, 0);

    // Play the animation
    infinite.play();

    // Pause on hover
    $tickerWrapper.on("mouseenter", function() {
        infinite.pause();
    }).on("mouseleave", function() {
        infinite.play();
    });
});
