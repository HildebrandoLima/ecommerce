<template>
    <div class="row">
        <div v-for="(product, index) in products.list" :key="index" class="col-lg-3 col-md-6 col-sm-6 d-flex">
            <div class="card w-100 my-2 shadow-2-strong">
                <RouterLink to="/productDetails">
                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp" class="card-img-top" style="aspect-ratio: 1 / 1">
                </RouterLink>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">
                        <RouterLink to="/productDetails" class="nav-link text-dark">{{ product.nome }}</RouterLink>
                    </h5>
                    <p class="card-text">{{ product.precoVenda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</p>

                    <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                        <RouterLink to="/cart" class="btn btn-outline-primary shadow-0 me-1">Adicionar ao carrinho</RouterLink>
                        <RouterLink to="/" class="btn btn-danger border px-2 pt-2 icon-hover"><i class="fas fa-heart fa-lg text-white px-1"></i></RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { RouterLink } from 'vue-router';
  import ProductService from '@/services/product/ProductService';

  export default {
    components: { RouterLink },
    name: 'product',
    data() {
      return {
        errorList: {},
        products: {},
        currentPage: 1,
        perPage: 10,
      };
    },
    created() {
        this.getProduct();
    },
    methods: {
      async getProduct() {
        try {
          const products = await ProductService.getProducts(this.currentPage, this.perPage, '', 0);
          this.products = products;
        } catch (error) {
          if (error.response && error.response.data.status === 400) {
            this.errorList = error.response.data.data;
          }
        }
      },
    },
};
</script>