<template>
<div class="card border shadow-0" style="border-radius: 16px;">
    <div class="m-4">
        <div class="card-body">

            <Table
                v-if="toggleAddressComponentVisibility"
                :data="user.enderecos"
                :columns="addressColumns"
                :displayEdit="true"
                @edit="editItem"
            />

            <Table
                v-if="togglePhoneComponentVisibility"
                :data="user.telefones"
                :columns="telephoneColumns"
                :displayEdit="true"
                @edit="editItem"
            />

        </div>
    </div>
</div>
</template>

<script>
import Table from '@/components/shared/Table.vue';

export default {
    components: { Table },
    props: {
        user: {
            type: Object,
            required: true,
            default: {},
        },
        addressColumns: {
            type: Array,
            required: true,
            default: [],
        },
        telephoneColumns: {
            type: Array,
            required: true,
            default: [],
        },
        toggleAddressComponentVisibility: {
            type: Boolean,
            required: true,
            default: [],
        },
        togglePhoneComponentVisibility: {
            type: Boolean,
            required: true,
            default: [],
        },
    },
    methods: {
        editItem(item) {
            this.$emit('edit', item);
        },
    },
};
</script>