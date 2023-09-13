<template>
    <div v-if="Object.keys(messageSuccess).length > 0" class="alert alert-success mt-2" role="alert">
    {{ messageSuccess }}
  </div>
</template>

<script>
export default {
  name: 'alert success',
  props: {
    messageSuccess: {
          type: String,
          default: {}
      }
  },
};
</script>