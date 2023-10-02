<template>
    <Banner :msg="bannerTitleMessage"></Banner>

    <section class="my-5">
        <div class="container">

            <div class="row">
                <div class="col-lg-4">
                    <div class="card border shadow-0">
                        <div class="m-4">
                            <div class="card-body">
                                <h5 class="card-title d-flex flex-column align-items-center text-center">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" class="rounded-circle" width="150">
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

                                    <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
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
                </div>

                <div class="col-lg-8">
                    <div class="card border shadow-0">
                        <div class="m-4">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <Table
                                        v-if="toggleAndressComponentVisibility"
                                        :data="user.enderecos"
                                        :columns="addressColumns"
                                        @edit="editItem"
                                    />

                                    <Table
                                        v-if="togglePhoneComponentVisibility"
                                        :data="user.telefones"
                                        :columns="telephoneColumns"
                                        @edit="editItem"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

  <!-- Modais -->
  <EditAddress id="editAddressModal" :data="editedItem" />
  <EditPhone id="editPhoneModal" :data="editedItem" />
  <EditUser id="editUserModal" :data="editedItem" />

</template>

<script>
    import Banner from '@/components/fixos/Banner.vue';
    import EditAddress from '@/components/address/EditAddress.vue';
    import Table from '@/components/shared/Table.vue';
    import EditPhone from '@/components/telephone/EditTelephone.vue';
    import EditUser from '@/components/user/EditUser.vue';
    import UserService from '@/services/user/UserService';
    import { userAuth } from '@/storages/AuthStorage';
    import { USER_NOT_FOUND_MESSAGE } from '@/support/utils/defaultMessages/DefaultMessage';

    export default {
        name: 'profile',
        components: { Banner, EditAddress, Table, EditPhone, EditUser },
        data() {
            return {
                bannerTitleMessage: 'Meu Perfil',
                messageError: null,
                userId: 0,
                userName: '',
                userEmail: '',
                user: {},
                editedItem: {},
                toggleAndressComponentVisibility: true,
                togglePhoneComponentVisibility: false,
                addressColumns: ['enderecoId', 'logradouro', 'numero', 'bairro', 'cidade', 'uf'],
                telephoneColumns: ['telefoneId', 'numero', 'tipo'],
            };
        },
        created() {
            const [userId, userName, userEmail] = userAuth();
            this.userId = userId;
            this.userName = userName;
            this.userEmail = userEmail;
            this.getUser();
        },
        methods: {
            showAddress() {
                this.toggleAndressComponentVisibility = true;
                this.togglePhoneComponentVisibility = false;
            },
            showPhone() {
                this.toggleAndressComponentVisibility = false;
                this.togglePhoneComponentVisibility = true;
            },
            async getUser() {
                const user = await UserService.getUser(this.userId);
                if (user.status === 200) {
                    this.user = user.data[0];
                    this.user.dataNascimento = this.calculateAge(this.user.dataNascimento);
                } else {
                    this.messageError = USER_NOT_FOUND_MESSAGE;
                }
            },
            calculateAge(dataNascimento) {
                const birthDate = new Date(dataNascimento);
                const currentDate = new Date();
                const differenceInMilliseconds = currentDate - birthDate;
                const age = Math.floor(differenceInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
                return age;
            },
            editItem(item) {
                if (item.enderecoId) {
                    this.editedItem.id = item.enderecoId;
                    this.editedItem.logradouro = item.logradouro;
                    this.editedItem.numero = item.numero;
                    this.editedItem.bairro = item.bairro;
                    this.editedItem.cidade = item.cidade;
                    this.editedItem.cep = item.cep;
                    this.editedItem.uf = item.uf;
                    this.editedItem.usuarioId = item.usuarioId;
                    this.editedItem.ativo = item.ativo;
                    $('#editAddressModal').modal('show');
                } else if (item.telefoneId) {
                    this.editedItem.id = item.telefoneId;
                    this.editedItem.ddd = 85;
                    this.editedItem.numero = item.numero;
                    this.editedItem.tipo = item.tipo;
                    this.editedItem.usuarioId = item.usuarioId;
                    this.editedItem.ativo = item.ativo;
                    $('#editPhoneModal').modal('show');
                } else {
                    this.editedItem.usuarioId = this.userId;
                    this.editedItem.nome = this.user.nome;
                    this.editedItem.email = this.user.email;
                    this.editedItem.genero = this.user.genero;
                    this.editedItem.ativo = this.user.ativo;
                    $('#editUserModal').modal('show');
                }
            },
        },
    };
</script>