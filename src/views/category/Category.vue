<template>
  <Banner :msg="bannerTitleMessage"></Banner>

    <div class="container-fluid">
        <div class="card mt-3">
          <div class="card-body">
            <Table :data="categories"></Table>
            <pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-changed="handlePageChange"
            >
            </pagination>
          </div>
        </div>
    </div>
</template>

<script>
  import { RouterLink } from 'vue-router';
  import Banner from '@/components/fixos/Banner.vue';
  import Pagination from '@/components/shared/Pagination.vue';
  import Table from '@/components/fixos/Table.vue';
  import CategoryService from '@/services/category/CategoryService';

  export default {
    components: { RouterLink, Banner, Pagination, Table },
    name: 'category',
    data() {
      return {
        bannerTitleMessage: 'Categorias',
        errorList: {},
        categories: {},
        searchCategory: '',
        search: '',
        currentPage: 1,
        perPage: 10,
        totalItems: 0,
      };
    },
    created() {
        this.getCategory();
    },
    methods: {
      getSearchCategory() {
        this.searchCategory = this.$route.query;
        for (let chave in this.searchCategory) {
          this.search += this.searchCategory[chave];
        }
        return this.search;
      },
      async getCategory() {
        try {
          const categories = await CategoryService.getSearchCategory(this.currentPage, this.perPage, this.getSearchCategory());
          this.categories = categories;
          this.totalItems = categories.total;
        } catch (error) {
          if (error.response && error.response.data.status === 400) {
            this.errorList = error.response.data.data;
          }
        }
      },
    },
  };
</script>