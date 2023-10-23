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
import CategoryForm from '@/components/category/CategoryForm.vue';
import ModalDetails from '@/components/shared/ModalDetails.vue';
import CategoryService from '@/services/category/CategoryService';
import { messages } from '@/utils/messages/Message';

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
            const category = await CategoryService.putCategory(this.data);
            if (category.status === 200) {
                messages(
                    category.status,
                    category.data,
                    category.message
                );
            } else {
                this.errorList = category;
            }
        },
    },
};
</script>