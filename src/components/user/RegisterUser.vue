<template>

  <AlertSuccess :messageSuccess="messageSuccess" />

  <FormRegisterUser
    :errorList="errorList"
    :user="user"
    :isEditMode="false"
    @saveUser="saveUser"
  />

</template>

<script>
import AlertSuccess from '@/components/shared/AlertSuccess.vue';
import FormRegisterUser from '@/components/user/FormRegisterUser.vue';
import UserService from '@/services/user/UserService';

export default {
  name: 'register-user',
  components: { AlertSuccess, FormRegisterUser },
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
    async saveUser(newUser) {
      const user = await UserService.postUser(newUser);

      if (user.status === 200) {
        this.messageSuccess = user.message;
      } else {
        this.errorList = user;
      }
    },
  },
};
</script>