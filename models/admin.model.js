const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    firstname:{
      type:String,
      required:true
    },
    lastname:{
      type:String,
      required:true,
      default:0
    },
    password:{
      type:String,
      required:true,
      default:0
    },
    email:{
      type:String,
      required:false,
    },
    num_tel:{
      type:String,
      required:true,
    },
    Date_of_birth:{
      type:Date,
      required:true,
    },
    photo:{
      type:String,
      required:true,
    },
    
  },{
    timestamps:true,
  })

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;