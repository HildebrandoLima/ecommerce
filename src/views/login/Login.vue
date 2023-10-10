<template>
<Banner :msg="bannerTitleMessage"></Banner>

<div class="container">
    <div class="card mt-3">
        <div class="card-body">

            <div class="row">
                <div class="col">
                    <Login />
                </div>

                <div class="col">
                    <IForgotMyPassword />

                    <div class="text-center">
                        <LoginSocial />
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
import ProductService from '@/services/product/ProductService';
import { PRODUCT_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export default {
    components: { AlertError, Banner, IForgotMyPassword, Login, LoginSocial, ProductCard },
    name: 'login',
    data() {
        return {
            bannerTitleMessage: 'Login',
            passwordVisible: false,
            errorList: {},
            errorMessage: null,
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
            const products = await ProductService.getProducts(this.currentPage, this.perPage, '', 0);
            if (products.status === 200) {
                this.products = products.data;
                this.totalItems = products.data.total;
            } else {
                this.errorMessage = PRODUCT_NOT_FOUND_MESSAGE;
            }
        },
    },
};
</script>