<template>
<CategoryForm
    :errorList="errorList"
    :category="category"
    :isEditMode="false"
    @saveCategory="saveCategory"
/>
</template>

<script>
import AlertSuccess from '@/components/shared/AlertSuccess.vue';
import CategoryForm from '@/components/category/admin/CategoryForm.vue';
import CategoryService from '@/services/category/CategoryService';
import { messages } from '@/utils/messages/Message';

export default {
    name: 'register-category',
    components: { AlertSuccess, CategoryForm },
    data() {
        return {
            errorList: {},
            category: {
                nome: '',
            },
        };
    },
    methods: {
        async saveCategory() {
            const category = await CategoryService.postCategory(this.category);
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