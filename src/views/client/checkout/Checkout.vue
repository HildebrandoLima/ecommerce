<template>
<Banner :msg="bannerTitleMessage" />

<div class="container">

  <AlertError
    v-if="Object.keys(errorList).length > 0"
    :errorList="errorList.itens"
  />

  <AlertError
    v-if="messageError"
    :errorList="messageError"
  />

  <div class="row">
    <CheckoutForm :errorList="errorList" :adresses="adresses" :order="order" />
    <CheckoutSummary :errorList="errorList" :total="total" :order="order" @saveOrder="saveOrder" />
  </div>
</div>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import Banner from '@/components/fixos/Banner.vue';
import CheckoutForm from '@/components/checkout/CheckoutForm.vue';
import CheckoutSummary from '@/components/checkout/CheckoutSummary.vue';
import OrderService from '@/services/order/OrderService';
import UserService from '@/services/user/UserService';
import { getCart, getTotalCart } from '@/storages/CartStorage';
import { userAuth } from '@/storages/AuthStorage';
import { ITEMS_NOT_FOUND_MESSAGE, USER_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export default {
  name: 'checkout',
  components: { AlertError, Banner, CheckoutForm, CheckoutSummary },
  data() {
    return {
      bannerTitleMessage: 'Checkout',
      messageError: null,
      errorList: {},
      adresses: [],
      cart: [],
      total: 0,
      userId: 0,
      order: {
        quantidadeItens: 0,
        total: 0,
        tipoEntrega: '',
        valorEntrega: 0,
        usuarioId: 0,
        enderecoId: 0,
        itens: [],
      },
    };
  },
  created() {
    this.getStorages();
    this.getUser();
    this.validateCart();
    this.addOrder();
    this.addItem();
  },
  methods: {
    getStorages() {
      const [userId] = userAuth();
      this.cart = getCart();
      this.total = parseFloat(getTotalCart());
      this.userId = userId;
    },
    validateCart() {
      if (this.cart.length === 0) {
        this.messageError = ITEMS_NOT_FOUND_MESSAGE;
      }
    },
    onTypeDeliveryChange() {
      if (this.order.tipoEntrega === 'Expresso') {
        this.order.valorEntrega = 20.00;
      } else if (this.order.tipoEntrega === 'Correio') {
        this.order.valorEntrega = 15.50;
      } else {
        this.order.valorEntrega = 0;
      }
    },
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
    async getUser() {
      const user = await UserService.listUser(this.userId);
      if (user.status === 200) {
        this.adresses = user.data[0].enderecos;
      } else {
        this.errorMessage = USER_NOT_FOUND_MESSAGE;
      }
    },
    async saveOrder() {
      const order = await OrderService.createOrder(this.order);
      if (order.status === 200) {
        this.$router.push({
          name: 'payment'
        });
      } else {
        this.errorList = order;
        this.errorList.itens = ITEMS_NOT_FOUND_MESSAGE;
      }
    },
  },
  watch: {
    'order.tipoEntrega': 'onTypeDeliveryChange',
  },
};
</script>