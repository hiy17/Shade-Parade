let hexColors = []; // To hold the colors provided by the user
const colorContainer = document.getElementById("color-container");
const colorPicker = document.getElementById("colorPicker");
const colorCode = document.getElementById("colorCode");

// Updates the displayed hex code when the color picker changes
colorPicker.addEventListener("input", function() {
    colorCode.textContent = colorPicker.value;
});

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
    renderColors(hexColors);
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
    colorDiv.style.width = '90%'; // Adjust width as desired
    colorDiv.style.height = '30px'; // Adjust height as desired
    
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
    buttonContainer.appendChild(loadButton);

    // Add the Remove button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deletePalette(index);
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
    const menu = document.getElementById("historyMenu");
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
