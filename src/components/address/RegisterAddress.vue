<template>

<AlertSuccess :messageSuccess="messageSuccess" />

<FormAddress
  :errorList="errorList"
  :address="address"
  :isEditMode="false"
  @saveAddress="saveAddress"
/>

</template>

<script>
import AlertSuccess from '@/components/shared/AlertSuccess.vue';
import FormAddress from '@/components/address/FormAddress.vue';
import AddressService from '@/services/address/AddressService';
import { getUser } from '@/storages/EntityPersonStorage';

export default {
  name: 'register-address',
  components: { AlertSuccess, FormAddress },
  data() {
    return {
      messageSuccess: '',
      errorList: {},
      cep: '',
      usuarioId: 0,
      address: {
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        cep: this.cep,
        uf: '',
      },
    };
  },
  created() {
      const userId = getUser();
      this.usuarioId = userId;
  },
  methods: {
    async saveAddress(newAddress) {
      newAddress.usuarioId = this.usuarioId;
      const address = await AddressService.postAddress(newAddress);
      if (address.status === 200) {
        this.messageSuccess = address.message;
      } else {
        this.errorList = address;
      }
    },
  },
};
</script>