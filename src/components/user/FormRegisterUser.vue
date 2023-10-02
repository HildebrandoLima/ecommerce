<template>
<form class="needs-validation mb-5 border-top" novalidate onsubmit="return false">
    <div class="row mb-4">
        <div class="col">
            <div class="form-outline">
                <input
                    type="text"
                    id="nome"
                    v-model="user.nome"
                    placeholder="Nome"
                    class="form-control"
                    required
                />
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.nome"
            />
        </div>

        <div class="col">
            <div class="form-outline">
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
        </div>
    </div>
    
    <div v-if="!isEditMode">
        <div class="row mb-4">
            <div class="col">
                <div class="form-outline">
                    <input
                        type="text"
                        id="cpf"
                        v-model="user.cpf"
                        maxlength="14"
                        OnKeyPress="format('###.###.###-##',this)"
                        placeholder="CPF"
                        class="form-control"
                        required
                    />
                </div>
                <AlertError
                    v-if="Object.keys(errorList).length > 0"
                    :errorList="errorList.cpf"
                />
            </div>

            <div class="col">
                <div class="form-outline">
                    <div class="input-group">
                        <input
                            type="password"
                            id="validationPassword"
                            v-model="user.senha"
                            minlength="8"
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

                    <div  class="progress" style="height: 5px;">
                        <div id="progressbar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 10%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>

                    <div id="feedbackirn" class="invalid-feedback">
                    </div>
                </div>

                <div class="form-text text-muted">
                    Sua senha deve ter no mínimo 8-20 caracteres, deve conter
                    caracteres especiais "!@#$%&*_?", números,
                    letras minúsculas e maiúsculas,
                    e não pode possuir ordem como, ex.: (111, aaa).
                </div>
                <AlertError
                    v-if="Object.keys(errorList).length > 0"
                    :errorList="errorList.senha"
                />
            </div>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <div v-if="!isEditMode">
                <div class="form-outline">
                    <input
                        type="text"
                        id="date"
                        v-model="user.dataNascimento" 
                        placeholder="Data de Nascimento"
                        class="form-control"
                        onfocus="(this.type='date')"
                        required
                    />
                </div>
                <AlertError
                    v-if="Object.keys(errorList).length > 0"
                    :errorList="errorList.dataNascimento"
                />
            </div>

            <div v-else>
                <div class="form-check form-switch">
                    <input
                        type="checkbox"
                        v-model="user.ativo"
                        :id="'flexSwitchCheckChecked_' + index"
                        :checked="user.ativo"
                        class="form-check-input"
                    />
                </div>
            </div>
        </div>

        <div class="col">
            <div class="form-outline">                    
                <div class="form-check form-check-inline">
                    <input
                        type="radio"
                        id="masculino"
                        value="Masculino"
                        v-model="user.genero"
                        class="form-check-input"
                    />
                    <label class="form-check-label" for="Masculino">Masculino</label>
                </div>

                <div class="form-check form-check-inline">
                    <input
                        type="radio"
                        id="feminino"
                        value="Feminino"
                        v-model="user.genero"
                        class="form-check-input"
                    />
                    <label class="form-check-label" for="Feminino">Feminino</label>
                </div>

                <div class="form-check form-check-inline">
                    <input
                        type="radio"
                        id="outro"
                        value="Outro"
                        v-model="user.genero"
                        class="form-check-input"
                    />
                    <label class="form-check-label" for="Outro">Outro</label>
                </div>
            </div>
            <AlertError
                v-if="Object.keys(errorList).length > 0"
                :errorList="errorList.genero"
            />
        </div>
    </div>

    <button
        type="button"
        @click="handleButtonClick"
        class="btn btn-outline-primary btn-block mb-4">
        {{ buttonText }}
    </button>
</form>
</template>

<script>
import AlertError from '@/components/shared/AlertError.vue';

export default {
    name: 'form-register-user',
    passwordVisible: false,
    components: { AlertError },
    props: {
        errorList: {
            type: Object,
            default: {}
        },
        user: {
            type: Object,
            required: true,
        },
        isEditMode: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        buttonText() {
            return this.isEditMode ? 'Editar' : 'Salvar';
        },
    },
    methods: {
        handleButtonClick() {
            if (this.isEditMode) {
                this.editUser();
            } else {
                this.saveUser();
            }
        },
        togglePasswordVisibility() {
            const passwordInput = document.getElementById("validationPassword");
            this.passwordVisible = !this.passwordVisible;
            passwordInput.type = this.passwordVisible ? "text" : "password";
        },
        saveUser() {
            this.$emit('saveUser', this.user);
        },
        editUser() {
            this.$emit('editUser', this.user);
        }
    }
};
</script>