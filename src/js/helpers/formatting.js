export function format(x) {
    x = parseFloat(x)
    // return parseFloat(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}