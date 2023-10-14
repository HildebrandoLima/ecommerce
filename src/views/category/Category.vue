<template>
<Banner :msg="bannerTitleMessage"></Banner>

<div class="container-fluid">
    <div class="card mt-3">
      <div class="card-body">

        <AlertError
          v-if="errorList"
          :errorList="errorList"
        />

        <Table :data="categories" />

        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @pagechanged="handlePageChange"
        />
      </div>
    </div>
</div>
</template>

<script>
import Banner from '@/components/fixos/Banner.vue';
import Pagination from '@/components/shared/Pagination.vue';
import Table from '@/components/shared/Table.vue';
import CategoryService from '@/services/category/CategoryService';
import { CATEGORY_NOT_FOUND_MESSAGE } from '@//utils/defaultMessages/DefaultMessage';

export default {
  components: { Banner, Pagination, Table },
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
      const categories = await CategoryService.getSearchCategory(this.currentPage, this.perPage, this.getSearchCategory());
      if (categories.status === 200) {
        this.categories = categories.data;
        this.totalItems = categories.data.total;
      } else {
        this.errorList = CATEGORY_NOT_FOUND_MESSAGE;
      }
    },
  },
};
</script>