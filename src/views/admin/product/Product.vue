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
                <button type="button" @click="registerProduct" class="btn btn-outline-success">
                Cadastrar +
                </button>
              </div>
            </div>

            <AlertError
                v-if="errorList.length > 0"
                :errorList="errorList"
            />

            <Table
              :data="products.list"
              :columns="productColumns"
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

<!-- Modal -->
<ProductEdit id="editProductModal" :data="editedItem" />
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import Banner from '@/components/fixos/Banner.vue';
import Pagination from '@/components/shared/Pagination.vue';
import ProductEdit from '@/components/product/admin/ProductEdit.vue';
import SelectedFilter from '@/components/shared/SelectedFilter.vue';
import Table from '@/components/shared/Table.vue';
import ProductService from '@/services/product/ProductService';

export default {
  components: { AlertError, Banner, Pagination, ProductEdit, SelectedFilter, Table },
  name: 'product',
  data() {
    return {
      bannerTitleMessage: 'Produtos',
      selectedFilter: 1,
      errorList: '',
      products: {},
      editedItem: {},
      productColumns: ['nome', 'descricao', 'quantidade', 'precoVenda', 'precoCusto', 'margemLucro', 'codigoBarra', 'unidadeMedida', 'dataValidade', 'criadoEm', 'alteradoEm'],
      searchProduct: '',
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
    getSearchProduct() {
      this.searchProduct = this.$route.query;
      for (let chave in this.searchProduct) {
        this.search += this.searchProduct[chave];
      }
      return this.search;
    },
    applyFilter(selectedFilter) {
      this.selectedFilter = selectedFilter;
      this.getProducts();
    },
    async getProducts() {
      const products = await ProductService.listProducts(this.currentPage, this.perPage, '', this.selectedFilter);
      if (products.status === 200) {
        this.products = products.data;
        this.totalItems = products.data.total;
      } else {
        this.errorList = ProductService.messageError('product');
        return;
      }
    },
    registerProduct() {
      this.$router.push({name: 'productRegister'});
    },
    editItem(item) {
      ProductService.editProductModal(this.editedItem, item);
      return;
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
  },
};
</script>