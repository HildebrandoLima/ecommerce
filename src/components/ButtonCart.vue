<template>
    <div>
        <button @click="addToCart(product)" class="btn btn-outline-primary shadow-0 me-1">Adicionar ao carrinho</button>
    </div>
</template>

<script>
  export default {
    name: 'button',
    props: {
        product: {
            type: Array,
            default: []
        }
    },
    methods: {
        addToCart(product) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = cart.findIndex((item) => item.id === product.produtoId);
            if (itemIndex !== -1) {
                cart[itemIndex].quantidade++;
                cart[itemIndex].subTotal += product.precoVenda;
            } else {
                cart.push({
                    'id': product.produtoId,
                    'nome': product.nome,
                    'quantidade': 1,
                    'precoCusto': product.precoCusto,
                    'precoVenda': product.precoVenda,
                    'subTotal': product.precoVenda,
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Produto Adicionado ao Carrinho!');
        },
    },
};
</script>