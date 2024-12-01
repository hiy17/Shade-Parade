let hexColors = []; // To hold the colors provided by the user
const colorContainer = document.getElementById("color-container");
// const colorPicker = document.getElementById("colorPicker");
const colorCode = document.getElementById("colorCode");

// Updates the displayed hex code when the color picker changes
// colorPicker.addEventListener("input", function() {
//     colorCode.textContent = colorPicker.value;
// });

// Converts a hex color to an RGB object
function hexToRgb(hex) {
    return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16)
    };
}

// Calculates lightness for sorting based on HSL model
function calculateLightness(rgb) {
    const max = Math.max(rgb.r, rgb.g, rgb.b) / 255;
    const min = Math.min(rgb.r, rgb.g, rgb.b) / 255;
    return ((max + min) / 2) * 100; // Lightness in percentage for easier sorting
}

function calculateHue(rgb) {
    const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    if (delta === 0) return 0; // No hue if no difference in RGB
    let hue;
    if (max === r) {
        hue = ((g - b) / delta) % 6;
    } else if (max === g) {
        hue = (b - r) / delta + 2;
    } else {
        hue = (r - g) / delta + 4;
    }
    hue = Math.round(hue * 60);
    return hue < 0 ? hue + 360 : hue; // Ensure hue is in range [0, 360]
}

async function renderColors(colors, highlightIndex1 = -1, highlightIndex2 = -1) {
    colorContainer.innerHTML = "";
    colors.forEach((color, index) => {
        const div = document.createElement("div");
        div.classList.add("color-box");
        div.style.backgroundColor = color;
        div.textContent = color;
        if (index === highlightIndex1 || index === highlightIndex2) {
            div.classList.add("sorting");
        }
        colorContainer.appendChild(div);
    });
    await new Promise(resolve => setTimeout(resolve, 200));
}


// async function renderColors(colors, highlightIndex1 = -1, highlightIndex2 = -1) {
//     colorContainer.innerHTML = "";

//     const colorBoxes = [];
//     colors.forEach((color, index) => {
//         const div = document.createElement("div");
//         div.classList.add("color-box");
//         div.style.backgroundColor = color;
//         div.textContent = color;

//         if (index === highlightIndex1 || index === highlightIndex2) {
//             div.classList.add("sorting");
//         }

//         colorContainer.appendChild(div);

//         colorBoxes.push({
//             element: div,
//             position: index * 56,
//         });
//     });

//     if (highlightIndex1 !== -1 && highlightIndex2 !== -1) {
//         const box1 = colorBoxes[highlightIndex1];
//         const box2 = colorBoxes[highlightIndex2];

//         box1.element.style.transition = "transform 0.5s ease";
//         box2.element.style.transition = "transform 0.5s ease";

//         box1.element.style.transform = `translateX(${box2.position - box1.position}px)`;
//         box2.element.style.transform = `translateX(${box1.position - box2.position}px)`;

//         await new Promise(resolve => setTimeout(resolve, 500));

//         box1.element.style.transition = "";
//         box2.element.style.transition = "";
//         box1.element.style.transform = "";
//         box2.element.style.transform = "";
//     }

//     await new Promise(resolve => setTimeout(resolve, 500));
// }

async function renderColors(colors, highlightIndex1 = -1, highlightIndex2 = -1) {
    // Clear the container
    colorContainer.innerHTML = "";

    // Calculate initial positions for animation
    const colorBoxes = [];
    colors.forEach((color, index) => {
        const div = document.createElement("div");
        div.classList.add("color-box");
        div.style.backgroundColor = color;
        div.textContent = color;

        // Highlight the swapping elements (optional visual cue for debugging)
        if (index === highlightIndex1 || index === highlightIndex2) {
            div.classList.add("sorting");
        }

        // Add the div to the container
        colorContainer.appendChild(div);

        const boxWidth = (100 / colors.length);  // Percentage-based width to make it responsive
        const margin = 2;  // Example margin in percentage
        const position = (boxWidth + margin) * index;

        colorBoxes.push({
            element: div,
            position: position, // Adjusted to use percentage-based positioning
        });
    });

    // Animate swapping
    if (highlightIndex1 !== -1 && highlightIndex2 !== -1) {
        const box1 = colorBoxes[highlightIndex1];
        const box2 = colorBoxes[highlightIndex2];

        // Temporarily move elements with smooth transition
        box1.element.style.transition = "transform 0.5s ease";
        box2.element.style.transition = "transform 0.5s ease";

        // Swap positions by moving the elements horizontally
        box1.element.style.transform = `translateX(${box2.position - box1.position}%)`;
        box2.element.style.transform = `translateX(${box1.position - box2.position}%)`;

        // Wait for animation to complete
        await new Promise(resolve => setTimeout(resolve, 300));

        // Reset transforms and transitions
        box1.element.style.transition = "";
        box2.element.style.transition = "";
        box1.element.style.transform = "";
        box2.element.style.transform = "";
    }

    // Pause briefly before next step
    await new Promise(resolve => setTimeout(resolve, 500));
}






