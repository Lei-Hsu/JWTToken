const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  image: {
    type: String,
  },
  userName: {
    type: String,
  },
},
  {
    timestamps: true
  }
);

const UserModal = mongoose.model("userInfos", userInfoSchema); // collection name
module.exports = UserModal;
