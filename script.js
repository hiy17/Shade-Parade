// Select DOM elements
const colorPicker = document.getElementById("colorPicker");
const colorCode = document.getElementById("colorCode");
const hexInput = document.getElementById("hexInput");
const generateBtn = document.getElementById("generateBtn");
const paletteContainer = document.querySelector('.palette-preview');

// Update color code when color picker changes
colorPicker.addEventListener("input", () => {
    colorCode.value = colorPicker.value;
});

// Generate random colors and append to palette
generateBtn.addEventListener("click", generateRandomColors);

function generateRandomColors() {
    const colors = [];
    for (let i = 0; i < 6; i++) {
        const color = getRandomHexColor();
        colors.push(color);
    }
    updatePalette(colors);
}

// Helper function to generate a random hex color
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Update the palette display
function updatePalette(colors) {
    paletteContainer.innerHTML = ''; // Clear previous palette
    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.classList.add('sample-color');
        colorBox.style.backgroundColor = color;
        colorBox.textContent = color;
        paletteContainer.appendChild(colorBox);
    });
}

// Convert hex to HSL
function hexToHsl(hex) {
    hex = hex.trim();
    if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) return null;

    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }

    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

// Quick Sort algorithm for sorting by lightness (L)
async function quickSort(array, low, high) {
    if (low < high) {
        const pivotIndex = await partition(array, low, high);
        await quickSort(array, low, pivotIndex - 1);
        await quickSort(array, pivotIndex + 1, high);
    }
}

async function partition(array, low, high) {
    const pivot = array[high];
    let i = low;

    for (let j = low; j < high; j++) {
        if (array[j].hsl.l < pivot.hsl.l) { // Compare by lightness (L)
            [array[i], array[j]] = [array[j], array[i]];
            i++;
        }
    }

    [array[i], array[high]] = [array[high], array[i]];
    return i;
}

// Merge Sort algorithm for sorting by lightness (L)
async function mergeSort(array) {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    return merge(await mergeSort(left), await mergeSort(right));
}

async function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].hsl.l < right[rightIndex].hsl.l) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

// Bubble Sort algorithm for sorting by lightness (L)
function bubbleSort(array) {
    let n = array.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j].hsl.l > array[j + 1].hsl.l) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
}

// Function that gets called when the sort buttons are clicked
async function sortPalette(type) {
    const colorArray = hexInput.value.split(',').map(color => color.trim()).filter(Boolean);
    
    if (colorArray.length === 0) {
        alert('Please enter valid hex color codes.');
        return;
    }

    const colorData = colorArray.map(color => {
        const hsl = hexToHsl(color);
        return hsl ? { hex: color, hsl } : null;
    }).filter(Boolean);

    let sortedColors = [];

    if (type === 'quick') {
        await quickSort(colorData, 0, colorData.length - 1);
        sortedColors = colorData;
    } else if (type === 'merge') {
        sortedColors = await mergeSort(colorData);
    } else if (type === 'bubble') {
        bubbleSort(colorData);
        sortedColors = colorData;
    }

    const sortedHexColors = sortedColors.map(color => color.hex);
    updatePalette(sortedHexColors); // Update the displayed palette with sorted colors
}
