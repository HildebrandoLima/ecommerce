<template>
<Banner :msg="bannerTitleMessage" />

<AlertError
  v-if="errorList"
  :errorList="errorList"
/>

<ProductSection
  :products="products"
  :totalItems="totalItems"
/>

<hr />

<Pagination
  :currentPage="currentPage"
  :totalPages="totalPages"
  @pageChanged="handlePageChange"
/>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import Banner from '@/components/fixos/Banner.vue';
import ButtonCart from '@/components/shared/ButtonCart.vue';
import ProductSection from '@/components/product/client/ProductSection.vue';
import Pagination from '@/components/shared/Pagination.vue';
import ProductService from '@/services/product/ProductService';

export default {
  components: { AlertError, Banner, ButtonCart, ProductSection, Pagination },
  name: 'product-by-category',
  data() {
    return {
      bannerTitleMessage: 'Produtos Por Categoria',
      errorList: null,
      products: {},
      categoryId: 0,
      search: '',
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
    };
  },
  created() {
      this.getProducts();
  },
  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.getProducts();
    },
    async getProducts() {
        this.categoryId = this.$route.params.id;
        const products = await ProductService.listProducts(this.currentPage, this.perPage, this.categoryId, 1);
        if (products.status === 200) {
          this.products = products.data;
          this.totalItems = products.data.total;
        } else {
          this.errorList = ProductService.messageError('product');
          return;
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