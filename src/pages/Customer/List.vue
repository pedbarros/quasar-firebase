<template>
  <q-page padding class="docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <q-list highlight>
        <q-list-header>Lista de clientes</q-list-header>
        <q-item v-for="(customer, key) in listOfCustomer" :key="key" @click.native="deleteCustomer(key)">
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
      this.$q.loading.show({ message: "Carregando a lista de clientes" });

      CustomerService.getCustomers().on(
        "value",
        snapshot => {
          this.listOfCustomer = snapshot.val();
          this.$q.loading.hide();
        },
        errorObject => {
          console.log("The read failed: " + errorObject.code);
        }
      );
    },

    deleteCustomer(customerId) {
      CustomerService.deleteCustomer(customerId)
        .then(() => {
          this.$q.notify({
            message: "Cliente deletado com sucesso!",
            color: "positive"
          });
        })
        .catch(error => {
          this.$q.notify({
            message: `Ocorreu um erro na deleção do usuário! Erro ${error}`,
            color: "negative"
          });
        });
    }
  }
};
</script>