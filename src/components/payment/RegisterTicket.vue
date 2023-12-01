<template>
<div class="card">
    <h1>Boleto</h1>
</div>

<AlertError
    v-if="Object.keys(errorList).length > 0"
    :errorList="errorList"
/>

<form @submit.prevent="savePayment">
    <button type="submit" class="btn btn-outline-success w-100 shadow-0 mb-2 mt-3">Pagar</button>
</form>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';

export default {
    name: 'payment-ticket',
    components: { AlertError },
    data() {
        return {
            errorList: {},
        };
    },
    props: {
        errorList: {
            type: Object,
            default: {},
        },
        total: {
            type: Number,
            required: true,
            default: 0
        },
        pedidoId: {
            type: Number,
            required: true,
            default: 0
        },
        payment: {
            type: Object,
            required: true,
            default: {}
        },
    },
    methods: {
        createObjectPayment() {
            this.payment.total = parseFloat(this.total);
            this.payment.pedidoId = Number(this.pedidoId);
            this.payment.metodoPagamento = 'Boleto Bancário';
            return this.payment;
        },
        async savePayment() {
            this.createObjectPayment();
            this.$emit('savePayment', this.payment);
        },
    },
};
</script>