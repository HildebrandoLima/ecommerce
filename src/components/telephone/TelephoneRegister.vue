<template>
<AlertSuccess :messageSuccess="messageSuccess" />

<AlertError
  v-if="messageError.length > 0"
  :errorList="messageError"
/>

<TelephoneForm
  :errorList="errorList"
  :telephones="telephones"
  :isEditMode="false"
  @addTelephone="addTelephone"
  @removeTelephone="removeTelephone"
  @saveTelephone="saveTelephone"
/>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import AlertSuccess from '@/components/shared/AlertSuccess.vue';
import TelephoneForm from '@/components/telephone/TelephoneForm.vue';
import TelephoneService from '@/services/telephone/TelephoneService';
import { getUser, getProvider } from '@/storages/EntityPersonStorage';

export default {
  name: 'register-telephone',
  components: { AlertError, AlertSuccess, TelephoneForm },
  data() {
    return {
      messageError: '',
      fieldRequired: null,
      errorList: {},
      usuarioId: 0,
      fornecedorId: 0,
      entityPerson: 0,
      telephones: [],
    };
  },
  created() {
    const userId = getUser();
    const providerId = getProvider();
    if (userId) {
      this.usuarioId = Number(userId);
    } else {
      this.fornecedorId = Number(providerId);
    }
    this.addTelephone();
  },
  methods: {
    addTelephone() {
      TelephoneService.addTelephone(this.telephones, this.usuarioId, this.fornecedorId);
    },
    removeTelephone(index) {
      TelephoneService.removeTelephone(this.telephones, index);
    },
    async saveTelephone() {
      if (this.telephones.length === 0) {
        this.messageError = TelephoneService.messageError('register');
      } else {
        const telephones = await TelephoneService.createTelephone(this.telephones);
        if (telephones.status === 200) {
          this.messageSuccess = telephones.message;
          window.location.reload();
          return this.messageSuccess;
        } else {
          this.errorList = telephones;
          return this.errorList;
        }
      }
    },
  },
};
</script>