<template>
<Banner :msg="bannerTitleMessage" />

<div class="container">
    <div class="card mt-3">
        <div class="card-body">

            <div class="row">
                <div class="col">
                    <Login
                        :errorList="errorList"
                        :user="user"
                        @togglePasswordVisibility="togglePasswordVisibility"
                        @auth="auth"
                    />
                </div>

                <div class="col">
                    <IForgotMyPassword />

                    <div class="text-center">
                        <LoginSocial
                            :errorList="errorList"
                            @auth="auth()"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<ProductNewGrid />
</template>

<script>
import Banner from '@/components/fixos/Banner.vue';
import IForgotMyPassword from '@/components/login/IForgotMyPassword.vue';
import Login from '@/components/login/Login.vue';
import LoginSocial from '@/components/login/LoginSocial.vue';
import ProductNewGrid from '@/components/product/ProductNewGrid.vue';
import AuthService from '@/services/auth/AuthService';
import { messages } from '@/utils/messages/Message';

export default {
    components: { Banner, IForgotMyPassword, Login, LoginSocial, ProductNewGrid },
    name: 'login',
    data() {
        return {
            bannerTitleMessage: 'Login',
            passwordVisible: false,
            passwordVisible: false,
            errorList: {},
            errorMessage: null,
            user: {
                email: 'hildebrandolima16@gmail.com',
                password: 'HiLd3br@ndo',
            },
            provider: {
                facebook: 'facebook',
                google: 'google',
                github: 'github',
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
            if (user.data.isAdmin == true) {
                Swal.fire({
                    icon: 'success',
                    title: user.message,
                }).then((result) => {
                    if(result.isConfirmed) {
                        window.location.reload(1);
                    }
                });
                this.$router.push({name: 'dashboard'});
            } else if (user.data.isAdmin == false) {
                messages(
                    user.status,
                    user.data,
                    user.message
                );
                this.$router.push({name: 'home'});
            } else {
                this.errorList = user;
            }
        },
        async oAuth(providerName) {
            try {
                const providerValue = this.provider[providerName];
                const response = window.location.href = `http://localhost:8000/api/auth/login/social/${providerValue}`;
                window.localStorage.setItem('userAuth', JSON.stringify(response.data));
                //const provider = await AuthService.loginSocial(providerValue);
                //this.messageSuccess = provider;
            } catch (error) {
                if (error.response && error.response.data.status === 400) {
                    this.errorList = error.response.data.data;
                }
            }
        },
    },
};
</script>