<template>
  <AlertError
    v-if="errorList.length > 0"
    :errorList="errorList"
  />

  <li v-for="(category, index) in categories.list" :key="index">
    <RouterLink class="dropdown-item" :to="{ name: 'productByCategory', params: { id: category.id }}">
      {{ category.nome }}
    </RouterLink>
  </li>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import CategoryService from '@/services/category/CategoryService';

export default {
  name: 'category',
  components: { AlertError },
  data() {
    return {
      errorList: '',
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
        return this.categories;
      } else {
        this.errorList = CategoryService.messageError('category');
        return;
      }
    },
  },
};
</script>