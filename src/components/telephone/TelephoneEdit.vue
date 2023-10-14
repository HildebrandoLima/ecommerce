<template>
<ModalDetails :modal-id="modalId" :modal-title="modalTitle">
    <AlertSuccess :messageSuccess="messageSuccess" />

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
import AlertSuccess from '@/components/shared/AlertSuccess.vue';
import TelephoneForm from '@/components/telephone/TelephoneForm.vue';
import ModalDetails from '@/components/shared/ModalDetails.vue';
import TelephoneService from '@/services/telephone/TelephoneService';

export default {
    name: 'modal-telefone',
    components: { AlertSuccess, TelephoneForm, ModalDetails },
    data() {
        return {
            errorList: {},
            messageSuccess: '',
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
            const telephone = await TelephoneService.putTelephone(this.data);
            if (telephone.status === 200) {
                this.messageSuccess = telephone.message;
            } else {
                this.errorList = telephone;
           }
        },
    },
};
</script>