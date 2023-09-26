import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let data = {
  //Properties (kinda like private variables)
  contacts: [{
    name: 'John Doe',
    address: '1234 Main St',
    phone_number: '801-999-9999',
    email: 'example@gmail.com',
    category: 'Family',
  }],
  //Methods
  getContacts() {
    return this.contacts;
  },
  addContact(name, address, phone_number, email, category) {
    this.contacts.push({
      name: name,
      address: address,
      phone_number: phone_number,
      email: email,
      category: category,
    });
  }
}

new Vue({
  router,
  data: data,
  render: h => h(App)
}).$mount('#app')
