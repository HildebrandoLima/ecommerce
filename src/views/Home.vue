<script setup>
  import Banner from '../components/Banner.vue'
  import CardProduct from '../components/CardProduct.vue'
</script>

<template>
  <Banner></Banner>
  <div class="container">
    <header class="mt-5">
      <h3>Novos Produtos:</h3>
    </header>

    <hr />

    <CardProduct></CardProduct>
  </div>
  
</template>