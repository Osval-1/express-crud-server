const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorPicture: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

const Message = mongoose.model("Message",messageSchema)
module.exports= Message