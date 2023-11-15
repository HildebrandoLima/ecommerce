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
            const category = await CategoryService.createCategory(this.category);
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