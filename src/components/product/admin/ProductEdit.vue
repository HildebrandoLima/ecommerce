<template>
<ModalDetails :modal-id="modalId" :modal-title="modalTitle">

    <ProductForm
        :errorList="errorList"
        :product="data"
        :isEditMode="true"
        @editProduct="editProduct"
    />

</ModalDetails>
</template>

<script>
import ProductForm from '@/components/product/admin/ProductForm.vue';
import ModalDetails from '@/components/shared/ModalDetails.vue';
import ProductService from '@/services/product/ProductService';
import { messages } from '@/utils/messages/Message';

export default {
    name: 'modal-product',
    components: { ProductForm, ModalDetails },
    data() {
        return {
            errorList: {},
            modalId: 'detailsModal',
            modalTitle: 'Editar Produto',
        }
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    methods: {
        async editProduct() {
            const product = await ProductService.editProduct(this.data);
            if (product.status === 200) {
                messages(
                    product.status,
                    product.data,
                    product.message
                );
            } else {
                this.errorList = product;
            }
        },
    },
};
</script>