<template>

    <AlertSuccess :messageSuccess="this.messageSuccess" />

    <form>
      <input type="hidden" id="usuarioId" v-model="address.usuarioId" class="form-control" />
      <div class="row mb-4">
        <div class="col">
          <div class="form-outline">
            <input type="number" id="numero" v-model="address.numero" class="form-control" placeholder="N°" required />
          </div>
          <AlertError
          v-if="Object.keys(this.errorList).length > 0"
          :errorList="this.errorList.numero" />
        </div>

        <div class="col">
          <div class="form-outline">
            <input type="text" id="cep" @keyup.enter="searchCep" v-model="cep" maxlength="9" OnKeyPress="format('#####-###',this)" class="form-control" placeholder="CEP" required />
          </div>
          <div class="form-text text-muted">
            Digite seu CEP e tecle 'ENTER'
          </div>
          <AlertError
          v-if="Object.keys(this.errorList).length > 0"
          :errorList="this.errorList.cep" />    
        </div>
      </div>

      <div class="row mb-4">
        <div class="col">
          <div class="form-outline">
            <input type="text" id="logradouro" v-model="address.logradouro" class="form-control" placeholder="Logradouro" required />
          </div>
          <AlertError
          v-if="Object.keys(this.errorList).length > 0"
          :errorList="this.errorList.logradouro" />
        </div>

        <div class="col">
          <div class="form-outline">
            <input type="text" id="bairro" v-model="address.bairro" class="form-control" placeholder="Bairro" required />
          </div>
          <AlertError
          v-if="Object.keys(this.errorList).length > 0"
          :errorList="this.errorList.bairro" />
        </div>
      </div>

      <div class="row mb-4">
        <div class="col">
          <div class="form-outline">
            <input type="text" id="cidade" v-model="address.cidade" class="form-control" placeholder="Cidade" required />
          </div>
          <AlertError
          v-if="Object.keys(this.errorList).length > 0"
          :errorList="this.errorList.cidade" />
        </div>

        <div class="col">
            <div class="form-outline">
              <input type="text" id="uf" v-model="address.uf" placeholder="UF" class="form-control" required />
            </div>
          <AlertError
          v-if="Object.keys(this.errorList).length > 0"
          :errorList="this.errorList.uf" />
        </div>
      </div>

      <button type="button" @click="saveAddress" class="btn btn-primary btn-block mb-4">Enviar</button>
    </form>
  </template>

<script>
  import AlertError from '@/components/shared/AlertError.vue';
  import AlertSuccess from '@/components/shared/AlertSuccess.vue';
  import AddressService from '@/services/address/AddressService';

  export default {
    name: 'address',
    components: { AlertError, AlertSuccess },
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
        this.searchCep();
        this.usuarioId = localStorage.getItem('userId');
    },
    methods: {
      async searchCep() {
        try {
          const viaCep = await AddressService.searchCep(this.cep.replace('-', ''));
          this.address = viaCep;
        } catch (error) {
          if (error.response && error.response.data.status === 400) {
            this.errorList = error.response.data.data;
          }
        }
      },
      async saveAddress() {
        try {
          this.address.usuarioId = this.usuarioId;
          const address = await AddressService.postAddress(this.address);
          this.messageSuccess = address;
        } catch (error) {
          if (error.response && error.response.data.status === 400) {
            this.errorList = error.response.data.data;
          }
        }
      },
    },
};
</script>