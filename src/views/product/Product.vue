<template>

<Banner :msg="bannerTitleMessage" />

<ProductSection :products="products" :totalItems="totalItems" />

<hr />

<Pagination
  :current-page="currentPage"
  :total-pages="totalPages"
  @pageChanged="handlePageChange"
/>

<div class="container">
  <header class="mt-5">
  <h3>Novos Produtos:</h3>
  </header>

  <hr />

  <AlertError
    v-if="errorList"
    :errorList="errorList"
  />

</div>

</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import Banner from '@/components/fixos/Banner.vue';
import ProductSection from '@/components/product/ProductSection.vue';
import Pagination from '@/components/shared/Pagination.vue';
import ProductService from '@/services/product/ProductService';
import { PRODUCT_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export default {
  components: { AlertError, Banner, ProductSection, Pagination },
  name: 'product',
  data() {
    return {
      bannerTitleMessage: 'Produtos',
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
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.getProduct();
    },
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
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
  },
};
</script>