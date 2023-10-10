<template>
<div class="container mt-3">
    <div class="card mb-4 border bg-light text-dark shadow-0">
        <div class="p-4 d-flex justify-content-between">
            <div class="">
                <h5>Você já possue uma conta?</h5>
                <p class="mb-0 text-wrap">Se já tiver, efetue o login, caso contrário, faça um cadastro.</p>
            </div>

            <div class="d-flex align-items-center justify-content-center flex-column flex-md-row">
                <RouterLink to="/account" class="btn btn-outline-primary me-0 me-md-2 mb-2 mb-md-0 w-100">Registrar</RouterLink>
                <RouterLink to="/login" class="btn btn-outline-primary shadow-0 text-nowrap w-100">Entrar</RouterLink>
            </div>
        </div>
    </div>
</div>
</template>