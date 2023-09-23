<template>
  <Banner :msg="bannerTitleMessage"></Banner>

  <div class="container">

    <AlertError
        v-if="Object.keys(this.errorList).length > 0"
        :errorList="this.errorList"
    />

    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <form>

            <div class="row mb-3">
              <h6 class="mb-3">Informe o Envio:</h6><hr />
              <div class="col-lg-4 mb-3">
                <div class="form-check h-100 border rounded-3">
                  <div class="p-3">
                    <input type="radio" name="envio" value="expressa" id="expressa" class="form-check-input" checked />
                    <label class="form-check-label" for="expressa">
                      Entrega Expressa<br>
                      <small class="text-muted">3-4 dias via Fedex</small><br />
                      <small class="text-muted">
                        <input type="hidden" v-model="order.entrega" />R$20,00
                      </small>
                    </label>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-3">
                <div class="form-check h-100 border rounded-3">
                  <div class="p-3">
                    <input type="radio" name="envio" value="correio" id="correio" class="form-check-input" />
                    <label class="form-check-label" for="correio">
                      Correios<br>
                      <small class="text-muted">20-30 dias via Correio</small><br />
                      <small class="text-muted">
                        <input type="hidden" v-model="order.entrega" />
                        R$20,00
                      </small>
                    </label>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-3">
                <div class="form-check h-100 border rounded-3">
                  <div class="p-3">
                    <input type="radio" name="envio" value="loja" id="loja" class="form-check-input" />
                    <label class="form-check-label" for="loja">
                      Auto-Retirada<br>
                      <small class="text-muted">Retire em nossa Loja</small><br />
                      <small class="text-muted">
                        <input type="hidden" v-model="order.entrega" />
                        R$00,00
                      </small>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <h6 class="mb-3">Informe o Endereço:</h6><hr />
              <div class="col-lg-4 mb-3">
                <div class="form-check h-100 border rounded-3">
                  <div class="p-3">
                    <input type="radio" id="endereco" v-model="order.enderecoId" class="form-check-input" checked />
                    <label class="form-check-label" for="endereco">
                      RUA X - CENTRO, N° 10<br>
                      <small class="text-muted">3-4 dias via Correios</small>
                    </label>
                  </div>
                </div>
              </div>     
            </div>

            </form>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card">
          <div class="card-body">
            <h6 class="mb-3">Resumo:</h6><hr />

            <div class="d-flex justify-content-between">
              <p class="mb-2">Total:</p>
              <p class="mb-2">{{ total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</p>
            </div>

            <div class="d-flex justify-content-between">
              <p class="mb-2">Desconto:</p>
              <p class="mb-2 text-danger">- R$ 00,00</p>
            </div>

            <div class="d-flex justify-content-between">
              <p class="mb-2">Frete:</p>
              <p class="mb-2">+ R$ 14,00</p>
            </div>

            <div class="d-flex justify-content-between">
              <p class="mb-2">Total + Frete:</p>
              <p class="mb-2 fw-bold">R$ 149,90</p>
            </div>

            <div class="mt-3">
              <button type="button" @click="saveOrder" class="btn btn-outline-success w-100 shadow-0 mb-2">Finalizar Compra</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AlertError from '@/components/shared/AlertError.vue';
  import Banner from '@/components/fixos/Banner.vue';
  import OrderService from '@/services/order/OrderService';
  import { getCart, getTotalCart } from '@/storages/CartStorage';
  import { userAuth } from '@/storages/AuthStorage';

  export default {
    name: 'checkout',
    components: { AlertError, Banner },
    data() {
      return {
        bannerTitleMessage: 'Checkout',
        messageSuccess: '',
        errorList: {},
        cart: [],
        total: 0,
        userId: 0,
        order: {
          quantidadeItens: 0,
          total: 0,
          //tipoEntrega: 0,
          //valorEntrega: 0,
          entrega: 0,
          usuarioId: 0,
          enderecoId: 13,
          itens: [],
        },
      };
    },
    created() {
      this.cart = getCart();
      this.total = getTotalCart();
      const [userId] = userAuth();
      this.userId = userId;
      this.addOrder();
      this.addItem();
    },
    methods: {
      addOrder() {
        this.order.total = this.total;
        this.order.quantidadeItens = this.cart.length;
        this.order.usuarioId = this.userId;
      },
      addItem() {
        this.cart.forEach((item) => {
          this.order.itens.push({
            nome: item.nome,
            preco: item.precoVenda,
            quantidadeItem: item.quantidade,
            subTotal: item.subTotal,
            produtoId: item.id,
          });
        });
      },
      async saveOrder() {
        try {
          const order = await OrderService.postOrder(this.order);
            this.messageSuccess = order.data.message;
            this.$router.push({
              name: 'payment'
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