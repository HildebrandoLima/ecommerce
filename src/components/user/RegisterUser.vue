<template>

  <AlertSuccess :messageSuccess="this.messageSuccess" />

  <form class="needs-validation mb-5 border-top" novalidate onsubmit="return false">
    <div class="row mb-4">
      <div class="col">
        <div class="form-outline">
          <input type="text" id="nome" v-model="user.nome" class="form-control" placeholder="Nome" required />
        </div>
        <AlertError
        v-if="Object.keys(this.errorList).length > 0"
        :errorList="this.errorList.nome" />
      </div>

      <div class="col">
        <div class="form-outline">
          <input type="email" id="email" v-model="user.email" class="form-control" placeholder="E-mail" required />
        </div>
        <AlertError
        v-if="Object.keys(this.errorList).length > 0"
        :errorList="this.errorList.email" />       
      </div>
    </div>

    <div class="row mb-4">
      <div class="col">
        <div class="form-outline">
          <input type="text" id="cpf" v-model="user.cpf" maxlength="14" OnKeyPress="format('###.###.###-##',this)" class="form-control" placeholder="CPF" required />
        </div>
        <AlertError
        v-if="Object.keys(this.errorList).length > 0"
        :errorList="this.errorList.cpf" />
      </div>

      <div class="col">
        <div class="form-outline">
          <div class="input-group">
            <input type="password" id="validationPassword" v-model="user.senha" minlength="8" class="form-control" placeholder="Senha" required />

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
          Sua senha deve ter no mínimo 8-20 caracteres, deve conter caracteres especiais "!@#$%&*_?", números, letras minúsculas e maiúsculas, e não pode possuir ordem como, ex.: (111, aaa).
        </div>
        <AlertError
        v-if="Object.keys(this.errorList).length > 0"
        :errorList="this.errorList.senha" />
      </div>
    </div>

    <div class="row mb-4">
      <div class="col">
        <div class="form-outline">
          <input type="text" id="date" v-model="user.dataNascimento" class="form-control" placeholder="Data de Nascimento" onfocus="(this.type='date')" required />
        </div>
        <AlertError
        v-if="Object.keys(this.errorList).length > 0"
        :errorList="this.errorList.dataNascimento" />
      </div>

      <div class="col">
        <div class="form-outline">                    
          <div class="form-check form-check-inline">
            <input type="radio" id="masculino" value="Masculino" v-model="user.genero" class="form-check-input" />
            <label class="form-check-label" for="Masculino">Masculino</label>
          </div>

          <div class="form-check form-check-inline">
            <input type="radio" id="feminino" value="Feminino" v-model="user.genero" class="form-check-input" />
            <label class="form-check-label" for="Feminino">Feminino</label>
          </div>

          <div class="form-check form-check-inline">
            <input type="radio" id="outro" value="Outro" v-model="user.genero" class="form-check-input" />
            <label class="form-check-label" for="Outro">Outro</label>
          </div>
        </div>
        <AlertError
        v-if="Object.keys(this.errorList).length > 0"
        :errorList="this.errorList.genero" />
      </div>
    </div>

    <button type="button" @click="saveUser" class="btn btn-primary btn-block mb-4">Enviar</button>
  </form>
</template>

<script>
  import AlertError from '@/components/shared/AlertError.vue';
  import AlertSuccess from '@/components/shared/AlertSuccess.vue';
  import UserService from '@/services/user/UserService';

  export default {
    name: 'user',
    components: { AlertError, AlertSuccess },
    data() {
      return {
        passwordVisible: false,
        messageSuccess: '',
        errorList: {},
        user: {
          nome: '',
          email: '',
          cpf: '',
          senha: '',
          dataNascimento: '',
          genero: '',
          eAdmin: false,
        },
      };
    },
    methods: {
      togglePasswordVisibility() {
        const passwordInput = document.getElementById("validationPassword");
        this.passwordVisible = !this.passwordVisible;
        passwordInput.type = this.passwordVisible ? "text" : "password";
      },
      async saveUser() {
        try {
          const user = await UserService.postUser(this.user);
          this.messageSuccess = user;
        } catch (error) {
          if (error.response && error.response.data.status === 400) {
            this.errorList = error.response.data.data;
          }
        }
      },
    },
};
</script>