<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h6 class="mb-3">Informe o Envio:</h6><hr />

            <div class="row mb-3">
              <div class="col-lg-4 mb-3">
                <div class="form-check h-100 border rounded-3">
                  <div class="p-3">
                    <input class="form-check-input" type="radio" name="envio" value="expressa" id="expressa" checked />
                    <label class="form-check-label" for="expressa">
                      Entrega expressa<br>
                      <small class="text-muted">3-4 dias via Fedex</small>
                    </label>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-3">
                <div class="form-check h-100 border rounded-3">
                  <div class="p-3">
                    <input class="form-check-input" type="radio" name="envio" value="correio" id="correio" />
                    <label class="form-check-label" for="correio">
                      Correios<br>
                      <small class="text-muted">20-30 dias via correio</small>
                    </label>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-3">
                <div class="form-check h-100 border rounded-3">
                  <div class="p-3">
                    <input class="form-check-input" type="radio" name="envio" value="loja" id="loja" />
                    <label class="form-check-label" for="loja">
                      Auto-retirada<br>
                      <small class="text-muted">Venha até nossa loja</small>
                    </label>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-3">
                <h6 class="mb-3">Informe o Endereço:</h6><hr />
                <div class="form-check h-100 border rounded-3">
                  <div class="p-3">
                    <input class="form-check-input" type="radio" name="endereco" value="endereco" id="endereco" />
                    <label class="form-check-label" for="endereco">
                      Endereço X<br>
                      <small class="text-muted">Venha até nossa loja</small>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card">
          <div class="card-body">
            <h6 class="mb-3">Resumo:</h6><hr />

            <div class="d-flex justify-content-between">
              <p class="mb-2">Preço Total:</p>
              <p class="mb-2">R$ 195,90</p>
            </div>

            <div class="d-flex justify-content-between">
              <p class="mb-2">Desconto:</p>
              <p class="mb-2 text-danger">- R$ 60,00</p>
            </div>

            <div class="d-flex justify-content-between">
              <p class="mb-2">Frete:</p>
              <p class="mb-2">+ R$ 14,00</p>
            </div>

            <div class="d-flex justify-content-between">
              <p class="mb-2">Preço Total:</p>
              <p class="mb-2 fw-bold">R$ 149,90</p>
            </div>

            <div class="mt-3">
              <a href="#" class="btn btn-outline-success w-100 shadow-0 mb-2">Finalizar Compra</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>