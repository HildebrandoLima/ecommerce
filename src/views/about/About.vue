<template>
<Banner :msg="bannerTitleMessage"></Banner>

<div class="container">
    <div class="card mt-3">
      <div class="card-body">
        <p>Melhores produtos e marcas em nossa loja.</p>
        <p>Produtos modernos, preços de fábrica, excelente serviço.</p>
      </div>
    </div>
</div>

<div class="container">
  <header class="mt-5">
    <h3>Novos Produtos:</h3>
  </header>

  <hr />

  <AlertError
    v-if="errorList"
    :errorList="errorList"
  />

  <CardProduct v-if="products.list" :products="products" :totalItems="totalItems" />
</div>

</template>

<script>
  import AlertError from '@/components/shared/AlertError.vue';
  import Banner from '@/components/fixos/Banner.vue';
  import CardProduct from '@/components/product/CardProduct.vue';
  import ProductService from '@/services/product/ProductService';
  import { PRODUCT_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

  export default {
    components: { AlertError, Banner, CardProduct },
    name: 'product',
    data() {
      return {
        bannerTitleMessage: 'Sobre Nós',
        auth: {},
        errorList: null,
        products: {},
        currentPage: 1,
        perPage: 10,
        totalItems: 0,
      };
    },
    created() {
        this.getProduct();
    },
    methods: {
      async getProduct() {
        const products = await ProductService.getProducts(this.currentPage, this.perPage, '', 0);
        if (products.status === 200) {
          this.products = products.data;
          this.totalItems = products.data.total;
        } else {
          this.errorList = PRODUCT_NOT_FOUND_MESSAGE;
        }
      },
    },
};
</script>