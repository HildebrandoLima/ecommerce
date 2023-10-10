<template>
<ConainerAuthentication v-if="toggleAuthenticationComponentVisibility" />

<section class="my-5">
    <div class="container">
        <div class="row">

            <AlertError
                v-if="errorList.length > 0"
                :errorList="errorList"
            />

            <div class="col-lg-9">
                <div class="card border shadow-0">
                    <div class="m-4">

                        <div class="row">
                            <div class="col-lg sm-7">
                                <h4 class="card-title mb-4">Meu Carrinho de Compras</h4>
                            </div>

                            <div class="col-lg sm-3">
                                <button v-if="cart.length > 0" @click="cleanCart()" class="btn btn-light border text-danger icon-hover-danger">Limpar Carrinho</button>
                            </div>
                        </div>

                        <div class="col-lg sm-7" v-if="!cart.length">
                            <h4 class="card-title mb-4 text-danger text-center">Não há Produto(s) no Carrinho!</h4>
                        </div>

                        <div class="row gy-3 mb-4" v-for="(item, index) in cart" :key="index">
                            <div class="col-lg-5">
                                <div class="me-lg-5">
                                    <div class="d-flex">
                                        <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp" class="border rounded me-3" style="width: 96px; height: 96px;">
                                        <div class="">
                                            <a href="#" class="nav-link">{{ item.nome }}</a>
                                            <b>Sub Total:</b><p class="text-muted"> {{ formatPrice(item.subTotal) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                <div class="">
                                    <input type="number" v-model="item.quantidade" @keyup.enter="updateQuantity(item)" style="width: 100px;" />&nbsp;&nbsp;
                                </div>
                                <div class="">
                                    <text class="h6">POR: {{ formatPrice(item.precoVenda) }}</text><br>
                                    <small class="text-muted text-nowrap"><s>DE: {{ formatPrice(item.precoCusto) }}</s></small>
                                </div>
                            </div>

                            <div class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                <div class="float-md-end">
                                    <a href="#" class="btn btn-light border px-2 icon-hover-primary">
                                        <i class="fas fa-heart fa-lg px-1 text-danger"></i>
                                    </a>
                                    <button @click="removeItem(item)" class="btn btn-light border text-danger icon-hover-danger">Remover</button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="border-top pt-4 mx-4 mb-4">
                        <p><i class="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 weeks</p>
                        <p class="text-muted">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-lg-3">
                <div class="card mb-3 border shadow-0">
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label class="form-label">Tem cupom?</label>
                                <div class="input-group">
                                    <input type="text" class="form-control border" name="" placeholder="Código do Cupom">
                                    <button class="btn btn-light border">Aplicar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="card shadow-0 border">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <p class="mb-2">Total:</p>
                            <p class="mb-2">{{ formatPrice(total) }}</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <p class="mb-2">Desconto:</p>
                            <s><p class="mb-2 text-danger">R$-00,00</p></s>
                        </div>
                        <div class="d-flex justify-content-between">
                            <p class="mb-2">Taxa:</p>
                            <p class="mb-2">R$00,00</p>
                        </div>
                        <hr />
                        <div class="d-flex justify-content-between">
                            <p class="mb-2">Total:</p>
                            <p class="mb-2 fw-bold">{{ formatPrice(total) }}</p>
                        </div>

                        <div class="mt-3">
                            <button type="button" @click="finalizePurchase" class="btn btn-outline-success w-100 shadow-0 mb-2">Finalizar Compra</button>
                            <RouterLink :to="{ name: 'product' }" class="btn btn-light w-100 border mt-2">Continuar Comprando</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import Banner from '@/components/fixos/Banner.vue';
import ProductCard from '@/components/product/ProductCard.vue';
import ConainerAuthentication from '@/components/cart/ConainerAuthentication.vue';
import ProductService from '@/services/product/ProductService';
import { userAuth } from '@/storages/AuthStorage';
import { getCart, calculateTotalCart, removeItemToCart, updateCartItemQuantity, cleanToCart } from '@/storages/CartStorage';
import { CART_NOT_FOUND_MESSAGE, PRODUCT_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';
import { formatPrice } from '@/utils/formatPrice/formatPrice';

export default {
    components: { AlertError, Banner, ConainerAuthentication, ProductCard },
    data() {
        return {
            bannerTitleMessage: 'Meu Carrinho',
            errorMessage: null,
            errorList: '',
            products: {},
            cart: [],
            currentPage: 1,
            perPage: 10,
            totalItems: 0,
            total: 0,
            userName: '',
            toggleAuthenticationComponentVisibility: false,
        };
    },
    created() {
        this.getProduct();
        this.cart = getCart();
        const [userName] = userAuth();
        this.userName = userName;
        this.calculateTotal();
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
        removeItem(item) {
            const cart = this.cart;
            removeItemToCart(cart, item);
            this.calculateTotal();
        },
        updateQuantity(item) {
            const cart = this.cart;
            updateCartItemQuantity(cart, item);
            this.calculateTotal();
        },
        cleanCart() {
            const cart = this.cart;
            cleanToCart(cart);
            this.calculateTotal();
        },
        calculateTotal() {
            this.total = this.cart.reduce((acc, item) => {
            return acc + item.subTotal;
            }, 0);
            calculateTotalCart(this.total);
        },
        finalizePurchase() {
            if (this.cart.length > 0) {
                if (this.userName) {
                    setTimeout(() => {
                        this.$router.push({
                            name: 'checkout'
                        });
                    }, 1000);
                } else {
                    this.toggleAuthenticationComponentVisibility = true
                }
            } else {
                this.errorList = CART_NOT_FOUND_MESSAGE;
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