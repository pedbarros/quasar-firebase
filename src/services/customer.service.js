
import * as firebase from "firebase";

export default {
  addCustomer(customer) {
    let newCustomerKey = firebase.database().ref().child('customers').push().key;
    return firebase
      .database()
      .ref("customers/" + newCustomerKey)
      .set({
        name: customer.name,
        date_of_birth: customer.date_of_birth,
        address: customer.address,
        status: customer.status,
      })
      
  },
  
  getCustomers(customer) {
    return firebase
      .database()
      .ref("customers") 
  },


  deleteCustomer(customer_id) { 
    return firebase
      .database()
      .ref("customers/" + customer_id)
      .remove()
  }


}