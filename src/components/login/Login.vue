<template>
<form @submit.prevent="auth">
    <div class="form-outline mb-4">
        <input
            type="email"
            id="email"
            v-model="user.email"
            placeholder="E-mail"
            class="form-control" 
            required
        />
    </div>
    <AlertError
        v-if="Object.keys(errorList).length > 0"
        :errorList="errorList.email"
    />

    <div class="form-outline mb-4">
        <div class="input-group">
            <input
                type="password"
                id="password"
                v-model="user.password"
                placeholder="Senha"
                class="form-control"
                required
            />

            <div class="input-group-text">
                <span class="toggle-password" @click="togglePasswordVisibility">
                <i v-if="passwordVisible" class="fas fa-eye-slash"></i>
                <i v-else class="fas fa-eye"></i>
                </span>
            </div>
        </div>
    </div>
    <AlertError
        v-if="Object.keys(errorList).length > 0"
        :errorList="errorList.password"
    />

    <button type="submit" class="btn btn-outline-primary btn-block mb-4">
        <i class="fas fa-angle-double-right"></i> Entrar
    </button>
</form>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';

export default {
    components: { AlertError },
    name: 'login',
    props: {
        errorList: {
            type: Object,
            required: true,
            default: null,
        },
        user: {
            type: Object,
            required: true,
            default: {},
        },
    },
    methods: {
        togglePasswordVisibility() {
            this.$emit('togglePasswordVisibility');
        },
        auth() {
            this.$emit('auth', this.user);
        }
    },
};
</script>