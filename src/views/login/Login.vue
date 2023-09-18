<template>
  <Banner :msg="bannerTitleMessage"></Banner>

    <div class="container">
        <div class="card mt-3">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <form @submit.prevent="auth">
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
                            <button type="button" @click="oAuth('facebook')" class="btn btn-secondary btn-floating mx-1">
                                <i class="fab fa-facebook-f px-20"></i>
                            </button>

                            <button type="button" @click="oAuth('google')" class="btn btn-secondary btn-floating mx-1">
                                <i class="fab fa-google px-20"></i>
                            </button>

                            <button type="button" @click="oAuth('github')" class="btn btn-secondary btn-floating mx-1">
                                <i class="fab fa-github px-20"></i>
                            </button>

                            <div v-if="Object.keys(this.errorList).length > 0" class="alert alert-danger mt-2" role="alert">
                                {{ this.errorList }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container my-5">
        <header class="mb-4">
            <h3>Novos Produtos:</h3>
        </header>

        <CardProduct v-if="this.products.list" :products="products" :totalItems="totalItems" />
    </div>
</template>

<script>
    import { RouterLink } from 'vue-router';
    import Banner from '@/components/fixos/Banner.vue';
    import CardProduct from '@/components/product/CardProduct.vue';
    import AuthService from '@/services/auth/AuthService';
    import ProductService from '@/services/product/ProductService';

    export default {
        components: { RouterLink, Banner, CardProduct },
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
                provider: {
                    facebook: 'facebook',
                    google: 'google',
                    github: 'github',
                },
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
            async auth() {
                try {
                    const user = await AuthService.login(this.user);
                    this.messageSuccess = user;
                } catch (error) {
                    if (error.response && error.response.data.status === 400) {
                        this.errorList = error.response.data.data;
                    }
                }
            },
            async oAuth(providerName) {
                try {
                    const providerValue = this.provider[providerName];
                    const response = window.location.href = `http://localhost:8000/api/auth/login/social/${providerValue}`;
                    window.localStorage.setItem('userAuh', JSON.stringify(response.data));
                    //const provider = await AuthService.loginSocial(providerValue);
                    //this.messageSuccess = provider;
                } catch (error) {
                    if (error.response && error.response.data.status === 400) {
                        this.errorList = error.response.data.data;
                    }
                }
            },
        },
    };
</script>