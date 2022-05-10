export function floorToFixed(num: number, n: number) {
    let pow = Math.pow(10, n)
    return Math.floor(num * pow) / pow;
}