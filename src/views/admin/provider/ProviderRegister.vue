<template>

<Banner :msg="bannerTitleMessage" />

<div class="container">
    <div class="card mt-3">
      <div class="card-body">
        <div class="m-4">
          <div class="card text-center">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs" id="myTab">
                <li class="nav-item">
                  <a href="#provider" class="nav-link active" data-bs-toggle="tab">Perfil</a>
                </li>
                <li class="nav-item">
                  <a href="#address" class="nav-link" data-bs-toggle="tab">Endereço</a>
                </li>
                <li class="nav-item">
                  <a href="#telephone" class="nav-link" data-bs-toggle="tab">Telefone</a>
                </li>
              </ul>

              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane fade show active" id="provider">
                  <h5 class="card-title">Perfil</h5><hr />
                        <AlertSuccess :messageSuccess="messageSuccess" />

                        <ProviderForm
                            :errorList="errorList"
                            :provider="provider"
                            :isEditMode="false"
                            @saveProvider="saveProvider"
                        />
                  </div>

                  <div class="tab-pane fade" id="address">
                  <h5 class="card-title">Endereço</h5><hr />
                    <AddressRegister />
                  </div>

                  <div class="tab-pane fade" id="telephone">
                  <h5 class="card-title">Telefone</h5><hr />
                    <TelephoneRegister />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
</div>

</template>

<script>
import AddressRegister from '@/components/address/AddressRegister.vue';
import AlertSuccess from '@/components/shared/AlertSuccess.vue';
import Banner from '@/components/fixos/Banner.vue';
import ProviderForm from '@/components/provider/ProviderForm.vue';
import ProviderService from '@/services/provider/ProviderService';
import TelephoneRegister from '@/components/telephone/TelephoneRegister.vue';

export default {
    name: 'register-provider',
    components: { AddressRegister, AlertSuccess, Banner, ProviderForm, TelephoneRegister },
    data() {
        return {
            bannerTitleMessage: 'Criar Fornecedor',
            messageSuccess: '',
            errorList: {},
            provider: {
                razaoSocial: '',
                cnpj: '',
                email: '',
                dataFundacao: '',
            },
        };
    },
    methods: {
        async saveProvider() {
            const provider = await ProviderService.createProvider(this.provider);
            if (provider.status === 200) {
                this.messageSuccess = provider.message;
                return this.messageSuccess;
            } else {
                this.errorList = provider;
                return this.errorList;
            }
        },
    },
};
</script>