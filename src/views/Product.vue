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
          <strong class="d-block py-2">{{ this.totalItems }} Itens Encontrados</strong>
          <div class="ms-auto">
            <select class="form-select d-inline-block w-auto border pt-1">
              <option value="">Procurar Por</option>
              <option value="1">Categorias</option>
              <option value="2">Recomendados</option>
              <option value="3">Bem Avaliados</option>
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
                  <!-- <li v-if="product.imagens.length > 0">{{ product.imagens[0].caminho }}</li> -->
                  <img v-if="product.imagens.length > 0" :src="product.imagens[0].caminho" class="card-img-top" />
              </RouterLink>

              <div class="card-body d-flex flex-column">
                <div class="d-flex flex-row">
                  DE: <h5 class="mb-1 me-1">{{ product.precoCusto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</h5>
                  POR: <span class="text-danger"><s>{{ product.precoVenda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</s></span>
                </div>

                <p class="card-text">{{ product.nome }}</p>
                <div class="card-footer d-flex align-items-end pt-3 px-0 pb-3 mt-auto">  
                  <RouterLink to="/cart">
                    <button class="btn btn-outline-primary shadow-0 me-1">
                      Adicionar ao carrinho
                    </button>
                  </RouterLink>
                  <RouterLink to="/" class="btn btn-danger border px-2 pt-2 icon-hover"><i class="fas fa-heart fa-lg text-white px-1"></i></RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-changed="handlePageChange"
        >
        </pagination>

      </div>
    </div>
  </div>            
  </section>
</template>

<script>
  import { RouterLink } from 'vue-router';
  import Category from '@/components/Category.vue';
  import Pagination from '@/components/Pagination.vue';
  import ProductService from '@/services/product/ProductService';

  export default {
    components: { RouterLink, Category, Pagination },
    name: 'product',
    errorList: {},
    data() {
      return {
        products: {},
        currentPage: 1,
        perPage: 10,
        totalItems: 0,
      };
    },
    created() {
        this.getProduct();
    },
    methods: {
      handlePageChange(newPage) {
        this.currentPage = newPage;
        this.getProduct();
      },
      async getProduct() {
        try {
          const products = await ProductService.getProducts(this.currentPage, this.perPage, '', 0);
          this.products = products;
          this.totalItems = products.total;
        } catch (error) {
          if (error.response && error.response.data.status === 400) {
            this.errorList = error.response.data.data;
          }
        }
      },
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalItems / this.perPage);
      },
    },
};
</script>