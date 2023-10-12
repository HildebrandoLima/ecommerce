<template>
<Banner :msg="bannerTitleMessage"></Banner>

<div class="container">
    <div class="card mt-3">
        <div class="card-body">

            <div class="row">
                <div class="col">
                    <Login
                        :errorList="errorList"
                        :user="user"
                        @togglePasswordVisibility="togglePasswordVisibility"
                        @auth="auth"
                    />
                </div>

                <div class="col">
                    <IForgotMyPassword />

                    <div class="text-center">
                        <LoginSocial
                            :errorList="errorList"
                            @auth="auth()"
                        />
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

    <AlertError
    v-if="errorMessage"
    :errorList="errorMessage"
    />

    <ProductCard v-if="products.list" :products="products" :totalItems="totalItems" />
</div>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import Banner from '@/components/fixos/Banner.vue';
import IForgotMyPassword from '@/components/login/IForgotMyPassword.vue';
import Login from '@/components/login/Login.vue';
import LoginSocial from '@/components/login/LoginSocial.vue';
import ProductCard from '@/components/product/ProductCard.vue';
import AuthService from '@/services/auth/AuthService';
import ProductService from '@/services/product/ProductService';
import { PRODUCT_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export default {
    components: { AlertError, Banner, IForgotMyPassword, Login, LoginSocial, ProductCard },
    name: 'login',
    data() {
        return {
            bannerTitleMessage: 'Login',
            passwordVisible: false,
            passwordVisible: false,
            errorList: {},
            errorMessage: null,
            products: {},
            user: {
                email: 'hildebrandolima16@gmail.com',
                password: 'HiLd3br@ndo',
            },
            provider: {
                facebook: 'facebook',
                google: 'google',
                github: 'github',
            },
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
            const products = await ProductService.getProducts(this.currentPage, this.perPage, '', 0);
            if (products.status === 200) {
                this.products = products.data;
                this.totalItems = products.data.total;
            } else {
                this.errorMessage = PRODUCT_NOT_FOUND_MESSAGE;
            }
        },
        togglePasswordVisibility() {
            const passwordInput = document.getElementById("password");
            this.passwordVisible = !this.passwordVisible;
            passwordInput.type = this.passwordVisible ? "text" : "password";
        },
        async auth() {
            const user = await AuthService.login(this.user);
            if (user.isAdmin == true) {
                this.$router.push({name: 'dashboard'});
            } else if (user.isAdmin == false) {                    
                this.$router.push({name: 'home'});
            } else {
                this.errorList = user;
            }
        },
        async oAuth(providerName) {
            try {
                const providerValue = this.provider[providerName];
                const response = window.location.href = `http://localhost:8000/api/auth/login/social/${providerValue}`;
                window.localStorage.setItem('userAuth', JSON.stringify(response.data));
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