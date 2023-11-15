<template>
<AlertError
    v-if="messageError"
    :errorList="messageError"
/>

<form @submit.prevent="savePayment">
    <div class="mb-3">
        <input type="text"
            :value="userName"
            placeholder="Nome do Titular"
            class="form-control border"
            required
        />
    </div>

    <div class="row">
        <div class="col">
            <div class="mb-3">
                <input
                    type="text"
                    id="numeroCartao"
                    v-model="payment.numeroCartao"
                    maxlength="19"
                    @input="formatCardNumber"
                    placeholder="Número do Cartão"
                    class="form-control border" 
                    required
                />
                <AlertError
                    v-if="Object.keys(errorList).length > 0"
                    :errorList="errorList.numeroCartao"
                />
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
                    :errorList="errorList.tipoCartao"
                />
            </div>
        </div>

        <div class="col">
            <input
                type="text"
                id="DataValidade"
                v-model="payment.dataValidade"
                onfocus="(this.type='date')"
                placeholder="Data de Validade"
                class="form-control"
                required
            />
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.dataValidade"
            />
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
                    :errorList="errorList.parcela"
                />
            </div>
        </div>

        <div class="col">
            <div class="mb-3">
                <input
                    type="text"
                    v-model="payment.ccv"
                    maxlength="4"
                    @input="formatCCV"
                    placeholder="CCV"
                    class="form-control border"
                    required
                />
                <AlertError
                    v-if="Object.keys(errorList).length > 0"
                    :errorList="errorList.ccv"
                />
            </div>
        </div>

    </div>

    <div class="mt-4">
        <button
            type="submit"
            class="btn btn-outline-success w-100 shadow-0 mb-2"
        >
            Pagar
        </button>
    </div>
</form>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import { userAuth } from '@/storages/AuthStorage';

export default {
    name: 'payment-card',
    components: {  AlertError },
    data() {
        return {
            messageError: null,
            errorList: {},
            userName: '',
            parcelas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        };
    },
    created() {
        this.getStorages();
        this.paymentMethod();
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
            default: {},
        },
    },
    methods: {
        getStorages() {
            const [userId, userName] = userAuth();
            this.userName = userName;
            this.payment.total = parseFloat(this.total);
            this.payment.pedidoId = Number(this.pedidoId);
        },
        paymentMethod() {
            if (this.payment.tipoCartao === 'Crédito') {
                this.payment.metodoPagamento = 'Crédito';
            } else {
                this.payment.metodoPagamento = 'Débito';
            }
        },
        formatCardNumber() {
            this.payment.numeroCartao = this.payment.numeroCartao.replace(/\D/g, '');
            this.payment.numeroCartao = this.payment.numeroCartao.replace(/(\d{4})(?=\d{4,})/g,'$1 ');
        },
        formatCCV() {
            this.payment.ccv = this.payment.ccv.replace(/\D/g, '');
        },
        async savePayment() {
            this.$emit('savePayment', this.payment);
        },
    },
};
</script>