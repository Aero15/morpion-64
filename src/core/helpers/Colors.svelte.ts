import { Color } from "$core/enums/Color"

export function randomColor() {
    const list = Object.values(Color)
    return list[Math.floor(Math.random() * list.length)]
}

export function getContrastColor(backgroundColor: string) {
    // Convertir la couleur hexadécimale en RGB
    const rgb = hexToRgb(backgroundColor);
    
    // Calculer la luminosité en utilisant la formule de luminance relative
    const luminance = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;

    // Si la luminance est faible, le texte doit être blanc, sinon noir
    return luminance < 128 ? 'white' : 'black';
}

// Convertir un code hexadécimal en RGB
export function hexToRgb(hex: string) {
    // Enlever le "#" si présent
    hex = hex.replace('#', '');

    // Extraire les composantes R, G, B du code hex
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}
