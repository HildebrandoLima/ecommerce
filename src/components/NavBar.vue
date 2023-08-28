<script setup>
    import { RouterLink } from 'vue-router'
    import Category from './Category.vue'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">M D B</a>
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
            <RouterLink to="/login" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
              <i class="fas fa-user-alt m-1 me-md-2"></i>
              <p class="d-none d-md-block mb-0">Login</p>
            </RouterLink>
            <RouterLink to="/" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
              <i class="fas fa-heart m-1 me-md-2"></i>
              <p class="d-none d-md-block mb-0">Lista de Desejos</p>
            </RouterLink>
            <RouterLink to="/cart" class="border rounded py-1 px-3 nav-link d-flex align-items-center">
              <i class="fas fa-shopping-cart m-1 me-md-2"></i>
              <p class="d-none d-md-block mb-0">Meu Carrinho</p>
            </RouterLink>
          </div>
        </div>

        <div class="col-lg-5 col-md-12 col-12">
          <div class="input-group float-center">
            <div class="form-outline">
              <input type="search" id="form1" class="form-control" placeholder="Buscar">
              <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 47.2px;"></div><div class="form-notch-trailing"></div></div>
            </div>

            <button type="button" class="btn btn-primary shadow-0">
              <i class="fas fa-search"></i>
            </button>
          </div>
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
          <RouterLink to="/" class="nav-link active text-dark" aria-current="page">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/about" class="nav-link text-dark">Sobre</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/product" class="nav-link text-dark">Produtos</RouterLink>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Categorias
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Category></Category>
          </ul>
        </li>
        <li class="nav-item">
          <RouterLink to="/account" class="nav-link text-dark">Criar Conta</RouterLink>
        </li>
      </ul>
    </div>
    </div>
  </nav>
</template>