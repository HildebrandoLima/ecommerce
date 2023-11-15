<template>
<div class="card">
    <p class="text-center mt-2">
        <img src="../../assets/image/qrcode.png" width="300" height="300">
    </p>
</div>

<AlertError
    v-if="Object.keys(errorList).length > 0"
    :errorList="errorList"
/>

<form @submit.prevent="savePayment">
    <button type="submit" class="btn btn-outline-success w-100 shadow-0 mb-2 mt-3">Confirmar</button>
</form>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';

export default {
    name: 'payment-pix',
    components: { AlertError },
    data() {
        return {
            errorList: {},
        };
    },
    created() {
      this.createObjectPayment();  
    },
    props: {
        errorList: {
            type: Object,
            default: {},
        },
        total: {
            type: Number,
            default: 0
        },
        pedidoId: {
            type: Number,
            default: 0
        },
        payment: {
            type: Object,
            required: true,
            default: {},
        },
    },
    methods: {
        createObjectPayment(){
            this.payment.total = parseFloat(this.total);
            this.payment.pedidoId = Number(this.pedidoId);
            this.payment.metodoPagamento = 'Pix';
        },
        async savePayment() {
            this.createObjectPayment();
            this.$emit('savePayment', this.payment);
        },
    },
};
</script>