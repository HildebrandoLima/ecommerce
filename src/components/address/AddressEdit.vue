<template>
<ModalDetails :modal-id="modalId" :modal-title="modalTitle">

    <AddressForm
        :errorList="errorList"
        :address="data"
        :isEditMode="true"
        @editAddress="editAddress"
    />

</ModalDetails>
</template>

<script>
import AddressForm from '@/components/address/AddressForm.vue';
import ModalDetails from '@/components/shared/ModalDetails.vue';
import { messages } from '@/utils/messages/Message';
import AddressService from '@/services/address/AddressService';

export default {
    name: 'modal-address',
    components: { AddressForm, ModalDetails },
    data() {
        return {
            errorList: {},
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
                messages(
                    address.status,
                    address.data,
                    address.message
                );
            } else {
                this.errorList = address;
            }
        },
    },
};
</script>