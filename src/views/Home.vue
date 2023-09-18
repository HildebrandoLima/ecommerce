<template>
    <div class="bg-primary text-white py-5">
    <div class="container py-5">
      <h1>
        Melhores produtos e &amp;
        <br>marcas em nossa loja
      </h1>

      <p>Produtos modernos, preços de fábrica, excelente serviço</p>
      <button type="button" class="btn btn-outline-light">Ver mais</button>&nbsp;

      <button type="button" class="btn btn-light shadow-0 text-primary pt-2 border border-white">
        <span class="pt-1">Compre agora</span>
      </button>
    </div>
  </div>

  <div class="container">
    <header class="mt-5">
      <h3>Novos Produtos:</h3>
    </header>

    <hr />

    <CardProduct v-if="this.products.list" :products="products" :totalItems="totalItems" />
  </div>

</template>

<script>
  import { RouterLink } from 'vue-router';
  import CardProduct from '@/components/product/CardProduct.vue';
  import ProductService from '@/services/product/ProductService';

  export default {
    components: { RouterLink, CardProduct },
    name: 'home',
    data() {
      return {
        errorList: {},
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
        try {
          const products = await ProductService.getProducts(this.currentPage, this.perPage, '', 0);
          this.products = products;
          this.totalItems = products.total;
        } catch (error) {
          if (error.response && error.response.data.status === 400) {
            this.errorList = error.response.data.data;
          }
        }
      },
    },
};
</script>