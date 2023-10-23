<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <RouterLinks class="navbar-brand" :to="{ name: 'home' }">M D B</RouterLinks>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" href="#"><i class="fab fa-facebook-f"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#"><i class="fab fa-google"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#"><i class="fab fa-instagram"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#"><i class="fab fa-github"></i></a>
        </li>
      </ul>

      <form class="d-flex">
        <RouterLink class="btn btn-outline-primary" to="/login">Login</RouterLink>
      </form>
    </div>
  </div>
</nav>

<div class="p-3 text-center bg-white border-bottom">
  <div class="container">
    <div class="row gy-3">
      <div class="col-lg-2 col-sm-4 col-4">
        <a href="https://mdbootstrap.com/" target="_blank" class="float-start">
          <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="35">
        </a>
      </div>

      <div class="order-lg-last col-lg-5 col-sm-8 col-8">
        <div class="d-flex float-end">
          <button v-if="userName" @click="logout" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
            <i class="fas fa-user-alt m-1 me-md-2"></i>
            <p class="d-none d-md-block mb-0">Logout</p>
          </button>
          <RouterLink v-else :to="{ name: 'login' }" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
            <i class="fas fa-user-alt m-1 me-md-2"></i>
            <p class="d-none d-md-block mb-0">Login</p>
          </RouterLink>
          <RouterLink :to="{ name: 'home' }" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
            <i class="fas fa-heart m-1 me-md-2"></i>
            <p class="d-none d-md-block mb-0">Lista de Desejos</p>
          </RouterLink>
          <RouterLink :to="{ name: 'cart' }" class="border rounded py-1 px-3 nav-link d-flex align-items-center">
            <i class="fas fa-shopping-cart m-1 me-md-2"></i>
            <p class="d-none d-md-block mb-0">Meu Carrinho</p>
          </RouterLink>
        </div>
      </div>

      <div class="col-lg-5 col-md-12 col-12">
        <form>
          <div class="input-group float-center">
            <div class="form-outline">
              <input type="text" v-model="search" class="form-control" placeholder="Qual Produto Você Procura?" />
            </div>

            <button type="button" @click="searchProduct" class="btn btn-primary">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<nav class="navbar navbar-expand-lg navbar-light bg-white">
  <div class="container justify-content-center justify-content-md-between">
    <button class="navbar-toggler border py-2 text-dark" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarLeftAlignExample" aria-controls="navbarLeftAlignExample" aria-expanded="true" aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>

  <div class="navbar-collapse collapse show" id="navbarLeftAlignExample">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <RouterLink :to="{ name: 'home' }" class="nav-link active text-dark" aria-current="page">Home</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink :to="{ name: 'about' }" class="nav-link text-dark">Sobre</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink :to="{ name: 'product' }" class="nav-link text-dark">Produtos</RouterLink>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Categorias
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <CategoryList />
        </ul>
      </li>
      <li class="nav-item">
        <RouterLink v-if="userName" :to="{ name: 'profile' }" class="nav-link text-dark">Meu Perfil</RouterLink>
        <RouterLink v-else :to="{ name: 'account' }" class="nav-link text-dark">Criar Conta</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink v-if="userName" :to="{ name: 'order' }" class="nav-link text-dark">Meus Pedidos</RouterLink>
      </li>
    </ul>
  </div>
  </div>
</nav>

<AlertError
  v-if="errorList"
  :errorList="errorList"
/>

<div class="container" v-if="products.list">
  <div class="card mt-3">
    <div class="card-body">

        <ProductCard v-if="products.list" :products="products" :totalItems="totalItems" />
    </div>
  </div>
</div>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import CategoryList from '@/components/category/client/CategoryList.vue';
import ProductCard from '@/components/product/ProductCard.vue';
import AuthService from '@/services/auth/AuthService';
import ProductService from '@/services/product/ProductService';
import { userAuth } from '@/storages/AuthStorage';
import { PRODUCT_NOT_FOUND_MESSAGE, SEARCH_PRODUCT_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';
import { messages } from '@/utils/messages/Message';

export default {
  components: { AlertError, CategoryList, ProductCard },
  name: 'navbar',
  data() {
    return {
      messageSuccess: '',
      errorList: null,
      userName: '',
      search: '',
      totalItems: 0,
      products: {},
      currentPage: 1,
      perPage: 10,
    };
  },
  created() {
    const [userName] = userAuth();
    this.userName = userName;
  },
  methods: {
    async searchProduct() {
      if (this.search.trim() === '') {
        this.errorList = SEARCH_PRODUCT_NOT_FOUND_MESSAGE;
        return;
      }
      const products = await ProductService.getProducts(this.currentPage, this.perPage, this.search, 0);
      if (products.data.total === 0 || products.status !== 200) {
        this.errorList = PRODUCT_NOT_FOUND_MESSAGE;
      } else {
        this.products = products.data;
        this.totalItems = products.data.total;
      }
    },
    async logout() {
      const user = await AuthService.logout();
      if (user.status === 200) {
        messages(
          user.status,
          user.data,
          user.message
        );
        this.$router.push({name: 'login'});
      } else {
        this.errorList = user.message;
      }
    },
  },
};
</script>