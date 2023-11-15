<template>
<div class="container my-5">
    <header class="mb-4">
        <h3>Novos Produtos:</h3>
    </header>

    <hr />

    <AlertError
        v-if="errorList.length > 0"
        :errorList="errorList"
    />

    <ProductCard v-if="products.list" :products="products" :totalItems="totalItems" />
</div>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import ProductCard from '@/components/product/client/ProductCard.vue';
import ProductService from '@/services/product/ProductService';

export default {
    components: { AlertError, ProductCard },
    data() {
        return {
            errorList: '',
            products: {},
            currentPage: 1,
            perPage: 10,
            totalItems: 0,
        };
    },
    created() {
        this.getProducts();
    },
    methods: {
        async getProducts() {
            const products = await ProductService.listProducts(this.currentPage, this.perPage, '', 1);
            if (products.status === 200) {
                this.products = products.data;
                this.totalItems = products.data.total;
            } else {
                this.errorList = ProductService.messageError('product');
            }
        },
    },
};
</script>