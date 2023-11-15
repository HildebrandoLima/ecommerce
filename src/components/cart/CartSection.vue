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
                <CartSummary
                    :cart="cart"
                    @removeItem="removeItem"
                    @updateQuantity="updateQuantity"
                    @cleanCart="cleanCart"
                />
            </div>

            <div class="col-lg-3">
                <CartTotal :total="total" @finalizePurchase="finalizePurchase" />
            </div>
        </div>
    </div>
</section>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import Banner from '@/components/fixos/Banner.vue';
import ProductCard from '@/components/product/client/ProductCard.vue';
import CartSummary from '@/components/cart/CartSummary.vue';
import CartTotal from '@/components/cart/CartTotal.vue';
import ConainerAuthentication from '@/components/cart/ConainerAuthentication.vue';
import ProductService from '@/services/product/ProductService';
import { userAuth } from '@/storages/AuthStorage';
import { getCart, calculateTotalCart, removeItemToCart, updateCartItemQuantity, cleanToCart } from '@/storages/CartStorage';
import { formatPrice } from '@/utils/formatPrice/formatPrice';

export default {
    components: { AlertError, Banner, CartTotal, CartSummary, ConainerAuthentication, ProductCard },
    data() {
        return {
            bannerTitleMessage: 'Meu Carrinho',
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
        this.getProducts();
        this.cart = getCart();
        const [userName] = userAuth();
        this.userName = userName;
        this.calculateTotal();
    },
    methods: {
        async getProducts() {
            const products = await ProductService.listProducts(this.currentPage, this.perPage, '', 0);
            if (products.status === 200) {
                this.products = products.data;
                this.totalItems = products.data.total;
            } else {
                this.errorList = ProductService.messageError('product');
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
                this.errorList = ProductService.messageError('cart');
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