async function bubbleSort(arr, compareFunc) {
    let n = arr.length;
    let sorted = false;
    while (!sorted) {
        sorted = true;  // Assume sorted until proven otherwise
        for (let i = 0; i < n - 1; i++) {
            if (compareFunc(arr[i], arr[i + 1]) > 0) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                sorted = false;  // Found a swap, so not sorted yet
                await renderColors(arr, i, i + 1);
            }
        }
        n--;  // Reduce the range of unsorted elements
    }
    renderColors(arr);
}

async function quickSort(arr, left = 0, right = arr.length - 1, compareFunc) {
    if (left >= right) return;
    
    const pivotIndex = await partition(arr, left, right, compareFunc);
    await quickSort(arr, left, pivotIndex - 1, compareFunc);
    await quickSort(arr, pivotIndex + 1, right, compareFunc);
    
    if (left === 0 && right === arr.length - 1) {
        renderColors(arr);
    }
}

async function partition(arr, left, right, compareFunc) {
    const pivotIndex = Math.floor((left + right) / 2);
    const pivotValue = arr[pivotIndex];
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]]; // Move pivot to end for simplicity
    
    let storeIndex = left;
    for (let i = left; i < right; i++) {
        if (compareFunc(arr[i], pivotValue) < 0) {
            [arr[i], arr[storeIndex]] = [arr[storeIndex], arr[i]];
            await renderColors(arr, i, storeIndex);
            storeIndex++;
        }
    }
    [arr[storeIndex], arr[right]] = [arr[right], arr[storeIndex]]; // Move pivot to its final place
    await renderColors(arr, storeIndex, right);
    
    return storeIndex;
}

async function mergeSort(arr, compareFunc) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid), compareFunc);
    const right = await mergeSort(arr.slice(mid), compareFunc);

    return await merge(arr, left, right, compareFunc);
}

async function merge(arr, left, right, compareFunc) {
    let i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (compareFunc(left[i], right[j]) <= 0) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
        await renderColors(arr);
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
    await renderColors(arr);
    return arr;
}

function sortColorsByLightness(a, b) {
    return calculateLightness(hexToRgb(a)) - calculateLightness(hexToRgb(b));
}

function sortColorsByHue(a, b) {
    const hueA = calculateHue(hexToRgb(a));
    const hueB = calculateHue(hexToRgb(b));

    // Correct the sorting order for ROYGBIV (Red -> Violet)
    return hueA - hueB; // This ensures correct sorting from red to violet
}

// Trigger sorting based on chosen algorithm and type
async function sortColors(algorithm, type) {
    let colorsCopy = [...hexColors];
    if (type === "bubble") {
        if (algorithm === "lightness") {
            await bubbleSort(colorsCopy, sortColorsByLightness);
        } else {
            await bubbleSort(colorsCopy, sortColorsByHue);
        }
    } else if (type === "quick") {
        if (algorithm === "lightness") {
            await quickSort(colorsCopy, 0, colorsCopy.length - 1, sortColorsByLightness);
        } else {
            await quickSort(colorsCopy, 0, colorsCopy.length - 1, sortColorsByHue);
        }
    } else if (type === "merge") {
        if (algorithm === "lightness") {
            await mergeSort(colorsCopy, sortColorsByLightness);
        } else {
            await mergeSort(colorsCopy, sortColorsByHue);
        }
    }
}

