<template>
<div class="modal fade" id="editAddressModal" tabindex="-1" aria-labelledby="editAddressModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editAddressModal">Editar Endereço</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <FormAddress :data="data" />
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-outline-success">Savar</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import FormAddress from '@/components/address/FormAddress.vue';

export default {
    name: 'modal-user',
    components: { FormAddress },
    errorList: {},
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    methods: {
        async editAddress() {
        this.searchCep();
        this.$emit('edit', this.address);
      },
    },
};
</script>