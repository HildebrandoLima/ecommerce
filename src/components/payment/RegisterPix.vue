<template>
    <div class="card">
        <h1>QR CODE</h1>
    </div>

    <form @submit.prevent="savePayment">
        <button type="submit" class="btn btn-outline-success w-100 shadow-0 mb-2 mt-3">Pagar</button>
    </form>
</template>

<script>
    import AlertSuccess from '@/components/shared/AlertSuccess.vue';
    import AlertError from '@/components/shared/AlertError.vue';
    import PaymentService from '@/services/payment/PaymentService';

    export default {
        name: 'payment-ticket',
        components: { AlertSuccess, AlertError },
        data() {
            return {
                messageSuccess: '',
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
            this.payment.metodoPagamentoId = 5;
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
                try {
                    const payment = await PaymentService.postPayment(this.payment);
                    this.messageSuccess = payment.data.message;
                    this.$router.push({
                        name: 'home'
                    });
                } catch (error) {
                    if (error.response && error.response.data.status === 400 || error.response.data.status === 401) {
                        if (error.response.data.data.pedidoId) {
                            this.errorList = 'Você não gerou um pedido.';
                        } else {
                            this.errorList = error.response.data.data;
                        }
                    }
                }
            },
        },
    };
</script>