<script setup>
  import CardProduct from '../components/CardProduct.vue'
</script>

<template>
    <section class="bg-light my-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="card border shadow-0">
                        <div class="m-4">
                            <div class="row">
                                <div class="col">
                                    <h2 class="card-title mb-4">Nome do Produto</h2>
                                </div>
                                <div class="col">
                                    <RouterLink to="/" class="btn btn-danger border px-2 pt-2 icon-hover"><i class="fas fa-heart fa-lg text-white px-1"></i></RouterLink>
                                </div>
                            </div>

                            <div class="d-flex flex-row">
                                DE:<h5 class="mb-1 me-1">&nbsp;&nbsp;<s>R$34,50</s></h5>
                                POR:<span class="text-danger">&nbsp;&nbsp;R$49,99</span>
                            </div>

                            <div class="row gy-3 mb-4">
                                <div class="card mt-5">
                                    <div class="card-body">
                                        fmldkmldf.mçlgmlewrwjtopwgmlçbmlsfmltrkho45pkhopsblçf.
                                        fmldkmldf.mçlgmlewrwjtopwgmlçbmlsfmltrkho45pkhopsblçf.
                                        fmldkmldf.mçlgmlewrwjtopwgmlçbmlsfmltrkho45pkhopsblçf.
                                        fmldkmldf.mçlgmlewrwjtopwgmlçbmlsfmltrkho45pkhopsblçf.
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
                                <div class="col">
                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp" class="card-img-top" style="aspect-ratio: 1 / 1">
                                </div>
                                <div class="col">
                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp" class="card-img-top" style="aspect-ratio: 1 / 1">
                                </div>
                                <div class="col">
                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp" class="card-img-top" style="aspect-ratio: 1 / 1">
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