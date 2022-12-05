const mongoose = require("./dbConnection");
const validator = require("validator");

const contactSchema = new mongoose.Schema(
  {
    // defining schama for the contact model
    userId: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: [true, "first name is required"]
    },
    lastName: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number`
      },
      required: false
    },
    email: {
      type: String,
      required: false,
      validate: [validator.isEmail, "invalid email"]
    },
    companyOrInstitute: {
      type: String,
      required: false
    },
    titleOrRole: {
      type: String,
      required: false
    },
    isFavorite: {
      type: Boolean,
      required: false
    }
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema); // creating a model instance and collection in database with given name and schema

const getContacts = async (userId) => {
  try {
    const contacts = await Contact.find({ userId });
    return contacts;
  } catch (err) {
    throw err;
  }
};

const postContact = async (contact) => {
  try {
    const newContact = new Contact(contact);
    return await newContact.save();
  } catch (err) {
    throw err;
  }
};

const putContact = async (contact) => {
  try {
    await Contact.updateOne({_id:contact._id}, contact);
    return;
  } catch (err) {
    throw err;
  }
};

const deleteContact = async (_id) => {
  try {
    const deleted = await Contact.deleteOne({ _id });
    if (deleted.deletedCount===0) throw {message:"contact not found"}
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getContacts,
  postContact,
  putContact,
  deleteContact
};
