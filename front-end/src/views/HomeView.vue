<template>
  <div>
    <h1>Contact List</h1>
    <hr>
    <section class="contact-list">
      <div class="contact" v-for="contact in contacts" v-bind:key="contact.id">
        <div class="info">
          <h2>{{ contact.name }}</h2>
          <p>Address: {{ contact.address }}</p>
          <p>Number: {{ contact.phone_number }}</p>
          <p>Email: {{ contact.email }}</p>
          <p>Category(relation): {{ contact.category }}</p>
        </div>
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
      findContact: null,
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
  background-color:#014a0c;
  color:white;
}

.contact .info 
{
  display: inline-block;
  width: 80%;
  margin: 0 0 0 1.5em;
}

/* Masonry on large screens */
@media only screen and (min-width: 1101px) {
  .contact-list {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1100px) and (min-width: 991) {
  .contact-list {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 990px) and (min-width: 725px) {
  .contact-list {
    column-count: 2;
  }
}


</style>