const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OffreSchema = new Schema({
    Client_id:{
      type:String,
      required:true
    },
    Worker_id:{
      type:String,
      required:true,
      default:0
    },
    Client_location:{
      type:String,
      required:true,
      default:0
    },
    date:{
      type:Date,
      required:false,
    },
    
    
  },{
    timestamps:true,
  })
  const Offre = mongoose.model("Offre", OffreSchema);
  module.exports = Offre;