<template>
<div class="card mb-3 border shadow-0">
    <div class="card-body">
        <form>
            <div class="form-group">
                <label class="form-label">Tem cupom?</label>
                <div class="input-group">
                    <input type="text" class="form-control border" name="" placeholder="Código do Cupom">
                    <button class="btn btn-light border">Aplicar</button>
                </div>
            </div>
        </form>
    </div>
</div>

<div class="card shadow-0 border">
    <div class="card-body">
        <div class="d-flex justify-content-between">
            <p class="mb-2">Total:</p>
            <p class="mb-2">{{ formatPrice(total) }}</p>
        </div>

        <div class="d-flex justify-content-between">
            <p class="mb-2">Desconto:</p>
            <s><p class="mb-2 text-danger">R$-00,00</p></s>
        </div>

        <div class="d-flex justify-content-between">
            <p class="mb-2">Taxa:</p>
            <p class="mb-2">R$00,00</p>
        </div>

        <hr />

        <div class="d-flex justify-content-between">
            <p class="mb-2">Total:</p>
            <p class="mb-2 fw-bold">{{ formatPrice(total) }}</p>
        </div>

        <div class="mt-3">
            <button type="button" @click="finalizePurchase" class="btn btn-outline-success w-100 shadow-0 mb-2">Finalizar Compra</button>
            <RouterLink :to="{ name: 'product' }" class="btn btn-light w-100 border mt-2">Continuar Comprando</RouterLink>
        </div>
    </div>
</div>
</template>

<script>
import { formatPrice } from '@/utils/formatPrice/formatPrice';

export default {
    name: 'cart-total',
    props: {
        total: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    methods: {
        finalizePurchase() {
            this.$emit('finalizePurchase');
        }
    },
    computed: {
        formatPrice() {
            return formatPrice;
        },
    },
};
</script>