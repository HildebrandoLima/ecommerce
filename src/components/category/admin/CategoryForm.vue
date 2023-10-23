<template>
<form>
    <div class="mb-4">
        <div class="form-outline">
        <input
            type="text"
            id="nome"
            v-model="category.nome"
            placeholder="Nome"
            class="form-control" 
            required
        />
        </div>
        <AlertError
        v-if="Object.keys(errorList).length > 0"
        :errorList="errorList.nome"
        />
    </div>

    <div class="row mb-4">
        <div class="col">
            <div class="form-check form-switch">
            <input
                v-if="isEditMode"
                type="checkbox"
                v-model="category.ativo"
                :id="'flexSwitchCheckChecked_' + index"
                :checked="category.ativo"
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
    name: 'from-category',
    components: { AlertError },
    category: {
        nome: '',
    },
    props: {
        errorList: {
            type: Object,
            default: {},
        },
        category: {
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
                this.editCategory();
            } else {
                this.saveCategory();
            }
        },
        async saveCategory() {
            this.$emit('saveCategory', this.category);
        },
        async editCategory() {
            this.$emit('editCategory', this.category);
        },
    },
};
</script>