<template>
    <div class="bg-primary mb-4">
      <div class="container py-4">
        <h3 class="text-white mt-2">Categorias</h3>
  
        <nav class="d-flex mb-2">
          <h6 class="mb-0">
            <RouterLink to="/" class="text-white-50">Home</RouterLink>
              <span class="text-white-50 mx-2">&gt;</span>
            <RouterLink to="/about" class="text-white-50">Sobre</RouterLink>
              <span class="text-white-50 mx-2">&gt;</span>
            <RouterLink to="/product" class="text-white"><u>Produtos</u></RouterLink>
          </h6>
        </nav>
      </div>
    </div>

    <div class="container-fluid">
        <div class="card mt-3">
          <div class="card-body">
            <Table :data="category"></Table>
            <Pagination></Pagination>
          </div>
        </div>
    </div>
</template>

<script>
  import { RouterLink } from 'vue-router'
  import Table from '@/components/Table.vue'
  import Pagination from '@/components/Pagination.vue'
  import api from '@/api';

  export default {
    components: { RouterLink, Table, Pagination },
    name: 'category',
    errorList: {},
    totalItems: 0,
    data() {
      return {
        category: {},
        searchCategory: '',
        search: '',
      };
    },
    created() {
        this.getCategory();
    },
    methods: {
      getSearchCategory() {
        this.searchCategory = this.$route.query
        for (let chave in this.searchCategory) {
          this.search += this.searchCategory[chave]
        }
        return this.search
      },
      getCategory() {
        api.get('/category/list?page=1&perPage=10&active=1&search=' + this.getSearchCategory())
          .then((response) => {
            this.category = response.data.data
            this.totalItems = this.category.total
          })
          .catch((error) => {
            if (error.response.data.status === 400) {
                this.errorList = error.response.data.data
            }
          });
      },
    },
  };
</script>