<template>

<AlertSuccess :messageSuccess="messageSuccess" />

<AddressForm
  :errorList="errorList"
  :address="address"
  :isEditMode="false"
  @saveAddress="saveAddress"
/>

</template>

<script>
import AlertSuccess from '@/components/shared/AlertSuccess.vue';
import AddressForm from '@/components/address/AddressForm.vue';
import AddressService from '@/services/address/AddressService';
import { getUser } from '@/storages/EntityPersonStorage';

export default {
  name: 'register-address',
  components: { AlertSuccess, AddressForm },
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
    async saveAddress() {
      this.address.usuarioId = this.usuarioId;
      const address = await AddressService.createAddress(this.address);
      if (address.status === 200) {
        this.messageSuccess = address.message;
      } else {
        this.errorList = address;
      }
    },
  },
};
</script>