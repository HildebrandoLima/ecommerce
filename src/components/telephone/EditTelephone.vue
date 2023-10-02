<template>
    <div class="modal fade" id="editPhoneModal" tabindex="-1" aria-labelledby="editPhoneModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editPhoneModal">Editar Telefone</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    {{ data }}
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-outline-success">Savar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'modal-user',
    errorList: {},
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    methods: {
        //
    },
};
</script>