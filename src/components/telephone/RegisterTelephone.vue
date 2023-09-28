<template>

    <AlertSuccess :messageSuccess="messageSuccess" />

    <form>
      <div v-for="(phone, index) in telephones" :key="index">
        <input type="hidden" id="usuarioId" v-model="phone.usuarioId" />
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input type="text" id="numero" v-model="phone.numero" maxlength="14" OnKeyPress="format('(##)#####-####',this)" class="form-control" placeholder="Número" required />
            </div>
            <AlertError
              v-if="Object.keys(errorList).length > 0"
              :errorList="errorList['0.numero']"
            />
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
            <AlertError
              v-if="Object.keys(errorList).length > 0"
              :errorList="errorList['0.ddd']"
            />
          </div>

          <div class="col">
            <div class="form-outline">
              <select id="tipo" v-model="phone.tipo" class="form-select" aria-label="Tipo" required >
                <option value="">-- Selecione o Tipo --</option>
                <option value="Fixo">Fixo</option>
                <option value="Celular">Celular</option>
              </select>
            </div>
            <AlertError
              v-if="Object.keys(errorList).length > 0"
              :errorList="errorList['0.tipo']"
            />
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
  import { getUser } from '@/storages/EntityPersonStorage';

  export default {
    name: 'telephone',
    components: { AlertError, AlertSuccess },
    data() {
      return {
        messageSuccess: '',
        errorList: {},
        ddds: [],
        usuarioId: 0,
        telephones: [],
      };
    },
    created() {
      const userId = getUser();
      this.usuarioId = Number(userId);
      this.ddds = DDD;
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
        const telephones = await TelephoneService.postTelephone(this.telephones);
        if (telephones.status === 200) {
          this.messageSuccess = telephones.message;
        } else {
          this.errorList = telephones;
        }
      },
    },
};
</script>