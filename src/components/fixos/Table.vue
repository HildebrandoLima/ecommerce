<template>
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead>
                <tr v-for="(data, index) in data.list" :key="index">
                    <th scope="col">{{ data.categoriaId }}</th>
                    <th scope="col">{{ data.nome }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in data.list" :key="index">
                    <th scope="row">{{ data.categoriaId }}</th>
                    <td>{{ data.nome }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'data',
    errorList: {},
    props: {
        data: {
            type: Array,
            default: []
        }
    },
};
</script>