<template>
  <q-page padding class="row items-start">
    <q-card inline class="q-ma-sm">
      <q-card-media>
        <img style="zoom: 0.8" :src="user.photoURL">
      </q-card-media>
      <q-card-title class="relative-position">
        <q-btn
          fab
          color="primary"
          icon="place"
          class="absolute"
          style="top: 0; right: 8px; transform: translateY(-50%);"
        />

        <div class="ellipsis">{{ user.displayName }}</div>
      </q-card-title>
      <q-card-main>
        <p>Email: {{ user.email }}</p>
        <p class="text-faded">Email Verificado: {{ emailVerificado }}</p>
        <p class="text-faded">Anonimo: {{ ehAnonimo }}</p>
      </q-card-main>
      <q-card-separator/>
    </q-card>
  </q-page>
</template> 

<style>
-moz-transform: scale(0.8);
</style>

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
 