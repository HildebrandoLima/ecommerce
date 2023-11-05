<template>
<div class="container my-5">
    <header class="mb-4">
        <h3>Novos Produtos:</h3>
    </header>

    <hr />

    <AlertError
        v-if="errorList"
        :errorList="errorList"
    />

    <ProductCard v-if="products.list" :products="products" :totalItems="totalItems" />
</div>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import ProductCard from '@/components/product/client/ProductCard.vue';
import ProductService from '@/services/product/ProductService';
import { PRODUCT_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export default {
    components: { AlertError, ProductCard },
    data() {
        return {
            errorList: null,
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
            const products = await ProductService.getProducts(this.currentPage, this.perPage, '', 0, 1);
            if (products.status === 200) {
                this.products = products.data;
                this.totalItems = products.data.total;
            } else {
                this.errorList = PRODUCT_NOT_FOUND_MESSAGE;
            }
        },
    },
};
</script>