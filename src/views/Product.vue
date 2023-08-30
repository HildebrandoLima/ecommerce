<template>
  <div class="bg-primary mb-4">
    <div class="container py-4">
      <h3 class="text-white mt-2">Produtos</h3>

      <nav class="d-flex mb-2">
        <h6 class="mb-0">
          <RouterLink to="/" class="text-white-50">Home</RouterLink>
            <span class="text-white-50 mx-2">&gt;</span>
          <RouterLink to="/about" class="text-white-50">Sobre</RouterLink>
            <span class="text-white-50 mx-2">&gt;</span>
          <RouterLink to="/product" class="text-white"><u>Produtos</u></RouterLink>
        </h6>
      </nav>
    </div>
  </div>

  <section class="">
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <div class="card">
          <div class="card-body">
            <h4>Categorias</h4><hr />
              <ul class="list-unstyled">
                <Category></Category>
              </ul>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <header class="d-sm-flex align-items-center border-bottom mb-4 pb-3">
          <strong class="d-block py-2">32 Items found </strong>
          <div class="ms-auto">
            <select class="form-select d-inline-block w-auto border pt-1">
              <option value="0">Best match</option>
              <option value="1">Recommended</option>
              <option value="2">High rated</option>
              <option value="3">Randomly</option>
            </select>
            <div class="btn-group shadow-0 border">
              <a href="#" class="btn btn-light" title="List view">
                <i class="fa fa-bars fa-lg"></i>
              </a>
              <a href="#" class="btn btn-light active" title="Grid view">
                <i class="fa fa-th fa-lg"></i>
              </a>
            </div>
          </div>
        </header>

        <div class="row">
          <div v-for="(product, index) in products.list" :key="index" class="col-lg-4 col-md-6 col-sm-6 d-flex">
            <div class="card w-100 my-2 shadow-2-strong">
              <RouterLink to="productDetails">
                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp" class="card-img-top">
              </RouterLink>
              <div class="card-body d-flex flex-column">
                <div class="d-flex flex-row">
                  DE: <h5 class="mb-1 me-1">{{ product.precoCusto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</h5>
                  POR: <span class="text-danger"><s>{{ product.precoVenda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</s></span>
                </div>

                <p class="card-text">{{ product.nome }}</p>
                <div class="card-footer d-flex align-items-end pt-3 px-0 pb-3 mt-auto">                  
                  <RouterLink to="/cart" class="btn btn-outline-primary shadow-0 me-1">Adicionar ao carrinho</RouterLink>
                  <RouterLink to="/" class="btn btn-danger border px-2 pt-2 icon-hover"><i class="fas fa-heart fa-lg text-white px-1"></i></RouterLink>
                </div>
              </div>
            </div>
          </div>         
        </div>

        <hr />
        <Pagination></Pagination>
      </div>
    </div>
  </div>            
</section>
</template>

<script>
  import { RouterLink } from 'vue-router'
  import Category from '@/components/Category.vue'
  import Pagination from '@/components/Pagination.vue'
  import api from '@/api';

  export default {
    components: {RouterLink, Category, Pagination},
    name: 'product',
    errorList: {},
    data() {
      return {
        products: {},
      };
    },
    created() {
        this.getProduct();
    },
    methods: {
      getProduct() {
        api.get('/product/list?page=1&perPage=10&active=1')
          .then((response) => {
            console.log(response.data.data)
            this.products = response.data.data
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