<template>
<Banner :msg="bannerTitleMessage" />

<CartSection />

<ProductNewGrid />
</template>

<script>
import Banner from '@/components/fixos/Banner.vue';
import CartSection from '@/components/cart/CartSection.vue';
import ProductNewGrid from '@/components/product/ProductNewGrid.vue';

export default {
    components: { Banner, CartSection, ProductNewGrid },
    data() {
        return {
            bannerTitleMessage: 'Meu Carrinho',
        };
    },
};
</script>