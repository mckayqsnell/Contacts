<template>
    <div class = "create">
      <div class = "contact-create">
        <h1>Create a Contact</h1>
        <div class="form">
          <input v-model="name" placeholder="Name">
          <p></p>
          <input v-model="address" placeholder="Address"> 
          <p></p>
          <input v-model="phone_number" placeholder="Phone number"> 
          <p></p>
          <input v-model="email" placeholder="Email">
          <p></p>
          <input v-model="category" placeholder="Category">
          <p></p>
          <br />
          <button @click ="upload">Create</button> <br />
        </div>
        
        <div class = "upload" v-if="addContact">
          <h2>Contact for {{addContact.name}} created</h2>
        </div>
        <br />
      </div>

      <div class = "edit">
        <h1> Edit a Contact</h1>
        <div class = "form">
          <input v-model ="findName" placeholder = "Search by Name">
          <div class = "suggestions" v-if="suggestions.length > 0 ">
            <div class = "suggestion" v-for="s in suggestions" :key = "s.id" @click="selectContact(s)">{{s.name}} </div>
          </div>
        </div>  
      </div>

      <div class = "upload" v-if="findContact">
        <input v-model="findContact.name">
        <p></p>
        <input v-model="findContact.address">
        <p></p>
        <input v-model="findContact.phone_number">
        <p></p>
        <input v-model="findContact.email">
        <p></p>
        <input v-model="findContact.category">
        <p></p>
      </div>

      <div class = "actions" v-if = "findContact">
        <button @click = "deleteContact(findContact)">Delete</button>
        <button @click = "editContact(findContact)">Edit</button>
      </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CreateView',
    data() {
        return {
            name: '',
            address: '',
            phone_number: '',
            email: '',
            category: '',
            addContact: null,
            contacts: [],
            findContact: null,
            findName: '',
        }
    },
    computed: {
      suggestions()
      {
        let contacts = this.contacts.filter(contact => contact.name.toLowerCase().startsWith(this.findName.toLowerCase()));
        return contacts.sort((a,b) => a.name > b.name); //sorts the contacts by name in alphabetical order
      }
    },
    created() { //this function is called when the component is created and it will call the getContacts function
      this.getContacts();
    },
  methods: {
        toggleForm() {
            this.creating = !this.creating;
        },
        async upload() {
          try {
            let response = await axios.post("/api/contacts", {
              name: this.name,
              address: this.address,
              phone_number: this.phone_number,
              email: this.email,
              category: this.category
            });
            this.contacts = response.data;
            return true; //what does this do? 
          } catch (error) {
            console.log(error); //watch out for this
          }
        },
        async getContacts() {
          try {
            let response = await axios.get("/api/contacts"); //axios.get is a function that will make a get request to the server
            this.contacts = response.data;
            return true; //what does this do?
          } catch (error) {
            console.log(error); //watch out for this
          }
        },
        selectContact(contact) {
          this.findName = '';
          this.findContact = contact;
        },
        async deleteContact(contact) {
          try {
            await axios.delete("/api/contacts/" + contact._id);
            this.findContact = null;
            this.getContacts();
            return true;
          }
          catch (error) {
            console.log(error); //watch out for this
          }
        },
        async editItem(contact)
        {
          try 
          {
            await axios.put("/api/contacts/" + contact._id, {
              name: this.findContact.name,
              address: this.findContact.address,
              phone_number: this.findContact.phone_number,
              email: this.findContact.email,
              category: this.findContact.category
            });
            this.findContact = null;
            this.getContacts();
            return true;
          }
          catch (error) {
            console.log(error); //watch out for this
          }
        }
    }
}
</script>

<style scoped>
input {
  font-size: 1.2em;
  height: 30px;
  width: 200px;
}

button {
  margin-top: 20px;
  font-size: 1.2em;
}

/* Suggestions for editing */

.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggetion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #014a0c;
  color: #fff;
}

</style>