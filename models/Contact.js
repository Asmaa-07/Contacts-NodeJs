const mongoose = require('mongoose');

const contactSchema =mongoose.Schema({
    name : {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 150
    },
    phone: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Contact', contactSchema );