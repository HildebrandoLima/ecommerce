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

    <CardProduct v-if="this.products.list" :products="products" :totalItems="totalItems" />
  </div>

</template>

<script>
  import Banner from '../components/Banner.vue';
  import CardProduct from '@/components/CardProduct.vue';
  import ProductService from '@/services/product/ProductService';

  export default {
    components: { Banner, CardProduct },
    name: 'product',
    data() {
      return {
        bannerTitleMessage: 'Sobre Nós',
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