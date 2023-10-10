<template>
<div class="card">
    <h1>QR CODE</h1>
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
import { ORDER_TO_GENERATE_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export default {
    name: 'payment-ticket',
    components: { AlertError },
    data() {
        return {
            messageError: null,
            errorList: {},
            payment: {
                total: 0,
                metodoPagamento: '',
                pedidoId: 0,
            },
        };
    },
    created() {
      this.createObjectPayment();  
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
        createObjectPayment(){
            this.payment.total = parseFloat(this.total);
            this.payment.pedidoId = Number(this.pedidoId);
            this.payment.metodoPagamento = 'Pix';
        },
        async savePayment() {
            if (!this.pedidoId) {
                this.messageError = ORDER_TO_GENERATE_MESSAGE;
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