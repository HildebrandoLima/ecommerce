<template>
<form>
  <div class="row mb-4">
    <div class="col">
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1">
            <i class="fa fa-address-book" aria-hidden="true"></i>
        </span>
        <input
          type="number"
          id="numero"
          v-model="address.numero"
          placeholder="N°"
          class="form-control" 
          required
        />
      </div>
      <AlertError
        v-if="Object.keys(errorList).length > 0"
        :errorList="errorList.numero"
      />
    </div>

    <div class="col">
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1">
            <i class="fa fa-search" aria-hidden="true"></i>
        </span>
        <input
          type="text"
          id="cep"
          @keyup.enter="searchCep"
          v-model="cep"
          maxlength="9"
          OnKeyPress="format('#####-###',this)"
          class="form-control"
          placeholder="CEP"
          required
        />
      </div>
      <div class="form-text text-muted">
        Digite seu CEP e tecle 'ENTER'
      </div>
      <AlertError
        v-if="Object.keys(errorList).length > 0"
        :errorList="errorList.cep"
      />    
    </div>
  </div>

  <div class="row mb-4">
    <div class="col">
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1">
            <i class="fa fa-address-book" aria-hidden="true"></i>
        </span>
        <input
          type="text"
          id="logradouro"
          v-model="address.logradouro"
          class="form-control"
          placeholder="Logradouro"
          required
        />
      </div>
      <AlertError
        v-if="Object.keys(errorList).length > 0"
        :errorList="errorList.logradouro"
      />
    </div>

    <div class="col">
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1">
            <i class="fa fa-address-book" aria-hidden="true"></i>
        </span>
        <input
          type="text"
          id="bairro"
          v-model="address.bairro"
          placeholder="Bairro"
          class="form-control"
          required
        />
      </div>
      <AlertError
        v-if="Object.keys(errorList).length > 0"
        :errorList="errorList.bairro"
      />
    </div>
  </div>

  <div class="row mb-4">
    <div class="col">
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1">
            <i class="fa fa-address-book" aria-hidden="true"></i>
        </span>
        <input
          type="text"
          id="cidade"
          v-model="address.cidade"
          placeholder="Cidade"
          class="form-control"
          required
        />
      </div>
      <AlertError
        v-if="Object.keys(errorList).length > 0"
        :errorList="errorList.cidade"
      />
    </div>

    <div class="col">
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1">
            <i class="fa fa-address-book" aria-hidden="true"></i>
        </span>
          <input
            type="text"
            id="uf"
            v-model="address.uf"
            placeholder="UF"
            class="form-control"
            required
          />
      </div>
      <AlertError
        v-if="Object.keys(errorList).length > 0"
        :errorList="errorList.uf"
      />
    </div>
  </div>

  <div class="row mb-4">
    <div class="col">
      <div class="form-check form-switch">
        <input
          v-if="isEditMode"
          type="checkbox"
          v-model="address.ativo"
          :id="'flexSwitchCheckChecked_' + index"
          :checked="address.ativo"
          class="form-check-input"
        />
      </div>
    </div>

    <div class="col">
      <button
        type="button"
        @click="handleButtonClick"
        class="btn btn-outline-primary btn-block mb-4"
      >
      {{ buttonText }}
      </button>
    </div>
  </div>  
</form>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import AddressService from '@/services/address/AddressService';

export default {
  name: 'from-address',
  components: { AlertError },
  cep: 0,
  address: {
    logradouro: '',
    numero: 0,
    bairro: '',
    cidade: '',
    cep: '',
    uf: '',
  },
  props: {
    errorList: {
      type: Object,
      default: {},
    },
    address: {
      type: Object,
      required: true,
    },
    isEditMode: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    buttonText() {
      return this.isEditMode ? 'Editar' : 'Salvar';
    },
  },
  methods: {
    handleButtonClick() {
      if (this.isEditMode) {
        this.editAddress();
      } else {
        this.saveAddress();
      }
    },
    async searchCep() {
      const cep = this.cep.replace('-', '');
      if (/^\d{8}$/.test(cep)) {
        const viaCep = await AddressService.searchCep(this.cep);
        if (viaCep) {
          return AddressService.toAssembleObjectAddressCep(this.numero, this.address, viaCep);
        }
      } else {
        return AddressService.alertErrorAddressCep();
      }
    },
    async saveAddress() {
      this.searchCep();
      this.$emit('saveAddress', this.address);
    },
    async editAddress() {
      this.searchCep();
      this.$emit('editAddress', this.address);
    },
  },
};
</script>