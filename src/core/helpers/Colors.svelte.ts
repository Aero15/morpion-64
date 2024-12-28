import { Color } from "$core/enums/Color"

export function randomColor() {
    const list = Object.values(Color)
    return list[Math.floor(Math.random() * list.length)]
}

export function getForegroundColorFor(backgroundColor: string) {
    // Convert the hex color to RGB
    const rgb = hexToRgb(backgroundColor);

    // If the color is invalid, return black
    if (!rgb) return 'black';

    // Calculate the luminance
    const luminance = getLuminanceFromRGB(rgb.r, rgb.g, rgb.b);

    // If the luminance is low, the text should be white, otherwise black
    return luminance < 128 ? 'white' : 'black';
}

// Convert a hex color to RGB
export function hexToRgb(hex: string) {
    // Regex to check if the hex color is valid
    const result = /^#([a-f0-9]{6}|[a-f0-9]{3})$/i.exec(hex);

    // If the hex color is not valid, return null
    if (!result) return null;

    let r: number = 0,
        g: number = 0,
        b: number = 0;

    if (result[1].length === 6) {           // #RRGGBB
        r = parseInt(result[1].substring(0, 2), 16);
        g = parseInt(result[1].substring(2, 4), 16);
        b = parseInt(result[1].substring(4, 6), 16);
    } else if (result[1].length === 3) {    // #RGB
        r = parseInt(result[1].substring(0, 1) + result[1].substring(0, 1), 16);
        g = parseInt(result[1].substring(1, 2) + result[1].substring(1, 2), 16);
        b = parseInt(result[1].substring(2, 3) + result[1].substring(2, 3), 16);
    }

    return { r, g, b };
}
  
// Calculate the luminance using the relative luminance formula
function getLuminanceFromRGB(
    r: number,
    g: number,
    b: number
): number {
    const a = [r, g, b].map((x) => {
        x /= 255;
        return (x <= 0.03928) ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
  
// Returns the contrast ratio between two luminance values
function getContrastRatio(
    luminance1: number,
    luminance2: number
): number {
    const bright = Math.max(luminance1, luminance2);
    const dark = Math.min(luminance1, luminance2);
    return (bright + 0.05) / (dark + 0.05);
}
  
// Ajust color to improve readability
function adjustColor(
    hex: string,
    isDarkBackground: boolean,
    backgroundLuminance: number
): string {
    let { r, g, b } = hexToRgb(hex)!;
    let luminanceText = getLuminanceFromRGB(r, g, b);
    
    // Function to adjust the color while checking the contrast
    function adjustForContrast(): { r: number, g: number, b: number } {
        // Minimum contrast targets
        const targetBrightContrast = 3.5; // For white background
        const targetDarkContrast = 4.5; // For dark background
    
        let adjustedR = r;
        let adjustedG = g;
        let adjustedB = b;
    
        // Ajust color (lighten or darken based on background)
        let increment = isDarkBackground ? 50 : -50;
        if (isDarkBackground) {
            // For dark background, lighten the color
            adjustedR = Math.min(255, adjustedR + increment);
            adjustedG = Math.min(255, adjustedG + increment);
            adjustedB = Math.min(255, adjustedB + increment);
        } else {
            // For light background, darken the color
            adjustedR = Math.max(0, adjustedR + increment);
            adjustedG = Math.max(0, adjustedG + increment);
            adjustedB = Math.max(0, adjustedB + increment);
        }
    
        // Get the luminance of the adjusted color
        let adjustedLuminance = getLuminanceFromRGB(adjustedR, adjustedG, adjustedB);
        let contrast = getContrastRatio(adjustedLuminance, backgroundLuminance);
    
        // Check if the contrast is sufficient
        if (
            (isDarkBackground && contrast >= targetDarkContrast) ||
            (!isDarkBackground && contrast >= targetBrightContrast)
        ) {
            return { r: adjustedR, g: adjustedG, b: adjustedB };
        }
    
        // If the contrast is not sufficient, adjust the color further
        if (isDarkBackground) {
            // For dark background, lighten the color
            adjustedR = Math.min(255, adjustedR + increment);
            adjustedG = Math.min(255, adjustedG + increment);
            adjustedB = Math.min(255, adjustedB + increment);
        } else {
            // For light background, darken the color
            adjustedR = Math.max(0, adjustedR + increment);
            adjustedG = Math.max(0, adjustedG + increment);
            adjustedB = Math.max(0, adjustedB + increment);
        }
    
        return { r: adjustedR, g: adjustedG, b: adjustedB };
    }
    
    // Ajust color for contrast
    const adjustedColor = adjustForContrast();
    
    // Return the adjusted color in hexadecimal
    return `#${(1 << 24 | adjustedColor.r << 16 | adjustedColor.g << 8 | adjustedColor.b).toString(16).slice(1)}`;
}
  
// Improve the contrast of a color to make it more readable on light and dark backgrounds
export function improveContrast(hex: string): { light: string, dark: string } {
    const { r, g, b } = hexToRgb(hex)!;
  
    const textLuminance = getLuminanceFromRGB(r, g, b);
  
    const lightBackgroundLuminance = getLuminanceFromRGB(255, 255, 255); // White background
    const darkBackgroundLuminance = getLuminanceFromRGB(0, 0, 0); // Black background

    var light = `${hex}`;
    var dark = `${hex}`; 
  
    // Check the contrast on a light background
    const contrastLight = getContrastRatio(textLuminance, lightBackgroundLuminance);
    if (contrastLight < 3.5) {
        light = adjustColor(hex, false, lightBackgroundLuminance);
    }
  
    // Check the contrast on a dark background
    const contrastDark = getContrastRatio(textLuminance, darkBackgroundLuminance);
    if (contrastDark < 4.5) {
        dark = adjustColor(hex, true, darkBackgroundLuminance);
    }

    return { light, dark };
}