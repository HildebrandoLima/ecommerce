<template>

    <AlertSuccess :messageSuccess="messageSuccess" />

    <form>
      <div class="row mb-4">
        <div class="col">
          <div class="form-outline">
            <input type="number" id="numero" v-model="address.numero" class="form-control" placeholder="N°" required />
          </div>
          <AlertError
          v-if="Object.keys(errorList).length > 0"
          :errorList="errorList.numero" />
        </div>

        <div class="col">
          <div class="form-outline">
            <input type="text" id="cep" @keyup.enter="searchCep" v-model="cep" maxlength="9" OnKeyPress="format('#####-###',this)" class="form-control" placeholder="CEP" required />
          </div>
          <div class="form-text text-muted">
            Digite seu CEP e tecle 'ENTER'
          </div>
          <AlertError
          v-if="Object.keys(errorList).length > 0"
          :errorList="errorList.cep" />    
        </div>
      </div>

      <div class="row mb-4">
        <div class="col">
          <div class="form-outline">
            <input type="text" id="logradouro" v-model="address.logradouro" class="form-control" placeholder="Logradouro" required />
          </div>
          <AlertError
          v-if="Object.keys(errorList).length > 0"
          :errorList="errorList.logradouro" />
        </div>

        <div class="col">
          <div class="form-outline">
            <input type="text" id="bairro" v-model="address.bairro" class="form-control" placeholder="Bairro" required />
          </div>
          <AlertError
          v-if="Object.keys(errorList).length > 0"
          :errorList="errorList.bairro" />
        </div>
      </div>

      <div class="row mb-4">
        <div class="col">
          <div class="form-outline">
            <input type="text" id="cidade" v-model="address.cidade" class="form-control" placeholder="Cidade" required />
          </div>
          <AlertError
          v-if="Object.keys(errorList).length > 0"
          :errorList="errorList.cidade" />
        </div>

        <div class="col">
            <div class="form-outline">
              <input type="text" id="uf" v-model="address.uf" placeholder="UF" class="form-control" required />
            </div>
          <AlertError
          v-if="Object.keys(errorList).length > 0"
          :errorList="errorList.uf" />
        </div>
      </div>

      <button type="button" @click="saveAddress" class="btn btn-primary btn-block mb-4">Enviar</button>
    </form>
  </template>

<script>
  import AlertError from '@/components/shared/AlertError.vue';
  import AlertSuccess from '@/components/shared/AlertSuccess.vue';
  import AddressService from '@/services/address/AddressService';
  import { getUser } from '@/storages/EntityPersonStorage';

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
        const userId = getUser();
        this.usuarioId = userId;
    },
    methods: {
      async searchCep() {
        const newCep = this.cep.replace('-', '');
        if (/^\d{8}$/.test(newCep)) {
          const viaCep = await AddressService.searchCep(newCep);
          if (viaCep) {
            this.address = viaCep;
          }
        } else {
          alert('CEP inválido. Digite um CEP com 8 dígitos numéricos.');
        }
      },
      async saveAddress() {
        this.searchCep();
        this.address.usuarioId = this.usuarioId;
        const address = await AddressService.postAddress(this.address);
        if (address.status === 200) {
          this.messageSuccess = address.message;
        } else {
          this.errorList = address;
        }
      },
    },
};
</script>