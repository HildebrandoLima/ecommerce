<template>
<ModalDetails :modalId="modalId" :modalTitle="modalTitle">

    <ProviderForm
        :errorList="errorList"
        :provider="data"
        :isEditMode="true"
        @editProvider="editProvider"
    />

</ModalDetails>
</template>

<script>
import ProviderForm from '@/components/provider/ProviderForm.vue';
import ModalDetails from '@/components/shared/ModalDetails.vue';
import ProviderService from '@/services/provider/ProviderService';

export default {
    name: 'modal-provider',
    components: { ProviderForm, ModalDetails },
    data() {
        return {
            errorList: {},
            modalId: 'detailsModal',
            modalTitle: 'Editar Fornecedor',
        }
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    methods: {
        async editProvider() {
            const provider = await ProviderService.editProvider(this.data);
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