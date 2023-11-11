<template>
<Banner :msg="bannerTitleMessage" />

<div class="container-fluid">
    <div class="card mt-3">
        <div class="card-body">

            <ProductForm
                :errorList="errorList"
                :product="product"
                :isEditMode="false"
                @saveProduct="saveProduct"
            />

        </div>
    </div>
</div>
</template>

<script>
import Banner from '@/components/fixos/Banner.vue';
import ProductForm from '@/components/product/admin/ProductForm.vue';
import ProductService from '@/services/product/ProductService';
import { messages } from '@/utils/messages/Message';

export default {
    name: 'register-product',
    components: { Banner, ProductForm },
    data() {
        return {
            bannerTitleMessage: 'Cadastrar Produtos',
            errorList: {},
            product: {
                nome: '',
                precoCusto: '',
                precoVenda: '',
                codigoBarra: '',
                descricao: '',
                quantidade: '',
                unidadeMedida: '',
                dataValidade: '',
                categoriaId: '',
                fornecedorId: '',
                imagens: [],
            },
        };
    },
    methods: {
        async saveProduct() {
            const product = await ProductService.postProduct(this.product);
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