// Calcul de la moyenne à partir d'une liste de nombres
export function calcAvg(
    values: number[]
): number {
    return values.reduce(
        (a, b) => a + b, 0
    ) / values.length
}

// Nombre aleatoire entre deux nombres
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