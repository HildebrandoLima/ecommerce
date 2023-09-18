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
                  <a href="#card" class="nav-link active" data-bs-toggle="tab">Cartão</a>
                </li>
                <li class="nav-item">
                  <a href="#pix" class="nav-link" data-bs-toggle="tab">PIX</a>
                </li>
              </ul>
            </div>

            <div class="card-body">
              <div class="tab-content">
                <div class="tab-pane fade show active" id="card">
                  <h5 class="card-title">Cartão</h5><hr />
                 
                  <form>
                    <div class="row">
                      <div class="col">
                        <div class="mb-3">
                          <input type="text" name="titular" class="form-control border" placeholder="Nome do Titular" />
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <input type="text" name="numero_cartao" class="form-control border" placeholder="Número do Cartão" />
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col">
                        <div class="mb-3">
                          <select class="form-select" aria-label="Default select example">
                            <option selected>Parcelas</option>
                            <option value="1">01x</option>
                            <option value="2">02x</option>
                            <option value="3">03x</option>
                            <option value="4">04x</option>
                            <option value="5">05x</option>
                            <option value="6">06x</option>
                            <option value="7">07x</option>
                            <option value="8">09x</option>
                            <option value="10">10x</option>
                            <option value="11">11x</option>
                            <option value="12">12x</option>
                          </select>
                        </div>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <input type="text" name="ccv" class="form-control border" placeholder="CCV" />
                        </div>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="DataValidade" class="form-label">Data de Validade</label>
                      <input type="date" name="data_validade" id="DataValidade" class="form-control" />
                    </div>
                    <div class="mt-4">
                      <button type="submit" class="btn btn-outline-success w-100 shadow-0 mb-2">Pagar</button>
                    </div>
                  </form>
                </div>

                <div class="tab-pane fade" id="pix">
                  <h5 class="card-title">PIX</h5><hr />
                  <div class="card">
                    <h1>QR CODE</h1>
                  </div>
                  <form>
                    <input type="hidden" name="metodo_pagamento" value="pix" />

                    <button type="submit" class="btn btn-outline-success w-100 shadow-0 mb-2 mt-3">Pagar</button>
                  </form>
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
  import Banner from '../../components/fixos/Banner.vue';

  export default {
    components: { Banner },
    data() {
            return {
              bannerTitleMessage: 'Pagamento',
            };
        },
  };
</script>