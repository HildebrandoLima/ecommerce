<template>

  <AlertSuccess :messageSuccess="messageSuccess" />

  <AlertError
    v-if="messageError"
    :errorList="messageError"
  />

  <FormTelephone
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
import FormTelephone from '@/components/telephone/FormTelephone.vue';
import TelephoneService from '@/services/telephone/TelephoneService';
import { getUser } from '@/storages/EntityPersonStorage';
import { REGISTER_REQUIRED_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export default {
  name: 'register-telephone',
  components: { AlertError, AlertSuccess, FormTelephone },
  data() {
    return {
      messageError: null,
      fieldRequired: null,
      errorList: {},
      usuarioId: 0,
      telephones: [],
    };
  },
  created() {
    const userId = getUser();
    this.usuarioId = Number(userId);
    this.addTelephone();
  },
  methods: {
    addTelephone() {
      this.telephones.push({
        ddd: "",
        numero: '',
        tipo: '',
        usuarioId: this.usuarioId,
      });
    },
    removeTelephone(index) {
      if (this.telephones.length === 1) {
        return;
      } else {
        this.telephones.splice(index, 1);
      }
    },
    async saveTelephone() {
      if (this.telephones.length === 0) {
        this.messageError = REGISTER_REQUIRED_MESSAGE;
      } else {
        const telephones = await TelephoneService.postTelephone(this.telephones);
        if (telephones.status === 200) {
          this.messageSuccess = telephones.message;
        } else {
          this.errorList = telephones;
        }
      }
    },
  },
};
</script>