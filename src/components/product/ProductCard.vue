<template>
<div class="row">
    <div v-for="(product, index) in products.list" :key="index" class="col-lg-3 col-md-6 col-sm-6 d-flex">
        <div class="card w-100 my-2 shadow-2-strong">
            <RouterLink :to="{ name: 'productDetails', params: { id: product.produtoId}}">
                <img v-if="product.imagens.length > 0" :src="product.imagens[0].caminho" class="card-img-top" />
            </RouterLink>

            <div class="card-body d-flex flex-column">
                <h5 class="card-title">
                    <RouterLink :to="{ name: 'productDetails', params: { id: product.produtoId}}" class="nav-link text-dark">{{ product.nome }}</RouterLink>
                </h5>

                <p class="card-text">{{ formatPrice(product.precoVenda) }}</p>

                <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                    <RouterLink to="/cart">
                        <ButtonCart :product="product" />
                    </RouterLink>
                    <RouterLink to="/" class="btn btn-danger border px-2 pt-2 icon-hover"><i class="fas fa-heart fa-lg text-white px-1"></i></RouterLink>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ButtonCart from '@/components/shared/ButtonCart.vue';
import { formatPrice } from '@/utils/formatPrice/formatPrice';

export default {
    components: { ButtonCart },
    name: 'product',
    props: {
        totalItems: 0,
        products: {
            type: Array,
            default: []
        },
    },
    computed: {
        formatPrice() {
            return formatPrice;
        },
    },
};
</script>