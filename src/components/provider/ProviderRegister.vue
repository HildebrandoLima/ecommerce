<template>
<ProviderForm
    :errorList="errorList"
    :provider="provider"
    :isEditMode="false"
    @saveProvider="saveProvider"
/>
</template>

<script>
import AlertSuccess from '@/components/shared/AlertSuccess.vue';
import ProviderForm from '@/components/provider/ProviderForm.vue';
import ProviderService from '@/services/provider/ProviderService';

export default {
    name: 'register-provider',
    components: { AlertSuccess, ProviderForm },
    data() {
        return {
            errorList: {},
            provider: {
                razaoSocial: '',
                cnpj: '',
                email: '',
                dataFundacao: '',
            },
        };
    },
    methods: {
        async saveProvider() {
            const provider = await ProviderService.createProvider(this.provider);
            if (provider.status === 200) {
                ProviderService.messageSuccess(provider);
                return;
            } else {
                this.errorList = provider;
                return this.errorList;
            }
        },
    },
};
</script>