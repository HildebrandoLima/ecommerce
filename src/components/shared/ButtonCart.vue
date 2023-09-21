<template>
    <div>
        <button @click="addToCart(product)" class="btn btn-outline-primary shadow-0 me-1">Adicionar ao carrinho</button>
    </div>
</template>

<script>
    import { addToCart } from '@/storages/cart';

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
                addToCart(product);
            },
        },
    };
</script>