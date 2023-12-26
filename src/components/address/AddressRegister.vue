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
import { getUser, getProvider } from '@/storages/EntityPersonStorage';

export default {
  name: 'register-address',
  components: { AlertSuccess, AddressForm },
  data() {
    return {
      messageSuccess: '',
      errorList: {},
      cep: '',
      usuarioId: 0,
      fornecedorId: 0,
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
      const providerId = getProvider();
      this.usuarioId = userId;
      this.fornecedorId = providerId;
  },
  methods: {
    async saveAddress() {
      if (getUser()) {
        this.address.usuarioId = this.usuarioId;
      } else {
        this.address.fornecedorId = this.fornecedorId;
      }
      const address = await AddressService.createAddress(this.address);
      if (address.status === 200) {
        this.messageSuccess = address.message;
        return this.messageSuccess;
      } else {
        this.errorList = address;
        return this.errorList;
      }
    },
  },
};
</script>