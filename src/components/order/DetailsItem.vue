<template>
<div class="modal fade" id="detailsItemModal" tabindex="-1" aria-labelledby="detailsItemModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="detailsItemModal">Itens</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

                <Table
                    :data="data"
                    :columns="itensColumns"
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
            itensColumns: ['itemId', 'quantidadeItem', 'subTotal', 'pedidoId', 'produtoId'],
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