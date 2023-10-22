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

            <Table :data="providers.list" :columns="providerColumns" />

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
import ProviderService from '@/services/provider/ProviderService';
import { PROVIDER_NOT_FOUND_MESSAGE } from '@//utils/defaultMessages/DefaultMessage';

export default {
  components: { Banner, Pagination, Table },
  name: 'provider',
  data() {
    return {
      bannerTitleMessage: 'Fornecedores',
      errorList: {},
      providers: {},
      providerColumns: ['razaoSocial', 'cnpj', 'email', 'dataFundacao', 'criadoEm', 'alteradoEm', 'ativo'],
      searchProvider: '',
      search: '',
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
    };
  },
  created() {
      this.getProvider();
  },
  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.getProduct();
    },
    getSearchProvider() {
      this.searchProvider = this.$route.query;
      for (let chave in this.searchProvider) {
        this.search += this.searchProvider[chave];
      }
      return this.search;
    },
    async getProvider() {
      const providers = await ProviderService.getProviders(this.currentPage, this.perPage, '', 0);
      if (providers.status === 200) {
        this.providers = providers.data;
        this.totalItems = providers.data.total;
      } else {
        this.errorList = PROVIDER_NOT_FOUND_MESSAGE;
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