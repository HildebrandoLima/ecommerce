<script setup>
  import { RouterView } from 'vue-router'
  import NavBar from './components/fixos/NavBar.vue'
  import Footer from './components/fixos/Footer.vue'
</script>

<template>
  <header>
    <NavBar></NavBar>
  </header>
  <RouterView />
  <Footer></Footer>
</template>