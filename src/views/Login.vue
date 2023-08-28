<script setup>
    import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="bg-primary mb-4">
        <div class="container py-4">
            <h3 class="text-white mt-2">Login</h3>

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
                <div class="row">
                    <div class="col">
                        <form>
                            <div class="form-outline mb-4">
                                <input type="email" id="email" name="email" class="form-control" placeholder="E-mail" required />
                            </div>
                            <div class="form-outline mb-4">
                                <input type="password" id="password" name="senha" class="form-control" placeholder="Senha" required />
                            </div>
                            <button type="submit" class="btn btn-outline-primary btn-block mb-4">
                                <i class="fas fa-sign-in"></i> Entrar
                            </button>
                        </form>
                    </div>

                    <div class="col">
                        <div class="row mb-4">
                            <div class="col d-flex justify-content-center">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="form2Example34" checked />
                                    <label class="form-check-label" for="form2Example34">Lembre-me</label>
                                </div>
                            </div>

                            <div class="col">
                                <RouterLink to="/">Esqueci minha senha?</RouterLink>
                            </div>
                        </div>

                        <div class="text-center">
                            <p>Não possue uma conta? <RouterLink to="/account">Registre-se</RouterLink></p>
                            <p>ou cadastre-se com:</p>
                            <button type="button" class="btn btn-secondary btn-floating mx-1">
                                <i class="fab fa-facebook-f px-20"></i>
                            </button>

                            <button type="button" class="btn btn-secondary btn-floating mx-1">
                                <i class="fab fa-google px-20"></i>
                            </button>

                            <button type="button" class="btn btn-secondary btn-floating mx-1">
                                <i class="fab fa-github px-20"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>