<template>
<Banner :msg="bannerTitleMessage"></Banner>

<section class="my-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <div class="card border shadow-0" style="border-radius: 16px;">
                    <div class="m-4">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-8">
                                    <b>Pagamento </b><span class="text-primary font-weight-bold">#OK</span>
                                </div>

                                <div class="col-lg-4">
                                    <b>Previsão: </b><span class="font-weight-bold">01/12/19</span><br />
                                    <b>Pedido: </b><span class="font-weight-bold">0123456789</span>
                                </div>
                            </div>

                            <div class="card mt-5">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-xl-3 col-md-6">
                                            <b class="text-muted"><span>CONFIRMADO</span></b>
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>

                                        <div class="col-xl-3 col-md-6">
                                            <b class="text-muted"><span>SEPARADO</span></b>
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>

                                        <div class="col-xl-3 col-md-6">
                                            <b class="text-muted"><span>EM TRÂNSITO</span></b>
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>

                                        <div class="col-xl-3 col-md-6">
                                            <b class="text-muted"><span>ENTREGUE</span></b>
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="card border shadow-0" style="border-radius: 16px;">
                    <div class="m-4">
                        <div class="card-body">
                            <div class="table-responsive">

                                <AlertError
                                    v-if="errorList"
                                    :errorList="errorList"
                                />

                                <Table
                                    :data="orders.list"
                                    :columns="orderColumns"
                                    :displayModal="true"
                                    @itemModal="itemModal"
                                    @paymentModal="paymentModal"
                                    @addressModal="addressModal"
                                />

                                <Pagination
                                    :current-page="currentPage"
                                    :total-pages="totalPages"
                                    @page-changed="handlePageChange"
                                />

                            </div>
                        </div>
                    </div>
                </div>
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
import Table from '@/components/shared/Table.vue';
import Pagination from '@/components/shared/Pagination.vue';
import OrderService from '@/services/order/OrderService';
import { userAuth } from '@/storages/AuthStorage';
import { ORDER_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export default {
    name: 'order',
    components: { AlertError, Banner, DetailsAddress, DetailsItem, DetailsPayment, Pagination, Table },
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