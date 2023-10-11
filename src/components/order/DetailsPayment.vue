<template>
<div class="modal fade" id="detailsPaymentModal" tabindex="-1" aria-labelledby="detailsPaymentModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="detailsPaymentModal">Método de Pagamento</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

                <Table
                    :data="data"
                    :columns="paymentColumns"
                />

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Table from '@/components/shared/Table.vue';

export default {
    name: 'modal-items',
    components: { Table },
    data() {
        return {
            paymentColumns: ['numeroCartao', 'tipoCartao', 'ccv', 'dataValidade', 'parcela', 'metodoPagamento'],
        }
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
};
</script>