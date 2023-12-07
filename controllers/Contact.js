const Contact = require('../models/Contact');

const getAllContact = (req, res) => {
    Contact.find({}).sort({ createdAt: 1 })
        .then(contacts => {
            res.json({ contacts });
        })
        .catch(err => {
            res.status(500).json({ error: "Erreur lors de la récupération des contacts" });
        });
};

const addContact = (req, res) => {
    const { name, phone } = req.body;
    const newContact = new Contact({ name, phone });
    newContact
        .save()
        .then(() => res.status(201).json({ newContact }))
        .catch(err => res.status(500).json({ error: err }));
};

const updateContact = (req, res) => {
    Contact.findById(req.params.id)
        .then(contact => {
            if (!contact) {
                return res.status(404).json({ error: "Contact non trouvé" });
            }

            const { name, phone } = req.body;
            contact.name = name;
            contact.phone = phone;

            contact.save()
                .then(() => res.json({ message: "Contact modifié" }))
                .catch(err => {
                    res.status(500).json({ error: err });
                    console.log(err);
                });
        })
        .catch(err => {
            res.status(500).json({ error: err });
            console.log(err);
        });
};

const deleteContact = (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(contact => {
            if (!contact) {
                return res.status(404).json({ error: "Contact non trouvé" });
            }

            console.log("Contact supprimé");
            res.json({ message: "Contact supprimé" });
        })
        .catch(err => res.status(500).json({ error: err }));
};

const contactById = (req, res) => {
    Contact.findById(req.params.id)
        .then(contact => {
            if (!contact) {
                return res.status(404).json({ error: "Contact non trouvé" });
            }

            res.json({ contact });
        })
        .catch(err => {
            res.status(500).json({ error: err });
            console.log(err);
        });
};

module.exports = {
    getAllContact,
    addContact,
    updateContact,
    contactById,
    deleteContact
};
