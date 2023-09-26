<template>
    <div>
      <h1>Create a Contact</h1>
      <form v-if="creating" @submit.prevent="addContact">
        <input v-model="name" placeholder="Name">
        <p></p>
        <textarea v-model="address"></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div v-else> 
        <p>Thank you for submitting a contact! We will respond shortly.</p>
        <p><a @click="toggleForm" href="#"> Make another contact</a></p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CreateView',
    data() {
        return {
            creating: true,
            name: '',
            address: '',
            phone_number: '',
            email: '',
            category: ''
        }
    },
  methods: {
        toggleForm() {
            this.creating = !this.creating;
        },
        addContact() {
            this.$root.$data.addContact(this.name, this.address, this.phone_number, this.email, this.category);
            this.name = "";
            this.address = "";
            this.phone_number = "";
            this.email = "";
            this.category = "";
            this.creating = false;
        },
    }
}
</script>

<style scoped>
input {
  font-size: 1.2em;
  height: 30px;
  width: 200px;
}

textarea {
  font-size: 1.6em;
  width: 100%;
  max-width: 500px;
  height: 100px;
}

button {
  margin-top: 20px;
  font-size: 1.2em;
}
</style>