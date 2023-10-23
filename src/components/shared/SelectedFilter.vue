<template>
<div>
    <select v-model="selectedFilter" @change="filterChanged">
        <option :value="1">Ativos</option>
        <option :value="0">Inativos</option>
    </select>
    &nbsp;&nbsp;
    <i class="fa fa-filter" aria-hidden="true"></i>
</div>
</template>

<script>
export default {
    data() {
        return {
            selectedFilter: 1,
        };
    },
    methods: {
        filterChanged() {
            this.$emit('filterChanged', this.selectedFilter);
        },
    },
};
</script>