<template>
<div class="col">
    <div class="card">
      <div class="card-body">
        <form>
          <DeliveryOptions
            :errorList="errorList"
            :order="order"
          />

          <AddressOptions
            :errorList="errorList"
            :adresses="adresses" 
            :order="order"
          />
        </form>
      </div>
    </div>
</div>
</template>

<script>
import AddressOptions from '@/components/checkout/AddressOptions.vue';
import DeliveryOptions from '@/components/checkout/DeliveryOptions.vue';

export default {
  name: 'checkout-form',
  components: { AddressOptions, DeliveryOptions },
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