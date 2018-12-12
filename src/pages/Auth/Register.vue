<template>
  <q-page-container>
    <q-page padding class="docs-input row justify-center">
        <div style="width: 500px; max-width: 90vw;">
          <q-field icon="person">
            <q-input v-model="user.username" float-label="Entre com seu usuário"/>
          </q-field>

          <q-field icon="local_parking">
            <q-input v-model="user.password" type="password" float-label="Entre com sua senha"/>
          </q-field>
          <br>  

          <q-field icon="email">
            <q-input v-model="user.email" type="email" float-label="Entre com seu email"/>
          </q-field>
          <br>       
          <q-btn color="secondary" class="full-width" @click="createUser" label="Criar Usuario"/> 
        </div>
    </q-page>
      </q-page-container>
</template>
 
<script> 

import * as firebase from 'firebase' 
import { AUTH } from "plugins/firebase";

export default {
  name: "Register",

  data() {
    return {
      user: {
        username: "pedro",
        password: "pedro9630",
        email: "pedro1@pedro.com",
        profile_picture: '',
      }
    };
  },
  
  methods:{
    createUser() {
      this.$q.loading.show({message: 'Por favor, espere o processo de registro do usuário'})
      
      let user = JSON.parse(JSON.stringify( this.user )) 

      AUTH.createUserWithEmailAndPassword(this.user.email, this.user.password).then(
        res => {  
          let userSend = Object.defineProperty(user, 'userId', { value: res.user.uid }); 
          this.writeUserData(userSend)
        },
        err => {
          this.$q.notify({
                    message: err.message,
                    color: "negative"
                });
        }
      )
      .finally( () => this.$q.loading.hide()) 
    }, 

    writeUserData(user) {
      firebase.database().ref('users/' + user.userId).set({
        username: user.username,
        email: user.email,
        profile_picture : user.profile_picture
      }).then(res => {
        this.$q.notify({
                    message: "Cliente adicionado com sucesso!",
                    color: "positive"
                });
      })
        .catch(e => {
          this.$q.notify({
                    message: e.message,
                    color: "negative"
                });
        });
    }
  }
};
</script>