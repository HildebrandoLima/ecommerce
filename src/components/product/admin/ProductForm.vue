<template>
<form>
    <div class="row mb-4">
        <div class="col">
            <div class="form-outline">
                <input
                    type="text"
                    id="produto"
                    maxlength="100"
                    v-model="product.nome"
                    placeholder="Produto"
                    class="form-control"
                    required
                />
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.nome"
            />
        </div>

        <div class="col">
            <div class="form-outline">
                <input
                    type="text"
                    id="dataFundacao"
                    maxlength="13"
                    v-model="product.codigoBarra"
                    @input="formatNumber"
                    placeholder="Código de Barra"
                    class="form-control"
                    required
                />
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.codigoBarra"
            />
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <div class="form-outline">
                <input
                    type="text"
                    id="precoVenda"
                    v-model="product.precoVenda"
                    @input="formatPriceSale"
                    placeholder="Preço de Venda"
                    class="form-control"
                    required
                />
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.precoVenda"
            />
        </div>

        <div class="col">
            <div class="form-outline">
                <input
                    type="text"
                    id="precoCusto"
                    v-model="product.precoCusto"
                    @input="formatPriceCost"
                    placeholder="Preço de Custo"
                    class="form-control"
                    required
                />
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.precoCusto"
            />
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <div class="form-outline">
                <input
                    type="text"
                    id="quantidade"
                    v-model="product.quantidade"
                    @input="formatNumber"
                    placeholder="Quantidade"
                    class="form-control"
                    required
                />
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.quantidade"
            />
        </div>

        <div class="col">
            <div class="form-outline">
                <select id="unidadeMedida" v-model="product.unidadeMedida" class="form-select" required >
                    <option value="">-- Selecione a Unidade Medida --</option>
                    <option value="UN">UN</option>
                    <option value="G">G</option>
                    <option value="KG">KG</option>
                    <option value="ML">ML</option>
                    <option value="L">L</option>
                    <option value="M2">M2</option>
                    <option value="CX">CX</option>
                </select>
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.unidadeMedida"
            />
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <div class="form-outline">
                <div class="form-outline">
                    <select id="categoriaId" v-model="product.categoriaId" class="form-select" required >
                        <option value="">-- Selecione a Categoria --</option>
                        <option v-for="category in categories" :value="category.categoriaId" :key="category">{{ category.nome }}</option>
                    </select>
                </div>
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.categoriaId"
            />
        </div>

        <div class="col">
            <div class="form-outline">
                <div class="form-outline">
                    <select id="fornecedorId" v-model="product.fornecedorId" class="form-select" required >
                        <option value="">-- Selecione o Fornecedor --</option>
                        <option v-for="provider in providers" :value="provider.fornecedorId" :key="provider">{{ provider.razaoSocial }}</option>
                    </select>
                </div>
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.fornecedorId"
            />
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <div class="form-outline">
                <input
                    type="text"
                    id="dataValidade"
                    v-model="product.dataValidade"
                    onfocus="(this.type='date')"
                    placeholder="Data de Validade"
                    class="form-control"
                    required
                />
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.dataValidade"
            />
        </div>

        <div class="col">
            <div class="form-outline">
                <input
                    type="file"
                    id="imagens"
                    @change="handleFileChange"
                    class="form-control"
                    accept="image/png"
                    required
                    multiple
                />
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.imagens"
            />
        </div>
    </div>

    <div class="row mb-4">
        <div class="form-outline">
            <textarea
                type="text"
                id="descricao"
                maxlength="255"
                v-model="product.descricao"
                @input="countDescriptionCharacters"
                placeholder="Descrição"
                class="form-control"
                :rows="5"
                :cols="33"
                required
            />
        </div>
        <div class="form-text text-muted">
            É permitido no maximo 255 carateres. Contador.: <a class="text-danger">{{ characterCount }}</a>
        </div>
        <AlertError
            v-if="Object.keys(errorList).length > 0"
            :errorList="errorList.descricao"
        />
    </div>

    <div class="row mb-4">
        <div class="col">
            <div class="form-check form-switch">
            <input
                v-if="isEditMode"
                type="checkbox"
                v-model="product.ativo"
                :id="'flexSwitchCheckChecked_' + index"
                :checked="product.ativo"
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
import CategoryService from '@/services/category/CategoryService';
import ProviderService from '@/services/provider/ProviderService';
import { CATEGORY_NOT_FOUND_MESSAGE } from '@//utils/defaultMessages/DefaultMessage';

export default {
    name: 'from-product',
    components: { AlertError },
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
    data() {
        return {
            errorList: {},
            characterCount: 0,
            currentPage: 1,
            perPage: 10,
            categories: [],
            providers: [],
        };
    },
    created() {
      this.getCategories();
      this.getProviders();
    },
    props: {
        errorList: {
            type: Object,
            default: {},
        },
        product: {
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
                this.editProduct();
            } else {
                this.saveProduct();
            }
        },
        handleFileChange(event) {
            console.log(event.target.files);
            const files = [event.target.files];
            console.log(files);
            for (let position = 0; position <= files.length; position++) {
                const file = files[position];
                console.log(file);
                this.product.imagens.push(file);
            }
        },
        formatNumber() {
            this.product.codigoBarra = this.product.codigoBarra.replace(/\D/g, '');
            this.product.quantidade = this.product.quantidade.replace(/\D/g, '');
        },
        formatPrice(event) {
            let value = event.target.value;
            value = value.replace(/[^0-9.,]/g, '');
            value = value.replace(/,/g, '');

            let numericValue = parseInt(value);
            value = numericValue + '';
            value = value.replace(/([0-9]{2})$/g, ",$1");

            if (value.length > 6) {
                value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
            return value;
        },
        formatPriceSale(event) {
            this.product.precoVenda = this.formatPrice(event);
        },
        formatPriceCost(event) {
            this.product.precoCusto = this.formatPrice(event);
        },
        countDescriptionCharacters() {
            const description = this.product.descricao;
            const characterCount = description.length;
            this.characterCount = characterCount;
        },
        async getCategories() {
            const categories = await CategoryService.getCategories(this.currentPage, this.perPage, 1);
            if (categories.status === 200) {
                this.categories = categories.data.list;
            } else {
                this.errorList = CATEGORY_NOT_FOUND_MESSAGE;
            }
        },
        async getProviders() {
            const providers = await ProviderService.getProviders(this.currentPage, this.perPage, '', 0, 1);
            if (providers.status === 200) {
                this.providers = providers.data.list;
            } else {
                this.errorList = CATEGORY_NOT_FOUND_MESSAGE;
            }
        },
        async saveProduct() {
            console.log(this.product);
            console.log(this.product.imagens);
            this.$emit('saveProduct', this.product);
        },
        async editProduct() {
            this.$emit('editProduct', this.product);
        },
    },
};
</script>