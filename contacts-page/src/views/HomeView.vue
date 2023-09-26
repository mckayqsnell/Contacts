<template>
  <div>
    <h1>Contact List</h1>
    <div v-for="contact in contacts" v-bind:key="contact.id">
      <hr>
      <div class="contact">
        <div class="problem">
          <p>{{contact.name }}</p>
          <p>{{ contact.address }}</p>
          <p>{{ contact.phone_number }}</p>
          <p>{{ contact.email }}</p>
          <p>{{ contact.category }}</p>
          <p>{{ contact.currentID }}</p>
        </div>
      </div>
    </div>
  </div>
  </template>

<script>
export default {
  name: 'home-view',
  data() {
    return {}
  },
  computed: {
    contacts() {
      return this.$root.$data.getContacts();
    }
  }
}
</script>
