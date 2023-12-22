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
              <button type="button" @click="registerProvider" class="btn btn-outline-success">
                Cadastrar +
              </button>
            </div>
          </div>

            <AlertError
                v-if="errorList.length > 0"
                :errorList="errorList"
            />

            <Table
              :data="providers.list"
              :columns="providerColumns"
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

<ProviderEdit id="editProviderModal" :data="editedItem" />
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import Banner from '@/components/fixos/Banner.vue';
import ProviderEdit from '@/components/provider/ProviderEdit.vue';
import Pagination from '@/components/shared/Pagination.vue';
import ModalDetails from '@/components/shared/ModalDetails.vue';
import SelectedFilter from '@/components/shared/SelectedFilter.vue';
import Table from '@/components/shared/Table.vue';
import ProviderService from '@/services/provider/ProviderService';

export default {
  components: { AlertError, Banner, ProviderEdit, Pagination, ModalDetails, SelectedFilter, Table },
  name: 'provider',
  data() {
    return {
      bannerTitleMessage: 'Fornecedores',
      selectedFilter: 1,
      errorList: '',
      providers: {},
      editedItem: {},
      modalTitle: 'Cadastrar Fornecedor',
      providerColumns: ['razaoSocial', 'cnpj', 'email', 'dataFundacao', 'criadoEm', 'alteradoEm'],
      searchProvider: '',
      search: '',
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
    };
  },
  created() {
      this.getProviders();
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
    applyFilter(selectedFilter) {
      this.selectedFilter = selectedFilter;
      this.getProviders();
    },
    async getProviders() {
      const providers = await ProviderService.listProviders(this.currentPage, this.perPage, '', 0, this.selectedFilter);
      if (providers.status === 200) {
        this.providers = providers.data;
        this.totalItems = providers.data.total;
      } else {
        this.errorList = ProviderService.messageError('provider');
      }
    },
    registerProvider() {
      this.$router.push({name: 'providerRegister'});
    },
    editItem(item) {
      ProviderService.editProviderModal(this.editedItem, item);
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
  },
};
</script>