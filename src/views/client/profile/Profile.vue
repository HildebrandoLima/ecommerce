<template>
<Banner :msg="bannerTitleMessage" />

<section class="my-5">
    <div class="container">

        <AlertError
            v-if="messageError"
            :errorList="messageError"
        />

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
import AlertError from '@/components/shared/AlertError.vue';
import Banner from '@/components/fixos/Banner.vue';
import AddressEdit from '@/components/address/AddressEdit.vue';
import Table from '@/components/shared/Table.vue';
import TelephoneEdit from '@/components/telephone/TelephoneEdit.vue';
import UserEdit from '@/components/user/UserEdit.vue';
import UserContact from '@/components/profile/UserContact.vue';
import UserDetails from '@/components/profile/UserDetails.vue';
import ProfileService from '@/services/profile/ProfileService';
import UserService from '@/services/user/UserService';
import { userAuth } from '@/storages/AuthStorage';

export default {
    name: 'profile',
    components: { AlertError, Banner, AddressEdit, Table, TelephoneEdit, UserEdit, UserContact, UserDetails },
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
                this.messageError = ProfileService.messageError();
            }
        },
        calculateAge(dateOfBirth) {
            return ProfileService.calculateAge(dateOfBirth);
        },
        editItem(item) {
            if (item.enderecoId) {
                ProfileService.mapperAddress(this.editedItem, item);
                $('#editAddressModal').modal('show');
            } else if (item.telefoneId) {
                ProfileService.mapperTelephone(this.editedItem, item);
                $('#editPhoneModal').modal('show');
            } else {
                ProfileService.mapperUser(this.editedItem, this.userId, item);
                $('#editUserModal').modal('show');
            }
        },
    },
};
</script>