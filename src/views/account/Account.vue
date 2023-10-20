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
                    <UserRegister />
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

<ProductNewGrid />
</template>

<script>
import AddressRegister from '@/components/address/AddressRegister.vue';
import Banner from '@/components/fixos/Banner.vue';
import ProductNewGrid from '@/components/product/ProductNewGrid.vue';
import TelephoneRegister from '@/components/telephone/TelephoneRegister.vue';
import UserRegister from '@/components/user/UserRegister.vue';

export default {
  components: { AddressRegister, Banner, ProductNewGrid, TelephoneRegister, UserRegister },
  data() {
    return {
      bannerTitleMessage: 'Criar Conta',
    };
  },
};
</script>