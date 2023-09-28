<template>
  <div>
    <h1>Contact List</h1>
    <hr>
    <section class="contact-list">
      <div class="contact" v-for="contact in contacts" v-bind:key="contact.id">
        <div class="info">
          <p>{{ contact.name }}</p>
          <p>{{ contact.address }}</p>
          <p>{{ contact.phone_number }}</p>
          <p>{{ contact.email }}</p>
          <p>{{ contact.category }}</p>
        </div>
        <button @click="deleteContact(contact)">Delete</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HomeView',
  data() {
    return {
      contacts: [],
    };
  },
    created() { //this function is called when the component is created and it will call the getContacts function
      this.getContacts();
  },
  methods: {
    async getContacts() {
      try {
        let response = await axios.get("/api/contacts"); //axios.get is a function that will make a get request to the server
        this.contacts = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>

/*Masonry*/
*,
*:before,
*:after {
  box-sizing: inherit; /*not sure what this does */
}
.contact-list {
  column-gap:1.5em;
}

.contact 
{
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.contact .info 
{
  display: inline-block;
  width: 80%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .contact-list {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .contact-list {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .contact-list {
    column-count: 2;
  }
}


</style>