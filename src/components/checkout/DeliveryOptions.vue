<template>
<div class="row mb-3">
    <h6 class="mb-3">Informe o Envio:</h6><hr />

    <AlertError
        v-if="Object.keys(errorList).length > 0"
        :errorList="errorList.tipoEntrega"
    />

    <div class="col-lg-4 mb-3">
        <div class="form-check h-100 border rounded-3">
            <div class="p-3">
                <input
                    type="radio"
                    id="expresso"
                    value="Expresso"
                    v-model="order.tipoEntrega"
                    class="form-check-input"
                />
                <label class="form-check-label" for="Expresso">
                    Entrega Expressa<br>
                    <small class="text-muted">3-4 dias via Fedex</small><br />
                    <small class="text-muted">
                        R$20,00
                    </small>
                </label>
            </div>
        </div>
    </div>

    <div class="col-lg-4 mb-3">
        <div class="form-check h-100 border rounded-3">
            <div class="p-3">
                <input
                    type="radio"
                    id="correio"
                    value="Correio"
                    v-model="order.tipoEntrega"
                    class="form-check-input"
                />
                <label class="form-check-label" for="Correio">
                    Correios<br>
                    <small class="text-muted">20-30 dias via Correio</small><br />
                    <small class="text-muted">
                        R$15,50
                    </small>
                </label>
            </div>
        </div>
    </div>

    <div class="col-lg-4 mb-3">
        <div class="form-check h-100 border rounded-3">
            <div class="p-3">
                <input
                    type="radio"
                    id="retirada"
                    value="Retirada"
                    v-model="order.tipoEntrega"
                    class="form-check-input"
                />
                <label class="form-check-label" for="Retirada">
                    Auto-Retirada<br>
                    <small class="text-muted">Retire em nossa Loja</small><br />
                    <small class="text-muted">
                        R$00,00
                    </small>
                </label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';

export default {
    name: 'checkout-delivery',
    components: { AlertError },
    props: {
        errorList: {
            type: Object,
            required: true,
            default: {}
        },
        order: {
            type: Object,
            required: true,
            default: {}
        },
    },
};
</script>