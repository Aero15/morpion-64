// Calcul de la moyenne à partir d'une liste de nombres
export function calcAvg(
    values: number[]
): number {
    return values.reduce(
        (a, b) => a + b, 0
    ) / values.length
}