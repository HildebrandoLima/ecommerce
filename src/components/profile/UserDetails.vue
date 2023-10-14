<template>
<div class="card border shadow-0" style="border-radius: 16px;">
  <div class="m-4">
    <div class="card-body">
      <h5 class="card-title d-flex flex-column align-items-center text-center">
        <img v-if="user.genero === 'Feminino'" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" class="rounded-circle" width="150">
        <img v-if="user.genero === 'Masculino'" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" class="rounded-circle" width="150">
        <img v-if="user.genero === 'Outro'" src="" alt="" class="rounded-circle" width="150">
        <p class="card-text text-center mt-2"><i class="fas fa-user fa-lg text-dark px-1"></i>{{ user.nome }}, {{ user.dataNascimento }} anos</p>
      </h5>

      <div class="card-body d-flex flex-column">
        <div class="card-title text-muted">
          <p class="card-text"><b>CPF:</b> {{ user.cpf }}</p>
          <p class="card-text"><b>E-mail:</b> {{ user.email }}</p>

          <div class="row">
            <div class="col">
              <p class="card-text">
              <b>Verificado:</b>
              <span v-if="user.emailVerificado">
                <i class="fas fa-check-circle fa-lg text-success px-1"></i>
              </span>
              <span v-else>
                <i class="fas fa-check-circle fa-lg text-danger px-1"></i>
              </span>
              </p>
            </div>

            <div class="col">
              <p class="card-text">
              <b>Ativo:</b>
              <span v-if="user.ativo">
                <i class="fas fa-check-circle fa-lg text-success px-1"></i>
              </span>
              <span v-else>
                <i class="fas fa-check-circle fa-lg text-danger px-1"></i>
              </span>
              </p>
            </div>
          </div>
        </div>

        <hr />

        <div class="d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
          <button @click="editItem(user)" class="btn btn-outline-primary border px-2 pt-2 icon-hover" data-toggle="modal" data-target="#editUserModal">
            <i class="fas fa-user fa-lg text-dark px-1"></i>
            Editar
          </button>
          &nbsp;&nbsp;&nbsp;
          <button @click="showAddress" class="btn btn-outline-secondary border px-2 pt-2 icon-hover">
            <i class="fas fa-address-book fa-lg text-dark px-1"></i>
            Endereço
          </button>
          &nbsp;&nbsp;&nbsp;
          <button @click="showPhone" class="btn btn-outline-warning border px-2 pt-2 icon-hover">
            <i class="fas fa-phone fa-lg text-dark px-1"></i>
            Telefone
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'profile-details',
  props: {
    user: {
      type: Object,
      required: true,
      default: {},
    },
  },
  methods: {
    editItem(item) {
      this.$emit('editItem', item);
    },
    showAddress(item) {
      this.$emit('showAddress', item);
    },
    showPhone(item) {
      this.$emit('showPhone', item);
    },
  },
};
</script>