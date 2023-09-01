<template>
    <section class="bg-light my-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="card border shadow-0">
                        <div class="m-4">
                            <div class="row">
                                <div class="col">
                                    <h2 class="card-title mb-4">{{ product[0].nome }}</h2>
                                </div>
                                <div class="col">
                                    <RouterLink to="/" class="btn btn-danger border px-2 pt-2 icon-hover"><i class="fas fa-heart fa-lg text-white px-1"></i></RouterLink>
                                </div>
                            </div>

                            <div class="d-flex flex-row">
                                DE:<h5 class="mb-1 me-1">&nbsp;&nbsp;<s>{{ product[0].precoCusto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</s></h5>
                                POR:<span class="text-danger">&nbsp;&nbsp;{{ product[0].precoVenda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</span>
                            </div>

                            <div class="row gy-3 mb-4">
                                <div class="card mt-5">
                                    <div class="card-body">
                                        {{ product[0].descricao }}
                                    </div>
                                </div>

                                <p class="mt-5">
                                    <i class="fas fa-star fa-lg px-1"></i>
                                    <i class="fas fa-star fa-lg px-1"></i>
                                    <i class="fas fa-star fa-lg px-1"></i>
                                    <i class="fas fa-star fa-lg px-1"></i>
                                    <i class="fas fa-star fa-lg px-1"></i>
                                </p>

                                <RouterLink to="/cart" class="btn btn-primary mt-5">Adicionar ao carrinho</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-5">
                    <div class="card border shadow-0">
                        <div class="card-body">
                            <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp" class="card-img-top">

                            <div class="row">
                                <div v-for="(image, index) in product[0].imagens" :key="index" class="col">
                                    <img src="{{ image.caminho }}" class="card-img-top" style="aspect-ratio: 1 / 1">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container my-5">
            <header class="mb-4">
                <h3>Novos Produtos:</h3>
            </header>

            <CardProduct></CardProduct>
        </div>
    </section>
</template>

<script>
  import { RouterLink } from 'vue-router'
  import CardProduct from '../components/CardProduct.vue'
  import api from '@/api';

  export default {
    components: { RouterLink, CardProduct },
    name: 'product',
    errorList: {},
    data() {
      return {
        product: {},
      };
    },
    created() {
        this.getProduct();
    },
    methods: {
      getProduct() {
        api.get('/product/list/find?id=57&active=1')
          .then((response) => {
            console.log(response.data.data)
            this.product = response.data.data
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