// Updates hexColors from a comma-separated input and renders them
function updateColors() {
    const input = document.getElementById("color-input").value;
    hexColors = input.split(",").map(color => color.trim());
    // Limit the number of hex codes to 10
    if (hexColors.length > 10) {
        hexColors = hexColors.slice(0, 10);
        alert("You can only input a maximum of 10 hex codes. Extra codes have been truncated.");
    }

    // Update the placeholder to show the current hex codes
    const placeholder = hexColors.join(", ");

    renderColors(hexColors);
}

function toggleMenu() {
    const menu = document.getElementById("menu");
    const menuButton = document.getElementById("menuButton");
    
    // Toggle the visibility of the menu
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
        menuButton.textContent = "Close";
    } else {
        menu.style.display = "none";
        menuButton.textContent = "☰";
    }
}

// Saves the current palette to localStorage
function savePalette() {
    if (hexColors.length === 0) {
        console.log("No colors in the palette to save.");
        return; // Don't save if there's nothing to save
    }
    const savedPalettes = JSON.parse(localStorage.getItem("savedPalettes")) || [];
    savedPalettes.push([...hexColors]);
    localStorage.setItem("savedPalettes", JSON.stringify(savedPalettes));
    renderSavedPalettes();
}

// Renders all saved palettes from localStorage
function renderSavedPalettes() {
    const savedPalettes = JSON.parse(localStorage.getItem("savedPalettes")) || [];
    const savedContainer = document.getElementById("saved-palettes-container");
    savedContainer.innerHTML = ""; // Clear current display

    savedPalettes.forEach((palette, index) => {
        const paletteDiv = document.createElement("div");
        paletteDiv.classList.add("saved-palette");

    // Set up the main container for each palette (this will stack vertically)
    paletteDiv.style.display = 'flex';
    paletteDiv.style.flexDirection = 'column';

    // Display each color in the palette
    palette.forEach(color => {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("saved-color-box");
    colorDiv.style.backgroundColor = color;
    colorDiv.title = color;

    // Set size for individual color boxes
    colorDiv.style.width = '100%'; // Adjust width as desired
    colorDiv.style.height = '27px'; // Adjust height as desired
    
    paletteDiv.appendChild(colorDiv);
});

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'row';
    buttonContainer.style.marginTop = '5px';
    buttonContainer.style.gap = '5px'; // Optional: add spacing between buttons

    // Add the Load button
    const loadButton = document.createElement("button");
    loadButton.textContent = "Load";
    loadButton.onclick = () => loadPalette(index);
    loadButton.style.backgroundColor = 'white';
    loadButton.style.borderColor = 'grey';
    loadButton.style.borderStyle = 'solid';
    loadButton.style.borderWidth = '1px';
    buttonContainer.appendChild(loadButton);

    // Add the Remove button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deletePalette(index);
    deleteButton.style.backgroundColor = 'whitesmoke';
    deleteButton.style.borderColor = 'grey';
    deleteButton.style.borderStyle = 'solid';
    deleteButton.style.borderWidth = '1px';
    buttonContainer.appendChild(deleteButton);

    // Append the button container to paletteDiv (after all colors)
    paletteDiv.appendChild(buttonContainer);

    // Finally, add paletteDiv to the savedContainer
    savedContainer.appendChild(paletteDiv);

    });
}

function deletePalette(index) {
    const savedPalettes = JSON.parse(localStorage.getItem("savedPalettes")) || [];
    savedPalettes.splice(index, 1); // Remove the selected palette
    localStorage.setItem("savedPalettes", JSON.stringify(savedPalettes)); // Update localStorage
    renderSavedPalettes(); // Re-render saved palettes display
    console.log("Palette deleted at index:", index);
}

// Loads a saved palette by its index
function loadPalette(index) {
    const savedPalettes = JSON.parse(localStorage.getItem("savedPalettes")) || [];
    hexColors = savedPalettes[index]; // Load selected palette
    renderColors(hexColors); // Display the loaded palette
}

// Initialize saved palettes on page load
window.onload = () => {
    renderSavedPalettes();
};

