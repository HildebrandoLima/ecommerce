<template>
<div class="row mb-3">
  <h6 class="mb-3">Informe o Endereço:</h6><hr />

  <AlertError
    v-if="Object.keys(errorList).length > 0"
    :errorList="errorList.enderecoId"
  />

  <div v-for="(address, index) in adresses" :key="index" class="col-lg-4 mb-3">
    <div class="form-check h-100 border rounded-3">
      <div class="p-3">
        <input type="radio"
          id="endereco"
          :value="address.enderecoId"
          v-model="order.enderecoId"
          class="form-check-input"
        />
        <label class="form-check-label" for="Endereco">
          {{ address.logradouro }}, N° {{ address.numero }}<br />
          {{ address.bairro }}<br />
          <small class="text-muted">{{ address.cidade }} - {{ address.uf }}</small>
        </label>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';

export default {
  name: 'checkout-optuins',
  components: { AlertError },
  props: {
    errorList: {
      type: Object,
      required: true,
      default: {}
    },
    adresses: {
        type: Array,
        required: true,
        default: []
    },
    order: {
        type: Object,
        required: true,
        default: {}
    },
  },
};
</script>