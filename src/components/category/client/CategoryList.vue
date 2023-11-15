<template>
  <li v-for="(category, index) in categories.list" :key="index">
    <RouterLink class="dropdown-item" :to="{ name: 'productByCategory', params: { id: category.categoriaId}}">
      {{ category.nome }}
    </RouterLink>
  </li>
</template>

<script>
import CategoryService from '@/services/category/CategoryService';

export default {
  name: 'category',
  errorList: {},
  data() {
    return {
      categories: {},
      currentPage: 1,
      perPage: 10,
    };
  },
  created() {
      this.getCategories();
  },
  methods: {
    async getCategories() {
      const categories = await CategoryService.listCategories(this.currentPage, this.perPage, 1);
      if (categories.status === 200) {
        this.categories = categories.data;
      } else {
        this.errorList = 'Categoria Não Encontrados.';
      }
    },
  },
};
</script>