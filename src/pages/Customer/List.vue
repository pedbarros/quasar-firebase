<template>
  <q-page padding class="docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <q-list highlight>
        <q-list-header>Lista de clientes</q-list-header>
        <q-item
          multiline
          v-for="(customer, key) in listOfCustomer"
          :key="key"
          @click.native="deleteCustomer(key)"
        >
          <q-item-side image="statics/avatar_afro_black.png"/>
          <q-item-main>
            <q-item-tile label>{{ customer.name }}</q-item-tile>
            <q-item-tile sublabel>Data de Nascimento: {{ customer.date_of_birth }}</q-item-tile>
            <q-item-tile sublabel>Status: {{ customer.status }}</q-item-tile>
          </q-item-main>
          <q-item-side right icon="movie"/>
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
      this.$q.actionSheet({
        title: "Article Actions",

        // specify ONLY IF you want grid mode:
        grid: true,

        // optional; change dismiss label (only for iOS theme)
        dismissLabel: "Quit",

        actions: [
          {
            label: "Deletar o cliente",
            color: "negative",
            icon: "delete",
            handler() {
              this.$q
                .dialog({
                  title: "Confirmar",
                  message: `Deseja deletar o cliente?`,
                  ok: "Sim",
                  cancel: "Não"
                })
                .then(() => {
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
                })
                .catch(() => {});
            }
          },
          {
            label: "Adiciona pendência",
            color: "negative",
            icon: "delete",
            handler() { 
              
            }
          }
        ]
      });
    }
  }
};
</script>