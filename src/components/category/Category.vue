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
        try {
          const categories = await CategoryService.getCategories(this.page, this.perPage);
          this.categories = categories;
        } catch (error) {
          if (error.response && error.response.data.status === 400) {
            this.errorList = error.response.data.data;
          }
        }
      },
    },
};
</script>