// Assign event listeners to buttons
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("updateColorsButton").onclick = updateColors;
document.getElementById("savePaletteButton").onclick = savePalette;
document.getElementById("sortByLightnessButton").onclick = () => sortColors("bubble", "lightness");
document.getElementById("sortByHueButton").onclick = () => sortColors("bubble", "hue");
});

function clearAllPalettes() {
    localStorage.removeItem("savedPalettes"); // Remove all palettes from localStorage
    renderSavedPalettes(); // Re-render saved palettes display
    console.log("All saved palettes cleared.");
}
// Toggle visibility of the history menu
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "none" || menu.style.display === "" ? "block" : "none";
}

// Show or hide sorting history within the menu
function toggleHistory() {
    const historyContainer = document.getElementById("historyContainer");
    historyContainer.style.display = historyContainer.style.display === "none" || historyContainer.style.display === "" ? "block" : "none";
}

// Function to save a sorting action in local storage
function saveSortingHistory(sortType, sortBy, sortedColors) {
    const history = JSON.parse(localStorage.getItem("sortingHistory")) || [];
    
    // Entry structure for each sort history item
    const newEntry = {
        sortType,
        sortBy,
        colors: sortedColors,
        timestamp: new Date().toLocaleString()
    };
    
    // Add new entry to history and update local storage
    history.unshift(newEntry);
    localStorage.setItem("sortingHistory", JSON.stringify(history));
    
    displaySortingHistory();  // Update the UI to reflect the latest history
}

// Display sorting history items in the menu, if any
function displaySortingHistory() {
    const historyContainer = document.getElementById("historyContainer");
    historyContainer.innerHTML = ""; // Clear current history to prevent duplication

    const history = JSON.parse(localStorage.getItem("sortingHistory")) || [];
    
    if (history.length === 0) {
        historyContainer.innerHTML = "<p>No sorting history available.</p>";
        return;
    }

    // Populate the container with each saved history item
    history.forEach(entry => {
        const historyItem = document.createElement("div");
        historyItem.classList.add("history-item");
        
        // Display each entry's details with sorted color previews
        historyItem.innerHTML = `
            <strong>${entry.sortType}</strong> sorted by <strong>${entry.sortBy}</strong>
            <div class="sorted-colors">
                ${entry.colors.map(color => `<span class="color-preview" style="background-color: ${color};"></span>`).join('')}
            </div>
        `;
        historyContainer.appendChild(historyItem);
    });
}

// Clear all history entries from local storage and update the display
function clearSortingHistory() {
    localStorage.removeItem("sortingHistory");
    displaySortingHistory();
}

// Wrap the sort function to save and display sorting results in history
async function sortColors(type, algorithm) {
    let colorsCopy = [...hexColors];
    if (algorithm === "bubble") {
        if (type === "lightness") {
            await bubbleSort(colorsCopy, sortColorsByLightness);
        } else {
            await bubbleSort(colorsCopy, sortColorsByHue);
        }
    } else if (algorithm === "quick") {
        if (type === "lightness") {
            await quickSort(colorsCopy, 0, colorsCopy.length - 1, sortColorsByLightness);
        } else {
            await quickSort(colorsCopy, 0, colorsCopy.length - 1, sortColorsByHue);
        }
    } else if (algorithm === "merge") {
        if (type === "lightness") {
            await mergeSort(colorsCopy, sortColorsByLightness);
        } else {
            await mergeSort(colorsCopy, sortColorsByHue);
        }
    }

    // Save the sorted result to history after sorting is complete
    saveSortingHistory(`${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort`, type.charAt(0).toUpperCase() + type.slice(1), colorsCopy);
}

// Load and display sorting history on page load
window.addEventListener("DOMContentLoaded", () => {
    displaySortingHistory();
});


// Color Picker
const svg = document.getElementById("color-wheel");
const paletteSelect = document.getElementById("palette-select");
const hoverColorPreview = document.getElementById("color-preview");
const hoverHexCodeDisplay = document.getElementById("hover-hex-code");
const selectedColorPreview = document.getElementById("selected-color-preview");
const selectedHexCodeDisplay = document.getElementById("selected-hex-code");
const colorPicker = document.getElementById("color-picker");

