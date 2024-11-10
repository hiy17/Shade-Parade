let hexColors = [];  // To hold the colors provided by the user
const colorContainer = document.getElementById("color-container");
const hexCodeContainer = document.getElementById("hex-code-container");

function hexToRgb(hex) {
    return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16)
    };
}

function calculateLightness(rgb) {
    const max = Math.max(rgb.r, rgb.g, rgb.b);
    const min = Math.min(rgb.r, rgb.g, rgb.b);
    return (max + min) / 2;
}

function calculateHue(rgb) {
    const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max === min) return 0;
    const delta = max - min;
    if (max === r) return (60 * ((g - b) / delta + (g < b ? 6 : 0))) % 360;
    if (max === g) return (60 * ((b - r) / delta + 2)) % 360;
    return (60 * ((r - g) / delta + 4)) % 360;
}

async function renderColors(colors, highlightIndex1 = -1, highlightIndex2 = -1) {
    colorContainer.innerHTML = "";
    colors.forEach((color, index) => {
        const div = document.createElement('div');
        div.classList.add('color-box');
        div.style.backgroundColor = color;
        if (index === highlightIndex1 || index === highlightIndex2) {
            div.classList.add('sorting');
        }
        colorContainer.appendChild(div);
    });
    await new Promise(resolve => setTimeout(resolve, 200));

    // Display the sorted HEX codes below the colors
    hexCodeContainer.innerHTML = colors.map(color => `<div>${color}</div>`).join('');
}

async function bubbleSort(arr, compareFunc) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (compareFunc(arr[j], arr[j + 1]) > 0) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                await renderColors(arr, j, j + 1);
            }
        }
    }
    renderColors(arr);
}

async function quickSort(arr, left = 0, right = arr.length - 1, compareFunc) {
    if (left >= right) return;
    const pivot = arr[Math.floor((left + right) / 2)];
    const index = await partition(arr, left, right, pivot, compareFunc);
    await quickSort(arr, left, index - 1, compareFunc);
    await quickSort(arr, index, right, compareFunc);
    renderColors(arr);
}

async function partition(arr, left, right, pivot, compareFunc) {
    while (left <= right) {
        while (compareFunc(arr[left], pivot) < 0) left++;
        while (compareFunc(arr[right], pivot) > 0) right--;
        if (left <= right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            await renderColors(arr, left, right);
            left++;
            right--;
        }
    }
    return left;
}

async function mergeSort(arr, compareFunc) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    await mergeSort(left, compareFunc);
    await mergeSort(right, compareFunc);

    let i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (compareFunc(left[i], right[j]) <= 0) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
        await renderColors(arr, i, j);
    }

    while (i < left.length) {
        arr[k] = left[i];
        i++;
        k++;
        await renderColors(arr);
    }

    while (j < right.length) {
        arr[k] = right[j];
        j++;
        k++;
        await renderColors(arr);
    }
    return arr;
}

function sortColorsByLightness(a, b) {
    return calculateLightness(hexToRgb(a)) - calculateLightness(hexToRgb(b));
}

function sortColorsByHue(a, b) {
    return calculateHue(hexToRgb(a)) - calculateHue(hexToRgb(b));
}

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

function updateColors() {
    const input = document.getElementById("color-input").value;
    hexColors = input.split(",").map(color => color.trim());
    renderColors(hexColors);
}
