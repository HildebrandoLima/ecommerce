<template>
    <div class="modal fade" id="editPhoneModal" tabindex="-1" aria-labelledby="editPhoneModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editPhoneModal">Editar Telefone</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <AlertSuccess :messageSuccess="messageSuccess" />

                    <FormTelephone
                        :errorList="errorList"
                        :telephones="[data]"
                        :isEditMode="true"
                        @addTelephone="addTelephone"
                        @removeTelephone="removeTelephone"
                        @editTelephone="editTelephone"
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
import FormTelephone from '@/components/telephone/FormTelephone.vue';
import TelephoneService from '@/services/telephone/TelephoneService';

export default {
    name: 'modal-telefone',
    components: { AlertSuccess, FormTelephone },
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