<template>

  <AlertSuccess :messageSuccess="this.messageSuccess" />

  <form>
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
          <input type="password" id="password" v-model="user.senha" class="form-control" placeholder="Senha" required />
        </div>
        <div class="form-text text-danger">
          A senha deve conter no mínino: 08 dígitos, 01 letra maiúscula, 01 letra minúscula, 01 caractere especial, e não pode possuir ordem como, ex (111, aaa).
        </div>
        <AlertError
        v-if="Object.keys(this.errorList).length > 0"
        :errorList="this.errorList.senha" />
      </div>
    </div>

    <div class="row mb-4">
      <div class="col">
        <div class="form-outline">
          <label class="form-label" for="form6Example2">Data de Nascimento</label>
          <input type="date" id="date" v-model="user.dataNascimento" class="form-control" required />
        </div>
        <AlertError
        v-if="Object.keys(this.errorList).length > 0"
        :errorList="this.errorList.dataNascimento" />
      </div>

      <div class="col">
        <div class="form-outline">                    
          <div class="form-check">
            <input type="radio" id="masculino" value="Masculino" v-model="user.genero" class="form-check-input" />
            <label class="form-check-label" for="Masculino">Masculino</label>
          </div>

          <div class="form-check">
            <input type="radio" id="feminino" value="Feminino" v-model="user.genero" class="form-check-input" />
            <label class="form-check-label" for="Feminino">Feminino</label>
          </div>

          <div class="form-check">
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
  import AlertError from '@/components/AlertError.vue';
  import AlertSuccess from '@/components/AlertSuccess.vue';
  import UserService from '@/services/user/UserService';

  export default {
    name: 'user',
    components: { AlertError, AlertSuccess },
    data() {
      return {
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