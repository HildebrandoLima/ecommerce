<template>
<Banner :msg="bannerTitleMessage" />

<div class="container-fluid">
    <div class="card mt-3">
      <div class="card-body">

        <AlertError
          v-if="errorList"
          :errorList="errorList"
        />

        <Table :data="categories.list" :columns="categoryColumns" />

        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @pageChanged="handlePageChange"
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
      categoryColumns: ['nome', 'criadoEm', 'alteradoEm', 'ativo'],
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
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.getCategory();
    },
    getSearchCategory() {
      this.searchCategory = this.$route.query;
      for (let chave in this.searchCategory) {
        this.search += this.searchCategory[chave];
      }
      return this.search;
    },
    async getCategory() {
      const categories = await CategoryService.getCategories(this.currentPage, this.perPage);
      if (categories.status === 200) {
        this.categories = categories.data;
        this.totalItems = categories.data.total;
      } else {
        this.errorList = CATEGORY_NOT_FOUND_MESSAGE;
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