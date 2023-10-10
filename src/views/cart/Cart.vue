<template>
<Banner :msg="bannerTitleMessage"></Banner>

<CartSection />

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
import CartSection from '@/components/cart/CartSection.vue';
import ProductCard from '@/components/product/ProductCard.vue';
import ProductService from '@/services/product/ProductService';

export default {
    components: { AlertError, Banner, CartSection, ProductCard },
    data() {
        return {
            bannerTitleMessage: 'Meu Carrinho',
            errorMessage: null,
            errorList: null,
            products: {},
            currentPage: 1,
            perPage: 10,
            totalItems: 0,
            total: 0,
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