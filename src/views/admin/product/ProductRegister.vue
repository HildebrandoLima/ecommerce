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
            const product = await ProductService.createProduct(this.product);
            if (product.status === 200) {
                ProductService.messageSuccess(product);
            } else {
                this.errorList = product;
            }
        },
    },
};
</script>