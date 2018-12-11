<template>
   <q-page padding class="card-examples row items-start">
    <q-card inline class="q-ma-sm">
      <q-card-media>
        <img :src="user.photoURL">
      </q-card-media>
      <q-card-title>
        Bem vindo, {{ user.displayName }}
        <span slot="subtitle">{{ user.email }}</span>
      </q-card-title>
      <q-card-main>
        Email verificado: {{ emailVerificado }} 
      </q-card-main>
    </q-card> 
  </q-page>
</template>
 
<script> 
import { AUTH } from "plugins/firebase";
export default {
  name: 'PageIndex',

  data(){
    return {
      user: ''
    }
  },

  computed: {
    emailVerificado(){
        return this.user.emailVerified  == true ? 'Sim' : 'Não'
    }
  },

  mounted(){ 
    this.user = AUTH.currentUser;
  }
   
}
</script>