<template>
<div class="modal fade" id="detailsAddressModal" tabindex="-1" aria-labelledby="detailsAddressModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="detailsAddressModal">Endereço</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

                <Table
                    :data="data"
                    :columns="addressColumns"
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
    name: 'modal-address',
    components: { Table },
    data() {
        return {
            addressColumns: ['logradouro', 'numero', 'bairro', 'cidade', 'uf'],
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