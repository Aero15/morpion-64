// Calculate the average from a list of numbers
export function calcAvg(
    values: number[]
): number {
    return values.reduce(
        (a, b) => a + b, 0
    ) / values.length
}

// Random number between two numbers
export function randomBetween(
    min: number,
    max: number
) {
    return Math.floor(
        Math.random()
        * (max - min + 1)
        + min
    )
}