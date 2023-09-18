<template>
    <Banner :msg="bannerTitleMessage"></Banner>

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
                                DE:<h5 class="mb-1 me-1">&nbsp;&nbsp;<s>{{ product.precoCusto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</s></h5>
                                POR:<span class="text-danger">&nbsp;&nbsp;{{ product.precoVenda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</span>
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
                            <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp" class="card-img-top">

                            <div v-if="product.imagens.length > 0" class="row">
                                <div v-for="(image, index) in product.imagens" :key="index" class="col">
                                    <img :src="image.caminho" class="card-img-top" style="aspect-ratio: 1 / 1">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="container my-5">
        <header class="mb-4">
            <h3>Novos Produtos:</h3>
        </header>

        <CardProduct v-if="this.products.list" :products="products" :totalItems="totalItems" />
    </div>
</template>

<script>
  import { RouterLink } from 'vue-router';
  import Banner from '../../components/fixos/Banner.vue';
  import ButtonCart from '../../components/shared/ButtonCart.vue';
  import CardProduct from '../../components/product/CardProduct.vue';
  import ProductService from '@/services/product/ProductService';

  export default {
    components: { RouterLink, Banner, ButtonCart, CardProduct },
    name: 'product',
    data() {
      return {
        bannerTitleMessage: 'Detalhes do Produto',
        errorList: {},
        product: {},
        products: {},
        productId: '',
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
                this.productId = this.$route.params.id;
                const product = await ProductService.getProductDetails(this.productId);
                this.product = product[0];
                const products = await ProductService.getProducts(this.currentPage, this.perPage, '', 0);
                this.products = products;
                this.totalItems = products.total;
            } catch (error) {
                if (error.response && error.response.data.status === 400) {
                    this.errorList = error.response.data.data;
                }
            }
        },
    },
};
</script>