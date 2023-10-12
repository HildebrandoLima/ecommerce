<template>
    <p>Não possue uma conta? <RouterLink to="/account">Registre-se</RouterLink></p>
    <p>ou cadastre-se com:</p>
    <button type="button" @click="oAuth('facebook')" class="btn btn-secondary btn-floating mx-1">
        <i class="fab fa-facebook-f px-20"></i>
    </button>

    <button type="button" @click="oAuth('google')" class="btn btn-secondary btn-floating mx-1">
        <i class="fab fa-google px-20"></i>
    </button>

    <button type="button" @click="oAuth('github')" class="btn btn-secondary btn-floating mx-1">
        <i class="fab fa-github px-20"></i>
    </button>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';

export default {
    components: { AlertError },
    name: 'login-social',
    props: {
        errorList: {
            type: Object,
            required: true,
            default: null,
        },
        provider: {
            type: Object,
            required: true,
            default: {},
        },
    },
    methods: {
        async oAuth() {
            this.$emit('oAuth', this.provider);
        },
    },
};
</script>