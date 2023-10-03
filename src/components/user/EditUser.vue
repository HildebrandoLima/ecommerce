<template>
    <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editUserModal">Editar Perfil</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">

                    <AlertSuccess :messageSuccess="messageSuccess" />

                    <FormRegisterUser
                        :errorList="errorList"
                        :user="data"
                        :isEditMode="true"
                        @editUser="editUser"
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
import FormRegisterUser from '@/components/user/FormRegisterUser.vue';
import UserService from '@/services/user/UserService';

export default {
    name: 'modal-user',
    components: { AlertSuccess, FormRegisterUser },
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
        newObjectUser(newUser) {
            newUser.id = newUser.usuarioId;
            delete newUser.usuarioId;
            return newUser;
        },
        async editUser(newUser) {
            if (newUser.ativo == false) {
                throw Swal.fire({
                    icon: 'warning',
                    title:
                    'Tem certeza que deseja desativar sua conta?<br>' +
                    'Somente o suporte poderá reativar.',
                });
            }
            const user = await UserService.putUser(this.newObjectUser(newUser));
            if (user.status === 200) {
                this.messageSuccess = user.message;
            } else {
                this.errorList = user;
            }
        },
    },
};
</script>