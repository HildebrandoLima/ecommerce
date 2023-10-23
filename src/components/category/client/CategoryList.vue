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
      page: 1,
      perPage: 10,
    };
  },
  created() {
      this.getCategory();
  },
  methods: {
    async getCategory() {
      const categories = await CategoryService.getCategories(this.page, this.perPage, 1);
      if (categories.status === 200) {
        this.categories = categories.data;
      } else {
        this.errorList = 'Categoria Não Encontrados.';
      }
    },
  },
};
</script>