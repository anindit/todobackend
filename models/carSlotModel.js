var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var carSlotModel = new Schema({
  carnumber :{
    type: String, 
    required : true
  },
  slotid: { 
    type: Schema.Types.ObjectId, 
    ref: 'slot' 
  } 
}, {
    timestamps: true
});
var collectionName = 'carslot';
const Carslot = mongoose.model('carslot', carSlotModel,collectionName);
module.exports = Carslot;