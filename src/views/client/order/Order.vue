<template>
<Banner :msg="bannerTitleMessage"></Banner>

<section class="my-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <div class="card border shadow-0" style="border-radius: 16px;">
                    <div class="m-4">
                        <div class="card-body">
                            <OrderSummary />
                            <OrderStatus />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <OrderDetails
                    :errorList="errorList"
                    :orders="orders"
                    :orderColumns="orderColumns"
                    :currentPage="currentPage"
                    :totalPages="totalPages"
                    @itemModal="itemModal"
                    @paymentModal="paymentModal"
                    @addressModal="addressModal"
                    @page-changed="handlePageChange"
                />
            </div>
        </div>
    </div>
</section>

<!-- Modais -->
<DetailsAddress id="detailsAddressModal" :data="address" />
<DetailsItem id="detailsItemModal" :data="itens" />
<DetailsPayment id="detailsPaymentModal" :data="payment" />

</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import Banner from '@/components/fixos/Banner.vue';
import DetailsAddress from '@/components/order/DetailsAddress.vue';
import DetailsItem from '@/components/order/DetailsItem.vue';
import DetailsPayment from '@/components/order/DetailsPayment.vue';
import OrderDetails from '@/components/order/OrderDetails.vue';
import OrderStatus from '@/components/order/OrderStatus.vue';
import OrderSummary from '@/components/order/OrderSummary.vue';
import Table from '@/components/shared/Table.vue';
import Pagination from '@/components/shared/Pagination.vue';
import OrderService from '@/services/order/OrderService';
import { userAuth } from '@/storages/AuthStorage';
import { ORDER_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export default {
    name: 'order',
    components: { AlertError, Banner, DetailsAddress, DetailsItem, DetailsPayment, OrderDetails, OrderStatus, OrderSummary, Pagination, Table },
    data() {
        return {
            bannerTitleMessage: 'Meus Pedidos',
            messageError: null,
            userId: 0,
            address: {},
            itens: {},
            orders: {},
            payment: {},
            currentPage: 1,
            perPage: 10,
            totalItems: 0,
            orderColumns: ['numeroPedido', 'quantidadeItem', 'total', 'tipoEnrega', 'valorEntrega'],
        }
    },
    created() {
        const [userId] = userAuth();
        this.userId = userId;
        this.getOrder();
    },
    methods: {
        handlePageChange(newPage) {
            this.currentPage = newPage;
            this.getOrder();
        },
        async getOrder() {
            const orders = await OrderService.getOrders(this.currentPage, this.perPage, this.userId);
            if (orders.status === 200) {
                this.orders = orders.data;
                this.totalItems = orders.data.total;
            } else {
                this.messageError = ORDER_NOT_FOUND_MESSAGE;
            }
        },
        addressModal(item) {
            this.address = item;
            $('#detailsAddressModal').modal('show');
        },
        itemModal(item) {
            this.itens = item;
            $('#detailsItemModal').modal('show');
        },
        paymentModal(item) {
            this.payment = item;
            $('#detailsPaymentModal').modal('show');
        },
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.perPage);
        },
    },
};
</script>