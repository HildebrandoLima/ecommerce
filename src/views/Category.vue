<script setup>
    import { Category } from '../components/Category.vue'
</script>

<template>
    <div class="bg-primary mb-4">
      <div class="container py-4">
        <h3 class="text-white mt-2">Categorias</h3>
  
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

    <div class="container-fluid">
        <div class="card mt-3">
          <div class="card-body">
            <Category></Category>
          </div>
        </div>
    </div>
  </template>