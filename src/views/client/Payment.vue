<template>
  <Banner :msg="bannerTitleMessage"></Banner>

  <div class="container">

    <AlertSuccess :messageSuccess="this.messageSuccess" />

    <div class="card mt-3">
      <div class="card-body">
        <div class="m-4">
          <div class="card text-center">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs" id="myTab">
                <li class="nav-item">
                  <a href="#boleto" class="nav-link active" data-bs-toggle="tab">Boleto</a>
                </li>
                <li class="nav-item">
                  <a href="#card" class="nav-link" data-bs-toggle="tab">Cartão</a>
                </li>
                <li class="nav-item">
                  <a href="#pix" class="nav-link" data-bs-toggle="tab">PIX</a>
                </li>
              </ul>
            </div>

            <div class="card-body">
              <div class="tab-content">

                <div class="tab-pane fade show active" id="boleto">
                  <h5 class="card-title">Boleto</h5><hr />
                  <div class="card">
                    <h1>Boleto</h1>
                  </div>
                  <form @submit.prevent="savePayment">
                    <input type="hidden" name="metodo_pagamento" value="pix" />

                    <button type="submit" class="btn btn-outline-success w-100 shadow-0 mb-2 mt-3">Pagar</button>
                  </form>
                </div>

                <div class="tab-pane fade" id="card">
                  <h5 class="card-title">Cartão</h5><hr />

                  <form @submit.prevent="savePayment">
                    <input type="hidden" v-model="paymentCard.metodoPagamentoId" />
                    <div class="mb-3">
                      <input type="text" name="titular" class="form-control border" placeholder="Nome do Titular" />
                      <AlertError
                      v-if="Object.keys(this.errorList).length > 0"
                      :errorList="this.errorList.titular" />
                    </div>

                    <div class="row">
                      <div class="col">
                        <div class="mb-3">
                          <input type="text" id="numeroCartao" v-model="paymentCard.numeroCartao" maxlength="19" OnKeyPress="format('####-####-####-####',this)" class="form-control border" placeholder="Número do Cartão" />
                          <AlertError
                          v-if="Object.keys(this.errorList).length > 0"
                          :errorList="this.errorList.numeroCartao" />
                        </div>
                      </div>
                      <div class="col">
                        <input type="text" id="DataValidade" v-model="paymentCard.dataValidade" class="form-control" placeholder="Data de Validade" onfocus="(this.type='date')" />
                        <AlertError
                        v-if="Object.keys(this.errorList).length > 0"
                        :errorList="this.errorList.dataValidade" />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col">
                        <div class="mb-3">
                          <select id="parcela" v-model="paymentCard.parcela" class="form-select" required >
                            <option selected>-- Selecione a Parcelas --</option>
                            <option v-for="parcela in parcelas" :value="parcela" :key="parcela">{{ parcela }}x</option>
                          </select>
                          <AlertError
                          v-if="Object.keys(this.errorList).length > 0"
                          :errorList="this.errorList.parcela" />
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <input type="text" v-model="paymentCard.ccv" maxlength="4" class="form-control border" placeholder="CCV" />
                          <AlertError
                          v-if="Object.keys(this.errorList).length > 0"
                          :errorList="this.errorList.ccv" />
                        </div>
                      </div>
                    </div>

                    <div class="mt-4">
                      <button type="submit" class="btn btn-outline-success w-100 shadow-0 mb-2">Pagar</button>
                    </div>
                  </form>
                </div>

                <div class="tab-pane fade" id="pix">
                  <h5 class="card-title">PIX</h5><hr />
                  <div class="card">
                    <h1>QR CODE</h1>
                  </div>
                  <form @submit.prevent="savePayment">
                    <input type="hidden" name="metodo_pagamento" value="pix" />

                    <button type="submit" class="btn btn-outline-success w-100 shadow-0 mb-2 mt-3">Pagar</button>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Banner from '@/components/fixos/Banner.vue';
  import AlertSuccess from '@/components/shared/AlertSuccess.vue';
  import AlertError from '@/components/shared/AlertError.vue';
  import PaymentService from '@/services/payment/PaymentService';
  import { getTotalCart } from '@/storages/CartStorage';
  import { getOrder } from '@/storages/CheckoutStorage';

  export default {
    name: 'payment',
    components: { AlertSuccess, AlertError, Banner },
    data() {
      return {
        bannerTitleMessage: 'Pagamento',
        messageSuccess: '',
        errorList: {},
        total: 0,
        pedidoId: 0,
        parcelas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        payment: {},
        paymentCard: {
          numeroCartao: '',
          dataValidade: '',
          ccv: '',
          parcela: 0,
          total: 0,
          metodoPagamentoId: 0,
          pedidoId: 0,
        },
        paymentPix: {
          total: 0,
          metodoPagamentoId: 0,
          pedidoId: 0,
        },
      };
    },
    created() {
      this.total = getTotalCart();
      this.pedidoId = getOrder();
      this.addPaymentCard();
    },
    methods: {
      addPaymentCard() {
        if (this.paymentCard) {
            this.payment = this.paymentCard;
            this.payment.ccv = Number(this.payment.ccv);
            this.payment.total = parseFloat(this.total);
            this.payment.pedidoId = Number(this.pedidoId);
            this.payment.metodoPagamentoId =  2;
            // 2 - Cartão de Crédito, 3 - Cartão de Débito
          } else {
            this.payment = this.paymentPix;
            this.payment.ccv = Number(this.payment.ccv);
            this.payment.total = parseFloat(this.total);
            this.payment.pedidoId = Number(this.pedidoId);
            this.payment.metodoPagamentoId = 5;
          }
      },
      async savePayment() {
        try {
          const payment = await PaymentService.postPayment(this.payment);
          this.messageSuccess = payment.data.message;
          this.$router.push({
            name: 'home'
          });
        } catch (error) {
          if (error.response && error.response.data.status === 400 || error.response.data.status === 401) {
            this.errorList = error.response.data.data;
          }
        }
      },
    },
  };
</script>