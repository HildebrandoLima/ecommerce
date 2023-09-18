<template>
  <Banner :msg="bannerTitleMessage"></Banner>

    <div class="container mt-3">
        <div class="card mb-4 border shadow-0">
            <div class="p-4 d-flex justify-content-between">
                <div class="">
                    <h5>Você já possue uma conta?</h5>
                    <p class="mb-0 text-wrap">Se já tiver, efetue o login, caso contrário, faça um cadastro.</p>
                </div>

                <div class="d-flex align-items-center justify-content-center flex-column flex-md-row">
                    <RouterLink to="/account" class="btn btn-outline-primary me-0 me-md-2 mb-2 mb-md-0 w-100">Registrar</RouterLink>
                    <RouterLink to="/login" class="btn btn-outline-primary shadow-0 text-nowrap w-100">Entrar</RouterLink>
                </div>
            </div>
        </div>
    </div>

    <section class="bg-light my-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <div class="card border shadow-0">
                        <div class="m-4">

                            <div class="row">
                                <div class="col-lg sm-7">
                                    <h4 class="card-title mb-4">Meu Carrinho de Compras</h4>
                                </div>
                                <div class="col-lg sm-3">
                                    <button v-if="cart.length > 0" @click="clearCart()" class="btn btn-light border text-danger icon-hover-danger">Limpar Carrinho</button>
                                </div>
                            </div>

                            <div class="row gy-3 mb-4" v-for="(item, index) in cart" :key="index">
                                <div class="col-lg-5">
                                    <div class="me-lg-5">
                                        <div class="d-flex">
                                            <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp" class="border rounded me-3" style="width: 96px; height: 96px;">
                                            <div class="">
                                                <a href="#" class="nav-link">{{ item.nome }}</a>
                                                <b>Sub Total:</b><p class="text-muted"> {{ item.subTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                    <div class="">
                                        <input type="number" v-model="item.quantidade" @keyup.enter="updateQuantity(item)" style="width: 100px;" />&nbsp;&nbsp;
                                    </div>
                                    <div class="">
                                        <text class="h6">POR: {{ item.precoVenda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</text><br>
                                        <small class="text-muted text-nowrap"><s>DE: {{ item.precoCusto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</s></small>
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
                                <p class="mb-2">R$329,00</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="mb-2">Desconto:</p>
                                <p class="mb-2 text-success">R$-60,00</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="mb-2">Taxa:</p>
                                <p class="mb-2">R$00,00</p>
                            </div>
                            <hr />
                            <div class="d-flex justify-content-between">
                                <p class="mb-2">Total:</p>
                                <p class="mb-2 fw-bold">R$283,00</p>
                            </div>

                            <div class="mt-3">
                                <a href="#" class="btn btn-outline-success w-100 shadow-0 mb-2">Finalizar Compra</a>
                                <a href="#" class="btn btn-light w-100 border mt-2">Continuar Comprabdo</a>
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
    import Banner from '../../components/fixos/Banner.vue';
    import CardProduct from '../../components/product/CardProduct.vue';
    import ProductService from '@/services/product/ProductService';

    export default {
        components: { Banner, CardProduct },
        data() {
            return {
                bannerTitleMessage: 'Meu Carrinho',
                products: {},
                cart: [],
                currentPage: 1,
                perPage: 10,
                totalItems: 0,
            };
        },
        created() {
            this.getProduct();
            const cart = localStorage.getItem('cart');
            this.cart = cart ? JSON.parse(cart) : [];
        },
        methods: {
            async getProduct() {
                try {
                    const products = await ProductService.getProducts(this.currentPage, this.perPage, '', 0);
                    this.products = products;
                    this.totalItems = products.total;
                } catch (error) {
                    if (error.response && error.response.data.status === 400) {
                    this.errorList = error.response.data.data;
                    }
                }
            },
            removeItem(item) {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
                if (itemIndex !== -1) {
                    cart.splice(itemIndex, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    this.cart = cart;
                }
                alert('Item removido do carrinho!');
            },
            updateQuantity(item) {
                item.quantidade = parseInt(item.quantidade);
                if (item.quantidade <= 0) {
                    this.cart = this.cart.filter((cartItem) => cartItem !== item);
                } else {
                    item.subTotal = item.quantidade * item.precoVenda;
                }
                localStorage.setItem('cart', JSON.stringify(this.cart));
                alert('Quantidade Atualizada!');
            },
            clearCart() {
                this.cart = [];
                localStorage.removeItem('cart');
                alert('Carrinho Limpado!');
            },
        },
    };
</script>