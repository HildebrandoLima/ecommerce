<script setup>
  import CardProduct from '../components/CardProduct.vue'
</script>

<template>
    <div class="bg-primary text-white py-5">
    <div class="container py-5">
      <h1>
        Melhores produtos e &amp;
        <br>marcas em nossa loja
      </h1>

      <p>Produtos modernos, preços de fábrica, excelente serviço</p>
      <button type="button" class="btn btn-outline-light">Ver mais</button>&nbsp;

      <button type="button" class="btn btn-light shadow-0 text-primary pt-2 border border-white">
        <span class="pt-1">Compre agora</span>
      </button>
    </div>
  </div>

  <div class="container">
    <header class="mt-5">
      <h3>Novos Produtos:</h3>
    </header>

    <hr />

    <CardProduct></CardProduct>
  </div>
  
</template>