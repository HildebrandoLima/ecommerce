<template>
  <Banner :msg="bannerTitleMessage"></Banner>

    <div class="container">
        <div class="card mt-3">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <form @submit.prevent="logar">
                            <div class="form-outline mb-4">
                                <input type="email" id="email" v-model="user.email" class="form-control" placeholder="E-mail" required />
                            </div>
                            <div v-if="Object.keys(this.errorList).length > 0" class="alert alert-danger mt-2" role="alert">
                                {{ this.errorList.email }}
                            </div>

                            <div class="form-outline mb-4">
                                <input type="password" id="password" v-model="user.password" class="form-control" placeholder="Senha" required />
                            </div>
                            <div v-if="Object.keys(this.errorList).length > 0" class="alert alert-danger mt-2" role="alert">
                                {{ this.errorList.password }}
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

<script>
    import { RouterLink } from 'vue-router';
    import Banner from '../components/Banner.vue';
    import AuthService from '@/services/auth/AuthService';

    export default {
        components: { RouterLink, Banner },
        name: 'login',
        data() {
            return {
                bannerTitleMessage: 'Login',
                errorList: {},
                messageSuccess: '',
                user: {
                    email: 'hildebrandolima16@gmail.com',
                    password: 'HiLd3br@ndo',
                },
            };
        },
        methods: {
            async logar() {
                try {
                    const user = await AuthService.login(this.user);
                    this.messageSuccess = user;
                } catch (error) {
                    if (error.response && error.response.data.status === 400) {
                        this.errorList = error.response.data.data;
                    }
                }
            },
        },
    };
</script>