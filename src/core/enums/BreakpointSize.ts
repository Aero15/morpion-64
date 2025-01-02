export type BreakpointSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Tailwind CSS Breakpoints
export const breakpoints: Record<BreakpointSize, number> = {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536
};