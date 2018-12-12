<template>
  <q-page padding class="docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <q-list highlight>
        <q-list-header>Lista de clientes</q-list-header>
        <q-item v-for="(customer, key) in listOfCustomer" :key="key">
          <q-item-side avatar="statics/avatar_afro_black.png"/>
          <q-item-main :label="customer.name"/>
          <q-item-side right icon="chat_bubble"/>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>
 
<script>
import CustomerService from "../../services/customer.service";

export default {
  name: "List",

  data() {
    return {
      listOfCustomer: []
    };
  },

  mounted() {
    this.readCustomers();
  },
  methods: {
    readCustomers() {
      CustomerService.getCustomers().on( "value",
        snapshot => { 
          this.listOfCustomer = Object.values(snapshot.val());
        },
        errorObject => {
          console.log("The read failed: " + errorObject.code);
        }
      );
    }
  }
};
</script>