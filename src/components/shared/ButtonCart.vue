<template>
    <div>
        <button @click="addToCart(product)" class="btn btn-outline-primary shadow-0 me-1">Adicionar ao carrinho</button>
    </div>
</template>

<script>
    import { setAddToCart } from '@/storages/CartStorage';

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
                setAddToCart(product);
            },
        },
    };
</script>