import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCkwgaD3gpqHY26OfZI8S6g4WezOTpzja4",
      authDomain: "listadordetarefas-75dcd.firebaseapp.com",
      databaseURL: "https://listadordetarefas-75dcd.firebaseio.com",
      projectId: "listadordetarefas-75dcd",
      storageBucket: "listadordetarefas-75dcd.appspot.com",
      messagingSenderId: "764793559024"
}

const fireApp = firebase.initializeApp(config)

export const AUTH = fireApp.auth()

export default ({ app, router, Vue }) => {
  Vue.prototype.$auth = AUTH
}