<template>
<div class="modal fade" id="editAddressModal" tabindex="-1" aria-labelledby="editAddressModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editAddressModal">Editar Endereço</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

                <AlertSuccess :messageSuccess="messageSuccess" />

                <AddressForm
                    :errorList="errorList"
                    :address="data"
                    :isEditMode="true"
                    @editAddress="editAddress"
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
import AlertSuccess from '@/components/shared/AlertSuccess.vue';
import AddressForm from '@/components/address/AddressForm.vue';
import AddressService from '@/services/address/AddressService';

export default {
    name: 'modal-address',
    components: { AlertSuccess, AddressForm },
    data() {
        return {
            errorList: {},
            messageSuccess: '',
        }
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    methods: {
        async editAddress(newAddress) {
            const address = await AddressService.putAddress(newAddress);
            if (address.status === 200) {
                this.messageSuccess = address.message;
            } else {
                this.errorList = address;
            }
        },
    },
};
</script>