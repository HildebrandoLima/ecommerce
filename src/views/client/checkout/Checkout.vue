<template>
<Banner :msg="bannerTitleMessage" />

<div class="container">

  <AlertError
    v-if="messageError.length > 0"
    :errorList="messageError"
  />

  <div class="row">
    <CheckoutForm
      :errorList="errorList"
      :adresses="adresses"
      :order="order"
    />

    <CheckoutSummary
      :errorList="errorList"
      :total="total"
      :order="order"
      @saveOrder="saveOrder"
    />
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

export default {
  name: 'checkout',
  components: { AlertError, Banner, CheckoutForm, CheckoutSummary },
  data() {
    return {
      bannerTitleMessage: 'Checkout',
      messageError: '',
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
    this.getProps();
    this.getUserAddress();
    this.validateCart();
  },
  methods: {
    getProps() {
      this.total = OrderService.getTotalCart();
      this.userId = OrderService.getUser();
      this.cart = OrderService.getCart();
    },
    validateCart() {
      if (this.cart.length === 0) {
        this.messageError = OrderService.messageError('cart');
        return;
      }
    },
    onTypeDeliveryChange() {
      this.order.valorEntrega = OrderService.typeDeliveryChange(this.order.tipoEntrega);
      this.createOrderObject();
    },
    createOrderObject() {
      this.order = OrderService.createOrderObject(this.order, this.total);
    },
    async getUserAddress() {
      const user = await UserService.listUser(this.userId);
      if (user.status === 200) {
        this.adresses = user.data[0].enderecos;
      } else {
        this.messageError = OrderService.messageError('user');
        return;
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
        this.messageError = OrderService.messageError('item');
        return;
      }
    },
  },
  watch: {
    'order.tipoEntrega': 'onTypeDeliveryChange',
  },
};
</script>