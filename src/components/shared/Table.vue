<template>
<div class="table-responsive">
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th v-for="(column, index) in columns" :key="index">{{ formatColumn(column) }}</th>
                <th v-if="displayEdit">Ação</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in data" :key="index">
                <td v-for="(column, columnIndex) in columns" :key="columnIndex">
                    {{ item[column] }}
                </td>

                <td v-if="displayEdit">
                    <button
                        @click="editItem(item)"
                        class="btn btn-outline-primary border px-2 pt-2 icon-hover"
                    >
                    Editar
                    </button>   
                </td>

                <td v-if="displayEdit">
                    <div class="form-check form-switch">
                        <input
                            type="checkbox"
                            v-model="item.ativo"
                            :id="'flexSwitchCheckChecked_' + index"
                            :checked="item.ativo"
                            class="form-check-input"
                            disabled
                        />
                    </div>
                </td>

                <td v-if="displayModal">
                    <button
                        @click="addressModal(item.endereco)"
                        class="btn btn-outline-primary border px-2 pt-2 icon-hover"
                        data-toggle="modal"
                        data-target="#editUserModal"
                    >
                    <i class="fas fa-address-book fa-lg text-dark px-1"></i>
                    Endereço
                    </button>
                </td>

                <td v-if="displayModal">
                    <button
                        @click="itemModal(item.itens)"
                        class="btn btn-outline-primary border px-2 pt-2 icon-hover"
                        data-toggle="modal"
                        data-target="#editUserModal"
                    >
                    <i class="fas fa-sitemap fa-lg text-dark px-1"></i>
                    Item
                    </button>
                </td>

                <td v-if="displayModal">
                    <button
                        @click="paymentModal(item.pagamento)"
                        class="btn btn-outline-primary border px-2 pt-2 icon-hover"
                        data-toggle="modal"
                        data-target="#editUserModal"
                    >
                    <i class="fas fa-credit-card fa-lg text-dark px-1"></i>
                    Payment
                    </button>
                </td>

            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
export default {
    name: 'data-table',
    errorList: {},
    props: {
        data: {
            type: Array,
            required: true,
        },
        columns: {
            type: Array,
            required: true,
        },
        displayEdit: {
            type: Boolean,
            required: true,
        },
        displayModal: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        formatColumn(column) {
            return column.charAt(0).toUpperCase() + column.slice(1);
        },
        editItem(item) {
            this.$emit('edit', item);
        },
        addressModal(item) {
            this.$emit('addressModal', item);
        },
        itemModal(item) {
            this.$emit('itemModal', item);
        },
        paymentModal(item) {
            this.$emit('paymentModal', item);
        },
    },
};
</script>