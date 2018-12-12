<template>
  <q-page padding class="card-examples row items-start">
    <div class="row">
      <div class="col-lg-12 col-md-4">
        <q-card class="q-mt-md q-mr-sm">
          <q-card-media>
            <img v-if="user.photoURL" :src="user.photoURL">
          </q-card-media> 
          <q-card-title>
            {{ user.displayName }} 
          </q-card-title>
        </q-card>
      </div>
      
      <div class="col-lg-12 col-md-8"> 
           <q-card class="q-mt-md q-mr-sm">
            <q-card-title>
              Informações do usuário
              <span slot="subtitle"></span>
            </q-card-title>
            <q-card-main>
              <div>Email: {{ user.email }}</div>
              <div>Email Verificado: {{ emailVerificado }}</div> 
              <div>Anonimo: {{ ehAnonimo }}</div> 
            </q-card-main>
          </q-card> 
        </div> 

    </div>
  </q-page>
</template>
 
<script>
import { AUTH } from "plugins/firebase";
export default {
  name: "PageIndex",

  data() {
    return {
      user: ""
    };
  },

  computed: {
    emailVerificado() {
      return this.user.emailVerified == true ? "Sim" : "Não";
    },

    ehAnonimo() {
      return this.user.isAnonymous == true ? "Sim" : "Não";
    }
  },

  mounted() {
    this.user = AUTH.currentUser;
  }
};
</script>
 