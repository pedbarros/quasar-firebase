<template>
  <q-page padding class="card-examples row items-start">
    <div class="row">
      <div class="col-md-8">
        <q-card inline class="q-ma-sm">
          <q-card-media>
            <img v-if="user.photoURL" :src="user.photoURL">
          </q-card-media>
          <q-card-title v-if="user.displayName">
            Bem vindo, {{ user.displayName }}
            <span slot="subtitle">{{ user.email }}</span>
          </q-card-title>
          <q-card-main v-if="emailVerificado">
            Email verificado: {{ emailVerificado }} 
          </q-card-main>
        </q-card>   
      </div>
      <div class="col-md-4">
      
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
    }
  },

  mounted() {
    this.user = AUTH.currentUser;
  }
};
</script>