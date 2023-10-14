<template>
<ModalDetails :modal-id="modalId" :modal-title="modalTitle">
    <AlertSuccess :messageSuccess="messageSuccess" />

    <AddressForm
        :errorList="errorList"
        :address="data"
        :isEditMode="true"
        @editAddress="editAddress"
    />
</ModalDetails>
</template>

<script>
import AlertSuccess from '@/components/shared/AlertSuccess.vue';
import AddressForm from '@/components/address/AddressForm.vue';
import ModalDetails from '@/components/shared/ModalDetails.vue';
import AddressService from '@/services/address/AddressService';

export default {
    name: 'modal-address',
    components: { AlertSuccess, AddressForm, ModalDetails },
    data() {
        return {
            errorList: {},
            messageSuccess: '',
            modalId: 'detailsModal',
            modalTitle: 'Editar Endereço',
        }
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    methods: {
        async editAddress() {
            const address = await AddressService.putAddress(this.data);
            if (address.status === 200) {
                this.messageSuccess = address.message;
            } else {
                this.errorList = address;
            }
        },
    },
};
</script>