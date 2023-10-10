export function formatPrice(date) {
    return date.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}