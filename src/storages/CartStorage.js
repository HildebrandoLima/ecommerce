function getCartData() {
    try {
        return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
        throw error;
    }
}

export function setAddToCart(product) {
    const cart = getCartData();
    const itemIndex = cart.findIndex((item) => item.id === product.produtoId);

    if (itemIndex !== -1) {
        cart[itemIndex].quantidade++;
        cart[itemIndex].subTotal += product.precoVenda;
    } else {
        cart.push({
            'id': product.produtoId,
            'nome': product.nome,
            'quantidade': 1,
            'imagem': product.imagens[0].caminho,
            'precoCusto': product.precoCusto,
            'precoVenda': product.precoVenda,
            'subTotal': product.precoVenda,
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto Adicionado ao Carrinho!');
}

export function removeItemToCart(newCart, item) {
    const cart = getCartData();
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        newCart = cart;
    }
    alert('Item Removido do Carrinho!');
}

export function updateCartItemQuantity(newCart, item) {
    item.quantidade = parseInt(item.quantidade);

    if (item.quantidade <= 0) {
        newCart = this.cart.filter((cartItem) => cartItem !== item);
    } else {
        item.subTotal = item.quantidade * item.precoVenda;
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
    alert('Quantidade Atualizada!');
}

export function cleanToCart(newCart) {
    newCart = [];
    localStorage.removeItem('cart');
    alert('Carrinho Limpado!');
}

export function calculateTotalCart(total) {
    localStorage.setItem('cartTotal', total);
}

export function getCart() {
    return getCartData();
}

export function getTotalCart() {
    return localStorage.getItem('cartTotal');
}

export function removeTotalCart() {
    return localStorage.removeItem('cartTotal');
}