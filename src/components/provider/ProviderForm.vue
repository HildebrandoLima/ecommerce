<template>
<form>
    <div class="row mb-4">
        <div class="col">
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                    <i class="fa fa-th-large" aria-hidden="true"></i>
                </span>
                <input
                    type="text"
                    id="razaoSocial"
                    v-model="provider.razaoSocial"
                    placeholder="Razão Social"
                    class="form-control"
                    required
                />
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.razaoSocial"
            />
        </div>

        <div class="col">
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <input
                    type="text"
                    id="email"
                    v-model="provider.email"
                    placeholder="E-mail"
                    class="form-control"
                    required
                />
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.razaoSocial"
            />
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                    <i class="fa fa-file-powerpoint" aria-hidden="true"></i>
                </span>
                <input
                    type="text"
                    id="cnpj"
                    v-model="provider.cnpj"
                    maxlength="18"
                    OnKeyPress="format('##.###.###/####-##',this)"
                    placeholder="CNPJ"
                    class="form-control"
                    required
                />
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.razaoSocial"
            />
        </div>

        <div class="col">
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                </span>
                <input
                    type="text"
                    id="dataFundacao"
                    v-model="provider.dataFundacao"
                    placeholder="Data de Fundação"
                    class="form-control"
                    onfocus="(this.type='date')"
                    required
                />
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.razaoSocial"
            />
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <div class="form-check form-switch">
            <input
                v-if="isEditMode"
                type="checkbox"
                v-model="provider.ativo"
                :id="'flexSwitchCheckChecked_' + index"
                :checked="provider.ativo"
                class="form-check-input"
            />
            </div>
        </div>

        <div class="col">
            <button
            type="button"
            @click="handleButtonClick"
            class="btn btn-outline-primary btn-block mb-4"
            >
            {{ buttonText }}
            </button>
        </div>
    </div>  
</form>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';

export default {
    name: 'from-provider',
    components: { AlertError },
    provider: {
        razaoSocial: '',
        cnpj: '',
        email: '',
        dataFundacao: '',
    },
    props: {
        errorList: {
            type: Object,
            default: {},
        },
        provider: {
            type: Object,
            required: true,
        },
        isEditMode: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        buttonText() {
            return this.isEditMode ? 'Editar' : 'Salvar';
        },
    },
    methods: {
        handleButtonClick() {
            if (this.isEditMode) {
                this.editProvider();
            } else {
                this.saveProvider();
            }
        },
        async saveProvider() {
            this.$emit('saveProvider', this.provider);
        },
        async editProvider() {
            this.$emit('editProvider', this.provider);
        },
    },
};
</script>