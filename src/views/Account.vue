<template>
  <Banner :msg="bannerTitleMessage"></Banner>

  <div class="container">
    <div class="card mt-3">
      <div class="card-body">
        <div class="m-4">
          <div class="card text-center">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs" id="myTab">
                <li class="nav-item">
                  <a href="#user" class="nav-link active" data-bs-toggle="tab">Perfil</a>
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
                  <div class="tab-pane fade show active" id="user">
                  <h5 class="card-title">Perfil</h5><hr />
                    <RegisterUser></RegisterUser>
                  </div>

                  <div class="tab-pane fade" id="address">
                  <h5 class="card-title">Endereço</h5><hr />
                    <RegisterAddress></RegisterAddress>
                  </div>

                  <div class="tab-pane fade" id="telephone">
                  <h5 class="card-title">Telefone</h5><hr />
                    <RegisterTelephone></RegisterTelephone>
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
  import Banner from '../components/Banner.vue';
  import RegisterAddress from '@/components/RegisterAddress.vue';
  import RegisterTelephone from '@/components/RegisterTelephone.vue';
  import RegisterUser from '@/components/RegisterUser.vue';

  export default {
    components: { Banner, RegisterAddress, RegisterTelephone, RegisterUser },
    data() {
            return {
              bannerTitleMessage: 'Criar Conta',
            };
        },
  };
</script>