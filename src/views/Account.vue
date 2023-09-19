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

  <div class="container my-5">
    <header class="mb-4">
        <h3>Novos Produtos:</h3>
    </header>

    <CardProduct v-if="this.products.list" :products="products" :totalItems="totalItems" />
  </div>
</template>

<script>
  import Banner from '@/components/fixos/Banner.vue';
  import CardProduct from '@/components/product/CardProduct.vue';
  import RegisterAddress from '@/components/address/RegisterAddress.vue';
  import RegisterTelephone from '@/components/telephone/RegisterTelephone.vue';
  import RegisterUser from '@/components/user/RegisterUser.vue';
  import ProductService from '@/services/product/ProductService';

  export default {
    components: { Banner, CardProduct, RegisterAddress, RegisterTelephone, RegisterUser },
    data() {
      return {
        bannerTitleMessage: 'Criar Conta',
        products: {},
        currentPage: 1,
        perPage: 10,
        totalItems: 0,
      };
    },
    created() {
      this.getProduct();
    },
    methods: {
      async getProduct() {
          try {
              const products = await ProductService.getProducts(this.currentPage, this.perPage, '', 0);
              this.products = products;
              this.totalItems = products.total;
          } catch (error) {
              if (error.response && error.response.data.status === 400) {
                  this.errorList = error.response.data.data;
              }
          }
      },
    },
  };
</script>