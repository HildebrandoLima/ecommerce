<template>
<Banner :msg="bannerTitleMessage" />

<div class="container-fluid">
    <div class="card mt-3">
        <div class="card-body">

          <div class="col-lg-12" style="text-align: right;">
            <button type="button" class="btn btn-outline-success">Cadastrar +</button>
          </div>

            <AlertError
                v-if="errorList"
                :errorList="errorList"
            />

            <Table :data="products.list" :columns="productColumns" />

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
import ProductService from '@/services/product/ProductService';
import { PRODUCT_NOT_FOUND_MESSAGE } from '@//utils/defaultMessages/DefaultMessage';

export default {
  components: { Banner, Pagination, Table },
  name: 'product',
  data() {
    return {
      bannerTitleMessage: 'Produtos',
      errorList: {},
      products: {},
      productColumns: ['nome', 'descricao', 'quantidade', 'precoVenda', 'precoCusto', 'margemLucro', 'codigoBarra', 'unidadeMedida', 'dataValidade', 'criadoEm', 'alteradoEm', 'ativo'],
      searchProduct: '',
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
    getSearchProduct() {
      this.searchProduct = this.$route.query;
      for (let chave in this.searchProduct) {
        this.search += this.searchProduct[chave];
      }
      return this.search;
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