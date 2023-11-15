<template>
<form>
    <div v-for="(phone, index) in telephones" :key="index">
        <input type="hidden" id="usuarioId" v-model="phone.usuarioId" />

        <div class="row mb-4">
            <div class="col input-group">
                <span class="input-group-text" id="basic-addon1">
                    <i class="fa fa-phone" aria-hidden="true"></i>
                </span>
                <input
                    type="text"
                    id="numero"
                    v-model="phone.numero"
                    maxlength="14"
                    OnKeyPress="format('(##)#####-####',this)"
                    placeholder="Número"
                    class="form-control" 
                    required
                />
                <AlertError
                    v-if="Object.keys(errorList).length > 0"
                    :errorList="errorList['0.numero'] ? errorList['0.numero'] : fieldRequired"
                />
            </div>

            <div class="col">
                <button
                    @click="removeTelephone(index)"
                    class="btn btn-outline-danger"
                    :disabled="isEditMode"
                >
                X
                </button>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col input-group">
                <span class="input-group-text" id="basic-addon1">
                    DDD
                </span>
                <select id="ddd" v-model="phone.ddd" class="form-select" aria-label="DDD" required >
                    <option value="">-- Selecione o DDD --</option>
                    <option v-for="ddd in ddds" :value="ddd" :key="ddd">{{ ddd }}</option>
                </select>
                <AlertError
                    v-if="Object.keys(errorList).length > 0"
                    :errorList="errorList['0.ddd'] ? errorList['0.numero'] : fieldRequired"
                />
            </div>

            <div class="col input-group">
                <span class="input-group-text" id="basic-addon1">
                    Tipo
                </span>
                <select id="tipo" v-model="phone.tipo" class="form-select" aria-label="Tipo" required >
                    <option value="">-- Selecione o Tipo --</option>
                    <option value="Fixo">Fixo</option>
                    <option value="Celular">Celular</option>
                </select>
                <AlertError
                    v-if="Object.keys(errorList).length > 0"
                    :errorList="errorList['0.tipo'] ? errorList['0.numero'] : fieldRequired"
                />
            </div>
        </div>

        <div class="col">
            <div class="form-check form-switch">
                <input
                    v-if="isEditMode"
                    type="checkbox"
                    v-model="phone.ativo"
                    :id="'flexSwitchCheckChecked_' + index"
                    :checked="phone.ativo"
                    class="form-check-input"
                />
            </div>
        </div>

    </div>

    <div class="row mb-4 mt-3">
        <div class="col">
            <button
                type="button"
                @click="addTelephone"
                class="btn btn-outline-success btn-block mb-4"
                :disabled="isEditMode"
            >
            +
            </button>
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
import DDD from '@/assets/js/ddds';
import TelephoneService from '@/services/telephone/TelephoneService';
import { REGISTER_REQUIRED_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export default {
    name: 'from-telephone',
    components: { AlertError },
    data() {
      return {
        messageSuccess: '',
        fieldRequired: '',
        errorList: {},
        ddds: [],
        telephones: [],
      };
    },
    props: {
        errorList: {
            type: Object,
            default: {},
        },
        telephones: {
            type: Array,
            required: true,
        },
        isEditMode: {
            type: Boolean,
            required: true,
        },
    },
    created() {
        this.fieldRequired = TelephoneService.messageError('register');
        this.ddds = DDD;
        this.addTelephone();
    },
    computed: {
        buttonText() {
            return this.isEditMode ? 'Editar' : 'Salvar';
        },
    },
    methods: {
        handleButtonClick() {
            if (this.isEditMode) {
                this.editTelephone();
            } else {
                this.saveTelephone();
            }
        },
        async addTelephone() {
            this.$emit('addTelephone');
        },
        async removeTelephone() {
            this.$emit('removeTelephone');
        },
        async saveTelephone() {
            this.$emit('saveTelephone', this.telephones);
        },
        async editTelephone() {
            this.$emit('editTelephone', this.telephones);
        },
    },
};
</script>