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
                v-if="errorList"
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
import Banner from '@/components/fixos/Banner.vue';
import Pagination from '@/components/shared/Pagination.vue';
import ProductEdit from '@/components/product/admin/ProductEdit.vue';
import SelectedFilter from '@/components/shared/SelectedFilter.vue';
import Table from '@/components/shared/Table.vue';
import ProductService from '@/services/product/ProductService';
import { PRODUCT_NOT_FOUND_MESSAGE } from '@//utils/defaultMessages/DefaultMessage';

export default {
  components: { Banner, Pagination, ProductEdit, SelectedFilter, Table },
  name: 'product',
  data() {
    return {
      bannerTitleMessage: 'Produtos',
      selectedFilter: 1,
      errorList: {},
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
      const products = await ProductService.getProducts(this.currentPage, this.perPage, '', 0, this.selectedFilter);
      if (products.status === 200) {
        this.products = products.data;
        this.totalItems = products.data.total;
      } else {
        this.errorList = PRODUCT_NOT_FOUND_MESSAGE;
      }
    },
    registerProduct() {
      this.$router.push({name: 'productRegister'});
    },
    editItem(item) {
      this.editedItem.id = item.produtoId;
      this.editedItem.nome = item.nome;
      this.editedItem.descricao = item.descricao;
      this.editedItem.quantidade = item.quantidade;
      this.editedItem.precoVenda = item.precoVenda;
      this.editedItem.precoCusto = item.precoCusto;
      this.editedItem.codigoBarra = item.codigoBarra;
      this.editedItem.unidadeMedida = item.unidadeMedida;
      this.editedItem.dataValidade = item.dataValidade;
      this.editedItem.codigoBarra = item.codigoBarra;
      this.editedItem.categoriaId = item.categoriaId;
      this.editedItem.fornecedorId = item.fornecedorId;
      this.editedItem.ativo = item.ativo;
      $('#editProductModal').modal('show');
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
  },
};
</script>