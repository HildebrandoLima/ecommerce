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
                  <a href="#boleto" class="nav-link active" data-bs-toggle="tab">Boleto</a>
                </li>
                <li class="nav-item">
                  <a href="#card" class="nav-link" data-bs-toggle="tab">Cartão</a>
                </li>
                <li class="nav-item">
                  <a href="#pix" class="nav-link" data-bs-toggle="tab">PIX</a>
                </li>
              </ul>
            </div>

            <div class="card-body">
              <div class="tab-content">

                <div class="tab-pane fade show active" id="boleto">
                  <h5 class="card-title">Boleto</h5><hr />
                  <RegisterTicket :total="total" :pedidoId="pedidoId" />
                </div>

                <div class="tab-pane fade" id="card">
                  <h5 class="card-title">Cartão</h5><hr />
                  <RegisterCard :total="total" :pedidoId="pedidoId" />
                </div>

                <div class="tab-pane fade" id="pix">
                  <h5 class="card-title">PIX</h5><hr />
                  <RegisterPix :total="total" :pedidoId="pedidoId" />
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
  import Banner from '@/components/fixos/Banner.vue';
  import RegisterCard from '@/components/payment/RegisterCard.vue';
  import RegisterPix from '@/components/payment/RegisterPix.vue';
  import RegisterTicket from '@/components/payment/RegisterTicket.vue';
  import { getTotalCart } from '@/storages/CartStorage';
  import { getOrder } from '@/storages/CheckoutStorage';

  export default {
    name: 'payment',
    components: { Banner, RegisterCard, RegisterPix, RegisterTicket },
    data() {
      return {
        bannerTitleMessage: 'Pagamento',
        total: 0,
        pedidoId: 0,
      };
    },
    created() {
      this.total = getTotalCart();
      this.pedidoId = getOrder();
    },
  };
</script>