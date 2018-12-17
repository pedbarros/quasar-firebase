<template> 
        <q-page padding class="docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <p class="caption">Alterar Dados</p> 

      <q-field
        icon="person"  
      >
        <q-input v-model="displayName" float-label="Nome do usuário" />
      </q-field> 
    
     <q-field
        icon="cloud_upload"  
      >
      <q-uploader
            float-label="Adicione a sua foto" 
            url=""
            :upload-factory="uploadFile"
        />
       </q-field>          
    </div>
  </q-page>
</template>
 
<script>
import * as firebase from 'firebase'

import { AUTH } from "plugins/firebase";
export default {
  name: "ChangeData",

  data() {
    return {
      displayName: "",
      user: "",
      url: "",
      ref: "",
    };
  },

    mounted(){
        this.user = AUTH.currentUser; 
        this.ref = firebase.storage().ref('profiles') 
        this.displayName = JSON.parse( JSON.stringify( this.user.displayName))
    },

  methods: {
     async uploadFile (file, updateProgress) { 
        //  let displayName = JSON.parse( JSON.stringify(user.displayName))
        await this.ref.put(file).then( snapshot => {
             snapshot.ref.getDownloadURL().then( photoURL => {
                let user = { displayName: this.displayName, photoURL: photoURL }
                this.updateProfile(user)
                console.log('File available at', photoURL);
            }); 
        }).catch( e => console.log(e)); 
        
    },

    updateProfile(user) {
      this.user.updateProfile(user)
        .then(() => {
          this.$q.notify({
            message: "Usuário atualizado com sucesso!",
            color: "positive"
          });
        })
        .catch(error => {
          this.$q.notify({
            message: "Ocorreu um erro na atualização do usuário!",
            color: "negative"
          });
        });
    }
  }
};
</script>