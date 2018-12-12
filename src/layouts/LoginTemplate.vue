<template>
  <q-layout>
    <q-layout-header>
    <q-toolbar color="secondary"> 
      <q-btn
        @click="$router.push('/login')"
        flat round dense
        icon="keyboard_backspace" 
      />

      <q-toolbar-title>
        Login
      </q-toolbar-title> 
    </q-toolbar>
  </q-layout-header>

    <router-view></router-view>
  </q-layout>
</template>

<script>
import { AUTH } from "plugins/firebase";

export default {
  name: "LoginTemplate"
};
</script>