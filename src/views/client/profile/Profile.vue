<template>
<Banner :msg="bannerTitleMessage" />

<section class="my-5">
    <div class="container">

        <div class="row">
            <div class="col-lg-4">
                <UserDetails 
                    :user="user"
                    @editItem="editItem"
                    @showAddress="showAddress"
                    @showPhone="showPhone"
                />
            </div>

            <div class="col-lg-8">
                <UserContact
                    :user="user"
                    :toggleAddressComponentVisibility="toggleAddressComponentVisibility"
                    :togglePhoneComponentVisibility="togglePhoneComponentVisibility"
                    :addressColumns="addressColumns"
                    :telephoneColumns="telephoneColumns"
                    @edit="editItem"
                />
            </div>
        </div>

    </div>
</section>

<!-- Modais -->
<AddressEdit id="editAddressModal" :data="editedItem" />
<TelephoneEdit id="editPhoneModal" :data="editedItem" />
<UserEdit id="editUserModal" :data="editedItem" />
</template>

<script>
import Banner from '@/components/fixos/Banner.vue';
import AddressEdit from '@/components/address/AddressEdit.vue';
import Table from '@/components/shared/Table.vue';
import TelephoneEdit from '@/components/telephone/TelephoneEdit.vue';
import UserEdit from '@/components/user/UserEdit.vue';
import UserContact from '@/components/profile/UserContact.vue';
import UserDetails from '@/components/profile/UserDetails.vue';
import UserService from '@/services/user/UserService';
import { userAuth } from '@/storages/AuthStorage';
import { USER_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export default {
    name: 'profile',
    components: { Banner, AddressEdit, Table, TelephoneEdit, UserEdit, UserContact, UserDetails },
    data() {
        return {
            bannerTitleMessage: 'Meu Perfil',
            messageError: null,
            userId: 0,
            userName: '',
            userEmail: '',
            user: {},
            editedItem: {},
            toggleAddressComponentVisibility: true,
            togglePhoneComponentVisibility: false,
            addressColumns: ['logradouro', 'numero', 'bairro', 'cidade', 'uf'],
            telephoneColumns: ['numero', 'tipo'],
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
            this.toggleAddressComponentVisibility = true;
            this.togglePhoneComponentVisibility = false;
        },
        showPhone() {
            this.toggleAddressComponentVisibility = false;
            this.togglePhoneComponentVisibility = true;
        },
        async getUser() {
            const user = await UserService.listUser(this.userId);
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
        mapperAddress(item) {
            this.editedItem.id = item.enderecoId;
            this.editedItem.logradouro = item.logradouro;
            this.editedItem.numero = item.numero;
            this.editedItem.bairro = item.bairro;
            this.editedItem.cidade = item.cidade;
            this.editedItem.cep = item.cep;
            this.editedItem.uf = item.uf;
            this.editedItem.usuarioId = item.usuarioId;
            this.editedItem.ativo = item.ativo;
        },
        mapperTelefone(item) {
            this.editedItem.id = item.telefoneId;
            this.editedItem.ddd = 85;
            this.editedItem.numero = item.numero;
            this.editedItem.tipo = item.tipo;
            this.editedItem.usuarioId = item.usuarioId;
            this.editedItem.ativo = item.ativo;
        },
        mapperUser() {
            this.editedItem.usuarioId = this.userId;
            this.editedItem.nome = this.user.nome;
            this.editedItem.email = this.user.email;
            this.editedItem.genero = this.user.genero;
            this.editedItem.ativo = this.user.ativo;
        },
        editItem(item) {
            if (item.enderecoId) {
                this.mapperAddress(item);
                $('#editAddressModal').modal('show');
            } else if (item.telefoneId) {
                this.mapperTelefone(item);
                $('#editPhoneModal').modal('show');
            } else {
                this.mapperUser(item);
                $('#editUserModal').modal('show');
            }
        },
    },
};
</script>