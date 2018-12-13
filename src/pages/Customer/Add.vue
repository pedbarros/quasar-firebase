<template>
  <q-page padding class="docs-input row justify-center">
      <div style="width: 500px; max-width: 90vw;">
          <q-field icon="person">
            <q-input v-model="customer.name" type="text" float-label="Nome do cliente"/>
          </q-field>
          
          <q-field icon="date_range">
              <q-datetime v-model="customer.date_of_birth" type="date" float-label="Data de Nascimento"/> 
          </q-field>


          <q-field icon="home">
            <q-input v-model="customer.address" type="text" float-label="Endereço"/>
          </q-field>


          <q-field icon="cached">
              <q-select
                v-model="customer.status"
                float-label="Status"
                radio
                :options="statusOptions"
                /> 
          </q-field>
          <br>
        <q-btn
          color="secondary"
          class="full-width"
          @click="writeCustomerData"
          label="Adicionar cliente"
        />
      </div>
    </div>
  </q-page>
</template>
 
<script>
import * as firebase from "firebase";
import CustomerService from "../../services/customer.service";

export default {
  name: "Add",

  data() {
    return {
      customer: {
          name: 'Pedro Edson Silva',
          date_of_birth: '',
          address: '',
          status: '',
      },
      statusOptions: [
        {
          label: 'Ativo',
          value: 'A'
        },
        {
          label: 'Inativo',
          value: 'I'
        },
      ]
    };
  }, 
  methods: { 
    writeCustomerData() {
       let customer = JSON.parse(JSON.stringify( this.customer ))

       CustomerService.addCustomer(customer)
            .then(() => {
                this.$q.notify({
                    message: "Cliente adicionado com sucesso!",
                    color: "positive"
                });
                this.$router.push({ name: 'ListCustomers'})
            })
            .catch(error => {
                this.$q.notify({
                    message: `Ocorreu um erro na adição do usuário! Erro ${error}` ,
                    color: "negative"
                });
            });
    }
  }
};
</script>