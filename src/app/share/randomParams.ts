/**
 * 随机生成 币安行情接口参数
 */



function randomFromArray(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)]
}
function randomStartTime(arg: number) {
    const time = Math.floor(1505433600000 / arg);
    const now = Math.floor(new Date().getTime() / arg);
    return (Math.floor(Math.random() * (now - time)) + time) * arg;
}

export function getParams() {
    const symbols = ['ETHUSDT', 'BTCUSDT'];
    const intervals = [
        ['15m', 900000], ['30m', 1800000], ['4h', 14400000], ['1d', 86400000]];
    let symbol = randomFromArray(symbols);
    let interval = randomFromArray(intervals);
    return {
        symbol, interval: interval[0], startTime: randomStartTime(interval[1])
    }
}