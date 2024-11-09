// Select DOM elements
const colorPicker = document.getElementById("colorPicker");
const colorCode = document.getElementById("colorCode");
const paletteContainer = document.getElementById("paletteContainer");
const generateBtn = document.getElementById("generateBtn");

// Update color code when color picker changes
colorPicker.addEventListener("input", () => {
    colorCode.value = colorPicker.value;
});

// Generate random colors
generateBtn.addEventListener("click", generateRandomColors);

function generateRandomColors() {
    paletteContainer.innerHTML = ""; // Clear existing colors
    for (let i = 0; i < 6; i++) {
        const color = getRandomHexColor();
        const colorBox = document.createElement("div");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = color;
        colorBox.title = color; // Show color hex on hover
        paletteContainer.appendChild(colorBox);
    }
}

// Placeholder sorting function
function sortPalette(type) {
    console.log(`Sorting with ${type} sort`); // Corrected string interpolation
}

// Helper function to generate a random hex color
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}
