<template>
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
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import Pagination from '@/components/shared/Pagination.vue';
import Table from '@/components/shared/Table.vue';

export default {
    name: 'order',
    components: { AlertError, Pagination, Table },
    props: {
        errorList: {
            type: Object,
            required: true,
            default: null,
        },
        orders: {
            type: Object,
            required: true,
            default: {},
        },
        orderColumns: {
            type: Array,
            required: true,
            default: [],
        },
        currentPage: Number,
        totalPages: Number,
    },
    methods: {
    itemModal(item) {
      this.$emit('itemModal', item);
    },
    paymentModal(item) {
      this.$emit('paymentModal', item);
    },
    addressModal(item) {
      this.$emit('addressModal', item);
    },
    handlePageChange(newPage) {
      this.$emit('page-changed', newPage);
    },
  },
};
</script>