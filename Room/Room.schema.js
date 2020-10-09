const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: String,
    lastMessage:String
  },
  {
    timestamps: true,    
  }
);

module.exports = mongoose.model('rooms',roomSchema);
