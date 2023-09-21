<template>
     <div v-if="message" class="error-message">
                    {{ message }}
                </div>
    <h1>Cliente</h1>
    <p>Olá, {{ userName }}!</p>
</template>

<script>
    import { userAuh, permissions } from '@/storages/AuthStorage.js';

    export default {
        name: 'client',
        data() {
            return {
                message: null,
                userId: 0,
                userName: '',
                userEmail: '',
            };
        },
        mounted() {
            this.message = this.$route.params.message || null;
        },
        created() {
            const [userId, userName, userEmail] = userAuh();
            this.userId = userId;
            this.userName = userName;
            this.userEmail = userEmail;
        },
    };
</script>