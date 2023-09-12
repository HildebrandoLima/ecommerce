<template>
  <Banner :msg="bannerTitleMessage"></Banner>

  <div class="container">
      <div class="card mt-3">
        <div class="card-body">
          <p>Melhores produtos e marcas em nossa loja.</p>
          <p>Produtos modernos, preços de fábrica, excelente serviço.</p>
        </div>
      </div>
  </div>
</template>

<script>
  import Banner from '../components/Banner.vue';

  export default {
    components: { Banner },
    data() {
            return {
              bannerTitleMessage: 'Sobre Nós',
            };
        },
  };
</script>