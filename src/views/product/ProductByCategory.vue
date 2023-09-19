<template>
  <Banner :msg="bannerTitleMessage"></Banner>

  <SectionProduct :products="products" />

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
  import ButtonCart from '@/components/shared/ButtonCart.vue';
  import CardProduct from '@/components/product/CardProduct.vue';
  import SectionProduct from '@/components/product/SectionProduct.vue';
  import Category from '@/components/category/Category.vue';
  import Pagination from '@/components/shared/Pagination.vue';
  import ProductService from '@/services/product/ProductService';

  export default {
    components: { Banner, ButtonCart, CardProduct, SectionProduct, Category, Pagination },
    name: 'product-by-category',
    data() {
      return {
        bannerTitleMessage: 'Produtos Por Categoria',
        errorList: {},
        products: {},
        productId: 0,
        search: '',
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
          this.productId = this.$route.params.id;
          const products = await ProductService.getProducts(this.currentPage, this.perPage, '', this.productId);
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