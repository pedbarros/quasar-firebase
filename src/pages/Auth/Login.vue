<template>
  <q-page-container>
    <q-page padding class="docs-input row justify-center">
      <div style="width: 500px; max-width: 90vw;">
        <q-field icon="wifi">
          <q-input v-model="usuario" float-label="Entre com seu usuário"/>
        </q-field>

        <q-field icon="wifi">
          <q-input v-model="senha" type="password" float-label="Entre com sua senha"/>
        </q-field>
        <br>
        <q-btn color="primary" class="full-width" @click="loginUser" label="Logar Usuario"/>
        <br>
        <q-btn color="secondary" class="full-width" @click="createUser" label="Criar Usuario"/>
      </div>
    </q-page>
  </q-page-container>
</template>
 
<script>
import * as firebase from "firebase";
import { AUTH } from "plugins/firebase";

export default {
  name: "Login",

  data() {
    return {
      auth: "",
      usuario: "pedro@pedro.com",
      senha: "pedro9630"
    };
  },

  methods: {
    createUser() {
      this.$router.push({name: 'Register'})
    },


    loginUser() {
      
      this.$q.loading.show({message: 'Por favor, espere o processo de autenticação'})
      
      AUTH.signInWithEmailAndPassword(this.usuario, this.senha) 
          .then( user => {
                console.log("Authenticated successfully with payload:", user);
                this.$router.push('/')
                this.auth = user;
            })
            .catch( error => {
                console.log("Login Failed!", error);
            }) 
            .finally( () => this.$q.loading.hide())
    }, 
  }
};
</script>