<template>
<div class="alert alert-danger mt-2 text-center" role="alert">
  {{ errorList }}
</div>
</template>

<script>
export default {
  name: 'alert error',
  props: {
    errorList: {
          type: String,
          default: {}
      }
  },
};
</script>