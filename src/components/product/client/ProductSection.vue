<template>
<section class="">
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <div class="card">
          <div class="card-body">
            <h4>Categorias</h4><hr />
              <ul class="list-unstyled">
                <CategoryList />
              </ul>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <header class="d-sm-flex align-items-center border-bottom mb-4 pb-3">
          <strong class="d-block py-2">Itens Encontrados {{ totalItems }}</strong>
          <div class="ms-auto">
            <select class="form-select d-inline-block w-auto border pt-1">
              <option value="">Procurar Por</option>
              <option value="1">Categorias</option>
              <option value="2">Recomendados</option>
              <option value="3">Bem Avaliados</option>
            </select>

            <div class="btn-group shadow-0 border">
              <a href="#" class="btn btn-light" title="List view">
                <i class="fa fa-bars fa-lg"></i>
              </a>
              <a href="#" class="btn btn-light active" title="Grid view">
                <i class="fa fa-th fa-lg"></i>
              </a>
            </div>
          </div>
        </header>

        <div class="row">
          <div v-for="(product, index) in products.list" :key="index" class="col-lg-4 col-md-6 col-sm-6 d-flex">
            <div class="card w-100 my-2 shadow-2-strong">

              <RouterLink :to="{ name: 'productDetails', params: { id: product.id }}">
                  <img v-if="product.imagens.length > 0" :src="product.imagens[0].caminho" class="card-img-top" />
              </RouterLink>

              <div class="card-body d-flex flex-column">
                <div class="d-flex flex-row">
                  DE: <h5 class="mb-1 me-1">{{ formatPrice(product.precoCusto) }}</h5>
                  POR: <span class="text-danger"><s>{{ formatPrice(product.precoVenda) }}</s></span>
                </div>

                <RouterLink :to="{ name: 'productDetails', params: { id: product.id }}" class="nav-link text-dark">
                  <p class="card-text">{{ product.nome }}</p>
                </RouterLink>

                <div class="card-footer d-flex align-items-end pt-3 px-0 pb-3 mt-auto">
                  <RouterLink to="/cart">
                      <ButtonCart :product="product" />
                  </RouterLink>
                  <RouterLink to="/" class="btn btn-danger border px-2 pt-2 icon-hover"><i class="fas fa-heart fa-lg text-white px-1"></i></RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</template>

<script>
import ButtonCart from '@/components/shared/ButtonCart.vue';
import CategoryList from '@/components/category/client/CategoryList.vue';
import { formatPrice } from '@/utils/formatPrice/formatPrice';

export default {
    name: 'product',
    components: { ButtonCart, CategoryList },
    props: {
        totalItems: 0,
        products: {
            type: Array,
            default: []
        },
    },
    computed: {
        formatPrice() {
            return formatPrice;
        },
    },
};
</script>