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
    :errorList="errorList.email" />

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
    :errorList="errorList.password" />

    <button type="submit" class="btn btn-outline-primary btn-block mb-4">
        <i class="fas fa-angle-double-right"></i> Entrar
    </button>
</form>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';
import AuthService from '@/services/auth/AuthService';

export default {
    components: { AlertError },
    name: 'login',
    data() {
        return {
            passwordVisible: false,
            errorList: {},
            user: {
                email: 'hildebrandolima16@gmail.com',
                password: 'HiLd3br@ndo',
            },
        };
    },
    methods: {
        togglePasswordVisibility() {
            const passwordInput = document.getElementById("password");
            this.passwordVisible = !this.passwordVisible;
            passwordInput.type = this.passwordVisible ? "text" : "password";
        },
        async auth() {
            const user = await AuthService.login(this.user);
            if (user.isAdmin == true) {
                this.$router.push({name: 'dashboard'});
            } else if (user.isAdmin == false) {                    
                this.$router.push({name: 'home'});
            } else {
                this.errorList = user;
            }
        },
    },
};
</script>