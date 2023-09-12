<template>
  <Banner :msg="bannerTitleMessage"></Banner>

  <RegisterUser></RegisterUser>

</template>

<script>
  import Banner from '../components/Banner.vue';
  import RegisterUser from '@/components/RegisterUser.vue';

  export default {
    components: { Banner, RegisterUser },
    data() {
            return {
              bannerTitleMessage: 'Criar Conta',
            };
        },
  };
</script>