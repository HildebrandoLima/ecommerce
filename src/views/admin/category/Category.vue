<template>
<Banner :msg="bannerTitleMessage" />

<div class="container-fluid">
    <div class="card mt-3">
      <div class="card-body">

        <div class="row">
          <div class="col-lg-12 mt-1" style="text-align: right;">
            <SelectedFilter @filterChanged="applyFilter" />
          </div>

          <div class="col-lg-12 mt-1" style="text-align: right;">
            <button type="button" @click="registerCategory" class="btn btn-outline-success" data-toggle="modal" data-target="#registerCategoryModal">
              Cadastrar +
            </button>
          </div>
        </div>

        <AlertError
          v-if="errorList.length > 0"
          :errorList="errorList"
        />

        <Table
          :data="categories.list"
          :columns="categoryColumns"
          :displayEdit="true"
          @edit="editItem"
        />

        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @pageChanged="handlePageChange"
        />
      </div>
    </div>
</div>

<CategoryEdit id="editCategoryModal" :data="editedItem" />

<ModalDetails :modalId="modalId" :modalTitle="modalTitle">
    <CategoryRegister />
</ModalDetails>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import Banner from '@/components/fixos/Banner.vue';
import CategoryEdit from '@/components/category/admin/CategoryEdit.vue';
import CategoryRegister from '@/components/category/admin/CategoryRegister.vue';
import Pagination from '@/components/shared/Pagination.vue';
import ModalDetails from '@/components/shared/ModalDetails.vue';
import SelectedFilter from '@/components/shared/SelectedFilter.vue';
import Table from '@/components/shared/Table.vue';
import CategoryService from '@/services/category/CategoryService';

export default {
  components: { AlertError, Banner, CategoryEdit, CategoryRegister, Pagination, ModalDetails, SelectedFilter, Table },
  name: 'category',
  data() {
    return {
      bannerTitleMessage: 'Categorias',
      selectedFilter: 1,
      errorList: '',
      categories: {},
      editedItem: {},
      modalId: 'registerCategoryModal',
      modalTitle: 'Cadastrar Categoria',
      categoryColumns: ['nome', 'criadoEm', 'alteradoEm'],
      searchCategory: '',
      search: '',
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
    };
  },
  created() {
      this.getCategories();
  },
  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.getCategories();
    },
    getSearchCategory() {
      this.searchCategory = this.$route.query;
      for (let chave in this.searchCategory) {
        this.search += this.searchCategory[chave];
      }
      return this.search;
    },
    applyFilter(selectedFilter) {
      this.selectedFilter = selectedFilter;
      this.getCategories();
    },
    async getCategories() {
      const categories = await CategoryService.listCategories(this.currentPage, this.perPage, this.selectedFilter);
      if (categories.status === 200) {
        this.categories = categories.data;
        this.totalItems = categories.data.total;
      } else {
        this.errorList = CategoryService.messageError('category');
        return;
      }
    },
    registerCategory() {
      $('#registerCategoryModal').modal('show');
    },
    editItem(item) {
      CategoryService.editCategoryModal(this.editedItem, item);
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
  },
};
</script>