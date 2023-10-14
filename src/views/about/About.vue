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

<ProductNewGrid />
</template>

<script>
import Banner from '@/components/fixos/Banner.vue';
import ProductNewGrid from '@/components/product/ProductNewGrid.vue';

export default {
  components: { Banner, ProductNewGrid },
  name: 'product',
  data() {
    return {
      bannerTitleMessage: 'Sobre Nós',
    };
  },
};
</script>