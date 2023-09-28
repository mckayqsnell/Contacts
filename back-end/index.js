const express = require('express'); //import express
const bodyParser = require('body-parser'); //import body-parser

const app = express(); //create express instance
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//MongoDB connection using mongoose
const mongoose = require('mongoose'); //import mongoose

//Fully aware this is not secure but I'm not worried about it for this project, github even has a warning about it
mongoose.connect('mongodb+srv://mckayqsnell:frisbee02@contacts.cnscheb.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, //these are just options to get rid of deprecation warnings
});

const contactSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone_number: String,
    email: String,
    category: String,

}); //create schema

const Contact = mongoose.model('Contact', contactSchema); //create model

app.post('/api/contacts' , async (req, res) => { //post request to create a new contact
    const contact = new Contact({
        name: req.body.name,
        address: req.body.address,
        phone_number: req.body.phone_number,
        email: req.body.email,
        category: req.body.category,
    });
    try {
        await contact.save();
        res.send(contact);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/contacts', async (req, res) => { //get request to get all contacts
    try {
      let contacts = await Contact.find();
      res.send(contacts);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.delete('/api/contacts/:id', async (req, res) => {
    try {
      await Contact.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.put('/api/contacts/:id', async (req, res) => {
    try {
        let contact = await Contact.findOne({
            _id: req.params.id
        });
        contact.name = req.body.name;
        contact.address = req.body.address;
        contact.phone_number = req.body.phone_number;
        contact.email = req.body.email;
        contact.category = req.body.category;
        await contact.save(); //save the updated contact and wait for it to finish
        res.send(contact); //send back the updated contact once the await is done
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
