<template>
<Banner :msg="bannerTitleMessage" />

<section class="bg-light my-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <div class="card border shadow-0">
                    <div class="m-4">
                        <div class="row">
                            <div class="col">
                                <h2 class="card-title mb-4">{{ product.nome }}</h2>
                            </div>
                            <div class="col">
                                <RouterLink to="/" class="btn btn-danger border px-2 pt-2 icon-hover"><i class="fas fa-heart fa-lg text-white px-1"></i></RouterLink>
                            </div>
                        </div>

                        <div class="d-flex flex-row">
                            DE:<h5 class="mb-1 me-1">&nbsp;&nbsp;<s>{{ formatPrice(product.precoCusto) }}</s></h5>
                            POR:<span class="text-danger">&nbsp;&nbsp;{{ formatPrice(product.precoVenda) }}</span>
                        </div>

                        <h5 class="mt-3">Quantidade: {{ product.quantidade }}</h5>

                        <div class="row gy-3 mb-4">
                            <div class="card mt-5">
                                <div class="card-body">
                                    {{ product.descricao }}
                                </div>
                            </div>

                            <p class="mt-5">
                                <i class="fas fa-star fa-lg px-1"></i>
                                <i class="fas fa-star fa-lg px-1"></i>
                                <i class="fas fa-star fa-lg px-1"></i>
                                <i class="fas fa-star fa-lg px-1"></i>
                                <i class="fas fa-star fa-lg px-1"></i>
                            </p>

                            <div class="mt-5">
                                <RouterLink to="/cart">
                                    <ButtonCart :product="product" />
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-5">
                <div class="card border shadow-0">
                    <div class="card-body">
                        <img v-if="product.imagens.length > 0" :src="product.imagens[0].caminho" class="card-img-top" width="500" height="500" />

                        <div v-if="product.imagens.length > 0" class="row">
                            <div v-for="(image, index) in product.imagens" :key="index" class="col">
                                <img :src="image.caminho" class="card-img-top" width="100" height="300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<ProductNewGrid />
</template>

<script>
import Banner from '@/components/fixos/Banner.vue';
import ButtonCart from '@/components/shared/ButtonCart.vue';
import ProductNewGrid from '@/components/product/ProductNewGrid.vue';
import ProductService from '@/services/product/ProductService';
import { PRODUCT_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';
import { formatPrice } from '@/utils/formatPrice/formatPrice';

export default {
    components: { Banner, ButtonCart, ProductNewGrid },
    name: 'product',
    data() {
        return {
            bannerTitleMessage: 'Detalhes do Produto',
            errorList: null,
            product: {},
            productId: '',
        };
    },
    created() {
        this.getProduct();
    },
    methods: {
        async getProduct() {
            this.productId = this.$route.params.id;
            const product = await ProductService.getProductDetails(this.productId);
            if (product.status === 200) {
                if (product.data) {
                    this.product = product.data[0];
                } else {
                    this.errorList = PRODUCT_NOT_FOUND_MESSAGE;
                }
            } else {
                this.errorList = PRODUCT_NOT_FOUND_MESSAGE;
            }
        },
    },
    computed: {
        formatPrice() {
            return formatPrice;
        },
    },
};
</script>