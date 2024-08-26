// script.js

let defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
let currentColorblindMode = ''; // Menyimpan status mode buta warna saat ini

// Fungsi untuk mengubah warna heksadesimal menjadi RGB
function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

// Fungsi untuk menyesuaikan warna untuk berbagai jenis buta warna
function applyColorblindMode(type) {
    const root = document.documentElement;
    const color = hexToRgb(defaultColor);

    let adjustedColor;

    switch(type) {
        case 'protanopia':
            adjustedColor = adjustForProtanopia(color);
            break;
        case 'deuteranopia':
            adjustedColor = adjustForDeuteranopia(color);
            break;
        case 'tritanopia':
            adjustedColor = adjustForTritanopia(color);
            break;
        case 'achromatopsia':
            adjustedColor = adjustForAchromatopsia(color);
            break;
        default:
            adjustedColor = defaultColor;
    }

    root.style.setProperty('--primary-color', adjustedColor);
    currentColorblindMode = type; // Memperbarui status mode buta warna
}

// Fungsi untuk mengatur ulang mode buta warna
function resetColorblindMode() {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', defaultColor);
    currentColorblindMode = ''; // Menghapus status mode buta warna
}

// Fungsi untuk mengubah warna dasar
function updateBaseColor(color) {
    const root = document.documentElement;
    defaultColor = color; // Memperbarui warna default

    // Terapkan warna sesuai dengan mode buta warna saat ini
    if (currentColorblindMode) {
        applyColorblindMode(currentColorblindMode);
    } else {
        root.style.setProperty('--primary-color', color);
    }
}

// Algoritma penyesuaian warna untuk setiap jenis buta warna (contoh sederhana)
function adjustForProtanopia(color) {
    // Mengurangi intensitas merah, menambah hijau/biru
    return adjustBrightness(color, 0.5); // Placeholder sederhana
}

function adjustForDeuteranopia(color) {
    // Mengurangi intensitas hijau, menambah merah/biru
    return adjustBrightness(color, 0.7); // Placeholder sederhana
}

function adjustForTritanopia(color) {
    // Mengurangi intensitas biru, menambah merah/hijau
    return adjustBrightness(color, 0.9); // Placeholder sederhana
}

function adjustForAchromatopsia(color) {
    // Konversi warna ke grayscale
    return "rgb(128, 128, 128)"; // Placeholder sederhana untuk grayscale
}

// Fungsi untuk menggelapkan atau mencerahkan warna
function adjustBrightness(color, factor) {
    const rgb = color.match(/\d+/g).map(Number);
    const r = Math.min(255, Math.max(0, Math.round(rgb[0] * factor)));
    const g = Math.min(255, Math.max(0, Math.round(rgb[1] * factor)));
    const b = Math.min(255, Math.max(0, Math.round(rgb[2] * factor)));
    return `rgb(${r}, ${g}, ${b})`;
}
