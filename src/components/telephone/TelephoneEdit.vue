<template>
<ModalDetails :modal-id="modalId" :modal-title="modalTitle">

    <TelephoneForm
        :errorList="errorList"
        :telephones="[data]"
        :isEditMode="true"
        @addTelephone="addTelephone"
        @removeTelephone="removeTelephone"
        @editTelephone="editTelephone"
    />

</ModalDetails>
</template>

<script>
import TelephoneForm from '@/components/telephone/TelephoneForm.vue';
import ModalDetails from '@/components/shared/ModalDetails.vue';
import { messages } from '@/utils/messages/Message';
import TelephoneService from '@/services/telephone/TelephoneService';

export default {
    name: 'modal-telefone',
    components: { TelephoneForm, ModalDetails },
    data() {
        return {
            errorList: {},
            modalId: 'detailsModal',
            modalTitle: 'Editar Telefone',
        }
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    methods: {
        async editTelephone() {
            const telephone = await TelephoneService.editTelephone(this.data);
            if (telephone.status === 200) {
                messages(
                    telephone.status,
                    telephone.data,
                    telephone.message
                );
            } else {
                this.errorList = telephone;
           }
        },
    },
};
</script>