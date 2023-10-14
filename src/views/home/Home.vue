<template>
<div class="bg-primary text-white py-5">
  <div class="container py-5">
    <h1 v-if="userName">
      Olá {{ userName }}, seja bem-vindo!
    </h1>
    <h1 v-else>
      Melhores produtos e &amp;
      <br>marcas em nossa loja
    </h1>

    <p v-if="!userName">Produtos modernos, preços de fábrica, excelente serviço</p>
    <button type="button" class="btn btn-outline-light">Ver mais</button>&nbsp;

    <button type="button" class="btn btn-light shadow-0 text-primary pt-2 border border-white">
      <span class="pt-1">Compre agora</span>
    </button>
  </div>
</div>

<ProductNewGrid />
</template>

<script>
import ProductNewGrid from '@/components/product/ProductNewGrid.vue';
import { userAuth } from '@/storages/AuthStorage';

export default {
  components: { ProductNewGrid },
  name: 'home',
  data() {
    return {
      userName: '',
    };
  },
  created() {
      const [userId, userName, userEmail] = userAuth();
      this.userName = userName;
  },
};
</script>