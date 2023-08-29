<template>
  <div class="bg-primary mb-4">
    <div class="container py-4">
      <h3 class="text-white mt-2">Cadastrar Conta</h3>

      <nav class="d-flex mb-2">
        <h6 class="mb-0">
          <RouterLink to="/" class="text-white-50">Home</RouterLink>
            <span class="text-white-50 mx-2">&gt;</span>
          <RouterLink to="/about" class="text-white-50">Sobre</RouterLink>
            <span class="text-white-50 mx-2">&gt;</span>
          <RouterLink to="/account" class="text-white"><u>Cadastrar Conta</u></RouterLink>
        </h6>
      </nav>
    </div>
  </div>

  <div class="container">
    <div class="card mt-3">
      <div class="card-body">

        <div v-if="Object.keys(this.messageSuccess).length > 0" class="alert alert-success mt-2" role="alert">
          {{ this.messageSuccess }}
        </div>

        <form>
          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <input type="text" id="nome" v-model="user.nome" class="form-control" placeholder="Nome" required />
              </div>
              <div v-if="Object.keys(this.errorList).length > 0" class="alert alert-danger mt-2" role="alert">
                  {{ this.errorList.nome }}
              </div>
            </div>

            <div class="col">
              <div class="form-outline">
                <input type="email" id="email" v-model="user.email" class="form-control" placeholder="E-mail" required />
              </div>
              <div v-if="Object.keys(this.errorList).length > 0" class="alert alert-danger mt-2" role="alert">
                  {{ this.errorList.email }}
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <input type="text" id="cpf" v-model="user.cpf" class="form-control" placeholder="CPF" required />
              </div>
              <div v-if="Object.keys(this.errorList).length > 0" class="alert alert-danger mt-2" role="alert">
                  {{ this.errorList.cpf }}
              </div>
            </div>

            <div class="col">
              <div class="form-outline">
                <input type="password" id="password" v-model="user.senha" class="form-control" placeholder="Senha" required />
              </div>
              <div v-if="Object.keys(this.errorList).length > 0" class="alert alert-danger mt-2" role="alert">
                  {{ this.errorList.senha }}
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <label class="form-label" for="form6Example2">Data de Nascimento</label>
                <input type="date" id="date" v-model="user.dataNascimento" class="form-control" required />
              </div>
              <div v-if="Object.keys(this.errorList).length > 0" class="alert alert-danger mt-2" role="alert">
                  {{ this.errorList.dataNascimento }}
              </div>
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
              <div v-if="Object.keys(this.errorList).length > 0" class="alert alert-danger mt-2" role="alert">
                  {{ this.errorList.genero }}
              </div>
            </div>
          </div>

          <button type="button" @click="saveUser" class="btn btn-primary btn-block mb-4">Enviar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api';

  export default {
    name: 'createUser',
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
          genero: 'Outro',
          eAdmin: false
        },
      };
    },
    methods: {
      async saveUser() {
        await api.post('/user/save', this.user)
          .then((response) => {
            this.user = {
              nome: '',
              email: '',
              cpf: '',
              senha: '',
              dataNascimento: '',
              genero: 'Outro',
              eAdmin: false
            }

            if (response.data.status === 200) {
              this.messageSuccess = response.data.message
            }
          })
          .catch((error) => {
            if (error.response.data.status === 400) {
              this.errorList = error.response.data.data
            }
          });
      },
    },
};
</script>