// Function to generate the circular grid with colors
function createColorWheel(palette) {
    svg.innerHTML = ""; // Clear existing wheel

    const radius = 250;
    const centerX = 250;
    const centerY = 250;
    const numRings = 10;
    const numSlices = 36;

    for (let ring = 0; ring < numRings; ring++) {
        const innerRadius = (radius / numRings) * ring;
        const outerRadius = (radius / numRings) * (ring + 1);

        for (let slice = 0; slice < numSlices; slice++) {
            const startAngle = (slice * 360) / numSlices;
            const endAngle = ((slice + 1) * 360) / numSlices;

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const startXInner = centerX + innerRadius * Math.cos((startAngle * Math.PI) / 180);
            const startYInner = centerY + innerRadius * Math.sin((startAngle * Math.PI) / 180);
            const endXInner = centerX + innerRadius * Math.cos((endAngle * Math.PI) / 180);
            const endYInner = centerY + innerRadius * Math.sin((endAngle * Math.PI) / 180);

            const startXOuter = centerX + outerRadius * Math.cos((startAngle * Math.PI) / 180);
            const startYOuter = centerY + outerRadius * Math.sin((startAngle * Math.PI) / 180);
            const endXOuter = centerX + outerRadius * Math.cos((endAngle * Math.PI) / 180);
            const endYOuter = centerY + outerRadius * Math.sin((endAngle * Math.PI) / 180);

            const d = `
                M ${startXInner} ${startYInner}
                L ${startXOuter} ${startYOuter}
                A ${outerRadius} ${outerRadius} 0 0 1 ${endXOuter} ${endYOuter}
                L ${endXInner} ${endYInner}
                A ${innerRadius} ${innerRadius} 0 0 0 ${startXInner} ${startYInner}
                Z
            `;

            const hexColor = getColorForPalette(palette, slice, ring, numSlices, numRings);
            path.setAttribute("d", d);
            path.setAttribute("fill", hexColor);
            path.setAttribute("stroke", "#fff");
            path.setAttribute("stroke-width", "0.5");

            // Hover to preview color
            path.addEventListener("mouseover", () => {
                hoverColorPreview.style.backgroundColor = hexColor;
                hoverHexCodeDisplay.textContent = hexColor;
            });

            // Click to select color
            path.addEventListener("click", () => {
                selectedColorPreview.style.backgroundColor = hexColor;
                selectedHexCodeDisplay.textContent = hexColor;
            });

            svg.appendChild(path);
        }
    }
}

// Function to generate hex colors for the palette
function getColorForPalette(palette, slice, ring, numSlices, numRings) {
    const hue = (slice * 360) / numSlices;
    const saturation = 100;
    const lightness = 50 + (ring / numRings) * 25; // Gradually lighten towards center

    switch (palette) {
        case "basic":
            return hslToHex(hue, saturation, lightness);
        case "pastel":
            return hslToHex(hue, 70, lightness + 15);
        case "neon":
            return hslToHex(hue, 100, lightness - 10);
        case "monochrome":
            const grayValue = Math.round((ring / numRings) * 255);
            return rgbToHex(grayValue, grayValue, grayValue);
        default:
            return "#FFFFFF";
    }
}

// Convert HSL to HEX
function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0"); // Convert to two-digit hex
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

// Convert RGB to HEX
function rgbToHex(r, g, b) {
    const toHex = (value) =>
        value.toString(16).padStart(2, "0"); // Convert to two-digit hex
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Event listener for palette selection
paletteSelect.addEventListener("change", (e) => {
    const selectedPalette = e.target.value;
    createColorWheel(selectedPalette);
});

// Create the initial color wheel
createColorWheel("basic");


//APIs-----------------------------------
// Function to download the palette as a JPG image
function downloadPalette() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const colors = JSON.parse(localStorage.getItem("savedPalettes")) || [];
    const palette = colors[colors.length - 1]; // Get the last saved palette

    const circleDiameter = 40; // Diameter of each color circle
    const spacing = 20; // Space between the circles
    const totalWidth = (circleDiameter + spacing) * palette.length - spacing;

    // Set canvas size
    canvas.width = totalWidth;
    canvas.height = circleDiameter + 20; // Add extra height for padding

    // Set background color to white
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the background with white

    // Calculate the starting position of the first circle to center it properly
    const firstCircleX = (canvas.width - totalWidth) / 2 + spacing; // Calculate the x-position for the first circle

    // Draw the circles on the canvas
    palette.forEach((color, index) => {
        const xPosition = firstCircleX + index * (circleDiameter + spacing); // Evenly distribute circles

        ctx.beginPath();
        ctx.arc(xPosition, canvas.height / 2, circleDiameter / 2, 0, 2 * Math.PI); // Draw circle
        ctx.fillStyle = color; // Set the fill color for the circle
        ctx.fill(); // Fill the circle with the color
    });

    // Convert canvas to image and trigger download
    const dataUrl = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'color-palette.jpg';
    link.click();
}


