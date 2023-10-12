<template>
<nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
  <ul class="pagination">
    <li class="page-item disabled">
      <button class="page-link" @click="previousPage" :disabled="currentPage === 1" id="btn_prev" aria-label="Previous">
        <span aria-hidden="true">«</span>
      </button>
    </li>

    <li v-for="page in totalPages" :key="page" class="page-item">
      <button @click="setCurrentPage(page)" class="page-link" :class="{ active: currentPage === page }">{{ page }}</button>
    </li>

    <li class="page-item">
      <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages" id="btn_next" aria-label="Next">
        <span aria-hidden="true">»</span>
      </button>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number,
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.$emit('pageChanged', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('pageChanged', this.currentPage + 1);
      }
    },
    setCurrentPage(page) {
      this.$emit('pageChanged', page);
    },
  },
};
</script>