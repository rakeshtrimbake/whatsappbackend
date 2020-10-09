const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/whatsapp',{useNewUrlParser:true,useUnifiedTopology:true},
() => {
    console.log("Database connected successfully");
});