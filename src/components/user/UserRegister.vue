<template>

<AlertSuccess :messageSuccess="messageSuccess" />

<UserForm
  :errorList="errorList"
  :user="user"
  :isEditMode="false"
  @saveUser="saveUser"
/>

</template>

<script>
import AlertSuccess from '@/components/shared/AlertSuccess.vue';
import UserForm from '@/components/user/UserForm.vue';
import UserService from '@/services/user/UserService';

export default {
  name: 'register-user',
  components: { AlertSuccess, UserForm },
  data() {
    return {
      messageSuccess: '',
      errorList: {},
      user: {
        nome: '',
        email: '',
        cpf: '',
        senha: '',
        dataNascimento: '',
        genero: '',
        eAdmin: false,
      },
    };
  },
  methods: {
    async saveUser() {
      const user = await UserService.createUser(this.user);

      if (user.status === 200) {
        this.messageSuccess = user.message;
      } else {
        this.errorList = user;
      }
    },
  },
};
</script>