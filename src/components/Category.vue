<script setup>
    import { RouterLink } from 'vue-router'
</script>

<template>
    <li v-for="(category, index) in categories" :key="index"><RouterLink class="dropdown-item" to="{{ category.nome }}">{{ category.nome }}</RouterLink></li>
</template>

<script>
  import api from '@/api';

  export default {
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
            console.log(response.data.data)
            this.categories = response.data.data
          })
          .catch((error) => {
            if (error.response.data.status === 400) {
                console.log(error.response.data.data)
                this.errorList = error.response.data.data
            }
          });
      },
    },
};
</script>