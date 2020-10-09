const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name:String,
    message:String,
    roomId:String,
    receive:Boolean
},{
    timestamps:true
});

module.exports = mongoose.model('messages',messageSchema);