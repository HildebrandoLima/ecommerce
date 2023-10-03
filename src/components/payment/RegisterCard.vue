<template>
    <AlertError
      v-if="messageError"
      :errorList="messageError"
    />

    <form @submit.prevent="savePayment">
        <div class="mb-3">
            <input type="text" :value="userName" class="form-control border" placeholder="Nome do Titular" required />
        </div>

        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <input type="text" id="numeroCartao" v-model="payment.numeroCartao" maxlength="19" OnKeyPress="format('#### #### #### ####',this)" class="form-control border" placeholder="Número do Cartão" required />
                    <AlertError
                    v-if="Object.keys(errorList).length > 0"
                    :errorList="errorList.numeroCartao" />
                </div>
            </div>

            <div class="col">
                <div class="mb-3">
                    <select id="tipoCartao" v-model="payment.tipoCartao" class="form-select" required >
                        <option value="">-- Selecione o Tipo de Cartão --</option>
                        <option value="Débito">Débito</option>
                        <option value="Crédito">Crédito</option>
                    </select>
                    <AlertError
                    v-if="Object.keys(errorList).length > 0"
                    :errorList="errorList.tipoCartao" />
                </div>
            </div>

            <div class="col">
                <input type="text" id="DataValidade" v-model="payment.dataValidade" class="form-control" placeholder="Data de Validade" onfocus="(this.type='date')" required />
                <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.dataValidade" />
            </div>
        </div>


        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <select id="parcela" v-model="payment.parcela" class="form-select" required >
                        <option value="">-- Selecione a Parcela --</option>
                        <option v-for="parcela in parcelas" :value="parcela" :key="parcela">{{ parcela }}x</option>
                    </select>
                    <AlertError
                    v-if="Object.keys(errorList).length > 0"
                    :errorList="errorList.parcela" />
                </div>
            </div>

            <div class="col">
                <div class="mb-3">
                    <input type="text" v-model="payment.ccv" maxlength="4" class="form-control border" placeholder="CCV" required />
                    <AlertError
                    v-if="Object.keys(errorList).length > 0"
                    :errorList="errorList.ccv" />
                </div>
            </div>

        </div>

        <div class="mt-4">
            <button type="submit" class="btn btn-outline-success w-100 shadow-0 mb-2">Pagar</button>
        </div>
    </form>
</template>

<script>
    import AlertError from '@/components/shared/AlertError.vue';
    import PaymentService from '@/services/payment/PaymentService';
    import { userAuth } from '@/storages/AuthStorage';
    import { ORDER_TO_GENERATE_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

    export default {
        name: 'payment-card',
        components: {  AlertError },
        data() {
            return {
                messageError: null,
                errorList: {},
                userName: '',
                parcelas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                payment: {
                    numeroCartao: '',
                    tipoCartao: '',
                    dataValidade: '',
                    ccv: '',
                    parcela: 0,
                    total: 0,
                    metodoPagamentoId: 0,
                    pedidoId: 0,
                },
            };
        },
        created() {
            const [userId, userName] = userAuth();
            this.userName = userName;
            this.payment.total = parseFloat(this.total);
            this.payment.pedidoId = Number(this.pedidoId);
            this.paymentMethod();
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
            paymentMethod() {
                if (this.payment.tipoCartao === 'Crédito') {
                    this.payment.metodoPagamentoId = 2;
                } else {
                    this.payment.metodoPagamentoId = 3;
                }
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