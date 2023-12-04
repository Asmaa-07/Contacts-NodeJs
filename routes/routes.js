const express = require('express');
const {
    getAllContact,
    addContact,
    updateContact,
    contactById,
    deleteContact
} = require("../controllers/Contact");

const contactRoutes = express.Router();

contactRoutes.get("/contacts",getAllContact);
contactRoutes.post("/contacts/add",addContact);
contactRoutes.put("/contacts/update/:id",updateContact);
contactRoutes.delete("/contacts/delete/:id",deleteContact);
contactRoutes.get("/contacts/:id",contactById);

module.exports = {
    contactRoutes
}

