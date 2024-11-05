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
