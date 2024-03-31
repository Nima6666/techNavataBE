const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  
  },
  subject: {
    type: String,
    required: true,
   
  },
  message: {
    type: String,
    required: true,
   
  },
 
});

const contact = mongoose.model("contactus", ContactSchema);
module.exports = contact;
