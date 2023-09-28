<template>
    <div class="card">
        <h1>Boleto</h1>
    </div>

    <AlertError
      v-if="messageError"
      :errorList="messageError"
    />

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
    import PaymentService from '@/services/payment/PaymentService';
    import { ORDER_NOT_FOUND_MESSAGE } from '@/support/utils/defaultMessages/DefaultMessage';

    export default {
        name: 'payment-ticket',
        components: { AlertError },
        data() {
            return {
                messageError: null,
                errorList: {},
                payment: {
                    total: 0,
                    metodoPagamentoId: 0,
                    pedidoId: 0,
                },
            };
        },
        created() {
            this.payment.total = parseFloat(this.total);
            this.payment.pedidoId = Number(this.pedidoId);
            this.payment.metodoPagamentoId = 1;
        },
        props: {
            total: {
                type: Number,
                default: 0
            },
            pedidoId: {
                type: Number,
                default: 0
            }
        },
        methods: {
            async savePayment() {
                if (!this.pedidoId) {
                    this.messageError = ORDER_NOT_FOUND_MESSAGE;
                    return;
                }
                const payment = await PaymentService.postPayment(this.payment);
                if (payment.status === 200) {
                    this.$router.push({name: 'home'});
                } else {
                    this.errorList = payment;
                }
            },
        },
    };
</script>