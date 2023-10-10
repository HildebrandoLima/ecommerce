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
import AuthService from '@/services/auth/AuthService';

export default {
    components: { AlertError },
    name: 'login-social',
    data() {
        return {
            errorList: {},
            errorMessage: null,
            provider: {
                facebook: 'facebook',
                google: 'google',
                github: 'github',
            },
        };
    },
    methods: {
        async oAuth(providerName) {
            try {
                const providerValue = this.provider[providerName];
                const response = window.location.href = `http://localhost:8000/api/auth/login/social/${providerValue}`;
                window.localStorage.setItem('userAuth', JSON.stringify(response.data));
                //const provider = await AuthService.loginSocial(providerValue);
                //this.messageSuccess = provider;
            } catch (error) {
                if (error.response && error.response.data.status === 400) {
                    this.errorList = error.response.data.data;
                }
            }
        },
    },
};
</script>