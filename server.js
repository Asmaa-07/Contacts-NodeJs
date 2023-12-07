const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {contactRoutes} = require("./routes/routes");
const axios =  require("axios");
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const config = require('./config');


//set template engine
app.engine("handlebars", exphbs.engine({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//add body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//connect to database
const port = config.port;
const url = config.mongoURL;
mongoose.connect(url).then(() => console.log("connected")).catch(err => console.log(err));

//use contact routes
app.use("/", contactRoutes);

//get all contacts
app.get("/", async function (req, res){
    try {
        const response = await axios.get("http://localhost:8070/contacts");
        const contacts = response.data.contacts;
        //console.log(contacts);
        res.render("home", { contacts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération des contacts");
    }
});

//get add form contact
app.get("/add", function (req, res){
        res.render("addContact");
});

//post contact to database
app.post("/add", function (req, res){
    const contact =req.body;
    axios.post("http://localhost:8070/contacts", contact)
    .then(response => {
        if(!response.data.error){
            res.redirect("/");
        }
    })
    .catch((err) => console.log(err));
});

//get contact to update
app.get("/update/:id", async function(req,res){
    try {
        const response = await axios.get(`http://localhost:8070/contacts/${req.params.id}`);
        const contact = response.data.contact;
        //console.log(contacts);
        res.render("updateContact", {contact} );
    } catch (err) {
        console.error(err);
        //res.send(err);
        res.status(500).send("Erreur lors de la récupération du contact");
    }
})

//update contact
app.post("/update/:id", function(req,res){
    const contact =req.body;
    axios.put(`http://localhost:8070/contacts/update/${req.params.id}`, contact)
    .then(response => {
        if(!response.data.error){
            res.redirect("/");
        }
    })
    .catch((err) => console.log(err));
})

// Ajoutez une route pour afficher la page de confirmation de suppression
app.get("/confirm-delete/:id", async function(req, res) {
    try {
        const response = await axios.get(`http://localhost:8070/contacts/${req.params.id}`);
        const contact = response.data.contact;
        res.render("confirmDelete", { contact });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération du contact");
    }
});


// Modifier la route de suppression pour utiliser la méthode DELETE
app.get("/delete/:id", async function(req, res) {
    // Traitement de la suppression ici
    try {
        // Effectuez la suppression
        const response = await axios.delete(`http://localhost:8070/contacts/delete/${req.params.id}`);
        if (!response.data.error) {
            res.redirect("/");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la suppression du contact");
    }
});


//start server
app.listen(port, () => {
    console.log(`server running at port ${port}`);
})