const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const ClientSchema = new Schema({
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

ClientSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10); // Use a strength of 10
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;