// async function validateHexCode(hex) {
//     try {
//         const response = await fetch(`https://www.thecolorapi.com/id?hex=${hex.replace('#', '')}`);
//         if (response.ok) {
//             const data = await response.json();
//             return data.hex.value;
//         }
//         return null;
//     } catch (error) {
//         console.error("Error validating hex code:", error);
//         return null;
//     }
// }

// async function updateColors() {
//     const input = document.getElementById("color-input").value;
//     let inputColors = input.split(",").map(color => color.trim());
    
//     if (inputColors.length > 10) {
//         alert("You can only input a maximum of 10 hex codes. Extra codes have been truncated.");
//         inputColors = inputColors.slice(0, 10);
//     } else if (inputColors.length < 3) {
//         alert("You must input at least 3 hex codes.");
//         return; 
//     }

//     const validatedColors = [];
//     for (const color of inputColors) {
//         const hex = await validateHexCode(color);
//         if (hex) {
//             validatedColors.push(hex); 
//         } else {
//             alert(`Invalid hex code: ${color}`); 
//         }
//     }

  
//     if (validatedColors.length <= 3) {
//         alert("At least 3 valid hex codes are required. Please try again.");
//         return;
//     }

//     hexColors = validatedColors;
//     renderColors(hexColors);
// }

function isValidHexCode(hex) {
    const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(hex);
}

async function updateColors() {
    const input = document.getElementById("color-input").value;
    let inputColors = input.split(",").map(color => color.trim());

    // Limit the number of colors to 10 and ensure at least 3 are provided
    if (inputColors.length > 10) {
        showNotification("You can only input a maximum of 10 hex codes. Extra codes have been truncated.", "warning");
        inputColors = inputColors.slice(0, 10);
    } else if (inputColors.length < 3) {
        showNotification("You must input at least 3 hex codes.", "error");
        return; // Stop further processing if there aren't enough colors
    }

    // Validate each color using the local validator and The Color API
    const validatedColors = [];
    for (const color of inputColors) {
        if (!isValidHexCode(color)) {
            showNotification(`Invalid hex code format: ${color}`, "error");
            continue; // Skip invalid formats
        }

        const hex = await validateHexCode(color);
        if (hex) {
            validatedColors.push(hex); // Add validated hex codes
        } else {
            showNotification(`Invalid hex code (API validation failed): ${color}`, "error");
        }
    }

    // Ensure at least 3 valid colors after validation
    if (validatedColors.length < 3) {
        showNotification("At least 3 valid hex codes are required. Please try again.", "error");
        return; // Stop if fewer than 3 valid colors
    }

    // Update the global hexColors array with validated colors
    hexColors = validatedColors;
    showNotification("Colors applied successfully!", "success");
    renderColors(hexColors); // Render validated colors
}

async function validateHexCode(hex) {
    try {
        const response = await fetch(`https://www.thecolorapi.com/id?hex=${hex.replace('#', '')}`);
        if (response.ok) {
            const data = await response.json();
            return data.hex.value; // Return the validated hex code
        }
        return null; // API validation failed
    } catch (error) {
        console.error("Error validating hex code:", error);
        return null; // Return null if there's an error
    }
}

function showNotification(message, type = "info") {
    const container = document.getElementById("notification-container");

    // Create a notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-btn" onclick="this.parentElement.remove()">×</button>
    `;

    // Append notification to the container
    container.appendChild(notification);

    // Automatically remove notification after 4 seconds
    setTimeout(() => {
        notification.remove();
    }, 4000);
}
