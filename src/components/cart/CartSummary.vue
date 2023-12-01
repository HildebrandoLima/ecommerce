<template>
<div class="card border shadow-0">
    <div class="m-4">

        <div class="row">
            <div class="col-lg sm-7">
                <h4 class="card-title mb-4">Meu Carrinho de Compras</h4>
            </div>

            <div class="col-lg sm-3">
                <button v-if="cart.length > 0" @click="cleanCart()" class="btn btn-light border text-danger icon-hover-danger">Limpar Carrinho</button>
            </div>
        </div>

        <div class="col-lg sm-7" v-if="!cart.length">
            <h4 class="card-title mb-4 text-danger text-center">Não há Produto(s) no Carrinho!</h4>
        </div>

        <div class="row gy-3 mb-4" v-for="(item, index) in cart" :key="index">
            <div class="col-lg-5">
                <div class="me-lg-5">
                    <div class="d-flex">
                        <img :src="item.imagem" class="border rounded me-3" style="width: 96px; height: 96px;">
                        <div class="">
                            <a href="#" class="nav-link">{{ item.nome }}</a>
                            <b>Sub Total:</b><p class="text-muted"> {{ formatPrice(item.subTotal) }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                <div class="">
                    <input type="number" v-model="item.quantidade" @keyup.enter="updateQuantity(item)" style="width: 100px;" />&nbsp;&nbsp;
                </div>
                <div class="">
                    <text class="h6">POR: {{ formatPrice(item.precoVenda) }}</text><br>
                    <small class="text-muted text-nowrap"><s>DE: {{ formatPrice(item.precoCusto) }}</s></small>
                </div>
            </div>

            <div class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                <div class="float-md-end">
                    <a href="#" class="btn btn-light border px-2 icon-hover-primary">
                        <i class="fas fa-heart fa-lg px-1 text-danger"></i>
                    </a>
                    &nbsp;
                    <button @click="removeItem(item)" class="btn btn-light border text-danger icon-hover-danger">Remover</button>
                </div>
            </div>

        </div>
    </div>

    <div class="border-top pt-4 mx-4 mb-4">
        <p>
            <i class="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 weeks
        </p>

        <p class="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip
        </p>
    </div>
</div>
</template>

<script>
import { formatPrice } from '@/utils/formatPrice/formatPrice';

export default {
    name: 'cart-summary',
    props: {
        cart: {
            type: Array,
            required: true,
            default: [],
        },
    },
    methods: {
        removeItem(item) {
            this.$emit('removeItem', item);
        },
        updateQuantity(item) {
            this.$emit('updateQuantity', item);
        },
        cleanCart() {
            this.$emit('cleanCart');
        },
    },
    computed: {
        formatPrice() {
            return formatPrice;
        },
    },
};
</script>