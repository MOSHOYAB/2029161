const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    
    companyName:{
        type:String,
        required:true,
       
    },
    ownerName:{
        type:String,
        required:true,
       
    },
    rollNo: {
		type: Number,
        required:true,
		trim:true,
	},
    ownerEmail:{
        type:String,
        required:true,
        trim:true,
    },
    accessCode:{
        type:String,
        required:true,
    },
  
   
});

module.exports = mongoose.model("user", userSchema);