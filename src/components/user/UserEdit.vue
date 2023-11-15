<template>
<ModalDetails :modal-id="modalId" :modal-title="modalTitle">

    <UserForm
        :errorList="errorList"
        :user="data"
        :isEditMode="true"
        @editUser="editUser"
    />

</ModalDetails>
</template>

<script>
import UserForm from '@/components/user/UserForm.vue';
import ModalDetails from '@/components/shared/ModalDetails.vue';
import UserService from '@/services/user/UserService';

export default {
    name: 'modal-user',
    components: { UserForm, ModalDetails },
    data() {
        return {
            errorList: {},
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
                return UserService.alertEditUser();
            }

            const user = await UserService.editUser(this.newObjectUser(this.data));
            if (user.status === 200) {
                UserService.messageSuccess(user);
                return;
            } else {
                this.errorList = user;
                return this.errorList;
            }
        },
    },
};
</script>