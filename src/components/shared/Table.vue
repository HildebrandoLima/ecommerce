<template>
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th v-for="(column, index) in columns" :key="index">{{ formatColumn(column) }}</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="index">
                    <td v-for="(column, columnIndex) in columns" :key="columnIndex">
                        {{ item[column] }}
                    </td>
                    <td>
                        <button @click="editItem(item)" class="btn btn-outline-primary border px-2 pt-2 icon-hover">Editar</button>   
                    </td>
                    <td>
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
        }
    },
    methods: {
    formatColumn(column) {
      return column.charAt(0).toUpperCase() + column.slice(1);
    },
    editItem(item) {
      this.$emit('edit', item);
    },
  },
};
</script>