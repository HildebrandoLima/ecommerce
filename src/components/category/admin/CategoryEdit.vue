<template>
<ModalDetails :modalId="modalId" :modalTitle="modalTitle">

    <CategoryForm
        :errorList="errorList"
        :category="data"
        :isEditMode="true"
        @editCategory="editCategory"
    />

</ModalDetails>
</template>

<script>
import CategoryForm from '@/components/category/admin/CategoryForm.vue';
import ModalDetails from '@/components/shared/ModalDetails.vue';
import CategoryService from '@/services/category/CategoryService';

export default {
    name: 'modal-category',
    components: { CategoryForm, ModalDetails },
    data() {
        return {
            errorList: {},
            modalId: 'detailsModal',
            modalTitle: 'Editar Categoria',
        }
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    methods: {
        async editCategory() {
            const category = await CategoryService.editCategory(this.data);
            if (category.status === 200) {
                CategoryService.messageSuccess(category);
            } else {
                this.errorList = category;
                return;
            }
        },
    },
};
</script>