<template>
  <div class="bg-primary mb-4">
    <div class="container py-4">
      <h3 class="text-white mt-2">Sobre</h3>

      <nav class="d-flex mb-2">
        <h6 class="mb-0">
          <RouterLink to="/" class="text-white-50">Home</RouterLink>
            <span class="text-white-50 mx-2">&gt;</span>
          <RouterLink to="/about" class="text-white-50">Sobre</RouterLink>
            <span class="text-white-50 mx-2">&gt;</span>
          <RouterLink to="/account" class="text-white"><u>Cadastrar Conta</u></RouterLink>
        </h6>
      </nav>
    </div>
  </div>

  <div class="container">
      <div class="card mt-3">
        <div class="card-body">
          <p>Melhores produtos e marcas em nossa loja.</p>
          <p>Produtos modernos, preços de fábrica, excelente serviço.</p>
        </div>
      </div>
  </div>
</template>