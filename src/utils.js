export function percentDifference(price, price2) {
    const percent = 100 * Math.abs((price - price2) / ((price+price2)/2))

    return percent.toFixed(2);
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}