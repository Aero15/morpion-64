export function getRandomFrom<T>(
    list: any[] | T[],
) {
    return list[Math.floor(Math.random() * list.length)];
}