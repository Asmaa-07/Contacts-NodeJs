const Contact = require('../models/Contact');

const getAllContact = (req,res) => {
    Contact.find({}).sort({ createdAt: 1 }).then( contacts=> {
        res.json({contacts});
    }).catch(err => {
        res.json({error : "No data"});
    })
};

const addContact = (req,res) => {
    const {name,phone} =req.body;
    const newContact = new Contact({ name, phone});
    newContact
    .save()
    .then(() => res.json({newContact}))
    .catch(err => res.json({error: err}));
};

const updateContact = (req,res) => {
    Contact.findById(req.params.id)
    .then( contact=> {
        const {name,phone} =req.body;
        contact.name = name;
        contact.phone = phone;
        contact.save().then(() => console.log('contact modifié'));
        //res.json({contact});
        res.json({message: "updated"});
    }).catch(err => {
        res.json({error : err});
        console.log(err);
    })
};

const deleteContact = (req,res) => {
    Contact.findByIdAndDelete(req.params.id).then( contact=> {
        console.log("contact supprimé");
        res.json({message: "contact supprimé"});
    }).catch(err => res.json({error : err}));
};

const contactById = (req,res) => {
    Contact.findById(req.params.id).then( contact=> {
        res.json({contact});
    }).catch(err => {
        res.json({error : "No data"});
        console.log(err);
    })
};

module.exports = {
    getAllContact,
    addContact,
    updateContact,
    contactById,
    deleteContact
}