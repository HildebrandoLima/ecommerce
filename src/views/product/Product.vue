<template>

  <Banner :msg="bannerTitleMessage" />

  <SectionProduct :products="products" :totalItems="totalItems" />

  <hr />

  <pagination
    :current-page="currentPage"
    :total-pages="totalPages"
    @page-changed="handlePageChange"
  />

  <div class="container">
    <header class="mt-5">
    <h3>Novos Produtos:</h3>
    </header>

    <hr />

    <CardProduct v-if="this.products.list" :products="products" :totalItems="totalItems" />
  </div>

</template>

<script>
  import Banner from '@/components/fixos/Banner.vue';
  import CardProduct from '@/components/product/CardProduct.vue';
  import SectionProduct from '@/components/product/SectionProduct.vue';
  import Pagination from '@/components/shared/Pagination.vue';
  import ProductService from '@/services/product/ProductService';

  export default {
    components: { Banner, CardProduct, SectionProduct, Pagination },
    name: 'product',
    data() {
      return {
        bannerTitleMessage: 'Produtos',
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
      handlePageChange(newPage) {
        this.currentPage = newPage;
        this.getProduct();
      },
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
    computed: {
      totalPages() {
        return Math.ceil(this.totalItems / this.perPage);
      },
    },
};
</script>