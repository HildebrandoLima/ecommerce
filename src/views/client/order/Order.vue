<template>
<Banner :msg="bannerTitleMessage" />

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
                    @addressModal="addressModal"
                    @itemModal="itemModal"
                    @paymentModal="paymentModal"
                    @pageChanged="handlePageChange"
                />
            </div>
        </div>
    </div>
</section>

<ModalDetails :modalId="modalId" :modalTitle="modalTitle">
    <Table :data="modalData" :columns="modalColumns" />
</ModalDetails>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import Banner from '@/components/fixos/Banner.vue';
import OrderDetails from '@/components/order/OrderDetails.vue';
import OrderStatus from '@/components/order/OrderStatus.vue';
import OrderSummary from '@/components/order/OrderSummary.vue';
import Table from '@/components/shared/Table.vue';
import Pagination from '@/components/shared/Pagination.vue';
import ModalDetails from '@/components/shared/ModalDetails.vue';
import OrderService from '@/services/order/OrderService';
import { userAuth } from '@/storages/AuthStorage';
import { ORDER_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export default {
    name: 'order',
    components: { AlertError, Banner, OrderDetails, OrderStatus, OrderSummary, Pagination, ModalDetails, Table },
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
            modalId: 'detailsModal',
            modalTitle: '',
            modalData: [],
            modalColumns: [],
        }
    },
    created() {
        const [userId] = userAuth();
        this.userId = userId;
        this.getOrders();
    },
    methods: {
        handlePageChange(newPage) {
            this.currentPage = newPage;
            this.getOrders();
        },
        async getOrders() {
            const orders = await OrderService.listOrders(this.currentPage, this.perPage, this.userId);
            if (orders.status === 200) {
                this.orders = orders.data;
                this.totalItems = orders.data.total;
            } else {
                this.messageError = ORDER_NOT_FOUND_MESSAGE;
            }
        },
        showModal(modalTitle, item, modalColumns) {
            this.modalTitle = modalTitle;
            this.modalData = item;
            this.modalColumns = modalColumns;
            $('#detailsModal').modal('show');
        },
        addressModal(item) {
            this.showModal('Detalhes do Endereço', item, ['logradouro', 'numero', 'bairro', 'cidade', 'uf']);
        },
        itemModal(item) {
            this.showModal('Detalhes do Item', item, ['nome', 'preco', 'quantidadeItem', 'subTotal']);
        },
        paymentModal(item) {
            this.showModal('Detalhes do Pagamento', item, ['numeroCartao', 'tipoCartao', 'ccv', 'dataValidade', 'parcela', 'metodoPagamento']);
        },
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.perPage);
        },
    },
};
</script>