<template>

    <AlertSuccess :messageSuccess="this.messageSuccess" />
    <AlertError
      v-if="Object.keys(this.errorList).length > 0"
      :errorList="this.errorList"
    />

    <form>
      <div v-for="(phone, index) in telephones" :key="index">
        <input type="hidden" id="usuarioId" v-model="phone.usuarioId" class="form-control" />
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input type="text" id="numero" v-model="phone.numero" maxlength="14" OnKeyPress="format('(##)#####-####',this)" class="form-control" placeholder="Número" required />
            </div>
          </div>

          <div class="col">
            <div class="form-outline">
              <button @click="removeTelephone(index)" class="btn btn-danger">X</button>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <select id="ddd" v-model="phone.ddd" class="form-select" aria-label="DDD" required >
                <option value="">-- Selecione o DDD --</option>
                <option v-for="ddd in ddds" :value="ddd" :key="ddd">{{ ddd }}</option>
              </select>
            </div>
          </div>

          <div class="col">
            <div class="form-outline">
              <select id="tipo" v-model="phone.tipo" class="form-select" aria-label="Tipo" required >
                <option value="">-- Selecione o Tipo --</option>
                <option value="Fixo">Fixo</option>
                <option value="Celular">Celular</option>
              </select>
            </div>     
          </div>
        </div>
    </div>

    <div class="row mb-4">
      <div class="col">
        <button type="button" @click="addTelephone" class="btn btn-success btn-block mb-4">+</button>
      </div>

      <div class="col">
        <button type="button" @click="saveTelephone" class="btn btn-primary btn-block mb-4">Enviar</button>
      </div>
    </div>
  </form>
</template>

<script>
  import AlertError from '@/components/shared/AlertError.vue';
  import AlertSuccess from '@/components/shared/AlertSuccess.vue';
  import DDD from '@/assets/js/ddds';
  import TelephoneService from '@/services/telephone/TelephoneService';

  export default {
    name: 'telephone',
    components: { AlertError, AlertSuccess },
    data() {
      return {
        messageSuccess: '',
        errorList: {},
        ddds: DDD,
        usuarioId: 0,
        telephones: [],
      };
    },
    created() {
      this.usuarioId = Number(localStorage.getItem('userId'));
      this.addTelephone();
    },
    methods: {
      addTelephone() {
        this.telephones.push({
          ddd: "",
          numero: '',
          tipo: '',
          usuarioId: this.usuarioId,
        });
      },
      removeTelephone(index) {
        this.telephones.splice(index, 1);
      },
      async saveTelephone() {
        try {
          const telephones = await TelephoneService.postTelephone(this.telephones);
          this.messageSuccess = telephones;
        } catch (error) {
          if (error.response && error.response.data.status === 400) {
            this.errorList = error.response.data.data;
          }
        }
      },
    },
};
</script>