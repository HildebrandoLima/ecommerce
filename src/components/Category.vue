<template>
    <li v-for="(category, index) in categories" :key="index">
      <RouterLink class="dropdown-item" :to="{ name: 'category', query: category.nome }">
        {{ category.nome }}
      </RouterLink>
    </li>
</template>

<script>
  import { RouterLink } from 'vue-router'
  import api from '@/api';

  export default {
    components: { RouterLink },
    name: 'category',
    errorList: {},
    data() {
      return {
        categories: {},
      };
    },
    created() {
        this.getCategory();
    },
    methods: {
      getCategory() {
        api.get('/category/list?active=1')
          .then((response) => {
            this.categories = response.data.data
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