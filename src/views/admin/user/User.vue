<template>
<Banner :msg="bannerTitleMessage" />

<div class="container-fluid">
    <div class="card mt-3">
        <div class="card-body">

            <AlertError
                v-if="errorList.length > 0"
                :errorList="errorList"
            />

            <Table :data="users.list" :columns="userColumns" />

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
import AlertError from '@/components/shared/AlertError.vue';
import Banner from '@/components/fixos/Banner.vue';
import Pagination from '@/components/shared/Pagination.vue';
import Table from '@/components/shared/Table.vue';
import UserService from '@/services/user/UserService';

export default {
  components: { AlertError, Banner, Pagination, Table },
  name: 'user',
  data() {
    return {
      bannerTitleMessage: 'Usuários',
      errorList: '',
      users: {},
      userColumns: ['nome', 'cpf', 'email', 'dataNascimento', 'genero', 'eAdmin', 'emailVerificado', 'criadoEm', 'alteradoEm', 'ativo'],
      searchUser: '',
      search: '',
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
    };
  },
  created() {
      this.getUsers();
  },
  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.getUsers();
    },
    getSearchUser() {
      this.searchUser = this.$route.query;
      for (let chave in this.searchUser) {
        this.search += this.searchUser[chave];
      }
      return this.search;
    },
    async getUsers() {
      const users = await UserService.listUsers(this.currentPage, this.perPage, '', 0);
      if (users.status === 200) {
        this.users = users.data;
        this.totalItems = users.data.total;
      } else {
        this.errorList = UserService.messageError('user');
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