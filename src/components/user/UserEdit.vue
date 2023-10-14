<template>
<ModalDetails :modal-id="modalId" :modal-title="modalTitle">
    <AlertSuccess :messageSuccess="messageSuccess" />

    <UserForm
        :errorList="errorList"
        :user="data"
        :isEditMode="true"
        @editUser="editUser"
    />
</ModalDetails>
</template>

<script>
import AlertSuccess from '@/components/shared/AlertSuccess.vue';
import UserForm from '@/components/user/UserForm.vue';
import ModalDetails from '@/components/shared/ModalDetails.vue';
import UserService from '@/services/user/UserService';

export default {
    name: 'modal-user',
    components: { AlertSuccess, UserForm, ModalDetails },
    data() {
        return {
            errorList: {},
            messageSuccess: '',
            modalId: 'detailsModal',
            modalTitle: 'Editar Perfil',
        }
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    methods: {
        newObjectUser() {
            this.data.id = this.data.usuarioId;
            delete this.data.usuarioId;
            return this.data;
        },
        async editUser() {
            if (this.data.ativo == false) {
                throw Swal.fire({
                    icon: 'warning',
                    title:
                    'Tem certeza que deseja desativar sua conta?<br>' +
                    'Somente o suporte poderá reativar.',
                });
            }
            const user = await UserService.putUser(this.newObjectUser(this.data));
            if (user.status === 200) {
                this.messageSuccess = user.message;
            } else {
                this.errorList = user;
            }
        },
    },
};
</script>