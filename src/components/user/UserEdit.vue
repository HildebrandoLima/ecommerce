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
import { messages } from '@/utils/messages/Message';
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
                throw Swal.fire({
                    icon: 'warning',
                    title:
                    'Tem certeza que deseja desativar sua conta?<br>' +
                    'Somente o suporte poderá reativar.',
                }).then((result) => {
                    if(result.isConfirmed) {
                        $('.modal').modal('hide'); 
                    }
                });
            }

            const user = await UserService.putUser(this.newObjectUser(this.data));
            if (user.status === 200) {
                messages(
                    user.status,
                    user.data,
                    user.message
                );
            } else {
                this.errorList = user;
            }
        },
    },
};
</script>