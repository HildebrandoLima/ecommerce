<template>
<div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="modalId" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" :id="modalId">{{ modalTitle }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <slot></slot>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        modalId: {
            type: String,
            required: true,
            default: '',
        },
        modalTitle: {
            type: String,
            required: true,
            default: '',
        },
    },
};
</script>