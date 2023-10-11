<template>
<div class="col">
  <div class="card">
    <div class="card-body">
      <h6 class="mb-3">Resumo:</h6><hr />

      <div class="d-flex justify-content-between">
        <p class="mb-2">Total:</p>
        <p class="mb-2">{{ formatPrice(total) }}</p>
      </div>

      <div class="d-flex justify-content-between">
        <p class="mb-2">Desconto:</p>
        <p class="mb-2 text-danger">- R$ 00,00</p>
      </div>

      <div class="d-flex justify-content-between">
        <p class="mb-2">Frete:</p>
        <p class="mb-2">+ R$ 00,00</p>
      </div>

      <div class="d-flex justify-content-between">
        <p class="mb-2">Total + Frete:</p>
        <p class="mb-2 fw-bold">{{ formatPrice(total) }}</p>
      </div>

      <div class="mt-3">
        <button type="button" @click="saveOrder" class="btn btn-outline-success w-100 shadow-0 mb-2">Finalizar Compra</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { formatPrice } from '@/utils/formatPrice/formatPrice';

export default {
    name: 'checkout-summary',
    props: {
        total: {
            type: Number,
            required: true,
            default: 0,
        },
        order: {
          type: Object,
          required: true,
          default: {},
        }
    },
    methods: {
      saveOrder() {
        this.$emit('saveOrder', this.order);
      }
    },
    computed: {
        formatPrice() {
            return formatPrice;
        },
    },
};
</script>